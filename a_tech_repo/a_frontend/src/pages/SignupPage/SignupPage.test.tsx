import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { routes } from '../../app/routes';
import { MSG } from '../../features/auth/signupSchema';

function renderCadastro() {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const router = createMemoryRouter(routes, { initialEntries: ['/cadastro'] });
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return { user: userEvent.setup(), router };
}

async function preencher(
  user: ReturnType<typeof userEvent.setup>,
  dados: Partial<Record<'nome' | 'sobrenome' | 'email' | 'senha' | 'confirmar', string>> = {},
) {
  const v = {
    nome: 'Ana',
    sobrenome: 'Souza',
    email: 'ana@exemplo.com',
    senha: 'Guarda2026',
    confirmar: 'Guarda2026',
    ...dados,
  };
  await user.type(screen.getByLabelText('Nome'), v.nome);
  await user.type(screen.getByLabelText('Sobrenome'), v.sobrenome);
  await user.type(screen.getByLabelText('E-mail'), v.email);
  await user.type(screen.getByLabelText('Senha'), v.senha);
  await user.type(screen.getByLabelText('Confirmar senha'), v.confirmar);
  await user.click(screen.getByRole('checkbox'));
}

const criarConta = () => screen.getByRole('button', { name: 'Criar conta' });

describe('TELA-02 Cadastro', () => {
  it('mostra os textos da spec', () => {
    renderCadastro();
    expect(screen.getByRole('heading', { level: 1, name: 'Criar conta' })).toBeInTheDocument();
    expect(screen.getByText('Leva menos de um minuto.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Como funciona' })).toBeInTheDocument();
    expect(screen.getByText('Foto, categoria, cores e modelagem.')).toBeInTheDocument();
  });

  it('valida todos os campos no envio e foca o primeiro inválido', async () => {
    const { user } = renderCadastro();
    await user.click(criarConta());

    expect(await screen.findByText(MSG.nomeVazio)).toBeInTheDocument();
    expect(screen.getByText(MSG.sobrenomeVazio)).toBeInTheDocument();
    expect(screen.getByText(MSG.emailVazio)).toBeInTheDocument();
    expect(screen.getByText(MSG.senhaVazia)).toBeInTheDocument();
    expect(screen.getByText(MSG.confirmacaoVazia)).toBeInTheDocument();
    expect(screen.getByText(MSG.aceite)).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toHaveFocus();
    expect(screen.getByLabelText('Nome')).toHaveAttribute('aria-invalid', 'true');
  });

  it('mostra senhas diferentes mesmo com outros erros', async () => {
    const { user } = renderCadastro();
    await user.type(screen.getByLabelText('Senha'), 'Guarda2026');
    await user.type(screen.getByLabelText('Confirmar senha'), 'Guarda2025');
    await user.click(criarConta());
    expect(await screen.findByText(MSG.senhasDiferentes)).toBeInTheDocument();
  });

  it('atualiza o indicador de força ao digitar', async () => {
    const { user } = renderCadastro();
    const senha = screen.getByLabelText('Senha');
    await user.type(senha, 'abc');
    expect(screen.getByText('Fraca')).toBeInTheDocument();
    await user.clear(senha);
    await user.type(senha, 'Abcdefghij1!');
    expect(screen.getByText('Forte')).toBeInTheDocument();
  });

  it('mostra/oculta a senha', async () => {
    const { user } = renderCadastro();
    const senha = screen.getByLabelText('Senha');
    expect(senha).toHaveAttribute('type', 'password');
    await user.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(senha).toHaveAttribute('type', 'text');
  });

  it('e-mail já cadastrado (409) aparece no campo com link para entrar', async () => {
    const { user } = renderCadastro();
    await preencher(user, { email: 'ja@exemplo.com' });
    await user.click(criarConta());
    const mensagem = await screen.findByText(/Este e-mail já tem uma conta\./);
    expect(within(mensagem).getByRole('link', { name: 'Entrar' })).toHaveAttribute(
      'href',
      '/login',
    );
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true');
  });

  it('e-mail fora do beta (403) mostra alerta no topo', async () => {
    const { user } = renderCadastro();
    await preencher(user, { email: 'bruno@fora.com' });
    await user.click(criarConta());
    const alerta = await screen.findByRole('alert');
    expect(alerta).toHaveTextContent('Este e-mail ainda não está no beta.');
    expect(alerta).toHaveTextContent('Peça um convite ao autor.');
  });

  it('sucesso substitui o formulário e leva ao guarda-roupa', async () => {
    const { user, router } = renderCadastro();
    await preencher(user);
    await user.click(criarConta());

    expect(await screen.findByRole('heading', { name: 'Conta criada!' })).toHaveFocus();
    expect(screen.getByText(/Bem-vindo\(a\), Ana\./)).toBeInTheDocument();
    expect(screen.queryByLabelText('Nome')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Ir para o guarda-roupa' }));
    expect(router.state.location.pathname).toBe('/guarda-roupa');
  });
});
