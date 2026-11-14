import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  meta?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, meta, actions }: PageHeaderProps) {
  return (
    <header className={styles.root}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {meta && <p className={styles.meta}>{meta}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}
