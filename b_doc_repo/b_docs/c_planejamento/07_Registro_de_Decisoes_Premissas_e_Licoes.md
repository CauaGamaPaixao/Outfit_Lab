# Registro de Decisões, Premissas e Lições Aprendidas — Outfit Lab

| Campo | Valor |
|---|---|
| Documento | Log de decisões (ADR simplificado), pontos em aberto, premissas e lições aprendidas |
| Versão | 1.2 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.0 |
| Status | Em revisão (documento vivo: atualizado a cada sprint) |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial: D-01 a D-24, EA-01 a EA-28. |
| 1.1 | 13/11/2026 | Cauã Gama Paixão | Inclui D-25 (convenção de pastas, PROMPT-002); D-16 marcada como complementada por D-25; caminhos atualizados para a convenção de pastas D-25 e prompts previstos renumerados (+1) — PROMPT-002. |
| 1.2 | 13/11/2026 | Cauã Gama Paixão | Inclui D-26 a D-28, propostas na Parte B do PROMPT-001 (design system e telas 01–03); EA-02 atendido pela spec da TELA-02. |

---

## 1. Tailoring

Em vez de um arquivo por ADR (padrão comum em times), todas as decisões ficam numa tabela compacta, mais uma seção curta para as decisões mais importantes. Premissas e lições aprendidas ficam aqui também, para que o autor tenha **um único lugar** para consultar "por que fizemos assim?".

**Status de uma decisão:** `Aceita` (aprovada pelo autor) · `Proposta` (recomendada pela LLM, aguarda aprovação na revisão deste documento) · `Substituída por D-xx`.

## 2. Log de decisões

### 2.1 Decisões da v2.0 do PROMPT-001 (D-01 a D-09)

| ID | Data | Contexto | Decisão | Alternativas consideradas | Consequências | Status |
|---|---|---|---|---|---|---|
| D-01 | 13/11/2026 | Prazo curto e objetivo de dominar desenvolvimento com LLM. | **100% vibe coding**: LLM gera o código a partir de prompts versionados; o autor dirige, revisa, testa e integra. | Implementação manual com LLM só de apoio (PRD v1.0). | ➕ Velocidade; aprendizado de prompts e revisão. ➖ Risco de código não compreendido e de regressões (RISK-10, 11), mitigado pelo Plano de Qualidade. | Aceita |
| D-02 | 13/11/2026 | Escolha do framework de frontend. | **React**. | Angular (PRD v1.0). | ➕ Ecossistema amplo, alta demanda de mercado, LLMs geram bom código React. ➖ Mais decisões de bibliotecas (roteamento, formulários), tomadas na Parte C. | Aceita |
| D-03 | 13/11/2026 | Backend. | **Java + Spring Boot** (mantido). | — | Alinhado ao curso de ADS e ao mercado. | Aceita |
| D-04 | 13/11/2026 | Banco de dados. | **MySQL** (mantido). | — | Precisa de MySQL gerenciado na produção (EA-16). | Aceita |
| D-05 | 13/11/2026 | Necessidade de um horizonte claro. | **Aplicação completa até 31/12/2026.** | Sem prazo. | ➕ Foco. ➖ Exige cortes de escopo (Cronograma, seção 6). | Aceita |
| D-06 | 13/11/2026 | Objetivo de ter usuários reais. | **Uso pessoal + beta fechado com amigos.** | Só uso pessoal. | Traz requisitos de operação (termos, backup, feedback) e de LGPD. | Aceita |
| D-07 | 13/11/2026 | Sem deploy, não há beta nem portfólio. | **Deploy dentro do escopo**, com app acessível por link. | Deploy fora do escopo. | Escolha de hospedagem (EA-16) e custo (EA-22). | Aceita |
| D-08 | 13/11/2026 | Protótipos fora do repositório não são rastreáveis. | **Protótipos gerados por prompt e versionados** em `b_doc_repo/c_design/d_prototipos/`. | Ferramenta externa (Figma). | ➕ Rastreabilidade, GitHub Pages. ➖ Menos liberdade visual do que numa ferramenta de design. | Aceita |
| D-09 | 13/11/2026 | Evitar crescimento de escopo. | **Escopo funcional do MVP mantido** (RF-01 a RF-12); IA, avatar, clima, social e reconhecimento por imagem fora. | Ampliar o MVP. | Protege o prazo. | Aceita |

### 2.2 Decisões consolidadas do PRD (seção 18.1)

| ID | Data | Contexto | Decisão | Alternativas | Consequências | Status |
|---|---|---|---|---|---|---|
| D-10 | ≤ 13/11/2026 | Identidade do projeto. | Nome de trabalho **Outfit Lab**. | — | Nome definitivo em aberto (EA-01). | Aceita |
| D-11 | ≤ 13/11/2026 | Definição do produto. | Aplicação **web** de guarda-roupa digital, montagem e análise de looks. | App mobile nativo. | Web responsiva cobre desktop e celular. | Aceita |
| D-12 | ≤ 13/11/2026 | Identidade visual. | Direção **Editorial Minimalista**: paleta neutra + amarelo de destaque, imagens grandes, cards editoriais, tipografia Inter. | — | Base para o design system (Parte B). | Aceita |
| D-13 | ≤ 13/11/2026 | Visualização do look. | **Cards, sem avatar corporal.** | Avatar/manequim. | Menor complexidade. | Aceita |
| D-14 | ≤ 13/11/2026 | Natureza da análise. | **Regras próprias, determinísticas e explicáveis**, com pontuação orientativa e justificativas. | IA generativa como fonte da nota. | Testável e previsível; exige especificação das regras (PROMPT-010). | Aceita |
| D-15 | ≤ 13/11/2026 | IA no produto. | **Gemini como possibilidade futura**, depois que o núcleo estiver funcional. | Integrar já no MVP. | Fora da v1.0 (D-09). | Aceita |

### 2.3 Decisões de organização do projeto

| ID | Data | Contexto | Decisão | Alternativas | Consequências | Status |
|---|---|---|---|---|---|---|
| D-16 | 13/11/2026 | Separar código de documentação, sem gerenciar dois repositórios. | **Monorepo** com `a_tech_repo/` (frontend, backend, database, infra) e `b_doc_repo/` (prompts, docs, design). Prefixos `a_`/`b_` para ordenar as pastas. | Dois repositórios; pastas na raiz sem agrupamento. | ➕ Um único histórico e uma vitrine. ➖ CI precisa filtrar por caminho. | Aceita (complementada por D-25) |
| D-17 | 13/11/2026 | Rastreabilidade do vibe coding. | **Regra dos prompts:** toda tarefa relevante começa por `b_doc_repo/a_prompts/PROMPT_NNN_*.md` com cabeçalho e histórico; artefatos indicam `Gerado por`; prompts não são apagados. | Prompts soltos em chats. | ➕ Reprodutibilidade, portfólio de engenharia de prompt. ➖ ~10 min extras por tarefa. | Aceita |
| D-18 | 13/11/2026 | Aplicar a paleta de forma consistente e acessível. | **Regra de cores 60/30/10**: 60% neutros claros (fundo), 30% escuros (estrutura/texto), 10% amarelo `#FACC15` (ação/destaque); amarelo nunca como texto sobre fundo claro. | Uso livre da paleta. | Detalhada nos tokens (Parte B). | Aceita |
| D-25 | 13/11/2026 | D-16 criou os prefixos só no primeiro nível; as subpastas seguiam padrões mistos (`00_contexto`, `design/`). | **Convenção de pastas:** toda pasta de organização segue `<letra>_<nome_em_snake_case>`, com a letra indicando a ordem lógica dentro da pasta-mãe, reiniciando em cada nível e sem lacunas. Pastas exigidas pela stack (`.github/`, `src/`, `src/main/java/`, pacotes Java, `node_modules/` etc.) são exceção. Arquivos não seguem a regra. Validada por `a_tech_repo/d_infra/a_scripts/validar_pastas.sh`. Ver `b_doc_repo/a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md`. | Prefixo numérico (`00_`, `01_`); sem prefixo. | ➕ Ordem de leitura explícita e padrão único em todo o repositório. ➖ Inserir ou remover uma pasta exige reordenar as irmãs e atualizar referências. | Aceita |

### 2.4 Decisões propostas na Parte A (aguardam aprovação do autor)

| ID | Data | Contexto | Decisão proposta | Alternativas | Consequências | Status |
|---|---|---|---|---|---|---|
| D-19 | 13/11/2026 | Organização do tempo. | Sprints de 1 semana (ter–seg); autenticação na SPR-02 (após especificação); release em **30/12** com 31/12 de reserva; **code freeze em 28/12**. | Seguir o esqueleto original sem ajustes. | Cronograma, seção 3.1. | Proposta |
| D-20 | 13/11/2026 | Beta só a partir de 21/12 coincidiria com as festas. | **Beta em duas ondas**: onda 1 em 10/12 (2–3 amigos), onda 2 em 20–21/12 (todos). | Onda única em 21/12. | Feedback mais cedo sobre cadastro/upload. | Proposta |
| D-21 | 13/11/2026 | Estratégia de branches para dev solo. | **Trunk-based simplificado** (`main` protegida + branches curtas + PR + squash). | Git-flow. | Menos cerimônia; deploy contínuo da `main`. | Proposta |
| D-22 | 13/11/2026 | Padronização do histórico. | **SemVer** (`v0.x` por marco, `v1.0.0` no M7) + **Conventional Commits** com rodapé `Refs` e `Prompt`. | Commits livres. | Histórico legível e CHANGELOG mais fácil. | Proposta |
| D-23 | 13/11/2026 | Necessidades de usuários reais. | MoSCoW dos itens do beta: **Must** termos/LGPD, canal de feedback, backup, limites de upload, logs + health, processo de exclusão, aviso de beta; **Should** recuperação de senha, allowlist; **Could** monitoramento de erros do front, compressão de imagem, exclusão de conta pelo próprio usuário. | Tudo Must; tudo fora. | Declaração de Escopo, seção 6. | Proposta |
| D-24 | 13/11/2026 | Recuperação de senha exige serviço de e-mail. | **Should** na SPR-06, com plano B de reset manual durante o beta. | Must na SPR-02. | Libera a SPR-02/05 (caminho crítico). | Proposta |

### 2.5 Decisões propostas na Parte B (aguardam aprovação do autor)

| ID | Data | Contexto | Decisão proposta | Alternativas | Consequências | Status |
|---|---|---|---|---|---|---|
| D-26 | 13/11/2026 | `#E5E5E5` como borda de input tem 1,26:1 e o amarelo como anel de foco tem 1,47:1 sobre o off-white. | **Acessibilidade de controles:** borda de input `#8A8A8A` (3,45:1, token `--color-border-strong`) e anel de foco em duas camadas (preto 2 px + halo amarelo). | Manter a borda clara do moodboard; foco só amarelo. | Cumpre WCAG 1.4.11 e 2.4.7; visual um pouco menos "leve". `c_design/b_tokens/design_tokens.md`. | Proposta |
| D-27 | 13/11/2026 | Login social está fora do MVP (Won't). | **Remover** os botões Google/Apple, em vez de mostrá-los desabilitados com "em breve". | Botões desabilitados. | Interface mais limpa e honesta; volta como nova decisão se entrar no escopo. | Proposta |
| D-28 | 13/11/2026 | O cadastro precisa de uma regra de senha única para front e back. | **Senha com 8 a 72 caracteres, com pelo menos 1 letra e 1 número**; indicador de força informativo (não bloqueia além do mínimo). 72 é o limite do BCrypt (SEG-01). | Regras com maiúscula e símbolo obrigatórios; mínimo 6. | Simples para os amigos e suficiente com hash forte + limite de tentativas (EA-27). Spec TELA-02. | Proposta |

> Próximo ID livre: **D-29**.

## 3. Pontos em aberto

| ID | Ponto | Origem | Recomendação | Data-limite | Onde será decidido |
|---|---|---|---|---|---|
| EA-01 | Nome definitivo e branding (incluindo o uso de "™") | PRD 18.2-1 | Manter "Outfit Lab" na v1.0. Evitar "™" na interface até verificar se o nome já tem dono [VERIFICAR busca no INPI]. | 31/01/2027 | Pós-v1.0 |
| EA-02 | Campos do cadastro de usuário | PRD 18.2-2 | Nome, sobrenome, e-mail, senha, confirmação e aceite de termos. | 16/11/2026 (atendido pela spec da TELA-02 — aguarda aprovação) | PROMPT-001 Parte B |
| EA-03 | Dados corporais (altura etc.) | PRD 18.2-3 | Fora do cadastro. Revisar só se alguma regra do avaliador provar que precisa deles. | 09/12/2026 | PROMPT-010 |
| EA-04 | Taxonomia final das categorias | PRD 18.2-4 | Partir das 4 do PRD (partes de cima, partes de baixo, calçados, acessórios) + avaliar "peça única" (vestido/macacão) e "camada externa" como função, não categoria. | 18/11/2026 | PROMPT-003 |
| EA-05 | Atributos por categoria | PRD 18.2-5 | Matriz categoria × atributo (obrigatório/opcional/não se aplica). | 18/11/2026 | PROMPT-003 |
| EA-06 | Catálogo de cores | PRD 18.2-6 | Paleta fechada de ~16 cores nomeadas com HEX + 1 cor dominante + até 2 secundárias. Facilita as regras de cor e evita "conta-gotas". | 18/11/2026 | PROMPT-003 |
| EA-07 | Formatos, tamanho e armazenamento local de imagens | PRD 18.2-7 | JPEG/PNG/WebP, máx. 5 MB, disco local no dev. | 16/11/2026 | PROMPT-001 Parte C |
| EA-08 | Representação de camadas e funções | PRD 18.2-8 | Função como atributo da peça no look (base, intermediária, externa, inferior, calçado, acessório), com sugestão automática a partir da categoria. | 18/11/2026 | PROMPT-003 |
| EA-09 | Regras atômicas do avaliador | PRD 18.2-9 | 3–5 regras por dimensão no v1; menos regras, bem explicadas. | 09/12/2026 | PROMPT-010 |
| EA-10 | Pesos, faixas, dados ausentes e fórmula | PRD 18.2-10 | Média ponderada por dimensão; dado ausente não penaliza, mas a regra é marcada "não avaliada" e aparece na explicação. | 09/12/2026 | PROMPT-010 |
| EA-11 | Edição/exclusão/duplicação/histórico de looks | PRD 18.2-11 | Salvar, listar e excluir (Must/Should); editar e duplicar (Could); histórico (Won't). | 18/11/2026 | PROMPT-003 |
| EA-12 | Conteúdo do dashboard | PRD 18.2-12 | Mínimo: saudação, 3 atalhos, contagem de peças e de looks. | 01/12/2026 | PROMPT-004 |
| EA-13 | Estratégia de autenticação | PRD 18.2-13 | Comparar JWT × sessão em cookie para SPA + API e recomendar a mais simples e segura para o deploy escolhido. | 16/11/2026 | PROMPT-001 Parte C |
| EA-15 | Métricas de sucesso além dos testes | PRD 18.2-15 | Adotar as metas do beta do TAP (N ativos, nº de feedbacks, NPS simplificado). | 16/11/2026 | Revisão deste documento |
| EA-16 | Hospedagem (front, API, banco) | PRD 18.2-16 | Comparar 2–3 combinações gratuitas/baratas [VERIFICAR]. | 16/11/2026 | PROMPT-001 Parte C |
| EA-17 | Armazenamento e backup de imagens em produção | PRD 18.2-17 | Serviço de objetos com plano gratuito [VERIFICAR] ou disco persistente do provedor. | 16/11/2026 | PROMPT-001 Parte C |
| EA-18 | Domínio | PRD 18.2-18 | Subdomínio gratuito do provedor na v1.0; domínio próprio é Could (custo anual [VERIFICAR]). | 07/12/2026 | PROMPT-011 |
| EA-19 | Forma de convite dos amigos | PRD 18.2-19 | Allowlist de e-mails via variável de ambiente. | 23/11/2026 | PROMPT-008 |
| EA-20 | Duração do beta e N de amigos | PRD 18.2-20 | Beta de 10/12/2026 a 31/01/2027; convidar 8, meta N = 5 ativos. | 07/12/2026 | Revisão deste documento |
| EA-21 | Carga semanal de horas | PRD 18.2-21 | **25 h/semana** (abaixo disso o Must não cabe; ver Cronograma 5.1). | 16/11/2026 | Revisão do Cronograma |
| EA-22 | Orçamento mensal de hospedagem | TAP | R$ 0, tolerando até R$ 30/mês só se o plano gratuito impedir o beta. | 16/11/2026 | PROMPT-001 Parte C |
| EA-23 | Recuperação de senha: e-mail ou manual | Escopo 6.1 | Plano B manual no beta; e-mail na SPR-06 se houver capacidade. | 30/11/2026 | Revisão da SPR-02 |
| EA-24 | Limites de upload e de peças por usuário | Escopo 6.5 | 5 MB por imagem; 200 peças por usuário. | 23/11/2026 | PROMPT-003 / 009 |
| EA-25 | Dados ao fim do beta | Plano do beta 3.8 | Manter, com direito de exclusão sob pedido. | 07/12/2026 | Antes do PROMPT-012 (termos) |
| EA-26 | Ferramenta do formulário de feedback | Plano do beta 3.5 | Google Forms. | 07/12/2026 | PROMPT-011 |
| EA-27 | Limite de tentativas de login | Qualidade SEG-08 | Should (~2 h); implementar se couber na SPR-02. | 23/11/2026 | PROMPT-008 |
| EA-28 | Calendário de provas finais da faculdade | Cronograma 2 | Verificar e, se cair em SPR-03/04, antecipar trabalho. | 16/11/2026 | Autor |

> O item 14 do PRD v1.0 (ambiente de deploy) foi resolvido por D-07 e desdobrado em EA-16 a EA-18. Próximo ID livre: **EA-29**.

## 4. Premissas (com validação)

| ID | Premissa | Como validar | Quando |
|---|---|---|---|
| PRE-01 | O autor terá ~25 h/semana. | Horas reais registradas no relatório de sprint. | Fim de cada sprint |
| PRE-02 | Existe hospedagem gratuita suficiente para o beta. | Pesquisa na Parte C + deploy real na SPR-03. | 16/11 e 07/12 |
| PRE-03 | Ferramentas de LLM continuarão disponíveis. | Uso diário. | Contínuo |
| PRE-04 | Amigos aceitam participar do beta. | Respostas aos convites da onda 1. | 10/12 |
| PRE-05 | Código gerado e revisado tem qualidade suficiente para a v1.0. | Métricas do Plano de Qualidade. | Fim de cada sprint |
| PRE-06 | Regras determinísticas produzem análises percebidas como úteis. | Pergunta 4 do formulário do beta. | Onda 2 |

## 5. Lições aprendidas

Preencher no fim de cada sprint (≤ 10 min). Foco em **o que repetir** e **o que mudar**, principalmente sobre prompts e revisão de código gerado.

| Sprint | Data | O que funcionou | O que não funcionou | O que mudar na próxima sprint | Lição sobre prompts/LLM |
|---|---|---|---|---|---|
| SPR-00 | | | | | |
| SPR-01 | | | | | |
| SPR-02 | | | | | |
| SPR-03 | | | | | |
| SPR-04 | | | | | |
| SPR-05 | | | | | |
| SPR-06 | | | | | |

---

## 📚 Por que este documento existe

Daqui a três semanas, você (ou uma LLM sem contexto) vai olhar para o código e perguntar "por que isso foi feito assim?". O log de decisões responde. A lista de pontos em aberto impede que a LLM **invente** uma resposta. E as lições aprendidas transformam cada sprint em melhoria do processo, que é exatamente a competência de vibe coding que o projeto quer desenvolver.
