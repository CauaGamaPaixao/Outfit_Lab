import { CATEGORIAS, MODELAGENS } from './categorias';
import type { Categoria, Modelagem, Piece } from './types';

export type Filtros = {
  busca: string;
  categoria: Categoria | '';
  modelagem: Modelagem | '';
  /** Nome da cor (dominante ou secundária). */
  cor: string;
};

export const SEM_FILTROS: Filtros = { busca: '', categoria: '', modelagem: '', cor: '' };

/** Sem maiúsculas, sem acentos e sem espaços nas pontas (spec 3.2). */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

export function haFiltroAtivo(f: Filtros): boolean {
  return normalizar(f.busca) !== '' || f.categoria !== '' || f.modelagem !== '' || f.cor !== '';
}

function combinaComBusca(peca: Piece, busca: string): boolean {
  const termo = normalizar(busca);
  if (termo === '') return true;
  return normalizar(`${peca.name} ${peca.brand ?? ''}`).includes(termo);
}

function combinaComCor(peca: Piece, cor: string): boolean {
  return cor === '' || peca.colors.some((c) => normalizar(c.name) === normalizar(cor));
}

/** Os filtros combinam com E: busca e categoria e modelagem e cor (spec 3.2). */
export function filtrarPecas(pecas: Piece[], f: Filtros): Piece[] {
  return pecas.filter(
    (p) =>
      combinaComBusca(p, f.busca) &&
      (f.categoria === '' || p.category === f.categoria) &&
      (f.modelagem === '' || p.fit === f.modelagem) &&
      combinaComCor(p, f.cor),
  );
}

/** Contagem dos chips: considera busca, modelagem e cor, mas não a própria categoria. */
export function contarPorCategoria(
  pecas: Piece[],
  f: Filtros,
): Record<Categoria | 'todas', number> {
  const base = filtrarPecas(pecas, { ...f, categoria: '' });
  const contagem = { todas: base.length } as Record<Categoria | 'todas', number>;
  for (const { value } of CATEGORIAS) {
    contagem[value] = base.filter((p) => p.category === value).length;
  }
  return contagem;
}

/** Cores presentes no guarda-roupa, na ordem em que aparecem, sem repetir. */
export function coresDisponiveis(pecas: Piece[]): { name: string; hex: string }[] {
  const vistas = new Map<string, { name: string; hex: string }>();
  for (const peca of pecas) {
    for (const cor of peca.colors) {
      const chave = normalizar(cor.name);
      if (!vistas.has(chave)) vistas.set(chave, { name: cor.name, hex: cor.hex });
    }
  }
  return [...vistas.values()];
}

/** Lê um valor da URL e só o aceita se for conhecido (evita estado inválido por link editado). */
export function categoriaValida(v: string | null): Categoria | '' {
  return CATEGORIAS.some((c) => c.value === v) ? (v as Categoria) : '';
}

export function modelagemValida(v: string | null): Modelagem | '' {
  return MODELAGENS.some((m) => m.value === v) ? (v as Modelagem) : '';
}

/** "12 peças", "1 peça" e, com filtro, "5 de 12 peças" (spec 3.1). */
export function textoDaContagem(visiveis: number, total: number, filtrando: boolean): string {
  if (filtrando) return `${visiveis} de ${total} ${total === 1 ? 'peça' : 'peças'}`;
  return `${total} ${total === 1 ? 'peça' : 'peças'}`;
}
