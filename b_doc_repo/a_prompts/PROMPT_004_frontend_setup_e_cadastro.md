# PROMPT 004 — Frontend: setup do projeto React + TELA-02 Cadastro

| Campo | Valor |
|---|---|
| ID | PROMPT-004 |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Execução (SPR-00/01) |
| Entradas obrigatórias | [`AGENTS.md`](../../AGENTS.md) · spec [`TELA-02_cadastro.md`](../c_design/c_specs/TELA-02_cadastro.md) · tokens [`tokens.css`](../c_design/b_tokens/tokens.css) · Figma `3NAgnwXxx0Nkkrs5B7ZlLF`, frames **8:106** (Cadastro · Desktop) e **8:115** (Cadastro · Mobile) · [Guia de Kickoff Técnico](../b_docs/c_planejamento/08_Guia_de_Kickoff_Tecnico.md) (D-30, D-31, D-32) |
| Saídas | Projeto Vite em `a_tech_repo/a_frontend/` · componentes reutilizáveis · página `/cadastro` · camada de API pronta para o Spring Boot (com modo simulado) · testes · `a_frontend/README.md` |
| Status | Executado |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 13/11/2026 | Versão inicial. Antecipa a parte de frontend do PROMPT-009 (setup) e do PROMPT-010 (autenticação) para a TELA-02; os prompts previstos foram renumerados (+1). |

---

## 1. Objetivo

Criar o projeto React do Outfit Lab e implementar a **TELA-02 Cadastro** a partir do Figma (visual) e da spec (comportamento e textos), já preparada para consumir a API Spring Boot que ainda não existe.

## 2. Regras desta tarefa

1. **Visual do Figma, textos e comportamento da spec** (decisão do autor em 13/11/2026: os textos do Figma que divergem da spec são descartados).
2. Stack da D-32: React 19 + Vite + TypeScript estrito · React Router · TanStack Query · React Hook Form + Zod · **CSS Modules + `tokens.css`** · Vitest + Testing Library. Sem Tailwind: a saída do Figma MCP é traduzida.
3. Nenhum HEX solto fora de `tokens.css`. Cores do Figma fora dos tokens → token mais próximo, registrado no README.
4. Componentes com os nomes e props da spec (seção 9), reutilizáveis no login e nas próximas telas.
5. Pastas internas do projeto seguem a convenção React (exceção da D-25).

## 3. Preparação para o backend (Spring Boot)

- `apiClient` com `fetch`, `credentials: 'include'`, header `X-XSRF-TOKEN` lido do cookie `XSRF-TOKEN` (Spring Security, D-31) e tradução do formato único de erro.
- Proxy do Vite: `/api` → `http://localhost:8080`.
- **Contrato provisório** (formalizado no PROMPT-008, OpenAPI):
  - `POST /api/auth/cadastro` — corpo `{ nome, sobrenome, email, senha, aceiteTermos }` → `201 { id, nome, sobrenome, email }`.
  - Erro: `{ status, codigo, mensagem, campos?: [{ campo, mensagem }] }` com `codigo` = `VALIDACAO` (400) · `EMAIL_FORA_DO_BETA` (403) · `EMAIL_JA_CADASTRADO` (409).
- **Modo simulado** (`VITE_API_MOCK=true`): mesma interface, sem backend. `ja@exemplo.com` → 409; e-mails `@fora.com` → 403; demais → 201.

## 4. Critérios de aceite

- [ ] Rota `/cadastro` com todos os estados da spec: padrão, validação, senhas diferentes, e-mail já cadastrado, fora do beta, carregando e sucesso.
- [ ] Mensagens idênticas à spec; foco no primeiro campo inválido; revalidação ao sair do campo depois do primeiro envio.
- [ ] Indicador de força com 4 níveis e `aria-live`.
- [ ] Layout fiel ao Figma em 1440 px e à spec em 375 px (painel "Como funciona" abaixo do formulário).
- [ ] `npm run lint`, `npm run typecheck`, `npm test` e `npm run build` sem erro.
- [ ] README do frontend explicando como rodar, o contrato e o fluxo Figma → React.
