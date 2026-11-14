import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Alert } from '../../components/Alert/Alert';
import { AppShell } from '../../components/AppShell/AppShell';
import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { FilterChips, type ChipOption } from '../../components/FilterChips/FilterChips';
import { LookTray } from '../../components/LookTray/LookTray';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PieceGrid } from '../../components/PieceGrid/PieceGrid';
import { SearchField } from '../../components/SearchField/SearchField';
import { Select } from '../../components/Select/Select';
import { UiIcon } from '../../components/UiIcon/UiIcon';
import { CATEGORIAS, MODELAGENS } from '../../features/pecas/categorias';
import {
  categoriaValida,
  contarPorCategoria,
  coresDisponiveis,
  filtrarPecas,
  haFiltroAtivo,
  modelagemValida,
  textoDaContagem,
  type Filtros,
} from '../../features/pecas/filtros';
import { useDebouncedValue } from '../../features/pecas/hooks/useDebouncedValue';
import { usePecas } from '../../features/pecas/hooks/usePecas';
import { useSelecaoDoLook } from '../../features/pecas/hooks/useSelecaoDoLook';
import type { Categoria } from '../../features/pecas/types';
import styles from './GuardaRoupaPage.module.css';

const ATRASO_DA_BUSCA_MS = 200;
const SLOGAN = 'Um universo de combinações.';

/**
 * TELA-03 Guarda-roupa — rota /guarda-roupa (protegida). Visual: Figma 8:109 / 8:119.
 * Comportamento: spec TELA-03. Categoria, modelagem e cor ficam na URL; a busca também (espelhada).
 */
export function GuardaRoupaPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const pecas = usePecas();
  const look = useSelecaoDoLook();

  const categoria = categoriaValida(params.get('cat'));
  const modelagem = modelagemValida(params.get('fit'));
  const cor = params.get('cor') ?? '';
  const qNaUrl = params.get('q') ?? '';

  // O campo responde na hora; o filtro (e a URL) só depois de 200 ms sem digitar.
  const [busca, setBusca] = useState(qNaUrl);
  const buscaAtrasada = useDebouncedValue(busca, ATRASO_DA_BUSCA_MS);

  useEffect(() => {
    if (qNaUrl === buscaAtrasada) return;
    setParams(
      (anterior) => {
        const proximo = new URLSearchParams(anterior);
        if (buscaAtrasada) proximo.set('q', buscaAtrasada);
        else proximo.delete('q');
        return proximo;
      },
      { replace: true },
    );
  }, [buscaAtrasada, qNaUrl, setParams]);

  function definirParametro(chave: 'cat' | 'fit' | 'cor', valor: string) {
    setParams((anterior) => {
      const proximo = new URLSearchParams(anterior);
      if (valor) proximo.set(chave, valor);
      else proximo.delete(chave);
      return proximo;
    });
  }

  const filtros: Filtros = useMemo(
    () => ({ busca: buscaAtrasada, categoria, modelagem, cor }),
    [buscaAtrasada, categoria, modelagem, cor],
  );
  const filtrando = haFiltroAtivo(filtros);

  const todas = useMemo(() => pecas.data ?? [], [pecas.data]);
  const visiveis = useMemo(() => filtrarPecas(todas, filtros), [todas, filtros]);
  const contagem = useMemo(() => contarPorCategoria(todas, filtros), [todas, filtros]);
  const cores = useMemo(() => coresDisponiveis(todas), [todas]);
  const pecasDoLook = useMemo(
    () => look.ids.flatMap((id) => todas.find((p) => p.id === id) ?? []),
    [look.ids, todas],
  );

  function limparTudo() {
    setBusca('');
    setParams(new URLSearchParams(), { replace: true });
  }

  const opcoesDeCategoria: ChipOption<Categoria | ''>[] = [
    { value: '', label: 'Todas', count: contagem.todas },
    ...CATEGORIAS.map((c) => ({ value: c.value, label: c.label, count: contagem[c.value] })),
  ];

  const carregou = pecas.isSuccess;
  const vazio = carregou && todas.length === 0;
  const semResultado = carregou && todas.length > 0 && visiveis.length === 0;
  const meta = carregou
    ? `${textoDaContagem(visiveis.length, todas.length, filtrando)} · ${SLOGAN}`
    : SLOGAN;

  return (
    <AppShell active="guarda-roupa">
      <div
        className={[styles.page, pecasDoLook.length > 0 && styles.comBarra]
          .filter(Boolean)
          .join(' ')}
      >
        <PageHeader
          eyebrow="Coleção pessoal"
          title="Guarda-roupa"
          meta={meta}
          actions={
            // Ainda sem ação: o cadastro de peça é a TELA-05 (decisão do autor).
            <div className={styles.add}>
              <Button type="button">+ Adicionar peça</Button>
            </div>
          }
        />

        {pecas.isError && (
          <div className={styles.erro}>
            <Alert title="Não foi possível carregar suas peças." />
            <Button variant="secondary" onClick={() => void pecas.refetch()}>
              Tentar novamente
            </Button>
          </div>
        )}

        {carregou && !vazio && (
          <section className={styles.filtros} aria-label="Busca e filtros">
            <FilterChips
              label="Categoria"
              options={opcoesDeCategoria}
              value={categoria}
              onChange={(v) => definirParametro('cat', v)}
            />
            <div className={styles.linha}>
              <SearchField value={busca} onChange={setBusca} />
              <div className={styles.selects}>
                <Select
                  label="Modelagem"
                  options={MODELAGENS}
                  value={modelagem}
                  onChange={(v) => definirParametro('fit', v)}
                />
                <Select
                  label="Cor"
                  options={cores.map((c) => ({ value: c.name, label: c.name }))}
                  value={cor}
                  onChange={(v) => definirParametro('cor', v)}
                />
              </div>
            </div>
            {filtrando && (
              <button type="button" className={styles.limpar} onClick={limparTudo}>
                <UiIcon name="fechar" size={14} />
                Limpar filtros
              </button>
            )}
            <p className="sr-only" role="status">
              {filtrando ? textoDaContagem(visiveis.length, todas.length, true) : ''}
            </p>
          </section>
        )}

        {pecas.isPending && (
          <PieceGrid pieces={[]} selectedIds={[]} onToggle={look.alternar} loading />
        )}

        {vazio && (
          <EmptyState
            illustration={<UiIcon name="cabide" size={96} strokeWidth={1} />}
            title="Seu guarda-roupa está vazio"
            text="Cadastre sua primeira peça para começar a montar looks."
            action={<Button type="button">+ Adicionar primeira peça</Button>}
          />
        )}

        {semResultado && (
          <EmptyState
            title="Nenhuma peça encontrada"
            text={
              buscaAtrasada.trim()
                ? `Nada corresponde a “${buscaAtrasada.trim()}” com os filtros atuais.`
                : 'Nada corresponde aos filtros atuais.'
            }
            action={
              <Button variant="secondary" onClick={limparTudo}>
                Limpar busca e filtros
              </Button>
            }
          />
        )}

        {carregou && visiveis.length > 0 && (
          <PieceGrid pieces={visiveis} selectedIds={look.ids} onToggle={look.alternar} />
        )}
      </div>

      <LookTray
        pieces={pecasDoLook}
        onClear={look.limpar}
        onBuild={() => navigate(`/looks/novo?pecas=${look.ids.join(',')}`)}
      />
    </AppShell>
  );
}
