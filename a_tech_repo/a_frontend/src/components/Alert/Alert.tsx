import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Alert.module.css';

type AlertProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
  tone?: 'danger' | 'success';
  title: ReactNode;
};

/** Alerta de página. Recebe foco programático (tabIndex -1) para ser anunciado. */
export function Alert({ tone = 'danger', title, children, className, ...rest }: AlertProps) {
  return (
    <div
      role="alert"
      tabIndex={-1}
      className={[styles.alert, styles[tone], className].filter(Boolean).join(' ')}
      {...rest}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className={styles.icon}>
        <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 5v6M10 14v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div>
        <strong className={styles.title}>{title}</strong>
        {children && <span>{children}</span>}
      </div>
    </div>
  );
}
