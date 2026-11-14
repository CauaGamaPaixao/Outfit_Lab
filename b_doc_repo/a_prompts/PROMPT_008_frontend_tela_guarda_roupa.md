# PROMPT 008 — Frontend: TELA-03 Guarda-roupa

| Campo | Valor |
|---|---|
| ID | PROMPT-008 |
| Versão | 1.0 |
| Data | 14/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Execução (SPR-01) |
| Entradas obrigatórias | [`AGENTS.md`](../../AGENTS.md) · spec [`TELA-03_guarda_roupa.md`](../c_design/c_specs/TELA-03_guarda_roupa.md) · tokens · Figma `3NAgnwXxx0Nkkrs5B7ZlLF`, frames **8:109** (Desktop), **8:119** (Mobile), **8:46** (Sidebar), **8:79** (BottomNav), **8:382** (PieceCard) · PROMPT-007 (sessão simulada) |
| Saídas | Página `/guarda-roupa` · `AppShell`, `Sidebar`, `BottomNav`, `PageHeader`, `SearchField`, `FilterChips`, `Select`, `PieceGrid`, `PieceCard`, `ColorDots`, `LookTray`, `EmptyState`, `SkeletonCard`, `UiIcon` · `features/pecas` (tipos, filtros, API simulada, hooks) · páginas provisórias das outras rotas · testes |
| Status | Executado |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 14/11/2026 | Versão inicial. |

---

## 1. Decisões do autor

1. Seguir as recomendações da tabela de divergências Figma × spec (seção 3).
2. Botão **"+ Adicionar peça"** presente, **sem reação nenhuma** (o cadastro de peça é a TELA-05).
3. Filtro de cor com **`<select>` nativo** (sem bolinhas no menu).
4. **Incluir** "Adicionar ao look" e a barra "N peças no look" já nesta entrega.

## 2. Regras

1. Visual do Figma; textos, estados e comportamento da spec. Sem dependência nova.
2. Catálogo de teste = as 12 peças do Figma (ilustrações exportadas para `src/assets/pecas/`). **`fit` e cores secundárias foram inventados** só para os filtros terem o que filtrar.
3. Sem backend não há isolamento por usuário (regra 1): todos veem as mesmas peças. A chave da consulta já inclui o usuário.
4. Categorias numa constante só (`categorias.ts`): a taxonomia final é a **[EM ABERTO] EA-04**; o catálogo de cores é a **EA-06**.

## 3. Divergências decididas

| Item | Decisão |
|---|---|
| Categorias | 6 do Figma (inclui "Terceira peça" e "Peça única") |
| Contagem nos chips | Spec: "Todas (12)" etc., considerando busca, modelagem e cor |
| Card da peça | Figma (categoria acima do nome, botão na área de informações); sem menu ⋯ nem selo de modelagem |
| Peça no look | "✓ No look" + borda preta do Figma (spec previa fundo amarelo) |
| Textos | Spec ("Coleção pessoal", "{m} de {n} peças") + "Um universo de combinações." do Figma |
| Sidebar | 240 px do Figma; rodapé com nome, e-mail e "Sair"; sem "Dar feedback" |
| Mobile: chips | Rolagem horizontal (spec) |
| Mobile: BottomNav | Figma ("Peças", "Adicionar" em quadrado de 48 px) |
