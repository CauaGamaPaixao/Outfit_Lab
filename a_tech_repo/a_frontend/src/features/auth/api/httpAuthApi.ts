import { apiRequest } from '../../../lib/apiClient';
import { ApiError } from '../../../lib/apiError';
import type { AuthApi } from './types';

/** Implementação real: chama o Spring Boot via /api. */
export const httpAuthApi: AuthApi = {
  async sessaoAtual() {
    try {
      return await apiRequest('/api/auth/me');
    } catch (erro) {
      if (erro instanceof ApiError && erro.status === 401) return null;
      throw erro;
    }
  },
  sair: () => apiRequest('/api/auth/logout', { method: 'POST' }),
  login: (dados) => apiRequest('/api/auth/login', { method: 'POST', body: dados }),
  cadastrar: (dados) => apiRequest('/api/auth/cadastro', { method: 'POST', body: dados }),
};
