import { useEffect, useState } from 'react';

/** Devolve `valor` só depois de `atrasoMs` sem mudar (a busca filtra 200 ms após a última tecla). */
export function useDebouncedValue<T>(valor: T, atrasoMs: number): T {
  const [atrasado, setAtrasado] = useState(valor);
  useEffect(() => {
    const id = setTimeout(() => setAtrasado(valor), atrasoMs);
    return () => clearTimeout(id);
  }, [valor, atrasoMs]);
  return atrasado;
}
