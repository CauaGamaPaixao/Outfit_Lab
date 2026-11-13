# PROMPT 001 — Kickoff: Documentação inicial (PMBOK) + Design System + Protótipos das 3 primeiras telas

| Campo | Valor |
|---|---|
| ID | PROMPT-001 |
| Versão | 2.1 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Iniciação + Planejamento (PMBOK) |
| Entradas obrigatórias | `b_doc_repo/b_docs/a_contexto/Outfit_Lab_PRD_Contexto_Completo_v1.0.md` · `b_doc_repo/c_design/a_referencias/moodboard_v0.png` |
| Saídas | `b_doc_repo/b_docs/a_contexto/*` (PRD v1.1) · `b_doc_repo/b_docs/b_iniciacao/*` · `b_doc_repo/b_docs/c_planejamento/*` · `b_doc_repo/c_design/*` · `AGENTS.md` |
| Convenções | [`a_convencoes/CONVENCAO_DE_PASTAS.md`](a_convencoes/CONVENCAO_DE_PASTAS.md) (D-25) |
| Status | Em execução (Partes A e B concluídas — aguardando revisão; Parte C pendente) |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 13/11/2026 | Versão inicial (Angular, implementação manual, protótipos feitos fora do prompt). |
| 2.0 | 13/11/2026 | Projeto 100% em **vibe coding**; frontend passa de Angular para **React**; prazo **31/12/2026**; inclusão de **deploy e beta fechado com amigos**; os **protótipos passam a ser gerados por este prompt** (Parte B). |
| 2.1 | 13/11/2026 | Aplica a convenção de pastas D-25 (PROMPT-002): caminhos atualizados para a estrutura com prefixo alfabético, D-25 incluída nas decisões, no `AGENTS.md` (regras invioláveis) e no Registro de Decisões; próximos prompts renumerados (+1, PROMPT-003 a PROMPT-011). |

> **Como usar:** cole este prompt inteiro numa LLM com o PRD e o moodboard anexados. Execute **uma parte por vez** (A → B → C), revise cada saída e só depois siga para a próxima. Salve cada artefato no caminho indicado e faça o commit com a mensagem sugerida.

---

## 0. Papel da LLM

Você vai atuar ao mesmo tempo como:

1. **Gerente de projetos**, aplicando o **PMBOK® Guide 7ª edição** (princípios e domínios de desempenho) e usando os artefatos clássicos da 6ª edição quando forem úteis. Adapte tudo (*tailoring*) a um **projeto individual, com prazo curto e desenvolvido com LLM**.
2. **Product designer** especialista em interfaces editoriais de moda e em protótipos de alta fidelidade.
3. **Tech lead / mentor** de um estudante do 3º semestre de ADS. Explique o *porquê* das decisões, sem lições longas.

## 1. Contexto do projeto

O PRD anexado é a fonte de verdade sobre o **produto**. Os pontos que mudaram em relação a ele estão nas **decisões da v2.0** (seção 1.1), que **prevalecem sobre o PRD v1.0**.

**Outfit Lab** é uma aplicação web de guarda-roupa digital. O usuário cadastra as peças (com foto e atributos), organiza tudo num catálogo visual, monta looks e recebe uma **análise explicável**: uma pontuação orientativa de 0 a 100 com justificativas. A análise segue **regras próprias e determinísticas** de cores, camadas, proporções/modelagem e estilo.

### 1.1 Decisões consolidadas da v2.0 (substituem o PRD onde houver conflito)

| # | Decisão | Antes (PRD v1.0) | Agora |
|---|---|---|---|
| D-01 | Forma de desenvolvimento | Implementação manual, com LLM só de apoio | **100% vibe coding**: a LLM gera o código a partir de prompts versionados, e o autor dirige, revisa, testa e integra |
| D-02 | Frontend | Angular | **React** |
| D-03 | Backend | Java + Spring Boot | **Java + Spring Boot** (mantido) |
| D-04 | Banco | MySQL | **MySQL** (mantido) |
| D-05 | Prazo | Não definido | **Aplicação completa até 31/12/2026** (≈ 7 semanas a partir de 13/11/2026) |
| D-06 | Público da v1.0 | Uso pessoal | Uso pessoal **+ beta fechado com amigos**, que vão usar por um período |
| D-07 | Deploy | Fora de escopo / em aberto | **Dentro do escopo**: a aplicação precisa estar publicada na internet, acessível por link |
| D-08 | Protótipos | Feitos fora do fluxo de prompts | **Gerados por este prompt** (Parte B) e versionados no repositório |
| D-09 | Escopo funcional do MVP | PRD seções 6.1 e 8 (RF-01 a RF-12) | **Mantido**. IA (Gemini), avatar, clima, social e reconhecimento por imagem continuam **fora** |
| D-25 | Nomenclatura de pastas | Só `a_tech_repo/` e `b_doc_repo/` com prefixo | **Toda pasta de organização** segue `<letra>_<nome_em_snake_case>`, com a letra indicando a ordem dentro da pasta-mãe (`a_`, `b_`, `c_`…). Pastas exigidas pela stack (`src/`, `.github/`, pacotes Java etc.) são exceção. Ver [`CONVENCAO_DE_PASTAS.md`](a_convencoes/CONVENCAO_DE_PASTAS.md) (PROMPT-002) |

> D-10 a D-24 foram registradas na Parte A, no Registro de Decisões (`b_doc_repo/b_docs/c_planejamento/07_Registro_de_Decisoes_Premissas_e_Licoes.md`). A convenção de pastas recebeu o próximo ID livre, **D-25**.

### 1.2 Objetivos pessoais (stakeholder principal)

1. Ter uma aplicação **útil de verdade** para organizar o próprio guarda-roupa e montar looks.
2. **Disponibilizar para amigos** testarem e usarem por um tempo, coletando feedback.
3. Fortalecer o **currículo/portfólio** com um projeto full stack publicado e bem documentado.
4. Ganhar **domínio de desenvolvimento com LLM** (vibe coding, engenharia de prompt, revisão de código gerado).
5. **Popular o GitHub** com histórico de commits consistente, issues, board, releases e documentação de qualidade.

### 1.3 Estrutura do repositório (decisão consolidada)

```
Outfit_Lab/
├── AGENTS.md                 # contexto permanente para LLMs/agentes de código (gerado na Parte C)
├── README.md                 # vitrine do projeto (portfólio)
├── .github/                  # exceção à D-25 (nome fixo exigido pelo GitHub)
├── a_tech_repo/              # TODO conteúdo técnico
│   ├── a_frontend/           # React (dentro: src/, public/… sem prefixo)
│   ├── b_backend/            # Java + Spring Boot (dentro: src/main/java… sem prefixo)
│   ├── c_database/           # scripts MySQL, migrations, seeds
│   └── d_infra/              # docker-compose, configs de deploy
│       └── a_scripts/        # scripts utilitários (ex.: validar_pastas.sh)
└── b_doc_repo/               # TODO conteúdo documental
    ├── a_prompts/            # REGRA: todo trabalho começa por um PROMPT versionado aqui
    │   └── a_convencoes/     # convenções que todo prompt deve seguir (D-25)
    ├── b_docs/
    │   ├── a_contexto/       # PRD e visão
    │   ├── b_iniciacao/      # TAP, stakeholders
    │   ├── c_planejamento/   # escopo, EAP, cronograma, riscos, qualidade…
    │   ├── d_execucao/       # relatórios de sprint, feedback do beta
    │   └── e_encerramento/   # lições aprendidas, release notes v1.0
    └── c_design/
        ├── a_referencias/    # moodboards
        ├── b_tokens/         # design tokens
        ├── c_specs/          # especificação de cada tela
        └── d_prototipos/     # protótipos navegáveis gerados pela Parte B
```

> **Convenção de pastas (D-25):** toda pasta nova de organização segue `<letra>_<nome_em_snake_case>`, com a letra reiniciando em cada pasta-mãe e sem lacunas. Arquivos não seguem a regra. Detalhes, exceções e o script de validação em [`a_convencoes/CONVENCAO_DE_PASTAS.md`](a_convencoes/CONVENCAO_DE_PASTAS.md).

### 1.4 Regra permanente dos PROMPTS

- Toda tarefa relevante (documento, tela, feature, correção grande) começa com um prompt salvo em `b_doc_repo/a_prompts/` como `PROMPT_NNN_descricao_curta.md`.
- Cada prompt tem cabeçalho (ID, versão, data, fase, entradas, saídas, status) e histórico de versões.
- Todo artefato gerado indica a origem: `Gerado por: PROMPT-NNN vX.Y`.
- Prompts não são apagados. Mudanças viram nova versão ou um novo prompt.

## 2. Regras gerais (valem para todas as partes)

1. **Idioma:** português do Brasil. Termos técnicos consagrados podem ficar em inglês.
2. **Não invente decisões.** O que estiver em aberto recebe a marca **[EM ABERTO]**, com uma **recomendação justificada** e um **prazo para decidir**. O prazo curto exige decisões rápidas: prefira recomendar a opção mais simples que atenda ao objetivo.
3. **Proteja o prazo.** Toda sugestão que aumente o escopo deve vir com **impacto em dias** e a classificação MoSCoW (Must/Should/Could/Won't). O padrão é o MVP do PRD mais o que for indispensável para o beta.
4. **Considere o beta com amigos.** Usuários reais trazem necessidades que o PRD não tratava. Avalie e classifique cada uma: recuperação de senha, política de privacidade e termos (LGPD), canal de feedback, backup do banco, limites de upload, convite ou cadastro aberto, monitoramento de erros e custo de hospedagem.
5. **Tailoring explícito:** projeto individual, sem equipe e com orçamento próximo de zero. Simplifique os artefatos, mas **explique o que foi simplificado e por quê**.
6. **Rastreabilidade:** use IDs (RF-xx, RNF-xx, RN-xx, D-xx, RISK-xx, EAP x.y, TELA-xx, SPR-xx) e cruze esses IDs entre os documentos.
7. **Formato:** Markdown compatível com GitHub, com tabelas para dados estruturados e diagramas em **Mermaid**.
8. **Cabeçalho de cada documento:** título, versão, data, autor, `Gerado por: PROMPT-001 v2.1`, status (Rascunho / Em revisão / Aprovado) e histórico de revisões.
9. **Didática:** termine cada documento com uma seção curta, **"📚 Por que este documento existe"**.
10. **Pastas:** toda pasta nova segue a convenção D-25 (`<letra>_<nome>`; ver `a_convencoes/CONVENCAO_DE_PASTAS.md`).
11. **Informações que mudam com o tempo** (versões LTS, planos gratuitos de hospedagem, preços, limites): verifique na data de execução e cite a fonte. Se não for possível verificar, marque como **[VERIFICAR]**.

---

## PARTE A — Atualização do contexto + documentação PMBOK

### A0. `b_doc_repo/b_docs/a_contexto/Outfit_Lab_PRD_Contexto_Completo_v1.1.md`

- Gere a **v1.1 do PRD** aplicando as decisões D-01 a D-09: troque Angular por React, reescreva as seções 1, 15.3, 17.2 e 18.1 para refletir o vibe coding, inclua o prazo, o deploy e o beta, e acrescente RNFs de operação (disponibilidade básica, backup, observabilidade mínima).
- Preserve **todo** o resto do conteúdo. Adicione um **changelog** no topo listando cada seção alterada.
- Na seção 18.2 (Pontos em aberto), retire o que foi decidido e acrescente o que surgiu (hospedagem, armazenamento de imagens em produção, domínio, forma de convite dos amigos, duração do beta).

### Fase de Iniciação → `b_doc_repo/b_docs/b_iniciacao/`

**A1. `01_Termo_de_Abertura_do_Projeto.md` (Project Charter / TAP)**
- Justificativa (problema do usuário + objetivos pessoais da seção 1.2).
- Objetivos **SMART**. Exemplo: "Aplicação v1.0 publicada em produção e em uso por pelo menos N amigos até 31/12/2026". O número N fica **[EM ABERTO]**, com sugestão.
- Descrição de alto nível do produto, escopo, requisitos de alto nível (RF-01 a RF-12), premissas, restrições (prazo fixo, orçamento ~zero, desenvolvedor único) e riscos de alto nível.
- Marcos com datas.
- Critérios de sucesso, em três grupos: **produto** (PRD seção 14), **beta** (amigos ativos, feedback coletado) e **portfólio** (README com screenshots e link do deploy, releases, issues rastreadas, commits frequentes).
- Papéis: o autor é patrocinador, PM, PO, dev e QA. A LLM aparece como **ferramenta de desenvolvimento**, e os amigos como **beta testers**.

**A2. `02_Registro_de_Stakeholders.md`**
- Autor, amigos beta testers, professores e colegas de ADS, recrutadores, LLMs/ferramentas e provedores de hospedagem.
- Para cada um: interesse, influência, expectativas e estratégia de engajamento. Inclua uma **matriz Poder × Interesse** em Mermaid (`quadrantChart`).

### Fase de Planejamento → `b_doc_repo/b_docs/c_planejamento/`

**A3. `01_Declaracao_de_Escopo.md`**
- Escopo do produto e escopo do projeto, que agora inclui deploy, beta e documentação de portfólio.
- Entregas com critérios de aceitação, priorização **MoSCoW** de cada funcionalidade e **exclusões explícitas**.
- Itens do beta (recuperação de senha, termos/LGPD, feedback etc.) avaliados um a um, com recomendação.

**A4. `02_EAP_e_Dicionario.md` (WBS)**
- EAP orientada a entregas: Gerenciamento · Documentação · Design/UX · Banco de dados · Backend · Frontend · Avaliador de looks · Testes · Infra/Deploy · Beta com amigos · Portfólio.
- Diagrama em Mermaid. O dicionário traz código, pacote, entregável, critério de aceite, dependências, estimativa (horas) e o **prompt previsto** (PROMPT-NNN) que vai gerar cada pacote.

**A5. `03_Cronograma_e_Marcos.md`**
- **Sprints de 1 semana**, com **Gantt em Mermaid** e **caminho crítico** destacado. Use o esqueleto abaixo como ponto de partida e ajuste justificando:

| Sprint | Período | Foco sugerido | Marco |
|---|---|---|---|
| SPR-00 | 13–16/11 | Documentação, design system, protótipos, setup do repositório e do AGENTS.md | M1 — Kickoff concluído |
| SPR-01 | 17–23/11 | Setup React + Spring Boot + MySQL (Docker), CI, autenticação no backend | M2 — Esqueleto rodando |
| SPR-02 | 24–30/11 | Login/cadastro no front, CRUD de peças, upload de imagem | M3 — Guarda-roupa funcional local |
| SPR-03 | 01–07/12 | Tela do guarda-roupa completa, filtros, **primeiro deploy (staging)** | M4 — App no ar |
| SPR-04 | 08–14/12 | Montador de looks + avaliador v1 (regras e testes) | M5 — Análise funcionando |
| SPR-05 | 15–21/12 | Resultado da análise, looks salvos, **início do beta com amigos** | M6 — Beta aberto |
| SPR-06 | 22–31/12 | Correções do feedback, estabilização, README final | M7 — **Release v1.0 (31/12)** |

- Considere feriados (25/12) e a carga semanal disponível: **[EM ABERTO]**, com sugestão de horas por semana. Mostre a folga ou o déficit de horas em relação ao total estimado na EAP e diga o que cortar se faltar tempo.

**A6. `04_Registro_de_Riscos.md`**
- Parta da tabela 17.3 do PRD e acrescente os riscos novos, entre eles:
  - prazo apertado;
  - código gerado que o autor não entende (débito técnico);
  - regressões introduzidas pela LLM;
  - limites e custos de hospedagem gratuita;
  - perda de dados dos amigos;
  - vazamento de dados pessoais (LGPD);
  - segredos commitados no repositório;
  - amigos que não usam ou não dão feedback;
  - uploads abusivos ou muito pesados.
- Colunas: ID, descrição (causa → evento → efeito), categoria, probabilidade (1–5), impacto (1–5), exposição, estratégia, resposta, gatilho e responsável. Inclua a matriz P × I.

**A7. `05_Plano_de_Qualidade.md`**
- **Definição de pronto (DoD)** para documento, tela, endpoint, regra do avaliador e deploy.
- **Qualidade em vibe coding:**
  - todo código gerado passa por revisão (do autor e de uma segunda LLM revisora);
  - testes automatizados obrigatórios para as regras do avaliador e para o isolamento de dados por usuário;
  - lint e formatação automáticos;
  - CI bloqueando o merge com teste falhando;
  - regra de ouro: **nenhum commit de código que o autor não consiga explicar em uma frase**.
- Checklist de segurança mínima: senhas com hash, segredos em variáveis de ambiente, CORS, validação de upload, autorização por usuário em todos os endpoints.
- Métricas de qualidade e como medir cada uma.

**A8. `06_Plano_de_Comunicacao_Configuracao_e_Beta.md`**
- **Comunicação:**
  - README como vitrine;
  - CHANGELOG;
  - GitHub Projects (Kanban);
  - Issues com templates (bug, feature, feedback do beta);
  - Releases e tags por marco;
  - posts de progresso no LinkedIn (opcional).
- **Configuração e mudanças:**
  - estratégia de branches: compare `main` + `feature/*` (trunk-based simplificado) com git-flow e **recomende uma**, considerando um dev solo com prazo curto;
  - SemVer;
  - Conventional Commits;
  - como uma mudança de escopo é registrada: novo D-xx, nova versão do PRD e novo prompt.
- **Plano do beta:**
  - como convidar os amigos;
  - onboarding (mensagem-modelo);
  - canal e formulário de feedback;
  - duração;
  - como triar o feedback em issues;
  - comunicação de manutenção e de incidentes;
  - o que acontece com os dados ao fim do beta.

**A9. `07_Registro_de_Decisoes_Premissas_e_Licoes.md`**
- Log de decisões no formato ADR simplificado (contexto, decisão, alternativas, consequências), já preenchido com:
  - as decisões consolidadas do PRD (seção 18.1);
  - D-01 a D-09;
  - a estrutura do repositório e a regra dos prompts;
  - **D-25**, a convenção de prefixo alfabético nas pastas (PROMPT-002);
  - a regra de cores 60/30/10.
- Todos os pontos **[EM ABERTO]**, com recomendação e data-limite.
- Seção de lições aprendidas, vazia, para preencher a cada sprint.

**A10. `b_doc_repo/README.md` (índice)**
- Índice navegável de todos os documentos, prompts e protótipos, com o status de cada um.

**Commits sugeridos da Parte A:** `docs(contexto): atualiza PRD para v1.1 (React, vibe coding, beta)` · `docs(iniciacao): adiciona TAP e registro de stakeholders` · `docs(planejamento): adiciona escopo, EAP, cronograma, riscos, qualidade e plano do beta`.

---

## PARTE B — Design System + Protótipos das telas (gerados por este prompt)

### B1. `b_doc_repo/c_design/00_Analise_do_Moodboard.md`

Analise o `moodboard_v0.png` e documente:
- **O que manter:**
  - tipografia Inter e a hierarquia do moodboard (H1 32/40 semibold, H2 24/32 semibold, H3 18/24 medium, Body 16/24 regular, Caption 14/20 regular);
  - logo "Outfit Lab™" empilhado em peso bold/extra-bold;
  - tagline "Organize. Monte. Analise. Evolua.";
  - cards editoriais com a imagem como protagonista;
  - fotografia neutra/P&B com sneakers amarelos como ponto focal;
  - CTA amarelo, muito espaço em branco, navegação inferior com botão "+" amarelo no mobile.
- **Enhancements obrigatórios**, cada um com justificativa:
  1. **Cadastro com o mínimo de dados** (PRD 10.1): só nome, sobrenome, e-mail, senha, confirmação de senha e aceite dos termos e da política de privacidade. Altura, tom de pele, sexo e data de nascimento saem do formulário, e a decisão fica registrada como **[EM ABERTO]**, para revisar se alguma regra do avaliador precisar desses dados.
  2. **Login social (Google/Apple) fora do MVP**: remova os botões ou mostre-os desabilitados com "em breve".
  3. **Contraste:** o amarelo `#FACC15` nunca é usado como cor de texto sobre fundo claro. Ele entra como **preenchimento**, com texto `#0A0A0A` (≈ 12:1).
  4. **Estados explícitos** (RF-12): padrão, hover, foco, validação, erro, carregando (skeleton), vazio e sucesso.
  5. **Hierarquia e respiro:** títulos editoriais maiores, labels com no mínimo 13 px e alvos de toque de pelo menos 44 px.
  6. **Sem logos de marcas de terceiros na interface**: as marcas aparecem só como texto/dado do usuário. Nos protótipos, use **ilustrações SVG genéricas das peças**, sem fotos de pessoas reais.
  7. **Recuperação de senha**: inclua o link "Esqueci minha senha" e marque como Must ou Should, conforme a Declaração de Escopo, já que amigos vão usar o app.
  8. **Responsividade:** no desktop, layout editorial em duas colunas (auth) ou sidebar escura com conteúdo claro (app). No mobile, uma coluna, navegação inferior e CTA flutuante.

### B2. Regra de cores 60/30/10 → `b_doc_repo/c_design/b_tokens/`

| Proporção | Papel | Cores | Onde usar |
|---|---|---|---|
| **60% — dominante** | Fundo / respiro | `#FAFAFA` off-white · `#FFFFFF` superfície de cards · `#F2F2F2` fundo de imagem | Fundo das páginas, cards, áreas de imagem |
| **30% — secundária** | Estrutura / texto / contraste | `#0A0A0A` preto · `#1F1F1F` cinza escuro · `#E5E5E5` bordas e divisores · `#6B6B6B` texto secundário (validar ≥ 4.5:1) | Tipografia, painéis escuros (sidebar, painel editorial), bordas, ícones, botões secundários, chips ativos |
| **10% — acento** | Ação e destaque | `#FACC15` amarelo (hover `#EAB308`) | CTA principal, item de navegação ativo, anel de foco, badges, indicadores de pontuação. **Nunca** em grandes áreas nem como texto sobre fundo claro |

Gere:
- `design_tokens.md`: documentação dos tokens, com papéis semânticos (`bg`, `surface`, `image`, `text`, `text-muted`, `border`, `accent`, `accent-hover`, `danger`, `success`), tipografia, espaçamento (escala de 4 px), raios (8 px inputs, 12 px cards, 999 px pills), sombras mínimas e breakpoints (375 / 768 / 1024 / 1440).
- `tokens.css`: CSS custom properties prontas para importar no React.
- `tokens.ts`: os mesmos tokens como objeto TypeScript (reutilizáveis no React e numa futura configuração de Tailwind, se ela for adotada).

### B3. Especificações → `b_doc_repo/c_design/c_specs/`

Para cada tela, gere `TELA-0X_<nome>.md` com: objetivo, RFs relacionados, componentes, campos e validações (regras exatas, como o tamanho mínimo da senha), mensagens de erro (texto final), estados, comportamento responsivo, acessibilidade e **mapeamento para componentes React** (nome do componente, props principais e quais são reutilizáveis entre telas).

### B4. Protótipos → `b_doc_repo/c_design/d_prototipos/`

Gere **um arquivo HTML autocontido por tela** (HTML + CSS + JS puro inline, fonte Inter via Google Fonts, sem build), que abra direto no navegador e possa ser publicado no GitHub Pages. Requisitos comuns:
- Use **exatamente** os tokens da B2, declarados como CSS custom properties no topo do arquivo.
- Inclua um **painel "Estados"** discreto num canto da tela, com botões para alternar entre os estados da tela.
- Faça a validação funcionar no cliente, com mensagens inline.
- Garanta que tudo funcione em 375 px e em 1440 px.
- Marque visualmente os pontos **[EM ABERTO]** com um selo pontilhado discreto.
- Estruture o código pensando na conversão para React: blocos com nomes que correspondam aos componentes da spec (use comentários `<!-- <AuthLayout> -->`, `<!-- <PieceCard> -->` etc.).

**TELA-01 — Login (`01_login.html`)** — RF-02
- **Desktop:** painel editorial escuro à esquerda, com logo, tagline, colagem de ilustrações das peças (sneaker amarelo em destaque) e a frase "Moda não é só o que você veste, é como você se expressa."; formulário à direita, sobre off-white.
- **Campos e ações:** e-mail, senha (com mostrar/ocultar), "Lembrar de mim", "Esqueci minha senha", botão "Entrar" (amarelo) e link "Criar conta".
- **Estados:** padrão, validação, credenciais inválidas (alerta), carregando (spinner no botão).

**TELA-02 — Cadastro (`02_cadastro.html`)** — RF-01
- **Layout:** espelhado em relação ao login. No painel escuro, um "como funciona" em 3 passos (Cadastre suas peças → Monte looks → Entenda a análise) e um card de exemplo com a pontuação.
- **Campos:** nome, sobrenome, e-mail, senha (com indicador de força), confirmar senha e aceite de termos/privacidade.
- **Anotação de design:** uma nota visível no protótipo explica a remoção dos dados corporais.
- **Estados:** padrão, validação, senhas diferentes, e-mail já cadastrado e sucesso (com CTA "Ir para o guarda-roupa").

**TELA-03 — Meu guarda-roupa (`03_guarda_roupa.html`)** — RF-03 a RF-06
- **Navegação:** sidebar escura no desktop (Início, Guarda-roupa [ativo, com ponto amarelo], Montar look, Looks salvos, Perfil, usuário no rodapé). No mobile, barra inferior com o botão "+" amarelo central.
- **Cabeçalho:** eyebrow "Coleção pessoal", título grande "Guarda-roupa", contagem de peças e botão "Adicionar peça".
- **Busca e filtros:** campo de busca por nome/marca; chips de categoria com contagem (Todas, Partes de cima, Partes de baixo, Calçados, Acessórios — a taxonomia continua **[EM ABERTO]**); selects de modelagem e cor. A busca e os filtros **funcionam** sobre dados mockados (~12 peças variadas).
- **Cards** (4 colunas no desktop, 3 em telas médias, 2 no mobile): imagem grande com ilustração SVG, selo de categoria, menu ⋯ (Editar/Excluir), botão "Adicionar ao look" (alterna para "No look", em amarelo), nome, marca, bolinhas das cores e selo de modelagem.
- **Barra flutuante "N peças no look"**, com miniaturas e CTA "Montar look", que aparece ao selecionar peças.
- **Estados:** com peças, carregando (skeleton), guarda-roupa vazio (com CTA para a primeira peça) e busca sem resultado.

### B5. Checklist de validação do design

Responda ao checklist no fim da Parte B:
- [ ] Proporção 60/30/10 respeitada em cada tela.
- [ ] Contraste WCAG AA em todos os textos.
- [ ] Todo campo com `<label>` associado, foco visível e navegação por teclado.
- [ ] Layout funcional em 375 px e 1440 px.
- [ ] Todos os estados acessíveis pelo painel "Estados".
- [ ] Nenhuma decisão em aberto apresentada como definitiva.
- [ ] Nenhum logo de marca, foto de pessoa real ou imagem externa.

**Commits sugeridos da Parte B:** `design: adiciona análise do moodboard e design tokens` · `design(specs): especifica telas de login, cadastro e guarda-roupa` · `design(prototipos): adiciona protótipos navegáveis das telas 01–03`.

---

## PARTE C — Kickoff técnico para vibe coding

### C1. `AGENTS.md` (raiz do repositório)

Arquivo de **contexto permanente** que toda LLM ou agente de código deve ler antes de gerar código. Deve conter:
- resumo do produto e link para o PRD v1.1;
- stack e versões;
- estrutura de pastas;
- convenções de código (nomes, idioma do código e dos comentários, padrões de pacotes no Spring e de componentes no React);
- regras invioláveis: isolamento de dados por usuário em todo endpoint, segredos só em variáveis de ambiente, testes obrigatórios para regras do avaliador, não adicionar dependências sem justificativa, não alterar escopo, **toda pasta nova de organização segue a convenção D-25** (`<letra>_<nome_em_snake_case>`, exceto as pastas exigidas pela stack), com link para `b_doc_repo/a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md` e o comando do script `a_tech_repo/d_infra/a_scripts/validar_pastas.sh`;
- como rodar, testar e fazer lint;
- a regra dos prompts;
- o checklist de revisão que o autor aplica em cada entrega da LLM.

Mantenha o arquivo enxuto: ele será lido o tempo todo.

### C2. `b_doc_repo/b_docs/c_planejamento/08_Guia_de_Kickoff_Tecnico.md`

1. **Decisões de stack** (recomende e justifique; marque **[EM ABERTO]** só o que depende do autor):
   - **Frontend:** React com Vite e **TypeScript** (recomendado); roteamento; gerenciamento de dados do servidor (ex.: TanStack Query); formulários e validação; estilização (CSS Modules com os tokens ou Tailwind configurado com os tokens — compare e recomende).
   - **Backend:** versão LTS do Java, Spring Boot 3.x, Maven ou Gradle, Spring Security com **JWT** ou **sessão em cookie** (compare para SPA + API e recomende), Spring Data JPA, **Flyway** para migrations, Bean Validation, OpenAPI/Swagger.
   - **Banco:** MySQL 8 via **Docker Compose** no ambiente local.
   - **Imagens:** armazenamento local no desenvolvimento e serviço de objetos em produção, com limite de tamanho e formatos aceitos (JPEG, PNG, WebP).
   - **Testes:** JUnit 5 + Mockito + Testcontainers (backend); Vitest + Testing Library (frontend); E2E opcional (Playwright) só para o fluxo principal.
2. **Estrutura inicial de `a_tech_repo/`** (`a_frontend/`, `b_backend/`, `c_database/`, `d_infra/`, conforme D-25): só a árvore de pastas e os READMEs. **O código da aplicação será gerado pelos próximos prompts.**
3. **Plano de deploy:**
   - compare 2–3 combinações de hospedagem com plano gratuito ou de baixo custo para frontend React, API Spring Boot, MySQL gerenciado e armazenamento de imagens, considerando limites, "cold start", custo após o período gratuito e facilidade (**[VERIFICAR]** preços e limites na data);
   - recomende uma combinação;
   - descreva os ambientes (local, produção), variáveis de ambiente, HTTPS, domínio (**[EM ABERTO]**) e a estratégia de backup do banco durante o beta.
4. **CI/CD com GitHub Actions:** build e testes em cada push/PR; passo que roda `a_tech_repo/d_infra/a_scripts/validar_pastas.sh` (D-25); deploy automático da `main` (se a hospedagem escolhida permitir).
5. **Observabilidade mínima para o beta:** logs da API, captura de erros do frontend (opcional) e um endpoint de health check.
6. **GitHub como portfólio:**
   - README raiz com badges, GIF/screenshots, link do deploy, stack, arquitetura (Mermaid) e "Como rodar";
   - topics;
   - GitHub Projects;
   - labels (incluindo `beta-feedback`);
   - milestones iguais aos marcos M1–M7;
   - GitHub Pages servindo os protótipos de `b_doc_repo/c_design/d_prototipos/` (publicação via GitHub Actions, já que o Pages só serve `/` ou `/docs` no modo por branch).
7. **Fluxo de trabalho de vibe coding** (documente como processo repetível):
   1. Abrir uma issue.
   2. Escrever o `PROMPT_NNN` (objetivo, contexto, arquivos afetados, critérios de aceite, testes esperados).
   3. Gerar o código com a LLM usando o `AGENTS.md` como contexto.
   4. Rodar, testar e revisar (pedir à LLM que explique trechos não entendidos).
   5. Revisão por uma segunda LLM.
   6. Commit com Conventional Commits, referenciando a issue e o prompt.
   7. Registrar o aprendizado.
8. **Backlog inicial:** as primeiras **15 issues**, com título, descrição, critérios de aceite, labels, sprint, pacote da EAP e o **PROMPT-NNN** previsto. Cubra as SPR-00 a SPR-02.
9. **Próximos prompts** (título, objetivo, sprint). O PROMPT-002 já foi usado pela convenção de pastas (D-25), por isso a lista começa no 003:
   - PROMPT-003: requisitos funcionais/não funcionais detalhados e regras de negócio;
   - PROMPT-004: protótipos das telas restantes (dashboard, cadastro de peça, montador, resultado da análise, looks salvos, perfil);
   - PROMPT-005: modelagem de dados (DER + migrations);
   - PROMPT-006: arquitetura e contratos da API (OpenAPI);
   - PROMPT-007: setup do monorepo (React + Spring Boot + Docker + CI);
   - PROMPT-008: autenticação;
   - PROMPT-009: CRUD de peças + upload;
   - PROMPT-010: regras do avaliador v1;
   - PROMPT-011: deploy e beta.

**Commits sugeridos da Parte C:** `chore: adiciona AGENTS.md com contexto para LLMs` · `docs(planejamento): adiciona guia de kickoff técnico e backlog inicial` · `chore(repo): cria estrutura inicial do a_tech_repo`.

---

## 3. Formato da resposta esperada

1. Comece cada parte com um **resumo de até 5 linhas** do que será gerado.
2. Entregue cada arquivo num bloco separado, precedido do **caminho completo** (ex.: `b_doc_repo/b_docs/b_iniciacao/01_Termo_de_Abertura_do_Projeto.md`). Protótipos HTML vão **completos**, sem trechos omitidos.
3. Ao final de cada parte, liste:
   - **decisões tomadas**;
   - **pontos [EM ABERTO]**, com recomendação e data-limite;
   - **[VERIFICAR]** pendentes;
   - até **5 perguntas** que o autor precisa responder antes da próxima parte.
4. Termine com as **mensagens de commit** da parte.
