import { useId } from 'react';
import { UiIcon } from '../UiIcon/UiIcon';
import styles from './SearchField.module.css';

type SearchFieldProps = {
  value: string;
  onChange: (valor: string) => void;
  placeholder?: string;
  /** Rótulo para leitores de tela (o campo não tem rótulo visível no Figma). */
  label?: string;
};

export function SearchField({
  value,
  onChange,
  placeholder = 'Buscar por nome ou marca',
  label = 'Buscar peça',
}: SearchFieldProps) {
  const id = useId();
  return (
    <div className={styles.root}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <UiIcon name="busca" size={18} className={styles.icon} />
      <input
        id={id}
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Limpar busca"
          onClick={() => onChange('')}
        >
          <UiIcon name="fechar" size={16} />
        </button>
      )}
    </div>
  );
}
