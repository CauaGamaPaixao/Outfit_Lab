import { describe, expect, it } from 'vitest';
import {
  categoriaValida,
  contarPorCategoria,
  coresDisponiveis,
  filtrarPecas,
  haFiltroAtivo,
  modelagemValida,
  normalizar,
  SEM_FILTROS,
  textoDaContagem,
} from './filtros';
import { PECAS_INICIAIS } from './dados/pecasIniciais';

const todas = PECAS_INICIAIS;
const nomes = (f: Partial<typeof SEM_FILTROS>) =>
  filtrarPecas(todas, { ...SEM_FILTROS, ...f }).map((p) => p.name);

describe('normalizar', () => {
  it('ignora maiúsculas, acentos e espaços nas pontas', () => {
    expect(normalizar('  Ateliê NORTE ')).toBe(
      'ateliê norte'.normalize('NFD').replace(/\p{Diacritic}/gu, ''),
    );
    expect(normalizar('Calça')).toBe('calca');
  });
});

describe('filtrarPecas', () => {
  it('sem filtros devolve tudo, na ordem do catálogo', () => {
    expect(filtrarPecas(todas, SEM_FILTROS)).toEqual(todas);
    expect(todas).toHaveLength(12);
  });

  it('busca por nome, sem diferenciar maiúsculas nem acentos', () => {
    expect(nomes({ busca: 'CALCA' })).toEqual(['Calça reta', 'Calça de sarja']);
    expect(nomes({ busca: 'tenis' })).toEqual(['Tênis urbano', 'Tênis casual']);
  });

  it('busca por marca', () => {
    expect(nomes({ busca: 'atelie' })).toEqual(['Blazer de linho', 'Bolsa de ombro']);
  });

  it('filtra por categoria', () => {
    expect(nomes({ categoria: 'calcados' })).toEqual(['Tênis urbano', 'Tênis casual']);
    expect(nomes({ categoria: 'acessorios' })).toEqual(['Bolsa de ombro']);
  });

  it('filtra por modelagem (peças sem modelagem ficam de fora)', () => {
    expect(nomes({ modelagem: 'oversized' })).toEqual(['Camiseta ampla', 'Jaqueta utilitária']);
  });

  it('filtra por cor, considerando as secundárias', () => {
    expect(nomes({ cor: 'Preto' })).toEqual(['Camiseta ampla', 'Bolsa de ombro', 'Tênis casual']);
    expect(nomes({ cor: 'cinza' })).toEqual(['Tênis urbano', 'Blusa de malha']);
  });

  it('combina todos os filtros com E', () => {
    expect(nomes({ busca: 'camiseta', categoria: 'parte-de-cima', modelagem: 'slim' })).toEqual([
      'Camiseta essencial',
    ]);
    expect(nomes({ busca: 'calça', cor: 'Bege' })).toEqual(['Calça de sarja']);
    expect(nomes({ busca: 'camiseta', categoria: 'calcados' })).toEqual([]);
  });
});

describe('contarPorCategoria', () => {
  it('sem filtros conta todas as peças e cada categoria', () => {
    const c = contarPorCategoria(todas, SEM_FILTROS);
    expect(c).toMatchObject({
      todas: 12,
      'parte-de-cima': 3,
      'parte-de-baixo': 3,
      calcados: 2,
      'terceira-peca': 2,
      'peca-unica': 1,
      acessorios: 1,
    });
  });

  it('considera a busca, mas não a própria categoria selecionada', () => {
    const c = contarPorCategoria(todas, { ...SEM_FILTROS, busca: 'ateliê', categoria: 'calcados' });
    expect(c.todas).toBe(2);
    expect(c['terceira-peca']).toBe(1);
    expect(c.acessorios).toBe(1);
    expect(c.calcados).toBe(0);
  });
});

describe('coresDisponiveis', () => {
  it('lista cada cor uma vez, na ordem em que aparece', () => {
    const nomesDasCores = coresDisponiveis(todas).map((c) => c.name);
    expect(nomesDasCores).toEqual([
      'Off-white',
      'Grafite',
      'Branco',
      'Cinza',
      'Areia',
      'Preto',
      'Azul',
      'Taupe',
      'Caramelo',
      'Oliva',
      'Bege',
    ]);
  });
});

describe('haFiltroAtivo e valores da URL', () => {
  it('detecta filtro ativo (busca só com espaços não conta)', () => {
    expect(haFiltroAtivo(SEM_FILTROS)).toBe(false);
    expect(haFiltroAtivo({ ...SEM_FILTROS, busca: '   ' })).toBe(false);
    expect(haFiltroAtivo({ ...SEM_FILTROS, cor: 'Azul' })).toBe(true);
  });

  it('descarta categoria e modelagem desconhecidas', () => {
    expect(categoriaValida('calcados')).toBe('calcados');
    expect(categoriaValida('qualquer')).toBe('');
    expect(categoriaValida(null)).toBe('');
    expect(modelagemValida('wide')).toBe('wide');
    expect(modelagemValida('xyz')).toBe('');
  });
});

describe('textoDaContagem', () => {
  it('usa singular, plural e "m de n"', () => {
    expect(textoDaContagem(12, 12, false)).toBe('12 peças');
    expect(textoDaContagem(1, 1, false)).toBe('1 peça');
    expect(textoDaContagem(5, 12, true)).toBe('5 de 12 peças');
  });
});
