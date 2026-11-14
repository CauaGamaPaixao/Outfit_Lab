import { useQuery } from '@tanstack/react-query';
import { useSessao } from '../../auth/hooks/useSessao';
import { pecasApi } from '../api';
import type { ApiError } from '../../../lib/apiError';
import type { Piece } from '../types';

/** Peças do usuário autenticado. A chave inclui o usuário: trocar de conta não reaproveita o cache. */
export function usePecas() {
  const { data: usuario } = useSessao();
  return useQuery<Piece[], ApiError>({
    queryKey: ['pecas', usuario?.id ?? null],
    queryFn: () => pecasApi.listar(),
    enabled: Boolean(usuario),
    retry: false,
  });
}
