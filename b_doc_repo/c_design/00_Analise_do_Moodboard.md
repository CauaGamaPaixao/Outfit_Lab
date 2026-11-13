# Análise do Moodboard — Outfit Lab

| Campo | Valor |
|---|---|
| Documento | Análise do moodboard v0 e enhancements de design |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.1 (Parte B1) |
| Status | Em revisão |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial. |

> **[VERIFICAR] Fonte da análise.** O arquivo `c_design/a_referencias/moodboard_v0.png` ainda não está no repositório. Esta análise foi feita a partir da descrição do moodboard no PROMPT-001 (B1) e da direção visual do PRD v1.1 (seção 12). Quando a imagem for adicionada, confira os itens marcados com 🔍 e registre as diferenças numa v1.1 deste documento.

---

## 1. Leitura geral

O moodboard segue a direção **Editorial Minimalista** (D-12): fundo claro, muito espaço em branco, imagens como protagonistas, tipografia Inter com hierarquia forte e um único acento amarelo, inspirado num sneaker, que guia o olhar para a ação principal. A sensação é de catálogo de moda curado, não de painel administrativo, como pede o PRD (10.3).

## 2. O que manter

| # | Elemento | Como entra no design system | Onde |
|---|---|---|---|
| M1 | **Tipografia Inter** e a hierarquia: H1 32/40 semibold, H2 24/32 semibold, H3 18/24 medium, Body 16/24 regular, Caption 14/20 regular | Tokens `--font-*` e `--text-*` | [Tokens](b_tokens/design_tokens.md#3-tipografia) |
| M2 | Logo **"Outfit Lab"** empilhado ("Outfit" / "Lab"), peso bold/extra-bold | Componente `<Logo stacked />`. O "™" fica fora da interface até o EA-01 ser resolvido | Telas 01–03 |
| M3 | Tagline **"Organize. Monte. Analise. Evolua."** | Painel editorial do login e do cadastro | TELA-01, TELA-02 |
| M4 | **Cards editoriais** com a imagem como protagonista (proporção ~4:5) | `<PieceCard>` com área de imagem `--color-image` | TELA-03 |
| M5 | Fotografia neutra/P&B com **sneakers amarelos** como ponto focal | Nos protótipos, ilustrações SVG genéricas em tons neutros, com o sneaker amarelo como único destaque (ver E6) | TELA-01, TELA-03 |
| M6 | **CTA amarelo** com texto preto | Token `--color-accent` + `--color-on-accent` | Todas |
| M7 | Muito **espaço em branco** | Escala de espaçamento de 4 px, seções com 48–64 px | Todas |
| M8 | **Navegação inferior no mobile** com botão "+" amarelo central | `<BottomNav>` com `<FabAdd>` | TELA-03 |

🔍 Conferir na imagem: pesos exatos do logo, proporção dos cards e se a navegação inferior tem 4 ou 5 itens.

## 3. Enhancements obrigatórios

| # | Enhancement | O que muda | Justificativa |
|---|---|---|---|
| E1 | **Cadastro com o mínimo de dados** | Só nome, sobrenome, e-mail, senha, confirmação de senha e aceite dos termos e da política de privacidade. Altura, tom de pele, sexo e data de nascimento **saem do formulário**. | LGPD e RNF-15 (coleta mínima). Nenhuma regra do avaliador usa esses dados ainda. **[EM ABERTO] EA-03**: revisar só se uma regra precisar deles (decidir no PROMPT-010, até 09/12/2026). Tom de pele e sexo são dados sensíveis ou quase sensíveis, e pedi-los sem uso real afasta os beta testers. |
| E2 | **Login social fora do MVP** | Os botões Google/Apple são **removidos**. | Escopo: Won't. Botão desabilitado com "em breve" ocupa espaço e frustra; remover é mais honesto e mais simples. |
| E3 | **Contraste** | Amarelo `#FACC15` **nunca** como texto sobre fundo claro (1,47:1). Sempre como **preenchimento**, com texto `#0A0A0A` (12,93:1). Sobre fundo escuro, o amarelo pode ser texto ou ícone (12,93:1). | WCAG 2.1 AA (RNF-09). |
| E4 | **Estados explícitos** (RF-12) | Padrão, hover, foco, validação, erro, carregando (spinner/skeleton), vazio e sucesso em todas as telas, acessíveis pelo painel "Estados" dos protótipos. | Sem estados, a LLM inventa comportamentos na implementação. |
| E5 | **Hierarquia e respiro** | Títulos editoriais maiores (display 40/48 no desktop), labels com no mínimo 13 px (adotado: 14 px), alvos de toque com no mínimo 44 px (adotado: 48 px nos inputs e botões). | Legibilidade e WCAG 2.5.5 (alvo de toque). |
| E6 | **Sem marcas de terceiros e sem pessoas reais** | Marcas aparecem só como texto digitado pelo usuário. Nos protótipos, **ilustrações SVG genéricas** das peças (camiseta, calça, sneaker, jaqueta, boné…). | Direitos de imagem e de marca; o portfólio é público. |
| E7 | **Recuperação de senha** | Link "Esqueci minha senha" no login, classificado como **Should** (Declaração de Escopo 6.1, D-24). No protótipo, o link abre um aviso explicando o plano B (reset manual durante o beta). | Amigos vão esquecer a senha; o plano B evita bloquear a SPR-02. |
| E8 | **Responsividade** | Desktop: auth em duas colunas (painel editorial escuro + formulário) e app com **sidebar escura** e conteúdo claro. Mobile: uma coluna, painel editorial reduzido a um cabeçalho, navegação inferior e CTA flutuante. | RNF-02; os amigos vão usar principalmente o celular. |

### 3.1 Enhancements adicionais (decorrentes da verificação de acessibilidade)

| # | Enhancement | Justificativa |
|---|---|---|
| E9 | Bordas de **inputs** usam `--color-border-strong` `#8A8A8A` (3,45:1), não `#E5E5E5` (1,26:1). `#E5E5E5` fica para divisores e bordas de cards. | WCAG 1.4.11: o limite de um campo precisa de contraste ≥ 3:1. |
| E10 | **Anel de foco** em duas camadas: contorno `#0A0A0A` de 2 px + halo amarelo de 4 px. | O amarelo sozinho tem 1,47:1 sobre o off-white e não seria visível como foco. |
| E11 | **Selo "Beta"** ao lado do logo. | Declaração de Escopo 6.10 (Must). |
| E12 | Texto secundário `#6B6B6B` **não** é usado sobre `#F2F2F2` em tamanho menor que 14 px (4,76:1, no limite). | Margem de segurança no AA. |

## 4. O que não manter

- **"™" no logo**: fora da interface até a verificação do nome (EA-01).
- **Campos corporais** no cadastro (E1).
- **Botões de login social** (E2).
- 🔍 Qualquer texto em amarelo sobre fundo claro que exista no moodboard (E3).

## 5. Decisões e pontos em aberto desta análise

| Tipo | Item | Recomendação | Prazo |
|---|---|---|---|
| Decisão proposta | D-26: bordas de input e anel de foco acessíveis (E9, E10) | Adotar | Revisão da Parte B |
| Decisão proposta | D-27: login social removido (não "em breve") | Adotar | Revisão da Parte B |
| [EM ABERTO] | EA-03: dados corporais | Fora do cadastro | 09/12/2026 (PROMPT-010) |
| [EM ABERTO] | EA-04: taxonomia de categorias | Usar as 4 do PRD nos protótipos | 18/11/2026 (PROMPT-003) |
| [VERIFICAR] | Conferir esta análise com `moodboard_v0.png` | Adicionar a imagem em `c_design/a_referencias/` | Antes da aprovação |

---

## 📚 Por que este documento existe

O moodboard mostra o clima do produto, mas não diz o que é regra e o que é acidente da imagem. Esta análise separa o que vira padrão (tipografia, acento amarelo, cards editoriais) do que precisa mudar por acessibilidade, privacidade ou escopo. Assim, os tokens, as specs e os protótipos partem das mesmas escolhas, e a LLM que gerar o código não copia um problema do moodboard achando que é intenção.
