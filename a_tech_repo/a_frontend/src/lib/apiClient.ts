import { ApiError, toApiError } from './apiError';

/**
 * Cliente HTTP único da aplicação.
 * - Mesma origem (proxy do Vite no dev; Spring Boot servindo o build em produção — D-30).
 * - Sessão em cookie HttpOnly: `credentials: 'include'` (D-31).
 * - CSRF do Spring Security (CookieCsrfTokenRepository): lê o cookie XSRF-TOKEN e envia
 *   o header X-XSRF-TOKEN em toda requisição que altera estado.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';
const CSRF_ENDPOINT = '/api/auth/csrf';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
};

export function readCookie(name: string): string | null {
  const match = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

/** Garante o cookie CSRF antes da primeira escrita (o Spring o define num GET). */
async function ensureCsrfToken(): Promise<string | null> {
  const existing = readCookie(CSRF_COOKIE);
  if (existing) return existing;
  try {
    await fetch(`${BASE_URL}${CSRF_ENDPOINT}`, { credentials: 'include' });
  } catch {
    // Sem rede: a requisição principal vai falhar e reportar ERRO_DE_REDE.
  }
  return readCookie(CSRF_COOKIE);
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (method !== 'GET') {
    const token = await ensureCsrfToken();
    if (token) headers[CSRF_HEADER] = token;
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal,
    });
  } catch {
    throw new ApiError({
      status: 0,
      codigo: 'ERRO_DE_REDE',
      mensagem: 'Não foi possível conectar ao servidor.',
    });
  }

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null);
    throw toApiError(response.status, data);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
