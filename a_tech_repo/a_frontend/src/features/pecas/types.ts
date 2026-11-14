/** Tipo provisório da peça (spec TELA-03, seção 7); a versão final vem com o backend. */
export type Categoria =
  'parte-de-cima' | 'parte-de-baixo' | 'calcados' | 'terceira-peca' | 'peca-unica' | 'acessorios';

export type Modelagem = 'slim' | 'regular' | 'oversized' | 'wide' | 'cropped';

export type CorDaPeca = { name: string; hex: string; dominant: boolean };

export type Piece = {
  id: string;
  name: string;
  brand?: string;
  category: Categoria;
  fit?: Modelagem;
  colors: CorDaPeca[];
  imageUrl?: string;
};
