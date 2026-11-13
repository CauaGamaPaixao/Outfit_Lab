import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from './apiClient';
import { ApiError } from './apiError';

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('apiClient — integração com Spring Security', () => {
  it('envia o cookie de sessão e o header X-XSRF-TOKEN nas escritas', async () => {
    document.cookie = 'XSRF-TOKEN=abc123';
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(201, { id: '1' }));
    vi.stubGlobal('fetch', fetchMock);

    await apiRequest('/api/auth/cadastro', { method: 'POST', body: { nome: 'Ana' } });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/auth/cadastro');
    expect(init.credentials).toBe('include');
    expect((init.headers as Record<string, string>)['X-XSRF-TOKEN']).toBe('abc123');
    expect(init.body).toBe(JSON.stringify({ nome: 'Ana' }));
  });

  it('busca o token CSRF antes da primeira escrita quando não há cookie', async () => {
    const fetchMock = vi
      .fn()
      .mockImplementationOnce(async () => {
        document.cookie = 'XSRF-TOKEN=novo';
        return new Response(null, { status: 204 });
      })
      .mockResolvedValueOnce(jsonResponse(201, { id: '1' }));
    vi.stubGlobal('fetch', fetchMock);

    await apiRequest('/api/auth/cadastro', { method: 'POST', body: {} });

    expect(fetchMock.mock.calls[0]?.[0]).toBe('/api/auth/csrf');
    const init = fetchMock.mock.calls[1]?.[1] as RequestInit;
    expect((init.headers as Record<string, string>)['X-XSRF-TOKEN']).toBe('novo');
  });

  it('converte o formato único de erro em ApiError', async () => {
    document.cookie = 'XSRF-TOKEN=x';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(409, {
          status: 409,
          codigo: 'EMAIL_JA_CADASTRADO',
          mensagem: 'Este e-mail já tem uma conta.',
        }),
      ),
    );

    const erro = await apiRequest('/api/auth/cadastro', { method: 'POST', body: {} }).catch(
      (e: unknown) => e,
    );
    expect(erro).toBeInstanceOf(ApiError);
    expect(erro).toMatchObject({ status: 409, codigo: 'EMAIL_JA_CADASTRADO' });
  });

  it('falha de rede vira ERRO_DE_REDE', async () => {
    document.cookie = 'XSRF-TOKEN=x';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(apiRequest('/api/x', { method: 'POST' })).rejects.toMatchObject({
      codigo: 'ERRO_DE_REDE',
    });
  });
});
