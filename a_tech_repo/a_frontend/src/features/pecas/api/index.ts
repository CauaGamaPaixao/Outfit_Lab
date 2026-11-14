import { usarMock } from '../../auth/api';
import { httpPecasApi } from './httpPecasApi';
import { createMockPecasApi } from './mockPecasApi';
import type { PecasApi } from './types';

export const pecasApi: PecasApi = usarMock
  ? createMockPecasApi(import.meta.env.MODE === 'test' ? 0 : 700)
  : httpPecasApi;

export type { PecasApi } from './types';
