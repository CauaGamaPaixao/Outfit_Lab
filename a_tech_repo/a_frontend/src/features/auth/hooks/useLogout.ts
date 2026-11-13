import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api';
import type { ApiError } from '../../../lib/apiError';
import { SESSAO_KEY } from './useSessao';

export function useLogout() {
  const client = useQueryClient();
  return useMutation<void, ApiError>({
    mutationFn: () => authApi.sair(),
    onSuccess: () => client.setQueryData(SESSAO_KEY, null),
  });
}
