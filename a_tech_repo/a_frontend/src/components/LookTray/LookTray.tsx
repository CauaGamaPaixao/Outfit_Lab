import type { Piece } from '../../features/pecas/types';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styles from './LookTray.module.css';

type LookTrayProps = {
  pieces: Piece[];
  onClear: () => void;
  onBuild: () => void;
};

const MAX_MINIATURAS = 4;

/** Barra flutuante "N peças no look" (spec 3.5). A região aria-live existe sempre, para anunciar a mudança. */
export function LookTray({ pieces, onClear, onBuild }: LookTrayProps) {
  const total = pieces.length;
  const texto = `${total} ${total === 1 ? 'peça' : 'peças'} no look`;
  const visiveis = pieces.slice(0, MAX_MINIATURAS);
  const resto = total - visiveis.length;

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {total > 0 ? texto : ''}
      </p>
      {total > 0 && (
        <aside className={styles.tray} aria-label="Look em montagem">
          <ul className={styles.thumbs} aria-hidden="true">
            {visiveis.map((p) => (
              <li key={p.id} className={styles.thumb}>
                {p.imageUrl ? <img src={p.imageUrl} alt="" /> : <Icon name="camiseta" size={20} />}
              </li>
            ))}
            {resto > 0 && <li className={styles.more}>+{resto}</li>}
          </ul>
          <p className={styles.text}>
            <strong>{total}</strong> {total === 1 ? 'peça' : 'peças'} no look
          </p>
          <div className={styles.actions}>
            <Button variant="ghost" onClick={onClear}>
              Limpar
            </Button>
            <Button onClick={onBuild}>Montar look →</Button>
          </div>
        </aside>
      )}
    </>
  );
}
