import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { FieldMessage } from './FieldMessage';
import styles from './TextField.module.css';

export type TextFieldProps = Omit<ComponentPropsWithRef<'input'>, 'children'> & {
  label: string;
  error?: ReactNode;
  hint?: ReactNode;
};

export function TextField({ label, error, hint, id, className, ...inputProps }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = [hint && !error ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...inputProps}
      />
      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && <FieldMessage id={errorId}>{error}</FieldMessage>}
    </div>
  );
}
