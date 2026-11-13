import {
  getPasswordStrength,
  STRENGTH_LABEL,
  type PasswordStrengthLevel,
} from '../../features/auth/passwordStrength';
import styles from './PasswordStrength.module.css';

type PasswordStrengthProps = {
  value: string;
  /** Texto de ajuda exibido junto ao nível (spec: "Mínimo de 8 caracteres, com letras e números."). */
  hint: string;
};

export function PasswordStrength({ value, hint }: PasswordStrengthProps) {
  const level: PasswordStrengthLevel = getPasswordStrength(value);
  const label = STRENGTH_LABEL[level];

  return (
    <div className={styles.root} data-level={level}>
      <div className={styles.bars} aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={i <= level ? styles.filled : styles.bar} />
        ))}
      </div>
      <p className={styles.text}>
        <span aria-live="polite" className={styles.level}>
          {label && (
            <>
              <span className="sr-only">Força da senha: </span>
              {label}
            </>
          )}
        </span>
        {label && <span aria-hidden="true"> · </span>}
        {hint}
      </p>
    </div>
  );
}
