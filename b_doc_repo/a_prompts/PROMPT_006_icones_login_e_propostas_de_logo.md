# PROMPT 006 — Ícones brancos na TELA-01 e propostas de logo

| Campo | Valor |
|---|---|
| ID | PROMPT-006 |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Execução (SPR-01) |
| Entradas obrigatórias | [`AGENTS.md`](../../AGENTS.md) · spec [`TELA-01_login.md`](../c_design/c_specs/TELA-01_login.md) · PROMPT-005 · referência de estilo: folha de glifos sólidos enviada pelo autor (só estilo; nenhum glifo copiado) |
| Saídas | Componente `Icon` (camiseta, calça, tênis) · painel editorial do login com ícones brancos · 3 propostas de logo em SVG (`c_design/e_logo_propostas/`) |
| Status | Executado |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 13/11/2026 | Versão inicial. |

---

## 1. Decisões do autor

1. Os três ícones da colagem do login são **todos brancos** (o tênis deixa de ser amarelo).
2. As 3 ideias de logo são entregues em SVG **apenas para comparação**.
3. O logo **não entra nas telas** nesta entrega.

## 2. Regras

1. Ícones desenhados do zero (regra 7: nada de terceiros), sólidos, grade 48×48, `currentColor`.
2. Cores só por tokens no código. Os SVGs de proposta usam os HEX dos tokens (`#0A0A0A`, `#FFFFFF`, `#FACC15`) por serem arquivos autônomos.
3. Sem dependência nova.

## 3. Propostas de logo

| # | Nome | Ideia |
|---|---|---|
| 1 | Cabide-Frasco | Frasco de laboratório com ombros de cabide e gancho; líquido amarelo |
| 2 | Camiseta com bolhas | Camiseta que se enche como um béquer, com nível ondulado e bolhas |
| 3 | Monograma O/L com tubo | O e L, com a barra "/" do wordmark virando um tubo de ensaio |

Cada uma tem versão escura (fundo preto) e amarela (fundo amarelo). Comparação: `c_design/e_logo_propostas/comparacao.html`.
