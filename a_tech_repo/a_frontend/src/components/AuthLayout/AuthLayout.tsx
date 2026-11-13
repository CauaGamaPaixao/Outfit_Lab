import type { ReactNode } from 'react';
import { Logo } from '../Logo/Logo';
import styles from './AuthLayout.module.css';

type AuthLayoutProps = {
  /** Painel editorial escuro (desktop: coluna lateral; mobile: bloco abaixo do formulário). */
  editorial: ReactNode;
  children: ReactNode;
  /** true = formulário à esquerda e painel à direita (cadastro); false = login. */
  mirrored?: boolean;
};

export function AuthLayout({ editorial, children, mirrored = false }: AuthLayoutProps) {
  return (
    <div className={[styles.layout, mirrored && styles.mirrored].filter(Boolean).join(' ')}>
      <header className={styles.mobileHeader}>
        <Logo tone="onLight" size="md" />
      </header>
      <main className={styles.formSide}>
        <div className={styles.formInner}>{children}</div>
      </main>
      <aside className={styles.editorial}>{editorial}</aside>
    </div>
  );
}
