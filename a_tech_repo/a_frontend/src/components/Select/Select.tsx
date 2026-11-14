import { useId } from 'react';
import { UiIcon } from '../UiIcon/UiIcon';
import styles from './Select.module.css';

export type SelectOption = { value: string; label: string };

type SelectProps = {
  /** Nome do filtro; aparece como primeira opção ("todas") e para leitores de tela. */
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (valor: string) => void;
};

/**
 * Select nativo estilizado (decisão do autor: mais simples e acessível que um listbox próprio).
 * O valor vazio ("") significa "sem filtro" e mostra o nome do filtro.
 */
export function Select({ label, options, value, onChange }: SelectProps) {
  const id = useId();
  return (
    <div className={styles.root}>
      <select
        id={id}
        aria-label={label}
        className={styles.select}
        data-ativo={value !== '' ? 'true' : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <UiIcon name="seta" size={16} className={styles.arrow} />
    </div>
  );
}
