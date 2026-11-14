import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
  illustration?: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
};

export function EmptyState({ illustration, title, text, action }: EmptyStateProps) {
  return (
    <section className={styles.root}>
      {illustration && <div className={styles.illustration}>{illustration}</div>}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      {action}
    </section>
  );
}
