import { apiRequest } from '../../../lib/apiClient';
import type { PecasApi } from './types';

export const httpPecasApi: PecasApi = {
  listar: () => apiRequest('/api/pecas'),
};
