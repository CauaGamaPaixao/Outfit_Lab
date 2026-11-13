import { ApiError } from '../../../lib/apiError';
import type { AuthApi } from './types';

/**
 * API simulada (VITE_API_MOCK=true): mesma interface e mesmos erros do backend,
 * para a tela funcionar antes do Spring Boot existir.
 * - ja@exemplo.com  → 409 EMAIL_JA_CADASTRADO
 * - *@fora.com      → 403 EMAIL_FORA_DO_BETA
 * - demais          → 201
 * Login: erro@exemplo.com (ou senha "errada") → 401 · limite@exemplo.com → 429 ·
 *        falha@exemplo.com → 500 · demais → 200
 */
export function createMockAuthApi(delayMs = 1200): AuthApi {
  const wait = () => new Promise((resolve) => setTimeout(resolve, delayMs));

  return {
    async login(dados) {
      await wait();
      const email = dados.email.toLowerCase();
      if (email === 'erro@exemplo.com' || dados.senha === 'errada') {
        throw new ApiError({
          status: 401,
          codigo: 'CREDENCIAIS_INVALIDAS',
          mensagem: 'E-mail ou senha inválidos.',
        });
      }
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
      const nome = email.split('@')[0] ?? '';
      return {
        id: crypto.randomUUID(),
        nome: nome.charAt(0).toUpperCase() + nome.slice(1),
        sobrenome: '',
        email,
      };
    },

    async cadastrar(dados) {
      await wait();
      const email = dados.email.toLowerCase();
      if (email === 'ja@exemplo.com') {
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
      return { id: crypto.randomUUID(), nome: dados.nome, sobrenome: dados.sobrenome, email };
    },
  };
}
