import type { Piece } from '../../features/pecas/types';
import { PieceCard } from '../PieceCard/PieceCard';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';
import styles from './PieceGrid.module.css';

type PieceGridProps = {
  pieces: Piece[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  /** Mostra 8 cards de espera no lugar das peças (spec 4, "Carregando"). */
  loading?: boolean;
};

/** Grade de peças: 2 colunas no mobile, 3 a partir de 768 px e 4 a partir de 1440 px (spec 3.4). */
export function PieceGrid({ pieces, selectedIds, onToggle, loading = false }: PieceGridProps) {
  if (loading) {
    return (
      <div className={styles.grid} aria-busy="true">
        <p className="sr-only" role="status">
          Carregando peças…
        </p>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={styles.item}>
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className={styles.grid}>
      {pieces.map((piece) => (
        <li key={piece.id} className={styles.item}>
          <PieceCard
            piece={piece}
            selected={selectedIds.includes(piece.id)}
            onToggleLook={() => onToggle(piece.id)}
          />
        </li>
      ))}
    </ul>
  );
}
