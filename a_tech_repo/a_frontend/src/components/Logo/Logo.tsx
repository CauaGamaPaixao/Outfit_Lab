import styles from './Logo.module.css';

type LogoProps = {
  tone?: 'onDark' | 'onLight';
  size?: 'md' | 'nav' | 'lg';
  /** "Outfit/Lab" em uma linha só (cabeçalho mobile). */
  inline?: boolean;
  showBeta?: boolean;
};

/** Assinatura "Outfit/ Lab" empilhada + selo BETA (Escopo 6.10). */
export function Logo({
  tone = 'onLight',
  size = 'md',
  showBeta = true,
  inline = false,
}: LogoProps) {
  return (
    <div
      className={[styles.logo, styles[tone], styles[size], inline && styles.inline]
        .filter(Boolean)
        .join(' ')}
    >
      <p className={styles.mark} aria-label="Outfit Lab">
        <span aria-hidden="true">Outfit/</span>
        <span aria-hidden="true">Lab</span>
      </p>
      {showBeta && <BetaBadge />}
    </div>
  );
}

export function BetaBadge() {
  return <span className={styles.beta}>Beta</span>;
}
