import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { routes } from '../../app/routes';
import { authApi } from './api';
import { createMockAuthApi } from './api/mockAuthApi';
import { gravarSessao, lerSessao, type Armazenamento } from './storage/authStorage';

const CONTA = {
  nome: 'Ana',
  sobrenome: 'Souza',
  email: 'ana@exemplo.com',
  senha: 'Guarda2026',
  aceiteTermos: true,
} as const;

function renderEm(entrada: string) {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const router = createMemoryRouter(routes, { initialEntries: [entrada] });
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return { user: userEvent.setup(), router };
}

describe('Sessão simulada (rotas protegidas)', () => {
  beforeEach(async () => {
    await authApi.cadastrar(CONTA);
    await authApi.sair();
  });

  it('sem sessão, /guarda-roupa leva ao login', async () => {
    const { router } = renderEm('/guarda-roupa');
    expect(await screen.findByRole('heading', { level: 1, name: 'Entrar' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
  });

  it('login → volta à rota protegida pedida originalmente', async () => {
    const { user, router } = renderEm('/guarda-roupa');
    await user.type(await screen.findByLabelText('E-mail'), CONTA.email);
    await user.type(screen.getByLabelText('Senha'), CONTA.senha);
    await user.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(await screen.findByRole('heading', { name: 'Guarda-roupa' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/guarda-roupa');
    expect(await screen.findByText('Olá, Ana.')).toBeInTheDocument();
  });

  it('com sessão, /login redireciona para o guarda-roupa', async () => {
    await authApi.login({ email: CONTA.email, senha: CONTA.senha, lembrar: false });
    const { router } = renderEm('/login');
    expect(await screen.findByRole('heading', { name: 'Guarda-roupa' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/guarda-roupa');
  });

  it('a sessão sobrevive a um recarregamento (nova árvore de React)', async () => {
    await authApi.login({ email: CONTA.email, senha: CONTA.senha, lembrar: false });
    renderEm('/guarda-roupa');
    expect(await screen.findByRole('heading', { name: 'Guarda-roupa' })).toBeInTheDocument();
  });

  it('Sair encerra a sessão e volta ao login', async () => {
    await authApi.login({ email: CONTA.email, senha: CONTA.senha, lembrar: false });
    const { user, router } = renderEm('/guarda-roupa');
    await user.click(await screen.findByRole('button', { name: 'Sair' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Entrar' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
    expect(await authApi.sessaoAtual()).toBeNull();
  });

  it('cadastro conclui já autenticado e permite abrir o guarda-roupa', async () => {
    const { user, router } = renderEm('/cadastro');
    await user.type(screen.getByLabelText('Nome'), 'Bia');
    await user.type(screen.getByLabelText('Sobrenome'), 'Lima');
    await user.type(screen.getByLabelText('E-mail'), 'bia@exemplo.com');
    await user.type(screen.getByLabelText('Senha'), 'Guarda2026');
    await user.type(screen.getByLabelText('Confirmar senha'), 'Guarda2026');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Criar conta' }));
    await user.click(await screen.findByRole('button', { name: 'Ir para o guarda-roupa' }));
    expect(router.state.location.pathname).toBe('/guarda-roupa');
    expect(await screen.findByText('Olá, Bia.')).toBeInTheDocument();
  });
});

describe('Armazenamento simulado', () => {
  function par(): Armazenamento {
    return { local: window.localStorage, sessao: window.sessionStorage };
  }
  const api = () => createMockAuthApi(0, par());

  it('cadastra, rejeita e-mail repetido e nunca guarda a senha em texto puro', async () => {
    const mock = api();
    await mock.cadastrar(CONTA);
    await expect(mock.cadastrar({ ...CONTA, email: ' ANA@exemplo.com ' })).rejects.toMatchObject({
      status: 409,
      codigo: 'EMAIL_JA_CADASTRADO',
    });
    expect(window.localStorage.getItem('outfitlab.contas')).not.toContain(CONTA.senha);
  });

  it('sem "lembrar", a sessão fica no sessionStorage; com "lembrar", no localStorage', async () => {
    const mock = api();
    await mock.cadastrar(CONTA);
    await mock.login({ email: CONTA.email, senha: CONTA.senha, lembrar: false });
    expect(window.sessionStorage.getItem('outfitlab.sessao')).not.toBeNull();
    expect(window.localStorage.getItem('outfitlab.sessao')).toBeNull();

    await mock.login({ email: CONTA.email, senha: CONTA.senha, lembrar: true });
    expect(window.localStorage.getItem('outfitlab.sessao')).not.toBeNull();
    expect(window.sessionStorage.getItem('outfitlab.sessao')).toBeNull();
  });

  it('"lembrar" vale 30 dias; depois a sessão expira', async () => {
    const mock = api();
    const usuario = await mock.cadastrar(CONTA);
    gravarSessao(par(), usuario.id, true);
    expect(lerSessao(par())).toBe(usuario.id);

    const agora = Date.now();
    const relogio = vi.spyOn(Date, 'now').mockReturnValue(agora + 31 * 24 * 60 * 60 * 1000);
    expect(lerSessao(par())).toBeNull();
    expect(await mock.sessaoAtual()).toBeNull();
    relogio.mockRestore();
  });

  it('sessão de conta que não existe mais é ignorada', async () => {
    gravarSessao(par(), 'id-inexistente', false);
    expect(await api().sessaoAtual()).toBeNull();
  });

  it('login com senha errada ou e-mail desconhecido dá o mesmo 401', async () => {
    const mock = api();
    await mock.cadastrar(CONTA);
    const erro = { status: 401, codigo: 'CREDENCIAIS_INVALIDAS' };
    await expect(
      mock.login({ email: CONTA.email, senha: 'Outra1234', lembrar: false }),
    ).rejects.toMatchObject(erro);
    await expect(
      mock.login({ email: 'ninguem@exemplo.com', senha: CONTA.senha, lembrar: false }),
    ).rejects.toMatchObject(erro);
  });
});
