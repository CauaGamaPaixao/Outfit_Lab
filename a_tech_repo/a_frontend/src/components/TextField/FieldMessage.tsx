import type { ReactNode } from 'react';
import styles from './TextField.module.css';

/** Mensagem de erro de campo: ícone + texto, para não depender só da cor. */
export function FieldMessage({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className={styles.error}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={styles.errorIcon}
      >
        <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 5v6M10 14v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
