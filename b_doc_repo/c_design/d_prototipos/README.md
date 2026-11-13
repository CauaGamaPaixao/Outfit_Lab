# Protótipos navegáveis — Outfit Lab

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Data | 13/11/2026 |
| Gerado por | PROMPT-001 v2.1 (Parte B4/B5) |
| Status | Em revisão |

Cada protótipo é um HTML autocontido (HTML + CSS + JS puro, fonte Inter via Google Fonts, sem build). Abra direto no navegador ou publique no GitHub Pages. No canto da tela, o botão **◐ Estados** alterna os estados de cada tela.

| Tela | Arquivo | Spec | Estados no painel |
|---|---|---|---|
| TELA-01 Login | [`01_login.html`](01_login.html) | [TELA-01](../c_specs/TELA-01_login.md) | Padrão · Validação · Credenciais inválidas · Carregando · Sucesso · Esqueci minha senha |
| TELA-02 Cadastro | [`02_cadastro.html`](02_cadastro.html) | [TELA-02](../c_specs/TELA-02_cadastro.md) | Padrão · Validação · Senhas diferentes · E-mail já cadastrado · Fora do beta · Carregando · Sucesso |
| TELA-03 Guarda-roupa | [`03_guarda_roupa.html`](03_guarda_roupa.html) | [TELA-03](../c_specs/TELA-03_guarda_roupa.md) | Com peças · Carregando · Vazio · Busca sem resultado · Erro · Com peças no look |

**Dados de simulação:** no login, a senha `senha123` entra e qualquer outra dá "credenciais inválidas". No cadastro, `ja@exemplo.com` simula e-mail já cadastrado e qualquer e-mail `@fora.com` simula "fora do beta". O guarda-roupa usa 12 peças mockadas com marcas fictícias; a busca, os chips, os selects, a seleção para o look e a exclusão funcionam.

## Checklist de validação do design (B5)

| Item | Resultado | Evidência |
|---|---|---|
| Proporção 60/30/10 respeitada em cada tela | ✅ | Fundos `#FAFAFA`/`#FFFFFF`/`#F2F2F2` dominam; preto só no painel editorial, sidebar, textos e chips ativos; amarelo só em CTA, selo Beta, item ativo, "No look", pontuação e "+". No auth, o painel escuro ocupa ~50% da tela no desktop: é a área de marca, e o formulário (onde a pessoa age) segue neutro. |
| Contraste WCAG AA em todos os textos | ✅ | Menor razão de texto: `#6B6B6B` sobre `#F2F2F2` = 4,76:1 (usado só ≥ 14 px). Amarelo nunca é texto sobre claro. Bordas de input 3,45:1 (WCAG 1.4.11). Tabela em [`design_tokens.md`](../b_tokens/design_tokens.md). |
| Todo campo com `<label>`, foco visível e navegação por teclado | ✅ | Labels associados (a busca usa label `sr-only`); `:focus-visible` com anel preto + amarelo; modais com foco preso e `Esc`; menu ⋯ abre com foco no primeiro item e fecha com `Esc`. |
| Layout funcional em 375 px e 1440 px | ✅ | Testado no navegador nos dois tamanhos, sem rolagem horizontal. Grid 2 → 3 → 4 colunas; sidebar ↔ barra inferior; auth em 1 ↔ 2 colunas. |
| Todos os estados acessíveis pelo painel "Estados" | ✅ | Ver tabela acima. |
| Nenhuma decisão em aberto apresentada como definitiva | ✅ | Selos pontilhados: EA-13 ("Lembrar de mim"), EA-03 (dados corporais), EA-04 (taxonomia). Recuperação de senha mostra o plano B do beta. |
| Nenhum logo de marca, foto de pessoa real ou imagem externa | ✅ | Ilustrações SVG inline e genéricas; marcas fictícias como texto. Único recurso externo: a fonte Inter (Google Fonts). |

**Limitação conhecida:** a análise do moodboard foi feita sem a imagem `moodboard_v0.png`, que ainda não está no repositório ([VERIFICAR] em [`00_Analise_do_Moodboard.md`](../00_Analise_do_Moodboard.md)).
