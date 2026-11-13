# PROMPT 007 — Autenticação simulada no navegador (cadastro, login, sessão e rotas protegidas)

| Campo | Valor |
|---|---|
| ID | PROMPT-007 |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Execução (SPR-01) |
| Entradas obrigatórias | [`AGENTS.md`](../../AGENTS.md) · specs TELA-01, TELA-02 e TELA-03 (seção 2, rota protegida) · PROMPT-004 e PROMPT-005 · D-31 (sessão em cookie, produção) |
| Saídas | Armazenamento simulado de contas e sessão · `sessaoAtual` e `sair` na camada de API · `RequireAuth` e `RedirectIfAuthenticated` · `useSessao`, `useLogout` · testes |
| Status | Executado |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 13/11/2026 | Versão inicial. |

---

## 1. Objetivo

Permitir cadastrar, entrar, sair e proteger `/guarda-roupa` **sem backend e sem banco**, mantendo a mesma interface (`AuthApi`) que o Spring Boot vai implementar. Trocar para o backend real continua sendo `VITE_API_MOCK=false`.

## 2. Decisões

1. **Contas** em `localStorage`; **sessão** em `sessionStorage`. Só `sessionStorage` para tudo faria a conta sumir ao fechar a aba, e o login deixaria de funcionar.
2. **"Lembrar de mim"** grava a sessão em `localStorage` por 30 dias (spec TELA-01, 4.2). Duração real continua **[EM ABERTO] EA-13** (D-31: remember-me de 30 dias).
3. Senha nunca em texto puro: PBKDF2-SHA256 com salt por conta (`crypto.subtle`). No produto real a regra é BCrypt (regra 8).
4. Cadastro concluído já deixa o usuário autenticado (sessão de aba), como o backend fará.
5. Erros de interface seguem simulados por e-mails de teste: `ja@exemplo.com` (409), `*@fora.com` (403), `limite@exemplo.com` (429), `falha@exemplo.com` (500).

## 3. Limites (não é segurança)

Qualquer pessoa com acesso ao navegador lê esses dados e pode forjar uma sessão. Serve para desenvolver e demonstrar telas. O isolamento por usuário (regra 1) só existe de verdade com o backend.
