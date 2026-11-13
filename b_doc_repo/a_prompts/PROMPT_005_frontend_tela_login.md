# PROMPT 005 — Frontend: TELA-01 Login

| Campo | Valor |
|---|---|
| ID | PROMPT-005 |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Execução (SPR-01) |
| Entradas obrigatórias | [`AGENTS.md`](../../AGENTS.md) · spec [`TELA-01_login.md`](../c_design/c_specs/TELA-01_login.md) · tokens [`tokens.css`](../c_design/b_tokens/tokens.css) · Figma `3NAgnwXxx0Nkkrs5B7ZlLF`, frame **8:103** (Login · Desktop) |
| Saídas | Página `/login` · `LoginForm` · `LoginEditorial` · `Modal` · `loginSchema` · `useLogin` · `login` na camada de API (real e simulada) · testes |
| Status | Executado |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 13/11/2026 | Versão inicial. |

---

## 1. Objetivo

Implementar a **TELA-01 Login** a partir do Figma (visual) e da spec (comportamento e textos), reaproveitando os componentes do cadastro e a camada de API com modo simulado.

## 2. Regras desta tarefa

1. **Visual do Figma; textos, estados e comportamento da spec** (mesma decisão do PROMPT-004).
2. CSS Modules + tokens, sem Tailwind e sem HEX solto. Cores do Figma → token mais próximo.
3. Reaproveitar `AuthLayout`, `Logo`, `TextField`, `PasswordField`, `Checkbox`, `Button` e `Alert`; criar só `Modal`.
4. Sem dependência nova. "Lembrar de mim" é enviado como `lembrar` (duração da sessão = **[EM ABERTO] EA-13**, não decidida no front).
5. "Esqueci minha senha" = plano B da spec (modal). Recuperação por e-mail e guarda de rota ficam fora.

## 3. Divergências Figma × spec decididas

| Item | Decisão |
|---|---|
| Eyebrow "BEM-VINDA DE VOLTA" | Spec: "BEM-VINDO DE VOLTA" |
| Subtítulo "Seu estilo, em um só lugar." e frase de privacidade (só no Figma) | Mantidos |
| Rodapé com "Termos de uso" e "Privacidade" (só na spec) | Mantido |
| Painel editorial | Figma (manifesto, colagem camiseta/calça/sneaker, legenda); sem jaqueta nem citação |
| Proporção em 1440 px | Figma (50/50) |
| Mobile (sem frame) | Spec: cabeçalho escuro compacto |
