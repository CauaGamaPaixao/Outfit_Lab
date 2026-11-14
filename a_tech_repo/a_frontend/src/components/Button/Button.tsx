import type { ComponentPropsWithRef } from 'react';
import styles from './Button.module.css';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
