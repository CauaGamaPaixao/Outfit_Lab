import { apiRequest } from '../../../lib/apiClient';
import type { AuthApi } from './types';

/** Implementação real: chama o Spring Boot via /api. */
export const httpAuthApi: AuthApi = {
  login: (dados) => apiRequest('/api/auth/login', { method: 'POST', body: dados }),
  cadastrar: (dados) => apiRequest('/api/auth/cadastro', { method: 'POST', body: dados }),
};
