import { PECAS_INICIAIS } from '../dados/pecasIniciais';
import type { Piece } from '../types';
import type { PecasApi } from './types';

/**
 * API simulada: devolve o catálogo de teste (as 12 peças do Figma). Sem backend não há isolamento
 * por usuário (regra 1): todo mundo vê as mesmas peças.
 */
export function createMockPecasApi(delayMs = 700, pecas: Piece[] = PECAS_INICIAIS): PecasApi {
  return {
    async listar() {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return pecas;
    },
  };
}
