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

export type LoginRequest = {
  email: string;
  senha: string;
  /** "Lembrar de mim": estende a sessão (duração = EA-13, decidida no backend). */
  lembrar: boolean;
};

export interface AuthApi {
  /** GET /api/auth/me → 200 UsuarioResponse | 401 (sem sessão: a implementação devolve null) */
  sessaoAtual(): Promise<UsuarioResponse | null>;
  /** POST /api/auth/logout → 204 */
  sair(): Promise<void>;
  /** POST /api/auth/login → 200 UsuarioResponse | 401 CREDENCIAIS_INVALIDAS | 429 MUITAS_TENTATIVAS */
  login(dados: LoginRequest): Promise<UsuarioResponse>;
  /** POST /api/auth/cadastro → 201 UsuarioResponse (já autenticado) | 400 VALIDACAO | 403 EMAIL_FORA_DO_BETA | 409 EMAIL_JA_CADASTRADO */
  cadastrar(dados: CadastroRequest): Promise<UsuarioResponse>;
}
