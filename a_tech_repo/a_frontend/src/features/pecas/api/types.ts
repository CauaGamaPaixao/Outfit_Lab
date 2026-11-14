import type { Piece } from '../types';

export interface PecasApi {
  /** GET /api/pecas → 200 Piece[] das peças do usuário autenticado */
  listar(): Promise<Piece[]>;
}
