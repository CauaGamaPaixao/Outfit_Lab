import type { ReactNode } from 'react';
import { Logo } from '../Logo/Logo';
import styles from './AuthLayout.module.css';

type AuthLayoutProps = {
  /** Painel editorial escuro (desktop: coluna lateral; mobile: bloco abaixo do formulário). */
  editorial: ReactNode;
  children: ReactNode;
  /** true = formulário à esquerda e painel à direita (cadastro); false = login. */
  mirrored?: boolean;
  /**
   * Cabeçalho escuro compacto para < 1024 px (login, spec TELA-01 seção 6).
   * Quando informado, substitui o cabeçalho claro e o painel editorial some no mobile.
   */
  compactHeader?: ReactNode;
  /** Centraliza o formulário na vertical a partir de 1024 px (login). */
  centered?: boolean;
};

export function AuthLayout({
  editorial,
  children,
  mirrored = false,
  compactHeader,
  centered = false,
}: AuthLayoutProps) {
  const classes = [
    styles.layout,
    mirrored && styles.mirrored,
    compactHeader && styles.compact,
    centered && styles.centered,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {compactHeader ? (
        <header className={styles.compactHeader}>{compactHeader}</header>
      ) : (
        <header className={styles.mobileHeader}>
          <Logo tone="onLight" size="md" />
        </header>
      )}
      <main className={styles.formSide}>
        <div className={styles.formInner}>{children}</div>
      </main>
      <aside className={styles.editorial}>{editorial}</aside>
    </div>
  );
}
