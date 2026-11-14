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
| `POST /api/auth/cadastro` | `{ nome, sobrenome, email, senha, aceiteTermos: true }` | `201 { id, nome, sobrenome, email }` (já autenticado) |
| `POST /api/auth/login` | `{ email, senha, lembrar }` | `200 { id, nome, sobrenome, email }` · `401 CREDENCIAIS_INVALIDAS` · `429 MUITAS_TENTATIVAS` |
| `GET /api/auth/me` | — | `200 { id, nome, sobrenome, email }` · `401` (sem sessão) |
| `POST /api/auth/logout` | — | `204` |

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

### Divergências conhecidas (TELA-01 Login)

| Figma | Implementado | Motivo |
|---|---|---|
| Eyebrow "BEM-VINDA DE VOLTA" | "Bem-vindo de volta" | Spec TELA-01 (autor, 13/11/2026) |
| Sem rodapé de links | "Termos de uso" e "Privacidade" abaixo da frase de privacidade | Spec, seção 3 |
| Sem jaqueta nem citação no painel | Igual ao Figma | Figma manda no visual |
| Textos de 10–11 px | Mínimo de 12 px | Legibilidade (E5) |
| Painel 50/50 em 1440 px | Igual ao Figma | Spec previa 55/45; Figma prevalece |
| Sem frame mobile | Cabeçalho escuro compacto (logo, selo, tagline), sem painel | Spec, seção 6 |
| "Esqueci minha senha" sem comportamento | Modal do plano B | Spec, seção 4.3 |
| Ilustrações coloridas (camiseta, calça, sneaker amarelo) | Ícones sólidos brancos (`Icon`) em tiles arredondados | Decisão do autor (13/11/2026, PROMPT-006); Figma ainda não atualizado |
| Cor do texto "Lembrar de mim" `#0A0A0A` | `--color-text-muted` (componente `Checkbox` compartilhado) | Mantido o componente do cadastro |

Contrato provisório: `POST /api/auth/login` com `{ email, senha, lembrar }` → `200 { id, nome, sobrenome, email }`; erros `401 CREDENCIAIS_INVALIDAS`, `429 MUITAS_TENTATIVAS`, 5xx/rede. A duração da sessão com `lembrar` depende da **[EM ABERTO] EA-13**. No modo simulado: `erro@exemplo.com` (ou senha `errada`) → 401, `limite@exemplo.com` → 429, `falha@exemplo.com` → 500.

### Autenticação simulada (sem backend)

Com `VITE_API_MOCK` ausente ou diferente de `false`, o front usa `mockAuthApi.ts` + `storage/authStorage.ts`:

- **Contas** ficam em `localStorage` (`outfitlab.contas`), com senha em PBKDF2 + salt; **sessão** em `sessionStorage` (`outfitlab.sessao`) ou, com "Lembrar de mim", em `localStorage` por 30 dias.
- `/guarda-roupa` exige sessão (`RequireAuth`); `/login` redireciona quem já está autenticado (`RedirectIfAuthenticated`). O cadastro conclui já autenticado.
- Para zerar tudo: limpe o armazenamento do site nas ferramentas do navegador.
- **Não é segurança.** Serve só até o Spring Boot existir (D-31: sessão em cookie HttpOnly). Ver PROMPT-007.

### Divergências conhecidas (TELA-03 Guarda-roupa)

| Figma | Implementado | Motivo |
|---|---|---|
| Eyebrow "SEU ACERVO PESSOAL" e texto "12 peças. Infinitas possibilidades." no topo | "Coleção pessoal"; texto do topo omitido (repetia a contagem) | Spec, seção 3.1 |
| Subtítulo fixo "12 peças · …" | "{n} peças" / "{m} de {n} peças" + "Um universo de combinações." | Spec |
| Chips sem contagem | Chips com contagem | Spec, seção 3.2 |
| Textos de 9–10 px (categoria, cor, marca) | 12 px | Legibilidade (E5) |
| Cinza `#D1D1D1` dos itens da Sidebar | `--color-inverse-muted` | Fora dos tokens |
| Rodapé "Conta pessoal · Sair ↗" | Nome, e-mail e "Sair ↗" | Spec (mostra o usuário da sessão) |
| Mobile: chips em 3 linhas | Uma linha com rolagem horizontal | Spec, seção 5 |
| Mobile sem "Sair" | "Sair" ao lado de "Olá, {nome}" | Provisório até existir o Perfil |
| Filtro de cor com bolinhas | `<select>` nativo, sem bolinhas | Decisão do autor (14/11/2026) |
| "+ Adicionar peça" | Presente, sem ação | Decisão do autor; cadastro de peça é a TELA-05 |

Sem backend, as peças vêm de `features/pecas/dados/pecasIniciais.ts` (as 12 do Figma; a modelagem e as cores secundárias são dados de teste). O filtro e a busca (debounce de 200 ms) funcionam sobre esse catálogo; categoria, modelagem, cor e busca ficam na URL (`?cat=&fit=&cor=&q=`). A seleção do look fica no `sessionStorage` (`outfitlab.look`).
