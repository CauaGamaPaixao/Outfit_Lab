import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authApi } from '../../features/auth/api';
import { routes } from '../../app/routes';
import { LOGIN_MSG } from '../../features/auth/loginSchema';

function renderLogin(entry: string | { pathname: string; state?: unknown } = '/login') {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const router = createMemoryRouter(routes, { initialEntries: [entry] });
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return { user: userEvent.setup(), router };
}

type User = ReturnType<typeof userEvent.setup>;

async function preencher(user: User, email: string, senha = 'Guarda2026') {
  if (email) await user.type(screen.getByLabelText('E-mail'), email);
  if (senha) await user.type(screen.getByLabelText('Senha'), senha);
}

const entrar = () => screen.getByRole('button', { name: 'Entrar' });

describe('TELA-01 Login', () => {
  // Conta real do armazenamento simulado (o login só aceita contas cadastradas).
  beforeEach(async () => {
    await authApi.cadastrar({
      nome: 'Ana',
      sobrenome: 'Souza',
      email: 'ana@exemplo.com',
      senha: 'Guarda2026',
      aceiteTermos: true,
    });
    await authApi.sair();
  });

  it('mostra os textos da spec e do Figma', () => {
    renderLogin();
    expect(screen.getByRole('heading', { level: 1, name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByText('Bem-vindo de volta')).toBeInTheDocument();
    expect(screen.getByText('Seu estilo, em um só lugar.')).toBeInTheDocument();
    // jsdom não casa a media query de 1024 px: aparece o cabeçalho compacto (mobile).
    expect(screen.getByText('Organize. Monte. Analise. Evolua.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Criar conta' })).toHaveAttribute('href', '/cadastro');
    expect(screen.getByRole('link', { name: 'Termos de uso' })).toHaveAttribute('href', '/termos');
    expect(screen.getByRole('link', { name: 'Privacidade' })).toHaveAttribute(
      'href',
      '/privacidade',
    );
  });

  it('configura os campos como a spec (autocomplete, tipo, limites)', () => {
    renderLogin();
    const email = screen.getByLabelText('E-mail');
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('autocomplete', 'email');
    expect(email).toHaveAttribute('inputmode', 'email');
    expect(email).toHaveAttribute('maxlength', '254');
    const senha = screen.getByLabelText('Senha');
    expect(senha).toHaveAttribute('autocomplete', 'current-password');
    expect(senha).toHaveAttribute('maxlength', '72');
    expect(screen.getByRole('checkbox', { name: 'Lembrar de mim' })).not.toBeChecked();
  });

  it('valida no envio e foca o primeiro campo inválido', async () => {
    const { user } = renderLogin();
    await user.click(entrar());
    expect(await screen.findByText(LOGIN_MSG.emailVazio)).toBeInTheDocument();
    expect(screen.getByText(LOGIN_MSG.senhaVazia)).toBeInTheDocument();
    const email = screen.getByLabelText('E-mail');
    expect(email).toHaveFocus();
    expect(email).toHaveAttribute('aria-invalid', 'true');
  });

  it('mostra e-mail inválido e revalida ao sair do campo depois do primeiro envio', async () => {
    const { user } = renderLogin();
    await preencher(user, 'ana@', '');
    await user.click(entrar());
    expect(await screen.findByText(LOGIN_MSG.emailInvalido)).toBeInTheDocument();

    const email = screen.getByLabelText('E-mail');
    await user.type(email, 'exemplo.com');
    await user.tab();
    expect(screen.queryByText(LOGIN_MSG.emailInvalido)).not.toBeInTheDocument();
  });

  it('mostra/oculta a senha', async () => {
    const { user } = renderLogin();
    const senha = screen.getByLabelText('Senha');
    await user.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(senha).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Ocultar senha' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('segue a ordem de tabulação da spec', async () => {
    const { user } = renderLogin();
    await user.click(screen.getByLabelText('E-mail'));
    const ordem = [
      'Senha',
      'Mostrar senha',
      'Lembrar de mim',
      'Esqueci minha senha',
      'Entrar',
      'Criar conta',
    ];
    for (const nome of ordem) {
      await user.tab();
      expect(document.activeElement).toHaveAccessibleName(nome);
    }
  });

  it('Enter em um campo envia o formulário', async () => {
    const { user } = renderLogin();
    await user.type(screen.getByLabelText('E-mail'), 'ana@exemplo.com');
    await user.type(screen.getByLabelText('Senha'), 'Guarda2026{Enter}');
    await screen.findByRole('heading', { name: 'Guarda-roupa' });
  });

  it('carregando: campos e botão desabilitados, aria-busy e sem duplo envio', async () => {
    const login = vi.spyOn(authApi, 'login').mockReturnValue(new Promise(() => {}));
    const { user } = renderLogin();
    await preencher(user, 'ana@exemplo.com');
    await user.click(entrar());

    const botao = await screen.findByRole('button', { name: 'Entrando…' });
    expect(botao).toBeDisabled();
    expect(botao).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByLabelText('E-mail')).toBeDisabled();
    expect(screen.getByLabelText('Senha')).toBeDisabled();

    await user.click(botao);
    expect(login).toHaveBeenCalledTimes(1);
    login.mockRestore();
  });

  it('credenciais inválidas (401): alerta com foco, e-mail mantido e senha limpa', async () => {
    const { user } = renderLogin();
    await preencher(user, 'erro@exemplo.com');
    await user.click(entrar());

    const alerta = await screen.findByRole('alert');
    expect(alerta).toHaveTextContent('E-mail ou senha inválidos.');
    expect(alerta).toHaveTextContent('Confira os dados e tente novamente.');
    expect(alerta).toHaveFocus();
    expect(screen.getByLabelText('E-mail')).toHaveValue('erro@exemplo.com');
    expect(screen.getByLabelText('Senha')).toHaveValue('');
  });

  it('senha errada para um e-mail cadastrado também dá a mensagem genérica (401)', async () => {
    const { user } = renderLogin();
    await preencher(user, 'ana@exemplo.com', 'SenhaErrada1');
    await user.click(entrar());
    const alerta = await screen.findByRole('alert');
    expect(alerta).toHaveTextContent('E-mail ou senha inválidos.');
    expect(screen.getByLabelText('E-mail')).toHaveValue('ana@exemplo.com');
    expect(screen.getByLabelText('Senha')).toHaveValue('');
  });

  it('muitas tentativas (429) mostra o alerta da spec', async () => {
    const { user } = renderLogin();
    await preencher(user, 'limite@exemplo.com');
    await user.click(entrar());
    const alerta = await screen.findByRole('alert');
    expect(alerta).toHaveTextContent('Muitas tentativas.');
    expect(alerta).toHaveTextContent('Aguarde alguns minutos e tente de novo.');
  });

  it('falha do servidor (5xx) mostra o alerta da spec', async () => {
    const { user } = renderLogin();
    await preencher(user, 'falha@exemplo.com');
    await user.click(entrar());
    const alerta = await screen.findByRole('alert');
    expect(alerta).toHaveTextContent('Não foi possível entrar agora.');
    expect(alerta).toHaveTextContent('Verifique sua conexão e tente novamente.');
  });

  it('sucesso redireciona para o guarda-roupa sem mensagem', async () => {
    const { user, router } = renderLogin();
    await preencher(user, 'ana@exemplo.com');
    await user.click(entrar());
    await screen.findByRole('heading', { name: 'Guarda-roupa' });
    expect(router.state.location.pathname).toBe('/guarda-roupa');
  });

  it('sucesso volta para a rota protegida de origem', async () => {
    const { user, router } = renderLogin({ pathname: '/login', state: { from: '/termos' } });
    await preencher(user, 'ana@exemplo.com');
    await user.click(entrar());
    await screen.findByRole('heading', { name: 'Termos de uso' });
    expect(router.state.location.pathname).toBe('/termos');
  });

  it('ignora destino externo vindo do estado de navegação', async () => {
    const { user, router } = renderLogin({ pathname: '/login', state: { from: '//outro.site' } });
    await preencher(user, 'ana@exemplo.com');
    await user.click(entrar());
    await screen.findByRole('heading', { name: 'Guarda-roupa' });
    expect(router.state.location.pathname).toBe('/guarda-roupa');
  });

  it('"Esqueci minha senha" abre o modal do plano B e o foco volta ao link', async () => {
    const { user } = renderLogin();
    const gatilho = screen.getByRole('button', { name: 'Esqueci minha senha' });
    await user.click(gatilho);

    const modal = screen.getByRole('dialog', { name: 'Esqueceu a senha?' });
    expect(modal).toHaveTextContent('Durante o beta, a redefinição é feita pelo autor.');
    expect(screen.getByRole('button', { name: 'Entendi' })).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Entendi' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(gatilho).toHaveFocus();
  });

  it('Esc fecha o modal', async () => {
    const { user } = renderLogin();
    await user.click(screen.getByRole('button', { name: 'Esqueci minha senha' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
