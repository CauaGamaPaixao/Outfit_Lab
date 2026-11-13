import { useMutation } from '@tanstack/react-query';
import { authApi, type LoginRequest, type UsuarioResponse } from '../api';
import type { ApiError } from '../../../lib/apiError';

export function useLogin() {
  return useMutation<UsuarioResponse, ApiError, LoginRequest>({
    mutationFn: (dados) => authApi.login(dados),
  });
}
