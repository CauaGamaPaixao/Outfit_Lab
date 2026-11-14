import type { Categoria, Modelagem } from './types';

/**
 * Categorias dos chips (Figma 8:761). A taxonomia final é a [EM ABERTO] EA-04:
 * quando fechar, só este arquivo muda.
 */
export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: 'parte-de-cima', label: 'Parte de cima' },
  { value: 'parte-de-baixo', label: 'Parte de baixo' },
  { value: 'calcados', label: 'Calçados' },
  { value: 'terceira-peca', label: 'Terceira peça' },
  { value: 'peca-unica', label: 'Peça única' },
  { value: 'acessorios', label: 'Acessórios' },
];

export const MODELAGENS: { value: Modelagem; label: string }[] = [
  { value: 'slim', label: 'Slim' },
  { value: 'regular', label: 'Regular' },
  { value: 'oversized', label: 'Oversized' },
  { value: 'wide', label: 'Wide' },
  { value: 'cropped', label: 'Cropped' },
];

export function rotuloDaCategoria(categoria: Categoria): string {
  return CATEGORIAS.find((c) => c.value === categoria)?.label ?? categoria;
}
