import styles from './SkeletonCard.module.css';

/** Espaço reservado de um card enquanto as peças carregam (sem animação com prefers-reduced-motion). */
export function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.image} />
      <div className={styles.info}>
        <span className={styles.line} />
        <span className={`${styles.line} ${styles.short}`} />
      </div>
    </div>
  );
}
