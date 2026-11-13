# PROMPT 003 — Telas 01–03 no Figma (base do fluxo Figma ↔ React via MCP)

| Campo | Valor |
|---|---|
| ID | PROMPT-003 |
| Versão | 1.1 |
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
| 1.1 | 13/11/2026 | Mensagens reorganizadas em 9 partes de até 2.000 caracteres (limite do chat do Figma Make), sem perda de conteúdo. |

---

## 0. Como usar (visão geral)

O objetivo é ter as telas num formato **editável** (Figma) e organizado de um jeito que o **agente de código leia pelo Figma MCP** e traduza para React com os componentes e tokens do projeto.

| Passo | Onde | O quê | Tempo |
|---|---|---|---|
| 1 | Navegador | Abra os 3 protótipos HTML e tire **screenshots** de cada estado importante em 1440 px e 375 px (painel "◐ Estados") | 15 min |
| 2 | Figma Make | Cole as **partes 1 a 9 da seção 2** (até 2.000 caracteres cada), **uma por vez**, anexando os screenshots indicados. Revise o preview antes de mandar a próxima | 50 min |
| 3 | Figma Make → Figma Design | Use **Copy design** (copiar como camadas de design) e cole num arquivo novo do Figma Design chamado **`Outfit Lab — UI`** | 5 min |
| 4 | Figma Design | Faça o **pós-processamento** da seção 3 (variáveis, componentes, nomes, frames). É o que deixa o MCP útil | 60–90 min |
| 5 | Figma Design | Confira o **checklist de entrega** (seção 5) | 10 min |
| 6 | Agente de código | Envie os **links dos frames** + a spec da tela; o agente gera o React (Guia de Kickoff, seção 7.2) | — |

> **Caminho alternativo (seção 4):** em vez do Figma Make, o agente de código pode enviar os protótipos HTML direto para o Figma pelas ferramentas de escrita do Figma MCP, se estiverem disponíveis no seu plano **[VERIFICAR]**.

---

## 1. Regras que valem para todas as partes

Estas regras já estão embutidas nas partes da seção 2. Use-as também para revisar o que o Figma Make gerar:

1. **Tokens exatos.** Nenhuma cor, fonte, espaçamento ou raio fora das partes 1 e 2.
2. **60/30/10.** 60% neutros claros, 30% escuros, 10% amarelo `#FACC15`. Amarelo **nunca** como texto sobre fundo claro, nunca em áreas grandes.
3. **Textos finais em português** exatamente como nas partes (vieram das specs).
4. **Sem marcas reais, sem logos, sem fotos de pessoas.** Peças = ilustrações vetoriais simples e genéricas.
5. **Nomes de componentes = nomes do React** (`PieceCard`, `TextField`…). É isso que permite ao agente reaproveitar o código.
6. **Auto layout em tudo.** Nada posicionado "na mão", exceto as ilustrações da colagem do login.

---

## 2. Partes para colar no Figma Make (máx. 2.000 caracteres cada)

O chat do Figma Make aceita no máximo **2.000 caracteres por mensagem**. O conteúdo completo tem ~15 mil, então foi dividido em **9 partes sequenciais** em vez de resumido: um resumo de 2.000 caracteres perderia os valores dos tokens, os textos finais e os estados, e o agente inventaria o resto. O Figma Make guarda o contexto da conversa, então cada parte se apoia nas anteriores.

**Como enviar:** uma parte por vez, na ordem. Revise o resultado no preview antes de mandar a próxima; se algo sair errado, corrija com uma mensagem curta ("na TELA-01, o link 'Esqueci minha senha' fica à direita") antes de seguir. Screenshots anexados não contam no limite de caracteres.

| Parte | Conteúdo | Caracteres | Anexar |
|---|---|---|---|
| 1 | Contexto e cores | 1.533 | nada |
| 2 | Tipografia. espaços e componentes base | 1.708 | nada |
| 3 | Componentes de catálogo | 1.823 | nada |
| 4 | TELA-01 Login — Padrão | 1.475 | screenshots do login em 1440 e 375 px (Padrão) |
| 5 | TELA-01 Login — estados | 906 | screenshots do login: Validação, Credenciais inválidas, Carregando e o modal "Esqueci minha senha" |
| 6 | TELA-02 Cadastro — Padrão | 1.952 | screenshots do cadastro em 1440 e 375 px (Padrão) |
| 7 | TELA-02 Cadastro — estados | 1.258 | screenshots do cadastro: Validação e Sucesso |
| 8 | TELA-03 Guarda-roupa — desktop | 1.872 | screenshot do guarda-roupa em 1440 px (Com peças) |
| 9 | TELA-03 Guarda-roupa — mobile e estados | 1.899 | screenshots do guarda-roupa: 375 px com peças no look, Vazio, Busca sem resultado e Carregando |

### Parte 1 — Contexto e cores

**Anexe:** nada.

```text
[Parte 1 de 9 · Outfit Lab] Vou mandar o projeto em 9 partes. Guarde tudo como contexto; cada parte acrescenta algo ao mesmo arquivo.

Projeto: "Outfit Lab", app web de guarda-roupa digital. O usuário cadastra peças de roupa (foto + atributos), monta looks e recebe uma análise explicável (nota de 0 a 100 com justificativas). Estilo EDITORIAL MINIMALISTA: catálogo de moda, muito espaço em branco, peças como protagonistas, tipografia forte, um único acento amarelo inspirado num tênis. Público: beta com amigos, mais no celular. Textos em português do Brasil.

Nesta parte crie só a página "Design system" com as VARIÁVEIS de cor (nome = valor):
color/bg #FAFAFA (fundo da página)
color/surface #FFFFFF (cards, inputs)
color/image #F2F2F2 (fundo de imagem)
color/text #0A0A0A
color/text-strong #1F1F1F
color/text-muted #6B6B6B
color/border #E5E5E5 (divisores, borda de card)
color/border-strong #8A8A8A (borda de input)
color/inverse-bg #0A0A0A (sidebar, painel escuro)
color/inverse-surface #1F1F1F
color/inverse-text #FFFFFF
color/inverse-muted #A3A3A3
color/accent #FACC15 · color/accent-hover #EAB308 · color/on-accent #0A0A0A
color/danger #B91C1C · color/danger-bg #FEF2F2
color/success #15803D · color/success-bg #F0FDF4

Regra 60/30/10: 60% neutros claros, 30% escuros (texto, painéis, chips ativos), 10% amarelo (botão principal, item ativo, selo Beta, indicadores). O amarelo NUNCA é texto sobre fundo claro e NUNCA preenche áreas grandes; sobre fundo escuro pode ser texto ou ícone. Use só estas cores em todas as partes.
```

### Parte 2 — Tipografia, espaços e componentes base

**Anexe:** nada.

```text
[Parte 2 de 9] Continue a página "Design system".

TIPOGRAFIA Inter (crie estilos de texto):
display 40/48 bold, tracking -2% · h1 32/40 semibold · h2 24/32 semibold · h3 18/24 medium · body 16/24 regular · caption 14/20 regular · label 14/20 medium · overline 12/16 semibold MAIÚSCULAS tracking 8%.
Logo: "Outfit" e "Lab" empilhados, Inter 800, tracking -3%, entrelinha 0.95, sem "™".

ESPAÇOS (variáveis space/): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80.
RAIOS: input/botão 8 · card/modal 12 · chip/selo 999.
SOMBRAS (preto #0A0A0A): sm 0 1 2 6% · md 0 4 16 8% · lg 0 12 32 14%.
FOCO: contorno preto 2 px + halo amarelo até 5 px.
Alvos de toque ≥ 44 px; inputs e botões com 48 px de altura.

COMPONENTES (nomes exatos, com variantes):
- Button: variant primary (amarelo, texto preto) | secondary (branco, borda preta) | dark | ghost-inverse (transparente sobre escuro) | danger (#B91C1C, texto branco); state default | hover | focus | disabled | loading (spinner + texto).
- TextField: label acima, input 48 px, borda border-strong 1 px; state default | hover | focus | filled | disabled | error (borda danger 2 px + ícone + mensagem caption danger abaixo); texto de ajuda opcional em text-muted.
- PasswordField: TextField + botão de olho à direita.
- PasswordStrength: 4 segmentos + texto; level 1 Fraca (danger), 2 Razoável (text-muted), 3 Boa (text), 4 Forte (success).
- Checkbox 20 px com label; state unchecked | checked | error.
- Alert: tone danger | success | info; título em negrito + texto.
- BetaBadge: pill amarelo "BETA" (overline, texto preto).
- Logo: tone on-dark | on-light.
- OpenItemTag: pill com borda TRACEJADA border-strong, texto 11 px semibold text-muted, ex. "EM ABERTO · EA-04".
```

### Parte 3 — Componentes de catálogo

**Anexe:** nada.

```text
[Parte 3 de 9] Termine a página "Design system" com estes componentes:

- Chip: state default | hover | active (fundo inverse-bg, texto branco); contagem em text-muted ao lado do rótulo.
- SearchField: input 48 px com lupa à esquerda e botão "×" à direita quando preenchido.
- Select: rótulo pequeno em overline dentro do campo (ex. "MODELAGEM") + valor + seta.
- PieceCard: card branco, borda color/border, raio 12, sombra sm. Imagem 4:5 com fundo color/image e ilustração vetorial centralizada (~68%). Badge com a categoria em overline no canto superior esquerdo; botão circular branco "⋯" no superior direito; botão na base da imagem, largura total, "+ Adicionar ao look" (secondary, 40 px). Abaixo: nome (h3, até 2 linhas), marca (caption text-muted), ColorDots à esquerda e Badge outline com a modelagem à direita. state default | hover (sombra md) | selected (borda preta 2 px e botão amarelo "✓ No look").
- ColorDots: até 3 bolinhas de 14 px com borda fina + "+n".
- Badge: tone neutral (pill branco) | outline (pill com borda).
- ConfirmDialog: card branco raio 12, sombra lg, título h2, texto, ações à direita.
- Toast: fundo preto, texto branco, ponto amarelo à esquerda.
- EmptyState: ilustração de traço, título h2, texto text-muted, botão.
- SkeletonCard: formas #ECECEC no lugar da imagem e de 2 linhas.
- LookTray: barra preta raio 12 sombra lg com miniaturas sobrepostas, texto "3 peças no look", Button ghost-inverse "Limpar" e Button primary "Montar look →".
- Sidebar e BottomNav (detalhes na parte 8).

Ilustrações das peças: vetores simples, planos, genéricos (camiseta, camisa, moletom, jaqueta, calça, bermuda, tênis, bota, boné, bolsa), cada uma como componente "Illustration/Nome". Sem marcas, logos ou fotos de pessoas.
Organize tudo em grade com legenda. Use auto layout em todos os componentes.
```

### Parte 4 — TELA-01 Login — Padrão

**Anexe:** screenshots do login em 1440 e 375 px (Padrão).

```text
[Parte 4 de 9] Crie a TELA-01 Login (estado Padrão) usando só os componentes e variáveis do Design system. Frames: "TELA-01 / Login / Desktop 1440 / Padrão" e "TELA-01 / Login / Mobile 375 / Padrão".

DESKTOP (1440) — duas colunas de altura total (AuthLayout):
ESQUERDA 55% — EditorialPanel, fundo inverse-bg, padding 40:
- topo: Logo on-dark (40 px) + BetaBadge ao lado; abaixo a tagline "Organize. Monte. Analise. Evolua." em inverse-muted;
- meio: colagem de 4 cartões inverse-surface (raio 12) com ilustrações: jaqueta cinza, camiseta clara, calça cinza e um TÊNIS AMARELO em destaque (único amarelo da colagem);
- base: citação em h2 branco "Moda não é só o que você veste, é como você se expressa." com aspas grandes amarelas.
DIREITA 45% — fundo bg, LoginForm centralizado, largura máx. 400:
- overline "BEM-VINDO DE VOLTA" (text-muted) + display "Entrar";
- TextField "E-mail"; PasswordField "Senha";
- linha: Checkbox "Lembrar de mim" + OpenItemTag "EM ABERTO · EA-13" à esquerda; link sublinhado "Esqueci minha senha" à direita;
- Button primary largura total "Entrar";
- texto central "Ainda não tem conta? Criar conta" (link em negrito);
- rodapé com links "Termos de uso" e "Privacidade" em text-muted.

MOBILE (375) — uma coluna: o painel vira um cabeçalho escuro compacto (padding 24/16) só com Logo 28 px + BetaBadge + tagline (sem colagem e sem citação). Formulário com margens de 16 e título h1.

NÃO inclua login social (Google/Apple): está fora do escopo.
```

### Parte 5 — TELA-01 Login — estados

**Anexe:** screenshots do login: Validação, Credenciais inválidas, Carregando e o modal "Esqueci minha senha".

```text
[Parte 5 de 9] Duplique os frames da TELA-01 e crie um frame por estado, em 1440 e 375, nomeados "TELA-01 / Login / <tamanho> / <estado>":

1. Validação — e-mail "ana@" com erro "Digite um e-mail válido, como nome@exemplo.com."; senha vazia com erro "Informe sua senha.".
2. Credenciais inválidas — Alert danger no topo do formulário: título "E-mail ou senha inválidos." e texto "Confira os dados e tente novamente."; e-mail preenchido, senha vazia.
3. Carregando — campos desabilitados; Button primary em loading com o texto "Entrando…".
4. Esqueci minha senha — ConfirmDialog sobre a tela escurecida: título "Esqueceu a senha?", texto "Durante o beta, a redefinição é feita pelo autor. Envie uma mensagem pelo canal de feedback com o e-mail da sua conta." e um único Button primary "Entendi".
5. Sucesso — Toast no rodapé: "Login realizado. Redirecionando…".

Mantenha os textos exatamente como escritos.
```

### Parte 6 — TELA-02 Cadastro — Padrão

**Anexe:** screenshots do cadastro em 1440 e 375 px (Padrão).

```text
[Parte 6 de 9] Crie a TELA-02 Cadastro (estado Padrão). Frames "TELA-02 / Cadastro / Desktop 1440 / Padrão" e "… / Mobile 375 / Padrão".

DESKTOP — layout ESPELHADO do login: formulário à ESQUERDA (45%, fundo bg, largura máx. 480) e painel escuro à DIREITA (55%).
SignupForm:
- overline "BETA FECHADO"; display "Criar conta"; subtítulo "Leva menos de um minuto." (text-muted);
- TextField "Nome" e TextField "Sobrenome" lado a lado; TextField "E-mail";
- PasswordField "Senha" + PasswordStrength + ajuda "Mínimo de 8 caracteres, com letras e números.";
- PasswordField "Confirmar senha";
- Checkbox "Li e aceito os termos de uso e a política de privacidade." (os dois termos como links);
- Button primary largura total "Criar conta"; texto "Já tem conta? Entrar";
- nota com borda TRACEJADA e fundo branco: título em negrito "Por que não pedimos altura, tom de pele ou data de nascimento?", texto "Coletamos só o necessário para sua conta (LGPD). Nenhuma regra da análise usa esses dados hoje. Se alguma passar a usar, ela será opcional e explicada." + OpenItemTag "EM ABERTO · EA-03".
Painel escuro: Logo + BetaBadge; h2 branco "Como funciona"; lista HowItWorks com número em círculo (borda cinza, número amarelo):
1 "Cadastre suas peças" — "Foto, categoria, cores e modelagem."
2 "Monte looks" — "Combine peças do seu próprio guarda-roupa."
3 "Entenda a análise" — "Uma pontuação de 0 a 100 com justificativas, não um julgamento."
ScorePreviewCard (inverse-surface, raio 12): overline "EXEMPLO DE ANÁLISE", "82" grande + "/100", barra amarela em 82%, critérios com ponto amarelo "Cores: neutros com 1 ponto de destaque" e "Camadas: proporções equilibradas", nota "Exemplo ilustrativo. A pontuação segue as regras do Outfit Lab, não uma medida de beleza." (inverse-muted).

MOBILE — cabeçalho escuro (Logo + BetaBadge); formulário em uma coluna (Nome e Sobrenome empilhados); "Como funciona" DEPOIS do formulário, num bloco escuro, só com os 3 passos.
```

### Parte 7 — TELA-02 Cadastro — estados

**Anexe:** screenshots do cadastro: Validação e Sucesso.

```text
[Parte 7 de 9] Crie os estados da TELA-02, em 1440 e 375, nomeados "TELA-02 / Cadastro / <tamanho> / <estado>":

1. Validação — nome "A": "O nome precisa ter entre 2 e 60 caracteres."; e-mail "ana@": "Digite um e-mail válido, como nome@exemplo.com."; senha "abc" com PasswordStrength nível 1 "Fraca" e erro "A senha precisa ter pelo menos 8 caracteres, com letras e números."; confirmação vazia: "Confirme sua senha."; checkbox: "Para criar a conta, aceite os termos de uso e a política de privacidade.".
2. Senhas diferentes — tudo preenchido; erro "As senhas não coincidem." na confirmação.
3. E-mail já cadastrado — erro no e-mail: "Este e-mail já tem uma conta. Entrar ou recuperar a senha." ("Entrar" é link).
4. Fora do beta — Alert danger no topo: "Este e-mail ainda não está no beta." / "Peça um convite ao autor.".
5. Carregando — Button em loading "Criando conta…", campos desabilitados.
6. Sucesso — o formulário vira: círculo success-bg com ✓ verde, display "Conta criada!", texto "Bem-vindo(a), Ana. Seu guarda-roupa está pronto para receber as primeiras peças.", caixa cinza com BetaBadge + "Durante o beta, os dados podem ser apagados ao final do teste." e Button primary "Ir para o guarda-roupa".

Mantenha os textos exatamente como escritos.
```

### Parte 8 — TELA-03 Guarda-roupa — desktop

**Anexe:** screenshot do guarda-roupa em 1440 px (Com peças).

```text
[Parte 8 de 9] Crie a TELA-03 Meu guarda-roupa. Frame "TELA-03 / Guarda-roupa / Desktop 1440 / Com peças" (o mobile vem na parte 9).

DESKTOP (AppShell):
- Sidebar fixa de 248 px, inverse-bg: Logo + BetaBadge; navegação com ícones de traço "Início", "Guarda-roupa" (ATIVO: texto branco semibold, fundo inverse-surface, ponto amarelo de 8 px à direita), "Montar look", "Looks salvos", "Perfil". Rodapé separado por linha: avatar com iniciais "AS" em amarelo, "Ana Souza", "ana@exemplo.com" (inverse-muted), links "Dar feedback" e "Sair".
- Conteúdo (fundo bg, largura máx. 1200, margens 32), PageHeader: overline "COLEÇÃO PESSOAL", display "Guarda-roupa", "12 peças" (text-muted) e, à direita, Button primary "+ Adicionar peça".
- Filtros: FilterChips "Todas 12" (ativo), "Partes de cima 5", "Partes de baixo 3", "Calçados 2", "Acessórios 2" + OpenItemTag "EM ABERTO · EA-04"; abaixo SearchField "Buscar por nome ou marca" e, à direita, Select "MODELAGEM: Todas" e Select "COR: Todas".
- PieceGrid de PieceCards: 4 colunas, gap 24.
Peças (marcas FICTÍCIAS; nome · marca · modelagem · cores):
1 Camiseta básica · Básicos Co. · Regular · branco
2 Camisa oxford · Atelier Norte · Slim · azul-claro, branco
3 Moletom com capuz · Urbano · Oversized · cinza
4 Jaqueta jeans · Denim Lab · Cropped · azul jeans
5 Jaqueta corta-vento · Urbano · Oversized · preto, amarelo
6 Calça de alfaiataria · Atelier Norte · Wide · bege
7 Calça jeans reta · Denim Lab · Regular · azul jeans
8 Bermuda cargo · (sem marca) · Regular · verde-oliva
9 Tênis de corrida · Passo Leve · — · amarelo, branco
10 Bota chelsea · Couro & Cia · — · marrom
11 Boné de aba curva · Urbano · — · preto, branco, vinho, cinza (3 bolinhas + "+1")
12 Bolsa transversal · Sem marca · — · preto, bege — SEM FOTO: ícone cinza + "Sem foto"
Categorias no Badge: CIMA (1–5), BAIXO (6–8), CALÇADO (9–10), ACESSÓRIO (11–12).
```

### Parte 9 — TELA-03 Guarda-roupa — mobile e estados

**Anexe:** screenshots do guarda-roupa: 375 px com peças no look, Vazio, Busca sem resultado e Carregando.

```text
[Parte 9 de 9] Crie "TELA-03 / Guarda-roupa / Mobile 375 / Com peças":
Sem sidebar; cabeçalho escuro com Logo + BetaBadge e link "Dar feedback"; título h1; sem o botão "Adicionar peça"; chips com rolagem horizontal; busca em largura total; os 2 Selects lado a lado; grade de 2 colunas, gap 12; no card o botão vira "+ Look". BottomNav preta de 64 px: "Início", "Guarda-roupa" (ativo, ícone amarelo), botão central circular AMARELO de 56 px com "+" (metade para fora da barra), "Looks", "Perfil".

Depois, os estados da TELA-03 em 1440 e 375 ("TELA-03 / Guarda-roupa / <tamanho> / <estado>"):

1. Com peças no look — Camisa oxford, Calça de alfaiataria e Tênis de corrida em state selected + LookTray "3 peças no look" (no mobile, logo acima da BottomNav).
2. Carregando — cabeçalho e filtros visíveis, 8 SkeletonCards.
3. Guarda-roupa vazio — sem filtros; EmptyState com cabide em traço preto e um pequeno círculo amarelo: "Seu guarda-roupa está vazio" / "Cadastre sua primeira peça para começar a montar looks." / Button primary "+ Adicionar primeira peça".
4. Busca sem resultado — busca "vestido"; EmptyState com lupa: "Nenhuma peça encontrada" / "Nada corresponde a “vestido” com os filtros atuais." / Button secondary "Limpar busca e filtros".
5. Erro ao carregar — Alert danger "Não foi possível carregar suas peças." + Button secondary "Tentar novamente".
6. Menu do card aberto — menu sob o "⋯" com "Editar" e "Excluir" (Excluir em danger).
7. Excluir peça — ConfirmDialog: "Excluir peça?" / "Moletom com capuz será removida do seu guarda-roupa. Looks salvos que usam esta peça vão perder este item. Essa ação não pode ser desfeita." (nome em negrito) / botões "Cancelar" (secondary) e "Excluir" (danger).

Por fim, revise todas as telas: nenhuma cor fora das variáveis, amarelo nunca como texto sobre fundo claro, textos exatamente como enviados, auto layout em formulários, cards e barras.
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

E os **estilos de texto** `display`, `h1`, `h2`, `h3`, `body`, `caption`, `label`, `overline` com os valores da parte 2.

**Aplique as variáveis** em todas as camadas: selecione o frame → painel direito → *Selection colors* → troque cada HEX pela variável correspondente. Nenhum HEX solto deve sobrar nos frames das telas.

### 3.3 Componentes e nomes de camadas

- Um componente principal por item das partes 2 e 3, com **propriedades de variante** (`variant`, `state`, `tone`, `level`). As telas usam **instâncias**, não cópias.
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
- [ ] Frames 1440 e 375 para cada tela, com **todos** os estados das partes 4–9.
- [ ] Textos idênticos às specs; amarelo nunca como texto sobre claro; sem marcas reais nem fotos.
- [ ] Ilustrações como componentes vetoriais exportáveis em SVG.
- [ ] Link do arquivo registrado no `b_doc_repo/README.md` (seção Design).
- [ ] Mudança visual relevante em relação ao protótipo HTML (ex.: novo layout) registrada como decisão no Registro de Decisões.

## 6. Próximo passo

Com o checklist completo, abra uma issue e envie ao agente de código, por exemplo:

> Implemente a TELA-01 Login em React a partir dos frames `<link desktop>` e `<link mobile>` do Figma, seguindo `b_doc_repo/c_design/c_specs/TELA-01_login.md` e as regras de Figma → React do `AGENTS.md`.

As telas 04–09 seguem o mesmo formato num novo prompt (PROMPT-005), a partir das specs geradas no PROMPT-004 (requisitos).

---

