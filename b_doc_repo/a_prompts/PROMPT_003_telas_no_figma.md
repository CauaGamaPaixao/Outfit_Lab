# PROMPT 003 — Telas 01–03 no Figma (base do fluxo Figma ↔ React via MCP)

| Campo | Valor |
|---|---|
| ID | PROMPT-003 |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Planejamento → Execução (design) |
| Ferramenta | **Figma Make** (agente de IA do Figma) + Figma Design (pós-processamento) |
| Entradas obrigatórias | Protótipos `b_doc_repo/c_design/d_prototipos/01_login.html`, `02_cadastro.html`, `03_guarda_roupa.html` (screenshots) · [`design_tokens.md`](../c_design/b_tokens/design_tokens.md) · specs [`TELA-01`](../c_design/c_specs/TELA-01_login.md), [`TELA-02`](../c_design/c_specs/TELA-02_cadastro.md), [`TELA-03`](../c_design/c_specs/TELA-03_guarda_roupa.md) |
| Saídas | Arquivo Figma **`Outfit Lab — UI`** com variáveis = tokens, biblioteca de componentes com os nomes das specs e as telas 01–03 em 1440 e 375 px, com todos os estados · link do arquivo registrado no `b_doc_repo/README.md` |
| Decisão | D-33 (Figma como fonte visual editável + fluxo Figma MCP → React) |
| Status | Pronto para execução |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 13/11/2026 | Versão inicial. |

---

## 0. Como usar (visão geral)

O objetivo é ter as telas num formato **editável** (Figma) e organizado de um jeito que o **agente de código leia pelo Figma MCP** e traduza para React com os componentes e tokens do projeto.

| Passo | Onde | O quê | Tempo |
|---|---|---|---|
| 1 | Navegador | Abra os 3 protótipos HTML e tire **screenshots** de cada estado importante em 1440 px e 375 px (painel "◐ Estados") | 15 min |
| 2 | Figma Make | Cole as **mensagens 1 a 4 da seção 2**, **uma por vez**, anexando os screenshots indicados em cada uma. Revise o preview antes de mandar a próxima | 40 min |
| 3 | Figma Make → Figma Design | Use **Copy design** (copiar como camadas de design) e cole num arquivo novo do Figma Design chamado **`Outfit Lab — UI`** | 5 min |
| 4 | Figma Design | Faça o **pós-processamento** da seção 3 (variáveis, componentes, nomes, frames). É o que deixa o MCP útil | 60–90 min |
| 5 | Figma Design | Confira o **checklist de entrega** (seção 5) | 10 min |
| 6 | Agente de código | Envie os **links dos frames** + a spec da tela; o agente gera o React (Guia de Kickoff, seção 7.2) | — |

> **Por que não pedir tudo numa mensagem só?** Prompts longos demais tendem a ser resumidos pelo agente, que "esquece" estados e textos. Em partes, cada resposta pode ser revisada.
>
> **Caminho alternativo (seção 4):** em vez do Figma Make, o agente de código pode enviar os protótipos HTML direto para o Figma pelas ferramentas de escrita do Figma MCP, se estiverem disponíveis no seu plano **[VERIFICAR]**.

---

## 1. Regras que valem para todas as mensagens

Estas regras já estão embutidas nas mensagens da seção 2. Use-as também para revisar o que o Figma Make gerar:

1. **Tokens exatos.** Nenhuma cor, fonte, espaçamento ou raio fora da tabela da mensagem 1.
2. **60/30/10.** 60% neutros claros, 30% escuros, 10% amarelo `#FACC15`. Amarelo **nunca** como texto sobre fundo claro, nunca em áreas grandes.
3. **Textos finais em português** exatamente como nas mensagens (vieram das specs).
4. **Sem marcas reais, sem logos, sem fotos de pessoas.** Peças = ilustrações vetoriais simples e genéricas.
5. **Nomes de componentes = nomes do React** (`PieceCard`, `TextField`…). É isso que permite ao agente reaproveitar o código.
6. **Auto layout em tudo.** Nada posicionado "na mão", exceto as ilustrações da colagem do login.

---

## 2. Mensagens para colar no Figma Make

### Mensagem 1 — Contexto e design system

**Anexe:** screenshot do login em 1440 px (estado Padrão).

```text
Você vai criar as telas de um app web chamado "Outfit Lab", um guarda-roupa digital: o usuário cadastra as peças de roupa (foto + atributos), monta looks e recebe uma análise explicável (pontuação de 0 a 100 com justificativas). A direção visual é EDITORIAL MINIMALISTA: catálogo de moda contemporâneo, muito espaço em branco, imagens das peças como protagonistas, tipografia forte e um único acento amarelo inspirado num tênis. Público: um beta fechado com amigos, usando principalmente o celular. Todos os textos da interface em português do Brasil.

Nesta primeira mensagem, crie APENAS o design system (uma página "Design system"), sem telas. Use EXATAMENTE estes valores:

CORES (nomes de variáveis entre parênteses)
- Fundo da página #FAFAFA (color/bg)
- Superfície de cards e inputs #FFFFFF (color/surface)
- Fundo da área de imagem #F2F2F2 (color/image)
- Texto principal #0A0A0A (color/text)
- Texto forte #1F1F1F (color/text-strong)
- Texto secundário #6B6B6B (color/text-muted)
- Borda decorativa de cards e divisores #E5E5E5 (color/border)
- Borda de inputs #8A8A8A (color/border-strong)
- Painel escuro (sidebar, painel editorial) #0A0A0A (color/inverse-bg)
- Superfície sobre o painel escuro #1F1F1F (color/inverse-surface)
- Texto sobre escuro #FFFFFF (color/inverse-text)
- Texto secundário sobre escuro #A3A3A3 (color/inverse-muted)
- Acento #FACC15 (color/accent), hover #EAB308 (color/accent-hover), texto sobre o acento #0A0A0A (color/on-accent)
- Erro #B91C1C sobre #FEF2F2 (color/danger, color/danger-bg)
- Sucesso #15803D sobre #F0FDF4 (color/success, color/success-bg)

REGRA 60/30/10: 60% neutros claros, 30% escuros (texto, painéis, chips ativos), 10% amarelo (botão principal, item de navegação ativo, selo "Beta", estado "No look", indicadores). O amarelo NUNCA é cor de texto sobre fundo claro e NUNCA preenche áreas grandes. Sobre fundo escuro o amarelo pode ser texto ou ícone.

TIPOGRAFIA: Inter.
- display 40/48 bold, tracking -2% (título de página no desktop)
- h1 32/40 semibold · h2 24/32 semibold · h3 18/24 medium
- body 16/24 regular · caption 14/20 regular · label 14/20 medium
- overline 12/16 semibold, MAIÚSCULAS, tracking 8% (eyebrows e selos)
- Logo: "Outfit" e "Lab" empilhados, Inter extra-bold (800), tracking -3%, entrelinha 0.95. Sem "™".

ESPAÇAMENTO (escala de 4 px): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80.
RAIOS: inputs e botões 8 · cards e modais 12 · chips e selos 999 (pill).
SOMBRAS (mínimas): sm 0 1 2 6% · md 0 4 16 8% · lg 0 12 32 14% (sempre preto #0A0A0A com essa opacidade).
FOCO: contorno preto 2 px + halo amarelo até 5 px, em todo elemento focável.
ALVOS DE TOQUE: mínimo 44 px; inputs e botões com 48 px de altura.
BREAKPOINTS: mobile 375, tablet 768, desktop 1024, wide 1440.

COMPONENTES (crie cada um como componente, com estes nomes exatos e as variantes listadas):
- Button — variant: primary (amarelo, texto preto), secondary (branco, borda preta), dark (preto, texto branco), ghost-inverse (transparente sobre escuro), danger (#B91C1C, texto branco); state: default, hover, focus, disabled, loading (spinner + texto).
- TextField — label acima (label 14 medium), input 48 px, borda #8A8A8A 1 px; state: default, hover, focus, filled, error (borda #B91C1C 2 px + ícone de alerta + mensagem caption em #B91C1C abaixo), disabled. Opcional: texto de ajuda abaixo em #6B6B6B.
- PasswordField — TextField + botão de olho à direita (mostrar/ocultar) + variante com PasswordStrength abaixo.
- PasswordStrength — barra de 4 segmentos + texto à direita; level: 0 vazio, 1 Fraca (#B91C1C), 2 Razoável (#6B6B6B), 3 Boa (#0A0A0A), 4 Forte (#15803D).
- Checkbox — 20 px, com label; state: unchecked, checked, error.
- Alert — tone: danger, success, info; título em negrito + texto.
- BetaBadge — pill amarelo, "BETA" overline, texto preto.
- Logo — stacked; tone: on-dark, on-light.
- OpenItemTag — pill com borda TRACEJADA #8A8A8A, texto 11 px semibold #6B6B6B, ex.: "EM ABERTO · EA-04" (marca decisões ainda não tomadas).
- Chip — state: default, hover, active (fundo preto, texto branco); com contagem em cinza.
- SearchField — input 48 px com lupa à esquerda e botão "×" à direita quando preenchido.
- Select — label pequena em overline dentro do campo + valor + seta.
- PieceCard — (detalhado na mensagem 4); state: default, hover, selected.
- ColorDots — até 3 bolinhas de 14 px com borda fina + "+n".
- Badge — tone: neutral (pill branco), outline (pill com borda).
- Modal / ConfirmDialog — card branco raio 12, sombra lg, título h2, texto, ações à direita.
- Toast — fundo preto, texto branco, ponto amarelo à esquerda.
- EmptyState — ilustração de traço, título h2, texto em #6B6B6B, botão.
- SkeletonCard — formas cinza (#ECECEC) no lugar da imagem e de 2 linhas de texto.

Mostre todos os componentes e variantes organizados numa grade, com legenda.
```

### Mensagem 2 — TELA-01 Login

**Anexe:** screenshots do login em 1440 px (Padrão, Validação, Credenciais inválidas, Carregando) e em 375 px (Padrão) + o modal "Esqueci minha senha".

```text
Agora crie a TELA-01 Login usando SOMENTE os componentes e as cores da página Design system. Crie frames separados: "TELA-01 / Login / Desktop 1440" e "TELA-01 / Login / Mobile 375", e um frame para cada estado listado abaixo (nos dois tamanhos).

DESKTOP (1440): duas colunas de altura total.
- Esquerda (55%), painel EditorialPanel escuro (#0A0A0A), padding 40: no topo, Logo empilhado em branco (40 px) + BetaBadge ao lado; abaixo, a tagline "Organize. Monte. Analise. Evolua." em #A3A3A3. No meio, uma colagem de 4 cartões escuros (#1F1F1F, raio 12) com ilustrações vetoriais simples e genéricas de peças: jaqueta cinza, camiseta clara, calça cinza e um tênis AMARELO em destaque (é o único ponto amarelo da colagem). Embaixo, a citação em h2 branco: "Moda não é só o que você veste, é como você se expressa.", com aspas grandes em amarelo.
- Direita (45%), fundo #FAFAFA, formulário centralizado vertical e horizontalmente, largura máx. 400:
  overline "BEM-VINDO DE VOLTA" (#6B6B6B); título display "Entrar";
  TextField "E-mail"; PasswordField "Senha";
  linha com Checkbox "Lembrar de mim" + OpenItemTag "EM ABERTO · EA-13" à esquerda e link sublinhado "Esqueci minha senha" à direita;
  Button primary largura total "Entrar";
  texto central "Ainda não tem conta? Criar conta" (link em negrito);
  rodapé com links "Termos de uso" e "Privacidade" em #6B6B6B.

MOBILE (375): uma coluna. O painel editorial vira um cabeçalho escuro compacto (padding 24/16) só com Logo (28 px) + BetaBadge + tagline. Sem colagem e sem citação. Formulário com margens laterais de 16, título h1 32/40.

ESTADOS (um frame por estado):
1. Padrão — campos vazios.
2. Validação — e-mail "ana@" com erro "Digite um e-mail válido, como nome@exemplo.com." e senha vazia com erro "Informe sua senha.".
3. Credenciais inválidas — Alert danger no topo do formulário: título "E-mail ou senha inválidos." texto "Confira os dados e tente novamente."; e-mail preenchido, senha vazia.
4. Carregando — campos desabilitados, Button primary em loading com o texto "Entrando…".
5. Esqueci minha senha — Modal sobre a tela escurecida: título "Esqueceu a senha?", texto "Durante o beta, a redefinição é feita pelo autor. Envie uma mensagem pelo canal de feedback com o e-mail da sua conta." e Button primary "Entendi".
6. Sucesso — Toast no rodapé: "Login realizado. Redirecionando…".

NÃO inclua botões de login social (Google/Apple) — estão fora do escopo.
```

### Mensagem 3 — TELA-02 Cadastro

**Anexe:** screenshots do cadastro em 1440 px (Padrão, Validação, Sucesso) e em 375 px (Padrão).

```text
Crie a TELA-02 Cadastro com os mesmos componentes, em frames "TELA-02 / Cadastro / Desktop 1440" e "TELA-02 / Cadastro / Mobile 375", e um frame por estado.

DESKTOP (1440): layout ESPELHADO em relação ao login: formulário à ESQUERDA (45%, fundo #FAFAFA, largura máx. 480), painel escuro à DIREITA (55%).
- Formulário: overline "BETA FECHADO"; display "Criar conta"; subtítulo "Leva menos de um minuto." em #6B6B6B;
  TextField "Nome" e TextField "Sobrenome" lado a lado;
  TextField "E-mail";
  PasswordField "Senha" com PasswordStrength e ajuda "Mínimo de 8 caracteres, com letras e números.";
  PasswordField "Confirmar senha";
  Checkbox com o texto "Li e aceito os termos de uso e a política de privacidade." (os dois termos sublinhados como links);
  Button primary largura total "Criar conta";
  "Já tem conta? Entrar";
  abaixo, uma nota de design com borda TRACEJADA e fundo branco: título em negrito "Por que não pedimos altura, tom de pele ou data de nascimento?" e texto "Coletamos só o necessário para sua conta (LGPD). Nenhuma regra da análise usa esses dados hoje. Se alguma passar a usar, ela será opcional e explicada." + OpenItemTag "EM ABERTO · EA-03".
- Painel escuro: Logo + BetaBadge no topo; título h2 branco "Como funciona"; lista numerada com 3 passos (número em círculo com borda cinza e número em amarelo):
  1. "Cadastre suas peças" — "Foto, categoria, cores e modelagem."
  2. "Monte looks" — "Combine peças do seu próprio guarda-roupa."
  3. "Entenda a análise" — "Uma pontuação de 0 a 100 com justificativas, não um julgamento."
  Abaixo, o card ScorePreviewCard (#1F1F1F, raio 12): overline "EXEMPLO DE ANÁLISE", número grande "82" + "/100", barra amarela preenchida em 82%, dois critérios com ponto amarelo — "Cores: neutros com 1 ponto de destaque" e "Camadas: proporções equilibradas" — e a nota "Exemplo ilustrativo. A pontuação segue as regras do Outfit Lab, não uma medida de beleza." em #A3A3A3.

MOBILE (375): cabeçalho escuro compacto (Logo + BetaBadge); formulário em uma coluna (Nome e Sobrenome empilhados); o "Como funciona" aparece DEPOIS do formulário, num bloco escuro, só com os 3 passos (sem o card de exemplo).

ESTADOS:
1. Padrão.
2. Validação — nome "A" com erro "O nome precisa ter entre 2 e 60 caracteres."; e-mail "ana@" com "Digite um e-mail válido, como nome@exemplo.com."; senha "abc" com PasswordStrength nível 1 "Fraca" e erro "A senha precisa ter pelo menos 8 caracteres, com letras e números."; confirmação vazia com "Confirme sua senha."; checkbox com erro "Para criar a conta, aceite os termos de uso e a política de privacidade.".
3. Senhas diferentes — tudo preenchido; erro "As senhas não coincidem." na confirmação.
4. E-mail já cadastrado — erro no e-mail: "Este e-mail já tem uma conta. Entrar ou recuperar a senha." ("Entrar" como link).
5. Fora do beta — Alert danger no topo: título "Este e-mail ainda não está no beta." texto "Peça um convite ao autor.".
6. Carregando — Button em loading "Criando conta…", campos desabilitados.
7. Sucesso — o formulário é substituído por: círculo verde-claro com ✓ verde, display "Conta criada!", texto "Bem-vindo(a), Ana. Seu guarda-roupa está pronto para receber as primeiras peças.", caixa cinza com BetaBadge + "Durante o beta, os dados podem ser apagados ao final do teste." e Button primary "Ir para o guarda-roupa".
```

### Mensagem 4 — TELA-03 Meu guarda-roupa

**Anexe:** screenshots do guarda-roupa em 1440 px (Com peças, Com peças no look, Vazio, Busca sem resultado, Carregando) e em 375 px (Com peças no look).

```text
Crie a TELA-03 Meu guarda-roupa, em frames "TELA-03 / Guarda-roupa / Desktop 1440" e "TELA-03 / Guarda-roupa / Mobile 375", e um frame por estado.

DESKTOP (1440):
- Sidebar escura fixa de 248 px (#0A0A0A): Logo + BetaBadge no topo; navegação com ícones de traço: "Início", "Guarda-roupa" (ATIVO: texto branco semibold, fundo #1F1F1F e um ponto amarelo de 8 px à direita), "Montar look", "Looks salvos", "Perfil". No rodapé, separado por uma linha: avatar circular com as iniciais "AS" em amarelo, "Ana Souza" e "ana@exemplo.com" em #A3A3A3; links "Dar feedback" e "Sair".
- Conteúdo (fundo #FAFAFA, largura máx. 1200, margens 32):
  overline "COLEÇÃO PESSOAL"; display "Guarda-roupa"; "12 peças" em #6B6B6B; à direita, Button primary "+ Adicionar peça".
  Filtros: linha de Chips "Todas 12", "Partes de cima 5", "Partes de baixo 3", "Calçados 2", "Acessórios 2" (Todas ativo) + OpenItemTag "EM ABERTO · EA-04"; abaixo, SearchField "Buscar por nome ou marca" à esquerda e, à direita, Select "MODELAGEM: Todas" e Select "COR: Todas".
  Grade de PieceCards com 4 colunas e gap 24.
- PieceCard: card branco, borda #E5E5E5, raio 12, sombra sm. Área de imagem 4:5 com fundo #F2F2F2 e ilustração vetorial centralizada (≈ 68% da área). Badge neutral no canto superior esquerdo com a categoria em overline ("CIMA", "BAIXO", "CALÇADO", "ACESSÓRIO"); botão circular branco "⋯" no canto superior direito; botão na base da imagem, largura total, "+ Adicionar ao look" (secondary, 40 px). Abaixo da imagem: nome (h3, até 2 linhas), marca (caption #6B6B6B), linha com ColorDots à esquerda e Badge outline com a modelagem à direita (sem modelagem para calçados e acessórios). Estado selected: borda preta 2 px e o botão vira amarelo com "✓ No look". Estado hover: sombra md.
- As 12 peças (ilustrações genéricas, marcas FICTÍCIAS):
  1 Camiseta básica · Básicos Co. · Regular · branco
  2 Camisa oxford · Atelier Norte · Slim · azul-claro, branco
  3 Moletom com capuz · Urbano · Oversized · cinza
  4 Jaqueta jeans · Denim Lab · Cropped · azul jeans
  5 Jaqueta corta-vento · Urbano · Oversized · preto, amarelo
  6 Calça de alfaiataria · Atelier Norte · Wide · bege
  7 Calça jeans reta · Denim Lab · Regular · azul jeans
  8 Bermuda cargo · (sem marca) · Regular · verde-oliva
  9 Tênis de corrida · Passo Leve · amarelo, branco
  10 Bota chelsea · Couro & Cia · marrom
  11 Boné de aba curva · Urbano · preto, branco, vinho, cinza (mostra 3 bolinhas + "+1")
  12 Bolsa transversal · Sem marca · preto, bege — SEM FOTO: placeholder com ícone cinza da peça e o texto "Sem foto".
- LookTray (barra flutuante): aparece quando há peças selecionadas, fixa na base do conteúdo, fundo preto, raio 12, sombra lg: miniaturas sobrepostas das peças, texto "3 peças no look", Button ghost-inverse "Limpar" e Button primary "Montar look →".

MOBILE (375): sem sidebar. Cabeçalho escuro com Logo + BetaBadge e link "Dar feedback". Título h1 32/40; sem o botão "Adicionar peça" (a ação fica no "+"). Chips em linha com rolagem horizontal; SearchField em largura total; os dois Selects lado a lado. Grade de 2 colunas com gap 12; no card, o botão encurta para "+ Look". BottomNav fixa de 64 px, preta: "Início", "Guarda-roupa" (ativo, ícone amarelo), botão central circular AMARELO de 56 px com "+" (elevado, metade para fora da barra), "Looks", "Perfil". O LookTray fica logo acima da BottomNav.

ESTADOS:
1. Com peças — as 12 peças.
2. Com peças no look — Camisa oxford, Calça de alfaiataria e Tênis de corrida selecionados + LookTray "3 peças no look".
3. Carregando — cabeçalho real, filtros visíveis, 8 SkeletonCards.
4. Guarda-roupa vazio — sem filtros; EmptyState com ilustração de cabide em traço preto e um pequeno círculo amarelo, título "Seu guarda-roupa está vazio", texto "Cadastre sua primeira peça para começar a montar looks." e Button primary "+ Adicionar primeira peça".
5. Busca sem resultado — busca preenchida com "vestido"; EmptyState com lupa: "Nenhuma peça encontrada", "Nada corresponde a “vestido” com os filtros atuais." e Button secondary "Limpar busca e filtros".
6. Erro ao carregar — Alert danger "Não foi possível carregar suas peças." com Button secondary "Tentar novamente".
7. Menu do card aberto — menu suspenso sob o "⋯" com "Editar" e "Excluir" (Excluir em #B91C1C).
8. Excluir peça — ConfirmDialog: título "Excluir peça?", texto "Moletom com capuz será removida do seu guarda-roupa. Looks salvos que usam esta peça vão perder este item. Essa ação não pode ser desfeita." (nome em negrito), botões "Cancelar" (secondary) e "Excluir" (danger).
```

---

## 3. Pós-processamento no Figma Design (obrigatório para o MCP)

O Figma Make gera camadas editáveis, mas **nem sempre semanticamente limpas** (nomes genéricos, cores soltas, componentes duplicados). Sem esta etapa, o agente de código recebe "Frame 123" com HEX solto e não consegue reaproveitar nada.

### 3.1 Estrutura do arquivo `Outfit Lab — UI`

| Página | Conteúdo |
|---|---|
| `00 Capa` | Nome, versão, link para o repositório e para este prompt |
| `01 Design system` | Variáveis, estilos de texto, componentes |
| `02 TELA-01 Login` | Frames desktop e mobile × estados |
| `03 TELA-02 Cadastro` | Idem |
| `04 TELA-03 Guarda-roupa` | Idem |
| `99 Rascunhos` | O que o Figma Make gerou e ainda não foi limpo |

### 3.2 Variáveis (Local variables)

Crie uma coleção **`tokens`** com os nomes **exatamente** iguais aos tokens CSS, trocando `--` e `-` de grupo por `/`:

| Variável Figma | Token CSS | Valor |
|---|---|---|
| `color/bg` | `--color-bg` | `#FAFAFA` |
| `color/surface` | `--color-surface` | `#FFFFFF` |
| `color/image` | `--color-image` | `#F2F2F2` |
| `color/text` | `--color-text` | `#0A0A0A` |
| `color/text-strong` | `--color-text-strong` | `#1F1F1F` |
| `color/text-muted` | `--color-text-muted` | `#6B6B6B` |
| `color/border` | `--color-border` | `#E5E5E5` |
| `color/border-strong` | `--color-border-strong` | `#8A8A8A` |
| `color/inverse-bg` | `--color-inverse-bg` | `#0A0A0A` |
| `color/inverse-surface` | `--color-inverse-surface` | `#1F1F1F` |
| `color/inverse-text` | `--color-inverse-text` | `#FFFFFF` |
| `color/inverse-muted` | `--color-inverse-muted` | `#A3A3A3` |
| `color/accent` · `color/accent-hover` · `color/on-accent` | idem | `#FACC15` · `#EAB308` · `#0A0A0A` |
| `color/danger` · `color/danger-bg` | idem | `#B91C1C` · `#FEF2F2` |
| `color/success` · `color/success-bg` | idem | `#15803D` · `#F0FDF4` |
| `space/1` … `space/20` | `--space-1` … `--space-20` | 4 … 80 |
| `radius/input` · `radius/card` · `radius/pill` | idem | 8 · 12 · 999 |

E os **estilos de texto** `display`, `h1`, `h2`, `h3`, `body`, `caption`, `label`, `overline` com os valores da mensagem 1.

**Aplique as variáveis** em todas as camadas: selecione o frame → painel direito → *Selection colors* → troque cada HEX pela variável correspondente. Nenhum HEX solto deve sobrar nos frames das telas.

### 3.3 Componentes e nomes de camadas

- Um componente principal por item da mensagem 1, com **propriedades de variante** (`variant`, `state`, `tone`, `level`). As telas usam **instâncias**, não cópias.
- **Nomes de camadas em PascalCase = nomes dos componentes React** das specs: `AuthLayout`, `EditorialPanel`, `LoginForm`, `SignupForm`, `HowItWorks`, `ScorePreviewCard`, `AppShell`, `Sidebar`, `BottomNav`, `PageHeader`, `FilterChips`, `PieceGrid`, `PieceCard`, `LookTray`, `EmptyState`. O agente usa esses nomes para mapear frame → componente.
- **Auto layout** em formulários, cards, listas e barras. Espaçamentos com as variáveis `space/*`.
- Ilustrações das peças como **componentes vetoriais** (`Illustration/Tee`, `Illustration/Sneaker`…) para exportar como SVG.

### 3.4 Frames e anotações

- Nome dos frames: `TELA-0X / <Tela> / <Desktop 1440 | Mobile 375> / <Estado>`.
- Anote no próprio frame (ferramenta de anotação ou sticky ao lado) o que **não** é visual: "texto de erro conforme spec", "foco vai para o primeiro campo inválido", "toast some em 3 s". Na dúvida, a spec manda no comportamento.
- Mantenha os `OpenItemTag` [EM ABERTO]: somem quando a decisão for tomada.

---

## 4. Caminho alternativo: o agente de código envia os protótipos para o Figma

O servidor remoto do Figma MCP tem ferramentas de **escrita** (criar arquivo, gerar design, converter HTML em design), segundo fontes secundárias **[VERIFICAR]** se estão disponíveis no seu plano e assento. Se estiverem:

1. Conecte o Figma MCP ao agente de código (Guia de Kickoff, seção 7.2).
2. Peça: *"Crie o arquivo `Outfit Lab — UI` no Figma a partir de `01_login.html`, `02_cadastro.html` e `03_guarda_roupa.html`, um frame por estado (painel Estados) em 1440 e 375 px, e crie a coleção de variáveis `tokens` da seção 3.2 do PROMPT-003."*
3. Faça o pós-processamento da seção 3 do mesmo jeito.

Vantagem: fidelidade total aos protótipos já validados. Desvantagem: depende do plano e consome a cota de chamadas do MCP.

---

## 5. Checklist de entrega (antes de enviar links ao agente React)

- [ ] Arquivo `Outfit Lab — UI` com as páginas da seção 3.1.
- [ ] Coleção `tokens` com os nomes da seção 3.2 e **nenhum HEX solto** nos frames das telas.
- [ ] Estilos de texto aplicados (nada de tamanho de fonte manual).
- [ ] Componentes com variantes; telas usando instâncias.
- [ ] Camadas principais com os nomes PascalCase das specs.
- [ ] Auto layout em formulários, cards e barras.
- [ ] Frames 1440 e 375 para cada tela, com **todos** os estados das mensagens 2–4.
- [ ] Textos idênticos às specs; amarelo nunca como texto sobre claro; sem marcas reais nem fotos.
- [ ] Ilustrações como componentes vetoriais exportáveis em SVG.
- [ ] Link do arquivo registrado no `b_doc_repo/README.md` (seção Design).
- [ ] Mudança visual relevante em relação ao protótipo HTML (ex.: novo layout) registrada como decisão no Registro de Decisões.

## 6. Próximo passo

Com o checklist completo, abra uma issue e envie ao agente de código, por exemplo:

> Implemente a TELA-01 Login em React a partir dos frames `<link desktop>` e `<link mobile>` do Figma, seguindo `b_doc_repo/c_design/c_specs/TELA-01_login.md` e as regras de Figma → React do `AGENTS.md`.

As telas 04–09 seguem o mesmo formato num novo prompt (PROMPT-005), a partir das specs geradas no PROMPT-004 (requisitos).

---

## 📚 Por que este prompt existe

Os protótipos HTML provaram o design, mas são ruins de editar: cada ajuste visual exige mexer em CSS. O Figma devolve essa flexibilidade a você. O valor real, porém, está na organização: variáveis com os mesmos nomes dos tokens e componentes com os mesmos nomes do React fazem o Figma e o código falarem a mesma língua. Assim, o agente que lê o frame pelo MCP reaproveita o que já existe em vez de recriar a tela do zero a cada mudança.
