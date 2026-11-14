import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { routes } from '../../app/routes';
import { authApi } from '../../features/auth/api';
import { pecasApi } from '../../features/pecas/api';
import { ApiError } from '../../lib/apiError';

function renderGuardaRoupa(entrada = '/guarda-roupa') {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  const router = createMemoryRouter(routes, { initialEntries: [entrada] });
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return { user: userEvent.setup(), router };
}

/** Nomes das peças exibidas (cada card tem um h3). */
const nomesVisiveis = () =>
  screen.queryAllByRole('heading', { level: 3 }).map((h) => h.textContent);
const aguardarPecas = () => screen.findByRole('heading', { name: 'Camiseta essencial' });
const busca = () => screen.getByRole('searchbox', { name: 'Buscar peça' });

describe('TELA-03 Guarda-roupa', () => {
  // Cadastrar já deixa a sessão aberta (rota protegida).
  beforeEach(async () => {
    await authApi.cadastrar({
      nome: 'Marina',
      sobrenome: 'Oliveira',
      email: 'marina@exemplo.com',
      senha: 'Guarda2026',
      aceiteTermos: true,
    });
  });

  it('mostra cabeçalho, contagem, categorias com contagem e as 12 peças', async () => {
    renderGuardaRoupa();
    await aguardarPecas();
    expect(screen.getByRole('heading', { level: 1, name: 'Guarda-roupa' })).toBeInTheDocument();
    expect(screen.getByText('Coleção pessoal')).toBeInTheDocument();
    expect(screen.getByText('12 peças · Um universo de combinações.')).toBeInTheDocument();
    expect(nomesVisiveis()).toHaveLength(12);
    for (const rotulo of [
      'Todas (12)',
      'Parte de cima (3)',
      'Parte de baixo (3)',
      'Calçados (2)',
      'Terceira peça (2)',
      'Peça única (1)',
      'Acessórios (1)',
    ]) {
      expect(screen.getByRole('button', { name: rotulo })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Todas (12)' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByPlaceholderText('Buscar por nome ou marca')).toBeInTheDocument();
  });

  it('carregando: skeleton com aviso para leitor de tela e sem filtros', async () => {
    vi.spyOn(pecasApi, 'listar').mockReturnValue(new Promise(() => {}));
    renderGuardaRoupa();
    expect(await screen.findByText('Carregando peças…')).toBeInTheDocument();
    expect(document.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it('busca filtra ao digitar, sem diferenciar maiúsculas e acentos, e atualiza contagens', async () => {
    const { user, router } = renderGuardaRoupa();
    await aguardarPecas();
    await user.type(busca(), 'CALCA');

    await waitFor(() => expect(nomesVisiveis()).toEqual(['Calça reta', 'Calça de sarja']));
    expect(screen.getByText('2 de 12 peças · Um universo de combinações.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Todas (2)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Parte de cima (0)' })).toBeInTheDocument();
    await waitFor(() => expect(router.state.location.search).toContain('q=CALCA'));

    await user.clear(busca());
    await user.type(busca(), 'tênis');
    await waitFor(() => expect(nomesVisiveis()).toEqual(['Tênis urbano', 'Tênis casual']));
  });

  it('busca também procura pela marca', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.type(busca(), 'atelie');
    await waitFor(() => expect(nomesVisiveis()).toEqual(['Blazer de linho', 'Bolsa de ombro']));
  });

  it('o "×" limpa a busca', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.type(busca(), 'jeans');
    await waitFor(() => expect(nomesVisiveis()).toEqual(['Jeans reto']));
    await user.click(screen.getByRole('button', { name: 'Limpar busca' }));
    expect(busca()).toHaveValue('');
    await waitFor(() => expect(nomesVisiveis()).toHaveLength(12));
  });

  it('chip de categoria filtra, é seleção única e vai para a URL', async () => {
    const { user, router } = renderGuardaRoupa();
    await aguardarPecas();
    await user.click(screen.getByRole('button', { name: 'Calçados (2)' }));
    expect(nomesVisiveis()).toEqual(['Tênis urbano', 'Tênis casual']);
    expect(screen.getByRole('button', { name: 'Calçados (2)' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Todas (12)' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(router.state.location.search).toContain('cat=calcados');

    await user.click(screen.getByRole('button', { name: 'Todas (12)' }));
    expect(nomesVisiveis()).toHaveLength(12);
    expect(router.state.location.search).not.toContain('cat=');
  });

  it('select de modelagem filtra', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.selectOptions(screen.getByLabelText('Modelagem'), 'oversized');
    expect(nomesVisiveis()).toEqual(['Camiseta ampla', 'Jaqueta utilitária']);
  });

  it('select de cor filtra considerando cores secundárias', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.selectOptions(screen.getByLabelText('Cor'), 'Preto');
    expect(nomesVisiveis()).toEqual(['Camiseta ampla', 'Bolsa de ombro', 'Tênis casual']);
  });

  it('os filtros combinam com E', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.click(screen.getByRole('button', { name: 'Parte de baixo (3)' }));
    await user.selectOptions(screen.getByLabelText('Modelagem'), 'slim');
    expect(nomesVisiveis()).toEqual(['Calça de sarja']);
    await user.type(busca(), 'calça');
    await waitFor(() => expect(nomesVisiveis()).toEqual(['Calça de sarja']));
    expect(screen.getByText('1 de 12 peças · Um universo de combinações.')).toBeInTheDocument();
  });

  it('"Limpar filtros" só aparece com filtro ativo e restaura tudo', async () => {
    const { user, router } = renderGuardaRoupa();
    await aguardarPecas();
    expect(screen.queryByRole('button', { name: 'Limpar filtros' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Calçados (2)' }));
    await user.selectOptions(screen.getByLabelText('Cor'), 'Branco');
    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }));

    expect(nomesVisiveis()).toHaveLength(12);
    expect(screen.getByLabelText('Cor')).toHaveValue('');
    expect(router.state.location.search).toBe('');
    expect(screen.queryByRole('button', { name: 'Limpar filtros' })).not.toBeInTheDocument();
  });

  it('busca sem resultado mostra a mensagem, mantém os filtros e permite limpar', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.type(busca(), 'xyz');

    expect(
      await screen.findByRole('heading', { name: 'Nenhuma peça encontrada' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Nada corresponde a “xyz” com os filtros atuais.')).toBeInTheDocument();
    expect(busca()).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Limpar busca e filtros' }));
    expect(busca()).toHaveValue('');
    await waitFor(() => expect(nomesVisiveis()).toHaveLength(12));
  });

  it('guarda-roupa vazio mostra o convite e esconde os filtros', async () => {
    vi.spyOn(pecasApi, 'listar').mockResolvedValue([]);
    renderGuardaRoupa();
    expect(
      await screen.findByRole('heading', { name: 'Seu guarda-roupa está vazio' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Cadastre sua primeira peça para começar a montar looks.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+ Adicionar primeira peça' })).toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it('erro ao carregar mostra alerta e "Tentar novamente" recarrega', async () => {
    vi.spyOn(pecasApi, 'listar').mockRejectedValueOnce(
      new ApiError({ status: 500, codigo: 'ERRO_INTERNO', mensagem: 'Erro.' }),
    );
    const { user } = renderGuardaRoupa();
    const alerta = await screen.findByRole('alert');
    expect(alerta).toHaveTextContent('Não foi possível carregar suas peças.');

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    await aguardarPecas();
    expect(nomesVisiveis()).toHaveLength(12);
    vi.restoreAllMocks();
  });

  it('a URL inicial já aplica os filtros', async () => {
    renderGuardaRoupa('/guarda-roupa?cat=calcados&q=urbano&fit=lixo');
    await screen.findByRole('heading', { name: 'Tênis urbano' });
    expect(nomesVisiveis()).toEqual(['Tênis urbano']);
    expect(busca()).toHaveValue('urbano');
    expect(screen.getByLabelText('Modelagem')).toHaveValue('');
  });

  it('"Adicionar peça" está presente e não reage', async () => {
    const { user, router } = renderGuardaRoupa();
    await aguardarPecas();
    // Fica oculto abaixo de 1024 px (o jsdom não avalia media queries), então busca incluindo ocultos.
    const botao = screen.getByRole('button', { name: '+ Adicionar peça', hidden: true });
    await user.click(botao);
    expect(router.state.location.pathname).toBe('/guarda-roupa');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('TELA-03 Seleção para o look', () => {
  beforeEach(async () => {
    await authApi.cadastrar({
      nome: 'Marina',
      sobrenome: 'Oliveira',
      email: 'marina@exemplo.com',
      senha: 'Guarda2026',
      aceiteTermos: true,
    });
  });

  const alternar = (nome: string) =>
    screen.getByRole('button', { name: `Adicionar ${nome} ao look` });

  it('alterna a peça, mostra a barra com a contagem e permite limpar', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    expect(
      screen.queryByRole('complementary', { name: 'Look em montagem' }),
    ).not.toBeInTheDocument();

    await user.click(alternar('Camiseta essencial'));
    expect(alternar('Camiseta essencial')).toHaveAttribute('aria-pressed', 'true');
    expect(alternar('Camiseta essencial')).toHaveTextContent('✓ No look');
    const barra = screen.getByRole('complementary', { name: 'Look em montagem' });
    expect(within(barra).getByText(/peça no look/)).toBeInTheDocument();

    await user.click(alternar('Calça reta'));
    expect(within(barra).getByText(/peças no look/)).toHaveTextContent('2 peças no look');

    await user.click(alternar('Calça reta'));
    expect(alternar('Calça reta')).toHaveAttribute('aria-pressed', 'false');

    await user.click(within(barra).getByRole('button', { name: 'Limpar' }));
    expect(
      screen.queryByRole('complementary', { name: 'Look em montagem' }),
    ).not.toBeInTheDocument();
    expect(alternar('Camiseta essencial')).toHaveAttribute('aria-pressed', 'false');
  });

  it('a seleção persiste ao trocar de filtro e ao recarregar a tela', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.click(alternar('Camiseta essencial'));
    await user.click(screen.getByRole('button', { name: /^Calçados/ }));
    expect(screen.getByRole('complementary', { name: 'Look em montagem' })).toHaveTextContent(
      '1 peça no look',
    );
    await user.click(screen.getByRole('button', { name: /^Todas/ }));
    expect(alternar('Camiseta essencial')).toHaveAttribute('aria-pressed', 'true');
  });

  it('"Montar look" leva ao montador com os ids das peças', async () => {
    const { user, router } = renderGuardaRoupa();
    await aguardarPecas();
    await user.click(alternar('Camiseta essencial'));
    await user.click(alternar('Tênis casual'));
    await user.click(screen.getByRole('button', { name: 'Montar look →' }));
    expect(router.state.location.pathname).toBe('/looks/novo');
    expect(router.state.location.search).toBe('?pecas=p01,p12');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Montar look' }),
    ).toBeInTheDocument();
  });

  it('anuncia a contagem em região aria-live', async () => {
    const { user } = renderGuardaRoupa();
    await aguardarPecas();
    await user.click(alternar('Jeans reto'));
    const regiao = document.querySelector('[aria-live="polite"]');
    expect(regiao).toHaveTextContent('1 peça no look');
  });
});

describe('Navegação do app', () => {
  beforeEach(async () => {
    await authApi.cadastrar({
      nome: 'Marina',
      sobrenome: 'Oliveira',
      email: 'marina@exemplo.com',
      senha: 'Guarda2026',
      aceiteTermos: true,
    });
  });

  it('marca o item ativo e navega entre as telas', async () => {
    const { user, router } = renderGuardaRoupa();
    await aguardarPecas();
    const nav = screen.getByRole('navigation', { name: 'Principal' });
    expect(within(nav).getByRole('link', { name: 'Peças' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    await user.click(within(nav).getByRole('link', { name: 'Perfil' }));
    expect(router.state.location.pathname).toBe('/perfil');
    expect(await screen.findByRole('heading', { level: 1, name: 'Perfil' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', {
        name: 'Perfil',
      }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('"Sair" encerra a sessão', async () => {
    const { user, router } = renderGuardaRoupa();
    await aguardarPecas();
    expect(screen.getByText('Olá, Marina')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Sair' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Entrar' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
  });
});
