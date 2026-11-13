# a_frontend — Frontend React do Outfit Lab

> Gerado por: PROMPT-004 v1.0 · v1.1 · 13/11/2026 · Telas implementadas: **TELA-02 Cadastro**.

Aplicação React (SPA) do Outfit Lab. O visual vem do Figma (`Outfit Lab — UI`), o comportamento e os textos vêm das specs em [`b_doc_repo/c_design/c_specs/`](../../b_doc_repo/c_design/c_specs/). A tela já está pronta para conversar com a API Spring Boot; enquanto ela não existe, roda com uma **API simulada**.

## Como rodar

Pré-requisito: **Node.js 22+** (recomendado: a versão LTS ativa) e npm.

```bash
cd a_tech_repo/a_frontend
npm install          # primeira vez
npm run dev          # http://localhost:5173 → abre em /cadastro
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm run build` | Checa os tipos e gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de `dist/` localmente |
| `npm test` | Roda os testes (Vitest + Testing Library) uma vez |
| `npm run test:watch` | Testes em modo observação |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sem gerar arquivos |
| `npm run format` | Prettier |

### Testar os estados da tela de cadastro (modo simulado)

| Para ver… | Faça |
|---|---|
| Validação | Clique em "Criar conta" com o formulário vazio |
| Senhas diferentes | Digite senhas diferentes nos dois campos |
| E-mail já cadastrado (409) | Use `ja@exemplo.com` |
| Fora do beta (403) | Use qualquer e-mail `@fora.com` |
| Carregando | Qualquer envio válido (a simulação espera 1,2 s) |
| Sucesso | Dados válidos com qualquer outro e-mail |

## Stack (D-32)

React 19 · Vite · TypeScript estrito · React Router · TanStack Query · React Hook Form + Zod · **CSS Modules + `tokens.css`** (sem Tailwind) · Vitest + Testing Library · ESLint + Prettier.

## Estrutura

Dentro deste projeto as pastas seguem a convenção React, **sem prefixo** (exceção da D-25).

```
src/
├── app/                 # App.tsx (providers), routes.tsx
├── pages/               # uma pasta por rota: SignupPage, PlaceholderPage
├── components/          # componentes reutilizáveis com os nomes das specs
│   ├── AuthLayout/      #   layout das telas de autenticação (mirrored = cadastro)
│   ├── Button/ TextField/ PasswordField/ PasswordStrength/ Checkbox/ Alert/
│   ├── Logo/            #   Logo + BetaBadge
│   ├── HowItWorks/ ScorePreviewCard/ SuccessPanel/
├── features/auth/       # tudo que é específico de autenticação
│   ├── api/             #   types.ts (contrato), httpAuthApi, mockAuthApi, index (escolhe)
│   ├── hooks/           #   useCadastro (TanStack Query)
│   ├── components/      #   SignupForm, SignupEditorial
│   ├── signupSchema.ts  #   regras + mensagens da spec (Zod)
│   └── passwordStrength.ts
├── lib/                 # apiClient (fetch + sessão + CSRF), apiError
├── assets/              # SVGs exportados do Figma
├── styles/              # tokens.css (cópia de b_doc_repo/c_design/b_tokens) + global.css
└── test/setup.ts
```

Cada componente tem `Componente.tsx` + `Componente.module.css`. **Só tokens** (`var(--color-accent)`), nada de HEX solto.

## Integração com o backend (Spring Boot)

### Modos

| `VITE_API_MOCK` | Comportamento |
|---|---|
| `true` (padrão) ou ausente | API simulada em `features/auth/api/mockAuthApi.ts` |
| `false` | Chama o Spring Boot em `/api/...` |

Para usar o backend: copie `.env.example` para `.env.local`, troque para `VITE_API_MOCK=false` e rode o Spring Boot em `http://localhost:8080` (ou ajuste `VITE_PROXY_TARGET`).

### Como a conexão funciona

- **Mesma origem:** no desenvolvimento, o Vite repassa `/api` para o Spring Boot (proxy em `vite.config.ts`). Em produção, o próprio Spring Boot serve este build (container único, D-30). Não há CORS.
- **Sessão em cookie HttpOnly** (D-31): todas as chamadas usam `credentials: 'include'`. O frontend **nunca** guarda token.
- **CSRF:** antes da primeira escrita, o `apiClient` chama `GET /api/auth/csrf` (se ainda não houver o cookie) e envia o header `X-XSRF-TOKEN` com o valor do cookie `XSRF-TOKEN`. É o padrão do `CookieCsrfTokenRepository` do Spring Security.
- **Erros:** toda resposta de erro vira um `ApiError` (`lib/apiError.ts`). A tela decide o que mostrar pelo `codigo`.

### Contrato provisório (formalizado no PROMPT-008 / OpenAPI)

| Método e rota | Corpo | Resposta |
|---|---|---|
| `GET /api/auth/csrf` | — | `204`, define o cookie `XSRF-TOKEN` |
| `POST /api/auth/cadastro` | `{ nome, sobrenome, email, senha, aceiteTermos: true }` | `201 { id, nome, sobrenome, email }` |

**Formato único de erro** (`GlobalExceptionHandler`):

```json
{ "status": 409, "codigo": "EMAIL_JA_CADASTRADO", "mensagem": "Este e-mail já tem uma conta.", "campos": [] }
```

| `codigo` | HTTP | Onde aparece na tela |
|---|---|---|
| `VALIDACAO` | 400 | Em cada campo listado em `campos[{ campo, mensagem }]` |
| `EMAIL_FORA_DO_BETA` | 403 | Alerta no topo |
| `EMAIL_JA_CADASTRADO` | 409 | No campo e-mail, com link "Entrar" |
| outros / rede | 5xx / 0 | Alerta "Não foi possível criar a conta agora." |

O backend deve aplicar as **mesmas regras** do `signupSchema.ts`: nome e sobrenome com 2–60 caracteres, e-mail válido com até 254 caracteres, senha de 8–72 caracteres com letra e número, e aceite obrigatório.

## Do Figma ao React

1. Ajuste a tela no Figma e copie o link do frame.
2. Envie ao agente de código junto com a spec (`AGENTS.md`, seção "Figma → React").
3. O agente lê o frame pelo Figma MCP, **traduz** a saída (React + Tailwind) para CSS Modules com os tokens e reaproveita os componentes de `src/components/`.
4. Ícones e ilustrações são baixados para `src/assets/`; nunca use as URLs temporárias do Figma.

### Divergências conhecidas (TELA-02)

| Figma | Implementado | Motivo |
|---|---|---|
| Textos próprios ("SEU ESTILO COMEÇA AQUI", passos, card) | Textos da spec | Decisão do autor (13/11/2026) |
| Nome e sobrenome lado a lado no mobile | Empilhados < 768 px | Spec, seção 7 |
| Textos de 10–11 px | Mínimo de 12 px | Legibilidade (análise do moodboard, E5) |
| Checkbox de 18 px sem área extra | Caixa de 18 px com área de toque de 44 px | Acessibilidade (WCAG 2.5.5) |
| Texto de força fixo ("Senha forte · …") | Nível real (Fraca → Forte) + dica | Spec 4.1 |
| Cabeçalho mobile claro e card de exemplo no mobile | Igual ao Figma | Figma manda no visual (a spec previa cabeçalho escuro e sem card) |
| Cor de texto `#D1D1D1` | Não usada (os textos do card vieram da spec) | Fora dos tokens |
