import camiseta from '../../../../assets/ilustracao-camiseta.svg';
import calca from '../../../../assets/ilustracao-calca.svg';
import sneaker from '../../../../assets/ilustracao-sneaker.svg';
import { Logo } from '../../../../components/Logo/Logo';
import styles from './LoginEditorial.module.css';

/** Painel editorial do login (EditorialPanel variant="login"). Visual: Figma 8:104. */
export function LoginEditorial() {
  return (
    <div className={styles.panel}>
      <Logo tone="onDark" size="lg" />

      <div className={styles.manifesto}>
        <p className={styles.eyebrow}>Menos dúvida. Mais você.</p>
        <h2 className={styles.tagline}>
          <span>Organize. Monte.</span>
          <span>Analise. Evolua.</span>
        </h2>
        <p className={styles.lead}>Seu guarda-roupa tem possibilidades. Encontre as suas.</p>
      </div>

      <figure className={styles.collage}>
        <div className={styles.essentials} aria-hidden="true">
          <img src={camiseta} alt="" className={styles.shirt} />
          <img src={calca} alt="" className={styles.pants} />
        </div>
        <div className={styles.highlight}>
          <img src={sneaker} alt="" aria-hidden="true" className={styles.sneaker} />
          <figcaption className={styles.caption}>
            <span className={styles.captionEyebrow}>01 / Seu próximo look</span>
            <span className={styles.captionText}>O novo começa com o que você já tem.</span>
          </figcaption>
        </div>
      </figure>

      <p className={styles.footer}>Um laboratório para o seu estilo.</p>
    </div>
  );
}

/** Cabeçalho escuro compacto para < 1024 px (spec TELA-01 seção 6): logo + selo + tagline. */
export function LoginCompactHeader() {
  return (
    <div className={styles.compact}>
      <Logo tone="onDark" size="md" />
      <p className={styles.compactTagline}>Organize. Monte. Analise. Evolua.</p>
    </div>
  );
}
