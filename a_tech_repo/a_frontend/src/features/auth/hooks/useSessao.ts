import { useQuery } from '@tanstack/react-query';
import { authApi, type UsuarioResponse } from '../api';
import type { ApiError } from '../../../lib/apiError';

export const SESSAO_KEY = ['sessao'] as const;

/** Usuário autenticado (ou null). Carregado uma vez; login, cadastro e logout atualizam o cache. */
export function useSessao() {
  return useQuery<UsuarioResponse | null, ApiError>({
    queryKey: SESSAO_KEY,
    queryFn: () => authApi.sessaoAtual(),
    staleTime: Infinity,
    retry: false,
  });
}
