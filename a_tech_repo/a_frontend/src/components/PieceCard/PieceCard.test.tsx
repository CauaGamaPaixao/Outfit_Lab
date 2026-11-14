import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Piece } from '../../features/pecas/types';
import { PieceCard } from './PieceCard';

const peca: Piece = {
  id: 'x1',
  name: 'Casaco comprido de lã com gola alta e botões dourados enormes',
  brand: 'Marca Teste',
  category: 'terceira-peca',
  colors: [
    { name: 'Preto', hex: '#2A2A2A', dominant: true },
    { name: 'Cinza', hex: '#B4ADA1', dominant: false },
    { name: 'Branco', hex: '#FFFFFF', dominant: false },
    { name: 'Azul', hex: '#91A0AB', dominant: false },
    { name: 'Bege', hex: '#DDD2BF', dominant: false },
  ],
};

describe('PieceCard', () => {
  it('é um article nomeado pelo título, com categoria e marca em texto', () => {
    render(<PieceCard piece={peca} selected={false} onToggleLook={vi.fn()} />);
    const card = screen.getByRole('article', { name: peca.name });
    expect(card).toHaveTextContent('Terceira peça');
    expect(card).toHaveTextContent('Marca Teste');
  });

  it('sem foto, mostra o ícone da categoria (sem <img>)', () => {
    const { container } = render(
      <PieceCard piece={peca} selected={false} onToggleLook={vi.fn()} />,
    );
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('com foto, usa a imagem sem texto alternativo (o nome já está no título)', () => {
    const { container } = render(
      <PieceCard
        piece={{ ...peca, imageUrl: '/foto.svg' }}
        selected={false}
        onToggleLook={vi.fn()}
      />,
    );
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('mostra até 3 bolinhas com nome textual e "+n" para o resto', () => {
    render(<PieceCard piece={peca} selected={false} onToggleLook={vi.fn()} />);
    const cores = screen.getByRole('list', { name: 'Cores' });
    expect(cores.querySelectorAll('li[title]')).toHaveLength(3);
    expect(cores).toHaveTextContent('Preto');
    expect(cores).toHaveTextContent('+2');
  });

  it('o botão do look expõe aria-pressed e dispara onToggleLook', async () => {
    const onToggleLook = vi.fn();
    const { rerender } = render(
      <PieceCard piece={peca} selected={false} onToggleLook={onToggleLook} />,
    );
    const botao = screen.getByRole('button', { name: `Adicionar ${peca.name} ao look` });
    expect(botao).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(botao);
    expect(onToggleLook).toHaveBeenCalledOnce();

    rerender(<PieceCard piece={peca} selected onToggleLook={onToggleLook} />);
    expect(
      screen.getByRole('button', { name: `Adicionar ${peca.name} ao look` }),
    ).toHaveTextContent('✓ No look');
  });
});
