import { ApiError } from '../../../lib/apiError';
import type { AuthApi } from './types';

/**
 * API simulada (VITE_API_MOCK=true): mesma interface e mesmos erros do backend,
 * para a tela funcionar antes do Spring Boot existir.
 * - ja@exemplo.com  → 409 EMAIL_JA_CADASTRADO
 * - *@fora.com      → 403 EMAIL_FORA_DO_BETA
 * - demais          → 201
 */
export function createMockAuthApi(delayMs = 1200): AuthApi {
  const wait = () => new Promise((resolve) => setTimeout(resolve, delayMs));

  return {
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
