import { Icon } from '../../../../components/Icon/Icon';
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
        <div className={styles.pieces} aria-hidden="true">
          <span className={styles.tile}>
            <Icon name="camiseta" className={styles.glyph} />
          </span>
          <span className={styles.tile}>
            <Icon name="calca" className={styles.glyph} />
          </span>
          <span className={styles.tile}>
            <Icon name="tenis" className={styles.glyph} />
          </span>
        </div>
        <figcaption className={styles.caption}>
          <span className={styles.captionEyebrow}>01 / Seu próximo look</span>
          <span className={styles.captionText}>O novo começa com o que você já tem.</span>
        </figcaption>
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
