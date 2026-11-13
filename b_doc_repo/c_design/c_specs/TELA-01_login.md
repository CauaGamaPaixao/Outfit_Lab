# TELA-01 — Login

| Campo | Valor |
|---|---|
| ID | TELA-01 |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.1 (Parte B3) |
| RFs | RF-02 (autenticação), RF-12 (estados) · Escopo 6.1 (recuperação de senha, Should) · 6.10 (selo Beta) |
| Protótipo | [`../d_prototipos/01_login.html`](../d_prototipos/01_login.html) |
| Status | Em revisão |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial. |

---

## 1. Objetivo

Permitir que um usuário cadastrado entre na aplicação com e-mail e senha e chegue ao guarda-roupa. A tela também é a primeira impressão do produto: o painel editorial apresenta a marca e a proposta.

## 2. Rota e navegação

| Item | Valor |
|---|---|
| Rota | `/login` (rota pública; usuário autenticado é redirecionado para `/guarda-roupa`) |
| Sucesso | Redireciona para `/guarda-roupa` (ou para a rota protegida que originou o login) |
| Links | "Criar conta" → `/cadastro` · "Esqueci minha senha" → ver seção 4.3 |

## 3. Componentes

| Bloco | Componentes |
|---|---|
| Painel editorial (esquerda, escuro) | Logo empilhado + selo "Beta" · tagline "Organize. Monte. Analise. Evolua." · colagem de ilustrações SVG (camiseta, jaqueta, calça, **sneaker amarelo em destaque**) · citação "Moda não é só o que você veste, é como você se expressa." |
| Formulário (direita, off-white) | Eyebrow "BEM-VINDO DE VOLTA" · título "Entrar" · alerta (erro de credenciais) · campo e-mail · campo senha com mostrar/ocultar · checkbox "Lembrar de mim" · link "Esqueci minha senha" · botão "Entrar" · texto "Ainda não tem conta? **Criar conta**" |
| Rodapé | Links "Termos de uso" · "Privacidade" (páginas da EAP 2.3) |

## 4. Campos, validações e mensagens

A validação roda **no envio** e, depois do primeiro envio, **ao sair do campo** (`blur`). Mensagens aparecem abaixo do campo, com ícone, ligadas por `aria-describedby`.

| Campo | Tipo / atributos | Regras | Mensagem (texto final) |
|---|---|---|---|
| E-mail | `type="email"`, `autocomplete="email"`, `inputmode="email"`, máx. 254 | Obrigatório | "Informe seu e-mail." |
| | | Formato `nome@dominio.tld` | "Digite um e-mail válido, como nome@exemplo.com." |
| Senha | `type="password"`, `autocomplete="current-password"`, máx. 72 | Obrigatório (sem validar força no login) | "Informe sua senha." |
| Lembrar de mim | checkbox, desmarcado por padrão | — | — |

### 4.1 Erros do servidor

| Situação | Exibição | Texto final |
|---|---|---|
| Credenciais inválidas (401) | Alerta no topo do formulário (`role="alert"`), campos mantêm o e-mail e limpam a senha; foco vai para o alerta | "**E-mail ou senha inválidos.** Confira os dados e tente novamente." (mensagem genérica — SEG-07) |
| Muitas tentativas (429, se EA-27 for implementado) | Alerta | "Muitas tentativas. Aguarde alguns minutos e tente de novo." |
| Falha de rede / 5xx | Alerta | "Não foi possível entrar agora. Verifique sua conexão e tente novamente." |

### 4.2 "Lembrar de mim"

Estende a sessão (ex.: 30 dias em vez de expirar ao fechar o navegador). A duração exata depende da estratégia de autenticação **[EM ABERTO] EA-13** (JWT × sessão em cookie, decidida no Guia de Kickoff Técnico, até 16/11/2026).

### 4.3 "Esqueci minha senha" (Should — D-24)

- **v1.0 com e-mail (se couber na SPR-06):** rota `/recuperar-senha`, que pede o e-mail e sempre responde "Se o e-mail estiver cadastrado, você receberá um link em alguns minutos." (SEG-10).
- **Plano B (beta):** o link abre um modal: "**Esqueceu a senha?** Durante o beta, a redefinição é feita pelo autor. Envie uma mensagem pelo canal de feedback com o e-mail da sua conta." + botão "Entendi".
- O protótipo mostra o plano B.

## 5. Estados

| Estado | Descrição |
|---|---|
| Padrão | Campos vazios, botão habilitado (validação só no envio) |
| Hover / foco | Hover escurece a borda; foco com `--focus-ring` em todos os controles |
| Validação | Campos inválidos com borda `danger` 2 px, ícone e mensagem; foco vai para o **primeiro** campo inválido |
| Credenciais inválidas | Alerta `danger-bg` no topo do formulário (4.1) |
| Carregando | Botão com spinner e texto "Entrando…", `aria-busy="true"`, campos e botão desabilitados; evita duplo envio |
| Sucesso | Redireciona sem mensagem (o protótipo mostra um toast "Login realizado. Redirecionando…") |

## 6. Comportamento responsivo

| Largura | Layout |
|---|---|
| < 1024 px | Uma coluna. O painel editorial vira um **cabeçalho escuro compacto** (logo + selo Beta + tagline), sem colagem nem citação. Formulário ocupa a largura com margem de 16 px (máx. 440 px, centralizado). |
| ≥ 1024 px | Duas colunas 50/50 em altura total: painel editorial à esquerda, formulário centralizado verticalmente à direita (máx. 400 px). |
| ≥ 1440 px | Proporção 55/45; colagem maior. |

## 7. Acessibilidade

- `<main>` com `<h1>` "Entrar"; o painel editorial é `<aside>` com ilustrações `aria-hidden="true"`.
- Todo campo com `<label for>` visível; erros ligados por `aria-describedby` e `aria-invalid="true"`.
- Botão mostrar/ocultar senha: `<button type="button" aria-label="Mostrar senha" aria-pressed="false">`, alterna o rótulo.
- Alerta de erro com `role="alert"`; ordem de tabulação: e-mail → senha → mostrar senha → lembrar → esqueci → entrar → criar conta.
- Contrastes conforme os tokens; nenhum texto amarelo sobre fundo claro.
- `Enter` em qualquer campo envia o formulário.

## 8. Mapeamento para componentes React

| Componente | Props principais | Reutilizável |
|---|---|---|
| `AuthLayout` | `editorial: ReactNode`, `children`, `mirrored?: boolean` | ✅ TELA-01, TELA-02 (espelhado) |
| `EditorialPanel` | `variant: 'login' \| 'signup'`, `compact?: boolean` | ✅ TELA-01, TELA-02 |
| `Logo` | `stacked?: boolean`, `inverse?: boolean`, `showBeta?: boolean` | ✅ todas |
| `BetaBadge` | — | ✅ todas |
| `LoginForm` | `onSubmit(data: {email, password, remember})`, `status: 'idle' \| 'loading' \| 'error'`, `serverError?: string` | — |
| `TextField` | `label`, `name`, `type`, `error?`, `autoComplete`, `hint?` | ✅ todas as telas com formulário |
| `PasswordField` | extends `TextField` + `showStrength?: boolean` | ✅ TELA-01, TELA-02, TELA-09 |
| `Checkbox` | `label: ReactNode`, `checked`, `error?` | ✅ |
| `Button` | `variant: 'primary' \| 'secondary' \| 'dark' \| 'ghost'`, `loading?: boolean`, `fullWidth?` | ✅ todas |
| `Alert` | `tone: 'danger' \| 'success' \| 'info'`, `title`, `children` | ✅ todas |
| `Modal` | `open`, `title`, `onClose` | ✅ |

---

## 📚 Por que este documento existe

O protótipo mostra **como** a tela fica; a spec diz **o que** ela precisa garantir: o texto exato de cada erro, a ordem do foco, o que acontece no clique duplo. É esse nível de detalhe que permite pedir à LLM o código do login e conferir o resultado item a item, em vez de aceitar o que ela imaginar.
