import { apiRequest } from '../../../lib/apiClient';
import type { AuthApi } from './types';

/** Implementação real: chama o Spring Boot via /api. */
export const httpAuthApi: AuthApi = {
  cadastrar: (dados) => apiRequest('/api/auth/cadastro', { method: 'POST', body: dados }),
};
