import { useCallback, useState } from 'react';

const CHAVE = 'outfitlab.look';

function ler(): string[] {
  try {
    const dados: unknown = JSON.parse(window.sessionStorage.getItem(CHAVE) ?? '[]');
    return Array.isArray(dados) ? dados.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * Peças escolhidas para o look. Fica no sessionStorage: sobrevive a trocar de filtro e de tela
 * na mesma aba (spec 3.5: "a seleção persiste") e o montador de looks poderá ler a mesma chave.
 */
export function useSelecaoDoLook() {
  const [ids, setIds] = useState<string[]>(ler);

  const gravar = useCallback((proximos: string[]) => {
    setIds(proximos);
    try {
      window.sessionStorage.setItem(CHAVE, JSON.stringify(proximos));
    } catch {
      // Storage bloqueado: a seleção vale só enquanto a tela estiver aberta.
    }
  }, []);

  const alternar = useCallback(
    (id: string) => gravar(ids.includes(id) ? ids.filter((v) => v !== id) : [...ids, id]),
    [ids, gravar],
  );
  const limpar = useCallback(() => gravar([]), [gravar]);

  return { ids, alternar, limpar };
}
