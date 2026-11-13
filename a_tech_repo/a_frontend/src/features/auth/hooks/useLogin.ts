import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, type LoginRequest, type UsuarioResponse } from '../api';
import type { ApiError } from '../../../lib/apiError';
import { SESSAO_KEY } from './useSessao';

export function useLogin() {
  const client = useQueryClient();
  return useMutation<UsuarioResponse, ApiError, LoginRequest>({
    mutationFn: (dados) => authApi.login(dados),
    onSuccess: (usuario) => client.setQueryData(SESSAO_KEY, usuario),
  });
}
