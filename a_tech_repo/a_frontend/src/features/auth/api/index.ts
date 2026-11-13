import { httpAuthApi } from './httpAuthApi';
import { createMockAuthApi } from './mockAuthApi';
import type { AuthApi } from './types';

/** VITE_API_MOCK=false usa o Spring Boot; qualquer outro valor (ou ausente) usa a simulação. */
export const usarMock = import.meta.env.VITE_API_MOCK !== 'false';

export const authApi: AuthApi = usarMock
  ? createMockAuthApi(import.meta.env.MODE === 'test' ? 0 : 1200)
  : httpAuthApi;

export type { AuthApi, CadastroRequest, UsuarioResponse } from './types';
