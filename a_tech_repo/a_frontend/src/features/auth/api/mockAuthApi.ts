import { ApiError } from '../../../lib/apiError';
import {
  armazenamentoDoNavegador,
  derivarHash,
  gravarSessao,
  hashesIguais,
  lerContas,
  lerSessao,
  limparSessao,
  normalizarEmail,
  novoSalt,
  salvarConta,
  type Armazenamento,
  type Conta,
} from '../storage/authStorage';
import type { AuthApi, UsuarioResponse } from './types';

/**
 * API simulada (VITE_API_MOCK=true): mesma interface e mesmos erros do backend, guardando contas e
 * sessão no navegador (ver authStorage.ts). Contas e logins são reais dentro do navegador; os
 * endereços abaixo existem só para exercitar os erros da interface:
 * - ja@exemplo.com       → cadastro 409 EMAIL_JA_CADASTRADO
 * - *@fora.com           → cadastro 403 EMAIL_FORA_DO_BETA
 * - limite@exemplo.com   → login 429 MUITAS_TENTATIVAS
 * - falha@exemplo.com    → login 500 ERRO_INTERNO
 * Login com e-mail não cadastrado ou senha errada → 401 CREDENCIAIS_INVALIDAS (mensagem genérica).
 */
export function createMockAuthApi(
  delayMs = 1200,
  armazenamento: Armazenamento = armazenamentoDoNavegador(),
): AuthApi {
  const wait = () => new Promise((resolve) => setTimeout(resolve, delayMs));
  const SALT_FALSO = '00'.repeat(16);

  const paraUsuario = (c: Conta): UsuarioResponse => ({
    id: c.id,
    nome: c.nome,
    sobrenome: c.sobrenome,
    email: c.email,
  });

  return {
    async login(dados) {
      await wait();
      const email = normalizarEmail(dados.email);
      if (email === 'limite@exemplo.com') {
        throw new ApiError({
          status: 429,
          codigo: 'MUITAS_TENTATIVAS',
          mensagem: 'Muitas tentativas.',
        });
      }
      if (email === 'falha@exemplo.com') {
        throw new ApiError({ status: 500, codigo: 'ERRO_INTERNO', mensagem: 'Erro interno.' });
      }

      const conta = lerContas(armazenamento).find((c) => c.email === email);
      // Deriva o hash mesmo sem conta, para o tempo de resposta não revelar se o e-mail existe.
      const hash = await derivarHash(dados.senha, conta?.salt ?? SALT_FALSO);
      if (!conta || !hashesIguais(hash, conta.hash)) {
        throw new ApiError({
          status: 401,
          codigo: 'CREDENCIAIS_INVALIDAS',
          mensagem: 'E-mail ou senha inválidos.',
        });
      }
      gravarSessao(armazenamento, conta.id, dados.lembrar);
      return paraUsuario(conta);
    },

    async cadastrar(dados) {
      await wait();
      const email = normalizarEmail(dados.email);
      if (email === 'ja@exemplo.com' || lerContas(armazenamento).some((c) => c.email === email)) {
        throw new ApiError({
          status: 409,
          codigo: 'EMAIL_JA_CADASTRADO',
          mensagem: 'Este e-mail já tem uma conta.',
        });
      }
      if (email.endsWith('@fora.com')) {
        throw new ApiError({
          status: 403,
          codigo: 'EMAIL_FORA_DO_BETA',
          mensagem: 'Este e-mail ainda não está no beta.',
        });
      }

      const salt = novoSalt();
      const conta: Conta = {
        id: crypto.randomUUID(),
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        email,
        salt,
        hash: await derivarHash(dados.senha, salt),
      };
      salvarConta(armazenamento, conta);
      // Como no backend: quem acabou de se cadastrar já está autenticado (sessão de aba).
      gravarSessao(armazenamento, conta.id, false);
      return paraUsuario(conta);
    },

    async sessaoAtual() {
      const usuarioId = lerSessao(armazenamento);
      const conta = usuarioId
        ? lerContas(armazenamento).find((c) => c.id === usuarioId)
        : undefined;
      return conta ? paraUsuario(conta) : null;
    },

    async sair() {
      limparSessao(armazenamento);
    },
  };
}
