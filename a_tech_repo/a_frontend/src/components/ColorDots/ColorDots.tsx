import type { CorDaPeca } from '../../features/pecas/types';
import styles from './ColorDots.module.css';

type ColorDotsProps = {
  colors: CorDaPeca[];
  /** Quantas bolinhas aparecem; o resto vira "+n". */
  max?: number;
};

/** Bolinhas de cor com o nome em texto (a cor sozinha não basta: spec 6) e a dominante escrita. */
export function ColorDots({ colors, max = 3 }: ColorDotsProps) {
  if (colors.length === 0) return null;
  const visiveis = colors.slice(0, max);
  const resto = colors.length - visiveis.length;
  const principal = colors.find((c) => c.dominant) ?? colors[0]!;

  return (
    <div className={styles.root}>
      <ul className={styles.dots} aria-label="Cores">
        {visiveis.map((cor) => (
          <li
            key={cor.name}
            className={styles.dot}
            style={{ backgroundColor: cor.hex }}
            title={cor.name}
          >
            <span className="sr-only">{cor.name}</span>
          </li>
        ))}
        {resto > 0 && <li className={styles.more}>+{resto}</li>}
      </ul>
      <span className={styles.name} aria-hidden="true">
        {principal.name}
      </span>
    </div>
  );
}
