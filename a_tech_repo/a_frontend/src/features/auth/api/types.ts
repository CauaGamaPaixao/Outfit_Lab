/**
 * Contrato provisório do cadastro (PROMPT-004). Os nomes dos campos são os mesmos
 * que o backend deve usar no record CadastroRequest / UsuarioResponse do Spring Boot.
 */
export type CadastroRequest = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  aceiteTermos: true;
};

export type UsuarioResponse = {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
};

export interface AuthApi {
  /** POST /api/auth/cadastro → 201 UsuarioResponse | 400 VALIDACAO | 403 EMAIL_FORA_DO_BETA | 409 EMAIL_JA_CADASTRADO */
  cadastrar(dados: CadastroRequest): Promise<UsuarioResponse>;
}
