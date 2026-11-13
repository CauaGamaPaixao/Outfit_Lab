import { useMutation } from '@tanstack/react-query';
import { authApi, type CadastroRequest, type UsuarioResponse } from '../api';
import type { ApiError } from '../../../lib/apiError';

export function useCadastro() {
  return useMutation<UsuarioResponse, ApiError, CadastroRequest>({
    mutationFn: (dados) => authApi.cadastrar(dados),
  });
}
