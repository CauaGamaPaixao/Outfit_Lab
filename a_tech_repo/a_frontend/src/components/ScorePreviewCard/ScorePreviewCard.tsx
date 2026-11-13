import styles from './ScorePreviewCard.module.css';

export type ScoreCriterion = { label: string; text: string };

type ScorePreviewCardProps = {
  eyebrow: string;
  score: number;
  criteria: ScoreCriterion[];
  disclaimer?: string;
};

/** Card de exemplo de análise. Base do futuro ScoreCard da TELA-07. */
export function ScorePreviewCard({ eyebrow, score, criteria, disclaimer }: ScorePreviewCardProps) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <figure className={styles.card} aria-label={`${eyebrow}: ${score} de 100`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <p className={styles.score} aria-hidden="true">
        <span className={styles.value}>{score}</span>
        <span className={styles.max}>/100</span>
      </p>
      <div className={styles.bar} aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <ul className={styles.criteria}>
        {criteria.map((c) => (
          <li key={c.label}>
            <strong>{c.label}:</strong> <span>{c.text}</span>
          </li>
        ))}
      </ul>
      {disclaimer && <figcaption className={styles.disclaimer}>{disclaimer}</figcaption>}
    </figure>
  );
}
