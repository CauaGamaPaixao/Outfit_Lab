import styles from './FilterChips.module.css';

export type ChipOption<T extends string> = { value: T; label: string; count?: number };

type FilterChipsProps<T extends string> = {
  options: ChipOption<T>[];
  value: T;
  onChange: (valor: T) => void;
  /** Nome do grupo para leitores de tela. */
  label: string;
};

/** Seleção única em chips: um `aria-pressed` por opção, dentro de um grupo nomeado (spec 6). */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label,
}: FilterChipsProps<T>) {
  return (
    <div role="group" aria-label={label} className={styles.root}>
      {options.map((opcao) => {
        const ativa = opcao.value === value;
        return (
          <button
            key={opcao.value}
            type="button"
            aria-pressed={ativa}
            className={[styles.chip, ativa && styles.active].filter(Boolean).join(' ')}
            onClick={() => onChange(opcao.value)}
          >
            {opcao.label}
            {opcao.count !== undefined && (
              <>
                {' '}
                <span className={styles.count}>({opcao.count})</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
