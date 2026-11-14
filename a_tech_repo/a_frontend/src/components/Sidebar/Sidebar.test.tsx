import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar';

const usuario = { id: '1', nome: 'Marina', sobrenome: 'Oliveira', email: 'marina@exemplo.com' };

function renderSidebar(active: Parameters<typeof Sidebar>[0]['active'], onLogout = vi.fn()) {
  render(
    <MemoryRouter>
      <Sidebar active={active} user={usuario} onLogout={onLogout} />
    </MemoryRouter>,
  );
  return onLogout;
}

describe('Sidebar', () => {
  it('lista os cinco destinos e marca só o ativo com aria-current', () => {
    renderSidebar('guarda-roupa');
    const nav = screen.getByRole('navigation', { name: 'Principal' });
    const links = nav.querySelectorAll('a');
    expect([...links].map((a) => a.textContent)).toEqual([
      'Início',
      'Guarda-roupa',
      'Montar look',
      'Looks salvos',
      'Perfil',
    ]);
    expect([...links].filter((a) => a.getAttribute('aria-current') === 'page')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Guarda-roupa' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Montar look' })).toHaveAttribute(
      'href',
      '/looks/novo',
    );
  });

  it('mostra nome e e-mail do usuário e chama onLogout em "Sair"', async () => {
    const onLogout = renderSidebar('inicio');
    expect(screen.getByText('Marina Oliveira')).toBeInTheDocument();
    expect(screen.getByText('marina@exemplo.com')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Sair' }));
    expect(onLogout).toHaveBeenCalledOnce();
  });
});
