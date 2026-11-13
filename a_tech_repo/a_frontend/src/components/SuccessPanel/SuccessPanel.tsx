import { useEffect, useRef, type ReactNode } from 'react';
import styles from './SuccessPanel.module.css';

type SuccessPanelProps = {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
};

/** Substitui o formulário após o sucesso. O título recebe foco para ser anunciado. */
export function SuccessPanel({ title, children, action }: SuccessPanelProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <section className={styles.panel} aria-labelledby="success-title">
      <div className={styles.icon} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 id="success-title" ref={titleRef} tabIndex={-1} className={styles.title}>
        {title}
      </h1>
      {children}
      {action}
    </section>
  );
}
