# TELA-03 — Meu guarda-roupa

| Campo | Valor |
|---|---|
| ID | TELA-03 |
| Versão | 1.2 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.1 (Parte B3) |
| RFs | RF-03 (gerenciar peças — acesso a editar/excluir), RF-04 (atributos exibidos), RF-05 (imagem), RF-06 (coleção visual, busca e filtros), RF-07 (início da seleção para o look), RF-12 (estados) |
| Protótipo | [`../d_prototipos/03_guarda_roupa.html`](../d_prototipos/03_guarda_roupa.html) |
| Status | Em revisão |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial. |
| 1.1 | 13/11/2026 | Cauã Gama Paixão | Prompts previstos renumerados (+1) porque o PROMPT-003 passou a ser o das telas no Figma (D-33). |
| 1.2 | 13/11/2026 | Cauã Gama Paixão | Prompts previstos renumerados (+1) com a criação do PROMPT-004 (frontend: setup + TELA-02). |

---

## 1. Objetivo

Mostrar as peças do usuário como um **catálogo pessoal** (PRD 10.3), permitir encontrá-las rápido (busca e filtros) e começar a montar um look selecionando peças direto do grid.

## 2. Rota e navegação

| Item | Valor |
|---|---|
| Rota | `/guarda-roupa` (protegida) |
| Navegação desktop (sidebar escura) | Início (`/`) · **Guarda-roupa** (ativo, ponto amarelo) · Montar look (`/looks/novo`) · Looks salvos (`/looks`) · Perfil (`/perfil`) · rodapé com avatar de iniciais, nome, e-mail, link "Dar feedback" (Escopo 6.3) e "Sair" |
| Navegação mobile (barra inferior) | Início · Guarda-roupa · **"+" amarelo central** (adicionar peça) · Looks · Perfil |
| Ações | "Adicionar peça" → `/pecas/nova` (TELA-05, PROMPT-006) · Editar → `/pecas/:id/editar` · Excluir → modal de confirmação · "Montar look" → `/looks/novo?pecas=1,2,3` |

## 3. Componentes

### 3.1 Cabeçalho da página

- Eyebrow "COLEÇÃO PESSOAL".
- Título `display` "Guarda-roupa".
- Contagem: "{n} peças" (singular "1 peça"); com filtro ativo: "{m} de {n} peças".
- Botão primário "+ Adicionar peça" (no mobile fica oculto: a ação é o "+" da barra inferior).
- Selo "Beta" ao lado do logo (sidebar / cabeçalho mobile).

### 3.2 Busca e filtros

| Controle | Comportamento |
|---|---|
| Busca | Campo com ícone de lupa, placeholder "Buscar por nome ou marca", filtra ao digitar (debounce 200 ms na app), sem diferenciar maiúsculas e acentos. Botão "×" limpa. |
| Chips de categoria | "Todas (n)", "Partes de cima (n)", "Partes de baixo (n)", "Calçados (n)", "Acessórios (n)". Seleção única; contagem considera a busca. Selo **[EM ABERTO] EA-04** (taxonomia final no PROMPT-005). |
| Select "Modelagem" | Todas · Slim · Regular · Oversized · Wide · Cropped (PRD 10.4). **Should.** |
| Select "Cor" | Todas + cores presentes nas peças, com bolinha de cor. Considera cor dominante e secundárias. **Should.** Catálogo de cores **[EM ABERTO] EA-06**. |
| "Limpar filtros" | Aparece quando algum filtro está ativo. |

Os filtros combinam com **E** (busca **e** categoria **e** modelagem **e** cor).

### 3.3 Card de peça (`PieceCard`)

| Elemento | Detalhe |
|---|---|
| Imagem | Proporção 4:5, fundo `--color-image`; foto da peça (`object-fit: contain`) ou **placeholder** com ícone da categoria quando não há imagem (RF-05: peça sem imagem é aceita) |
| Selo de categoria | Canto superior esquerdo, pill branco com texto `overline` |
| Menu ⋯ | Canto superior direito, botão 36 px (área de toque 44 px); abre menu com "Editar" e "Excluir" |
| Botão "Adicionar ao look" | Sobre a imagem, na base. Alterna para **"✓ No look"** com fundo amarelo e texto preto (`aria-pressed`). Abaixo de 768 px o rótulo visível encurta para "+ Look" (o `aria-label` continua completo) |
| Nome | `h3`, até 2 linhas com reticências |
| Marca | `caption`, `text-muted` (texto digitado pelo usuário, sem logo) |
| Cores | Até 3 bolinhas de 14 px com borda `border` e `title`/texto acessível com o nome da cor; "+n" se houver mais |
| Selo de modelagem | Pill com borda, texto `caption` ("Oversized") |

Card inteiro tem hover com `--shadow-md`; o clique no card (fora dos botões) abre a edição.

### 3.4 Grid

| Largura | Colunas | Gap |
|---|---|---|
| < 768 px | 2 | 12 px |
| 768–1439 px | 3 | 24 px |
| ≥ 1440 px | 4 | 24 px |

### 3.5 Barra flutuante "N peças no look"

- Aparece quando ≥ 1 peça está selecionada; fixa na base (acima da barra inferior no mobile), fundo `inverse-bg`, raio `card`, `--shadow-lg`.
- Conteúdo: miniaturas (até 4 + "+n"), texto "**{n} peça(s) no look**", botão "Limpar" (ghost claro) e botão primário amarelo "**Montar look →**".
- Anúncio por `aria-live="polite"`: "3 peças no look".
- A seleção persiste ao trocar filtros (na app: estado global/URL).

### 3.6 Excluir peça

Modal: título "Excluir peça?", texto "**{nome}** será removida do seu guarda-roupa. Looks salvos que usam esta peça vão perder este item. Essa ação não pode ser desfeita.", botões "Cancelar" (secundário) e "Excluir" (fundo `danger`, texto branco — contraste 6,47:1). Sucesso: toast "Peça excluída.". O comportamento com looks salvos será confirmado no PROMPT-005 (RN de integridade).

## 4. Estados

| Estado | Descrição | Texto final |
|---|---|---|
| Com peças | Grid com cards (protótipo: 12 peças mockadas) | — |
| Carregando | Cabeçalho real + **skeleton** de 8 cards (imagem e 2 linhas cinza com animação suave; sem animação se `prefers-reduced-motion`); `aria-busy="true"` | Leitor de tela: "Carregando peças…" |
| Guarda-roupa vazio | Ilustração (cabide SVG), sem filtros visíveis | Título "Seu guarda-roupa está vazio" · texto "Cadastre sua primeira peça para começar a montar looks." · botão primário "+ Adicionar primeira peça" |
| Busca sem resultado | Grid substituído por mensagem; filtros continuam visíveis | Título "Nenhuma peça encontrada" · texto "Nada corresponde a “{busca}” com os filtros atuais." · botão secundário "Limpar busca e filtros" |
| Erro ao carregar | Alerta + botão | "Não foi possível carregar suas peças." · botão "Tentar novamente" |
| Seleção ativa | Barra flutuante visível | "{n} peças no look" |

## 5. Comportamento responsivo

| Largura | Layout |
|---|---|
| < 1024 px | Sem sidebar. Cabeçalho superior com logo + Beta. **Barra inferior** fixa de 64 px com o "+" amarelo central (56 px, elevado). Filtros: busca em largura total; chips com rolagem horizontal; selects lado a lado. |
| ≥ 1024 px | **Sidebar escura** fixa de 248 px; conteúdo claro com máx. 1200 px e margem de 32 px. |

## 6. Acessibilidade

- Landmarks: `<nav aria-label="Principal">`, `<main>`, `<h1>` "Guarda-roupa".
- Item ativo com `aria-current="page"`; o ponto amarelo é decorativo (o estado também é indicado por peso e cor do texto).
- Chips: grupo `role="radiogroup"`/`aria-pressed` com rótulo "Categoria".
- Cards como `<article>` com `aria-labelledby` no nome; botão "Adicionar ao look" com `aria-pressed` e rótulo "Adicionar {nome} ao look".
- Menu ⋯: `aria-haspopup="menu"`, `aria-expanded`; fecha com `Esc` e devolve o foco.
- Modal com foco preso, `role="dialog"`, `aria-modal="true"`, fecha com `Esc`.
- Bolinhas de cor com nome textual (não só a cor).

## 7. Mapeamento para componentes React

| Componente | Props principais | Reutilizável |
|---|---|---|
| `AppShell` | `active: NavKey`, `user`, `children` | ✅ todas as telas autenticadas |
| `Sidebar` | `active`, `user`, `onLogout` | ✅ |
| `BottomNav` | `active`, `onAdd` | ✅ |
| `PageHeader` | `eyebrow`, `title`, `meta?`, `actions?` | ✅ TELA-04 a 09 |
| `SearchField` | `value`, `onChange`, `placeholder` | ✅ TELA-06 (montador) |
| `FilterChips` | `options: {value, label, count}[]`, `value`, `onChange` | ✅ TELA-06, TELA-08 |
| `Select` | `label`, `options`, `value`, `onChange`, `renderOption?` | ✅ |
| `PieceGrid` | `pieces`, `selectedIds`, `onToggle`, `onEdit`, `onDelete` | ✅ TELA-06 |
| `PieceCard` | `piece: Piece`, `selected`, `onToggleLook`, `onEdit`, `onDelete` | ✅ TELA-06, TELA-07, TELA-08 |
| `ColorDots` | `colors: Color[]`, `max = 3` | ✅ |
| `Badge` | `tone: 'neutral' \| 'outline' \| 'accent'` | ✅ |
| `KebabMenu` | `items: {label, onSelect, tone?}[]` | ✅ |
| `LookTray` | `pieces`, `onClear`, `onBuild` | ✅ TELA-06 |
| `EmptyState` | `illustration`, `title`, `text`, `action?` | ✅ todas |
| `SkeletonCard` | — | ✅ |
| `ConfirmDialog` | `title`, `children`, `confirmLabel`, `tone`, `onConfirm` | ✅ |
| `Toast` | `message`, `tone` | ✅ |

Tipo `Piece` (provisório, final no PROMPT-007): `{ id, name, brand?, category, fit?, colors: {name, hex, dominant}[], imageUrl? }`.

---

## 📚 Por que este documento existe

O guarda-roupa é a tela em que o usuário passa mais tempo e a que mais reaproveita componentes (cards, filtros, barra do look) nas telas seguintes. Especificar agora o card, os filtros e cada estado evita que o montador de looks e os looks salvos reinventem peças parecidas, e dá à LLM uma lista fechada de componentes e props para gerar.
