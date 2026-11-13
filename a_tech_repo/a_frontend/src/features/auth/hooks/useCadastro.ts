import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, type CadastroRequest, type UsuarioResponse } from '../api';
import type { ApiError } from '../../../lib/apiError';
import { SESSAO_KEY } from './useSessao';

export function useCadastro() {
  const client = useQueryClient();
  return useMutation<UsuarioResponse, ApiError, CadastroRequest>({
    mutationFn: (dados) => authApi.cadastrar(dados),
    // Quem acabou de se cadastrar já está autenticado.
    onSuccess: (usuario) => client.setQueryData(SESSAO_KEY, usuario),
  });
}
