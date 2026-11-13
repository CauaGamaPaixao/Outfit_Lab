# a_frontend — Frontend React do Outfit Lab

> Gerado por: PROMPT-001 v2.2 (Parte C2) · v1.0 · 13/11/2026 · O projeto Vite é criado pelo **PROMPT-008**.

**Stack:** React 19 + Vite + TypeScript estrito · React Router · TanStack Query · React Hook Form + Zod · CSS Modules + `tokens.css` · Vitest + Testing Library · ESLint + Prettier (decisões em D-32 e no [Guia de Kickoff Técnico](../../b_doc_repo/b_docs/c_planejamento/08_Guia_de_Kickoff_Tecnico.md)).

## Estrutura prevista

Dentro deste projeto as pastas seguem a convenção React, **sem prefixo** (exceção da D-25).

```
a_frontend/
├── index.html · package.json · vite.config.ts · tsconfig.json · eslint.config.js
├── public/
└── src/
    ├── app/          # router.tsx, providers (QueryClient), AppShell
    ├── pages/        # LoginPage, SignupPage, WardrobePage…
    ├── components/   # componentes das specs: Button, TextField, PieceCard…
    ├── features/     # auth/, pecas/, looks/ — hooks TanStack Query + chamadas à API
    ├── lib/          # apiClient (fetch + CSRF), utils
    ├── assets/       # SVGs exportados do Figma
    └── styles/       # tokens.css (cópia de b_doc_repo/c_design/b_tokens), global.css
```

## Telas

Visual no Figma (`Outfit Lab — UI`), comportamento nas specs [`c_specs/`](../../b_doc_repo/c_design/c_specs/). O fluxo Figma MCP → React está na seção 7.2 do Guia e no [`AGENTS.md`](../../AGENTS.md).
