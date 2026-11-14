import { useId } from 'react';
import { rotuloDaCategoria } from '../../features/pecas/categorias';
import type { Categoria, Piece } from '../../features/pecas/types';
import { ColorDots } from '../ColorDots/ColorDots';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './PieceCard.module.css';

const ICONE_DA_CATEGORIA: Record<Categoria, IconName> = {
  'parte-de-cima': 'camiseta',
  'parte-de-baixo': 'calca',
  calcados: 'tenis',
  'terceira-peca': 'jaqueta',
  'peca-unica': 'vestido',
  acessorios: 'bolsa',
};

type PieceCardProps = {
  piece: Piece;
  selected: boolean;
  onToggleLook: () => void;
};

/** Card da peça (Figma 8:382). Editar/excluir ficam para a TELA-05 (fora desta entrega). */
export function PieceCard({ piece, selected, onToggleLook }: PieceCardProps) {
  const titleId = useId();
  return (
    <article
      aria-labelledby={titleId}
      className={[styles.card, selected && styles.selected].filter(Boolean).join(' ')}
    >
      <div className={styles.image}>
        {piece.imageUrl ? (
          <img src={piece.imageUrl} alt="" className={styles.photo} />
        ) : (
          // Sem foto (RF-05): ícone da categoria no lugar.
          <Icon
            name={ICONE_DA_CATEGORIA[piece.category]}
            size={96}
            className={styles.placeholder}
          />
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.category}>{rotuloDaCategoria(piece.category)}</p>
        <h3 id={titleId} className={styles.name}>
          {piece.name}
        </h3>
        {piece.brand && <p className={styles.brand}>{piece.brand}</p>}
        <ColorDots colors={piece.colors} />
        <button
          type="button"
          className={styles.look}
          aria-pressed={selected}
          aria-label={`Adicionar ${piece.name} ao look`}
          onClick={onToggleLook}
        >
          {selected ? (
            '✓ No look'
          ) : (
            <>
              <span className={styles.long}>+ Adicionar ao look</span>
              <span className={styles.short}>+ Look</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
