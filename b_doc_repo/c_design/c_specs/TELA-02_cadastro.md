# TELA-02 — Cadastro

| Campo | Valor |
|---|---|
| ID | TELA-02 |
| Versão | 1.1 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.1 (Parte B3) |
| RFs | RF-01 (cadastro), RF-12 (estados) · RNF-15 (coleta mínima, LGPD) · Escopo 6.2 (termos, Must), 6.6 (allowlist, Should), 6.10 (selo Beta) |
| Protótipo | [`../d_prototipos/02_cadastro.html`](../d_prototipos/02_cadastro.html) |
| Status | Em revisão |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial. |
| 1.1 | 13/11/2026 | Cauã Gama Paixão | Prompts previstos renumerados (+1) porque o PROMPT-003 passou a ser o das telas no Figma (D-33). |

---

## 1. Objetivo

Criar uma conta pedindo **apenas os dados necessários** (EA-02, enhancement E1) e explicar, no painel editorial, como o produto funciona, para que o beta tester entenda o valor antes de se cadastrar.

## 2. Rota e navegação

| Item | Valor |
|---|---|
| Rota | `/cadastro` (pública; autenticado → `/guarda-roupa`) |
| Sucesso | Mostra o estado de sucesso com CTA "Ir para o guarda-roupa". A conta já entra autenticada (decisão de implementação depende de EA-13) |
| Links | "Já tem conta? **Entrar**" → `/login` · "termos de uso" e "política de privacidade" abrem em nova aba |

## 3. Componentes

| Bloco | Componentes |
|---|---|
| Formulário (esquerda no desktop — layout espelhado) | Eyebrow "BETA FECHADO" · título "Criar conta" · subtítulo "Leva menos de um minuto." · nome + sobrenome (lado a lado ≥ 768 px) · e-mail · senha com mostrar/ocultar e **indicador de força** · confirmar senha · checkbox de aceite · botão "Criar conta" · "Já tem conta? Entrar" · **nota de design** sobre dados corporais |
| Painel editorial (direita, escuro) | Logo + selo Beta · título "Como funciona" · 3 passos numerados: **1. Cadastre suas peças** ("Foto, categoria, cores e modelagem.") · **2. Monte looks** ("Combine peças do seu próprio guarda-roupa.") · **3. Entenda a análise** ("Uma pontuação de 0 a 100 com justificativas, não um julgamento.") · **card de exemplo** com pontuação 82, barra amarela e 2 critérios ("Cores: neutros com 1 ponto de destaque" / "Camadas: proporções equilibradas") |

## 4. Campos, validações e mensagens

Validação no envio e, depois do primeiro envio, ao sair do campo. A confirmação de senha também revalida quando a senha muda.

| Campo | Tipo / atributos | Regras | Mensagem (texto final) |
|---|---|---|---|
| Nome | `text`, `autocomplete="given-name"`, máx. 60 | Obrigatório; 2–60 caracteres após `trim` | "Informe seu nome." / "O nome precisa ter entre 2 e 60 caracteres." |
| Sobrenome | `text`, `autocomplete="family-name"`, máx. 60 | Obrigatório; 2–60 caracteres após `trim` | "Informe seu sobrenome." / "O sobrenome precisa ter entre 2 e 60 caracteres." |
| E-mail | `email`, `autocomplete="email"`, máx. 254 | Obrigatório; formato válido; normalizado para minúsculas | "Informe seu e-mail." / "Digite um e-mail válido, como nome@exemplo.com." |
| Senha | `password`, `autocomplete="new-password"`, 8–72 | Obrigatório; **mínimo 8 caracteres, com pelo menos 1 letra e 1 número**; máx. 72 (limite do BCrypt — SEG-01) | "Crie uma senha." / "A senha precisa ter pelo menos 8 caracteres, com letras e números." / "A senha pode ter no máximo 72 caracteres." |
| Confirmar senha | `password`, `autocomplete="new-password"` | Obrigatório; igual à senha | "Confirme sua senha." / "As senhas não coincidem." |
| Aceite | checkbox, desmarcado | Obrigatório | "Para criar a conta, aceite os termos de uso e a política de privacidade." |

Texto do aceite: "Li e aceito os **termos de uso** e a **política de privacidade**." (links sublinhados).

Dica abaixo da senha (antes de erro): "Mínimo de 8 caracteres, com letras e números."

### 4.1 Indicador de força da senha

Barra de 4 segmentos + texto, atualizada ao digitar. Não bloqueia o envio além da regra mínima.

| Nível | Critério | Texto | Cor |
|---|---|---|---|
| 0 | Vazio | — | `border` |
| 1 — Fraca | Não atende a regra mínima | "Fraca" | `danger` |
| 2 — Razoável | Atende a regra mínima | "Razoável" | `text-muted` |
| 3 — Boa | Mínima + ≥ 12 caracteres **ou** símbolo | "Boa" | `text` |
| 4 — Forte | ≥ 12 caracteres + maiúscula/minúscula + número + símbolo | "Forte" | `success` |

O texto do nível é anunciado por `aria-live="polite"` (o amarelo não é usado aqui para não virar texto sobre claro).

### 4.2 Erros do servidor

| Situação | Exibição | Texto final |
|---|---|---|
| E-mail já cadastrado (409) | Erro no campo e-mail + link "Entrar" | "Este e-mail já tem uma conta. **Entrar** ou recuperar a senha." |
| E-mail fora da lista do beta (403, Escopo 6.6) | Alerta no topo | "**Este e-mail ainda não está no beta.** Peça um convite ao autor." |
| Falha de rede / 5xx | Alerta no topo | "Não foi possível criar a conta agora. Tente novamente em instantes." |

> Nota de segurança: informar "e-mail já cadastrado" permite descobrir quem tem conta (enumeração). Num beta fechado com allowlist o risco é baixo e a mensagem ajuda o usuário. **[EM ABERTO]** revisar no PROMPT-009 (autenticação) se o cadastro abrir para o público.

## 5. Nota de design visível no protótipo

Caixa discreta com borda pontilhada abaixo do formulário:

> **Por que não pedimos altura, tom de pele ou data de nascimento?** Coletamos só o necessário para sua conta (LGPD). Nenhuma regra da análise usa esses dados hoje. Se alguma passar a usar, ela será opcional e explicada. — selo **[EM ABERTO] EA-03**

Na aplicação final, a nota vira um texto curto de ajuda ("Coletamos só o necessário.") com link para a política de privacidade.

## 6. Estados

| Estado | Descrição |
|---|---|
| Padrão | Campos vazios, indicador de força zerado |
| Validação | Erros por campo; foco no primeiro inválido |
| Senhas diferentes | Erro "As senhas não coincidem." no campo de confirmação |
| E-mail já cadastrado | Erro no campo e-mail (4.2) |
| Fora do beta | Alerta no topo (4.2) |
| Carregando | Botão "Criando conta…" com spinner, campos desabilitados |
| Sucesso | O formulário é substituído por um painel de sucesso: ícone ✓, título "Conta criada!", texto "Bem-vindo(a), {nome}. Seu guarda-roupa está pronto para receber as primeiras peças.", aviso de beta ("Durante o beta, os dados podem ser apagados ao final do teste.") e botão primário "**Ir para o guarda-roupa**" |

## 7. Comportamento responsivo

| Largura | Layout |
|---|---|
| < 768 px | Uma coluna. Cabeçalho escuro compacto (logo + Beta). Formulário. O "Como funciona" aparece **abaixo** do formulário em versão resumida (3 passos em lista, sem card de exemplo). Nome e sobrenome empilhados. |
| 768–1023 px | Igual ao mobile, com nome e sobrenome lado a lado. |
| ≥ 1024 px | Duas colunas, **espelhadas em relação ao login**: formulário à esquerda, painel editorial escuro à direita, com card de exemplo. |

## 8. Acessibilidade

- `<h1>` "Criar conta"; passos do painel em `<ol>`.
- Campos com `<label>`, `aria-invalid`, `aria-describedby` (dica + erro).
- Indicador de força com `aria-live="polite"`; não depende só da cor (tem texto).
- Checkbox com alvo de toque ≥ 44 px (label clicável).
- Painel de sucesso recebe foco (`tabindex="-1"`) e o título é anunciado.

## 9. Mapeamento para componentes React

| Componente | Props principais | Reutilizável |
|---|---|---|
| `AuthLayout` | `mirrored` = `true` | ✅ (TELA-01) |
| `EditorialPanel` | `variant="signup"` | ✅ |
| `HowItWorks` | `steps: {title, text}[]`, `compact?` | ✅ (onboarding, dashboard vazio) |
| `ScorePreviewCard` | `score: number`, `criteria: {label, text}[]` | ✅ base do `ScoreCard` da TELA-07 |
| `SignupForm` | `onSubmit(data)`, `status`, `serverError?`, `fieldErrors?` | — |
| `TextField`, `PasswordField` (`showStrength`), `Checkbox`, `Button`, `Alert` | ver TELA-01 | ✅ |
| `PasswordStrength` | `value: string` → nível 0–4 | ✅ TELA-09 (trocar senha) |
| `SuccessPanel` | `title`, `children`, `action` | ✅ |
| `DesignNote` | `children`, `openItem?: string` | ⚠️ só nos protótipos |

---

## 📚 Por que este documento existe

O cadastro é onde o beta tester decide se confia no produto. A spec fixa a coleta mínima (e por quê), as regras exatas de senha que o backend também vai validar e as mensagens para cada falha. Com isso, frontend e backend implementam a mesma regra, e o texto que o amigo lê já foi pensado, não improvisado pela LLM.
