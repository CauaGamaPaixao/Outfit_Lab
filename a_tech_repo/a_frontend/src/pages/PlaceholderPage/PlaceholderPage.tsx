import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Logo } from '../../components/Logo/Logo';
import styles from './PlaceholderPage.module.css';

type PlaceholderPageProps = { title: string; description: string; children?: ReactNode };

/** Página provisória para rotas das telas ainda não implementadas. */
export function PlaceholderPage({ title, description, children }: PlaceholderPageProps) {
  return (
    <main className={styles.page}>
      <Logo tone="onLight" size="md" />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{description}</p>
      {children}
      <Link to="/cadastro" className={styles.link}>
        Voltar para o cadastro
      </Link>
    </main>
  );
}
