/**
 * Formato único de erro da API (contrato provisório, formalizado no PROMPT-008 / OpenAPI).
 * O GlobalExceptionHandler do Spring Boot deve responder sempre neste formato.
 */
export type ApiErrorCode =
  | 'VALIDACAO'
  | 'EMAIL_FORA_DO_BETA'
  | 'EMAIL_JA_CADASTRADO'
  | 'NAO_AUTENTICADO'
  | 'ERRO_INTERNO'
  | 'ERRO_DE_REDE'
  | (string & {});

export type ApiFieldError = { campo: string; mensagem: string };

export type ApiErrorBody = {
  status: number;
  codigo: ApiErrorCode;
  mensagem: string;
  campos?: ApiFieldError[];
};

export class ApiError extends Error {
  readonly status: number;
  readonly codigo: ApiErrorCode;
  readonly campos: ApiFieldError[];

  constructor(body: ApiErrorBody) {
    super(body.mensagem);
    this.name = 'ApiError';
    this.status = body.status;
    this.codigo = body.codigo;
    this.campos = body.campos ?? [];
  }
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ApiErrorBody).codigo === 'string' &&
    typeof (value as ApiErrorBody).mensagem === 'string'
  );
}

/** Converte qualquer resposta de erro (inclusive HTML de proxy ou corpo vazio) em ApiError. */
export function toApiError(status: number, body: unknown): ApiError {
  if (isApiErrorBody(body)) return new ApiError({ ...body, status });
  return new ApiError({
    status,
    codigo: status >= 500 ? 'ERRO_INTERNO' : 'ERRO_DESCONHECIDO',
    mensagem: 'Resposta inesperada do servidor.',
  });
}
