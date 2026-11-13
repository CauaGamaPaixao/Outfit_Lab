import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { FieldMessage } from '../TextField/FieldMessage';
import styles from './Checkbox.module.css';

type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  label: ReactNode;
  error?: ReactNode;
};

export function Checkbox({ label, error, id, className, ...inputProps }: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        <input
          id={inputId}
          type="checkbox"
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        <span className={styles.box} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M2.5 6.2 5 8.5l4.5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={styles.text}>{label}</span>
      </label>
      {error && <FieldMessage id={errorId}>{error}</FieldMessage>}
    </div>
  );
}
