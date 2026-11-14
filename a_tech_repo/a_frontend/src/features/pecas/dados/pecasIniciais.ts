import blazerAreia from '../../../assets/pecas/blazer-areia.svg';
import blusaCinza from '../../../assets/pecas/blusa-cinza.svg';
import bolsaCaramelo from '../../../assets/pecas/bolsa-caramelo.svg';
import calcaBege from '../../../assets/pecas/calca-bege.svg';
import calcaGrafite from '../../../assets/pecas/calca-grafite.svg';
import camisetaOffwhite from '../../../assets/pecas/camiseta-offwhite.svg';
import camisetaPreta from '../../../assets/pecas/camiseta-preta.svg';
import jaquetaOliva from '../../../assets/pecas/jaqueta-oliva.svg';
import jeansAzul from '../../../assets/pecas/jeans-azul.svg';
import tenisBranco from '../../../assets/pecas/tenis-branco.svg';
import tenisPreto from '../../../assets/pecas/tenis-preto.svg';
import vestidoTaupe from '../../../assets/pecas/vestido-taupe.svg';
import type { CorDaPeca, Piece } from '../types';

/** Catálogo de cores (nomes e tons do Figma). O catálogo final é a [EM ABERTO] EA-06. */
const COR = {
  offWhite: { name: 'Off-white', hex: '#EAE7DE' },
  grafite: { name: 'Grafite', hex: '#454A50' },
  branco: { name: 'Branco', hex: '#FFFFFF' },
  areia: { name: 'Areia', hex: '#C9BAA2' },
  preto: { name: 'Preto', hex: '#2A2A2A' },
  azul: { name: 'Azul', hex: '#91A0AB' },
  taupe: { name: 'Taupe', hex: '#B8A895' },
  caramelo: { name: 'Caramelo', hex: '#805C45' },
  oliva: { name: 'Oliva', hex: '#5B6357' },
  cinza: { name: 'Cinza', hex: '#B4ADA1' },
  bege: { name: 'Bege', hex: '#DDD2BF' },
} as const;

const dominante = (c: Omit<CorDaPeca, 'dominant'>): CorDaPeca => ({ ...c, dominant: true });
const secundaria = (c: Omit<CorDaPeca, 'dominant'>): CorDaPeca => ({ ...c, dominant: false });

/**
 * As 12 peças do Figma (frame 8:792). DADOS DE TESTE: a modelagem (`fit`) e as cores
 * secundárias não aparecem no Figma e foram inventadas só para os filtros terem o que filtrar.
 */
export const PECAS_INICIAIS: Piece[] = [
  {
    id: 'p01',
    name: 'Camiseta essencial',
    brand: 'Linha Base',
    category: 'parte-de-cima',
    fit: 'slim',
    colors: [dominante(COR.offWhite)],
    imageUrl: camisetaOffwhite,
  },
  {
    id: 'p02',
    name: 'Calça reta',
    brand: 'Forma Studio',
    category: 'parte-de-baixo',
    fit: 'regular',
    colors: [dominante(COR.grafite)],
    imageUrl: calcaGrafite,
  },
  {
    id: 'p03',
    name: 'Tênis urbano',
    brand: 'Passo Livre',
    category: 'calcados',
    colors: [dominante(COR.branco), secundaria(COR.cinza)],
    imageUrl: tenisBranco,
  },
  {
    id: 'p04',
    name: 'Blazer de linho',
    brand: 'Ateliê Norte',
    category: 'terceira-peca',
    fit: 'regular',
    colors: [dominante(COR.areia)],
    imageUrl: blazerAreia,
  },
  {
    id: 'p05',
    name: 'Camiseta ampla',
    brand: 'Linha Base',
    category: 'parte-de-cima',
    fit: 'oversized',
    colors: [dominante(COR.preto)],
    imageUrl: camisetaPreta,
  },
  {
    id: 'p06',
    name: 'Jeans reto',
    brand: 'Denim Clube',
    category: 'parte-de-baixo',
    fit: 'wide',
    colors: [dominante(COR.azul)],
    imageUrl: jeansAzul,
  },
  {
    id: 'p07',
    name: 'Vestido midi',
    brand: 'Forma Studio',
    category: 'peca-unica',
    fit: 'regular',
    colors: [dominante(COR.taupe)],
    imageUrl: vestidoTaupe,
  },
  {
    id: 'p08',
    name: 'Bolsa de ombro',
    brand: 'Ateliê Norte',
    category: 'acessorios',
    colors: [dominante(COR.caramelo), secundaria(COR.preto)],
    imageUrl: bolsaCaramelo,
  },
  {
    id: 'p09',
    name: 'Jaqueta utilitária',
    brand: 'Rota Urbana',
    category: 'terceira-peca',
    fit: 'oversized',
    colors: [dominante(COR.oliva)],
    imageUrl: jaquetaOliva,
  },
  {
    id: 'p10',
    name: 'Blusa de malha',
    brand: 'Trama Local',
    category: 'parte-de-cima',
    fit: 'cropped',
    colors: [dominante(COR.cinza)],
    imageUrl: blusaCinza,
  },
  {
    id: 'p11',
    name: 'Calça de sarja',
    brand: 'Rota Urbana',
    category: 'parte-de-baixo',
    fit: 'slim',
    colors: [dominante(COR.bege)],
    imageUrl: calcaBege,
  },
  {
    id: 'p12',
    name: 'Tênis casual',
    brand: 'Passo Livre',
    category: 'calcados',
    colors: [dominante(COR.preto)],
    imageUrl: tenisPreto,
  },
];
