import { useId, useState, type ComponentPropsWithRef, type ReactNode } from 'react';
import eyeIcon from '../../assets/eye.svg';
import { FieldMessage } from '../TextField/FieldMessage';
import fieldStyles from '../TextField/TextField.module.css';
import styles from './PasswordField.module.css';

type PasswordFieldProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  label: string;
  error?: ReactNode;
  /** Conteúdo abaixo do campo (ex.: PasswordStrength), ligado por aria-describedby. */
  below?: ReactNode;
};

export function PasswordField({
  label,
  error,
  below,
  id,
  className,
  ...inputProps
}: PasswordFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const belowId = `${inputId}-below`;
  const errorId = `${inputId}-error`;
  const [visible, setVisible] = useState(false);
  const describedBy = [below ? belowId : null, error ? errorId : null].filter(Boolean).join(' ');
  const name = label.toLowerCase();

  return (
    <div className={[fieldStyles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={fieldStyles.label}>
        {label}
      </label>
      <div className={fieldStyles.control}>
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className={`${fieldStyles.input} ${styles.input}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...inputProps}
        />
        <button
          type="button"
          className={styles.toggle}
          aria-label={visible ? `Ocultar ${name}` : `Mostrar ${name}`}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          disabled={inputProps.disabled}
        >
          <img src={eyeIcon} alt="" width={18} height={18} />
          {visible && <span className={styles.slash} aria-hidden="true" />}
        </button>
      </div>
      {below && <div id={belowId}>{below}</div>}
      {error && <FieldMessage id={errorId}>{error}</FieldMessage>}
    </div>
  );
}
