import { Link } from 'react-router';
import { Logo } from '../../components/Logo/Logo';
import styles from './PlaceholderPage.module.css';

type PlaceholderPageProps = { title: string; description: string };

/** Página provisória para rotas das telas ainda não implementadas. */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className={styles.page}>
      <Logo tone="onLight" size="md" />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{description}</p>
      <Link to="/cadastro" className={styles.link}>
        Voltar para o cadastro
      </Link>
    </main>
  );
}
