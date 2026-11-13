# Termo de Abertura do Projeto (TAP) — Outfit Lab

| Campo | Valor |
|---|---|
| Documento | Termo de Abertura do Projeto (Project Charter) |
| Versão | 1.1 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.0 |
| Status | Em revisão |
| Referências | PRD v1.1 · `02_Registro_de_Stakeholders.md` · `../c_planejamento/*` |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial. |
| 1.1 | 13/11/2026 | Cauã Gama Paixão | Caminhos atualizados para a convenção de pastas D-25 e prompts previstos renumerados (+1) — PROMPT-002. |

---

## 1. Identificação

| Item | Valor |
|---|---|
| Nome do projeto | Outfit Lab — guarda-roupa digital com análise explicável de looks |
| Patrocinador | Cauã Gama Paixão |
| Gerente do projeto | Cauã Gama Paixão |
| Data de início | 13/11/2026 |
| Data de término prevista | 31/12/2026 (release v1.0) |
| Orçamento | Próximo de zero (limite mensal **[EM ABERTO]**, sugestão: até R$ 30/mês, só se o plano gratuito não bastar) |
| Abordagem | Ágil adaptada, sprints de 1 semana, desenvolvimento 100% em vibe coding |

## 2. Justificativa

**Problema do usuário.** Quem tem muitas peças de roupa tem dificuldade para enxergar o guarda-roupa como um todo, lembrar combinações possíveis e avaliar de forma organizada por que um look funciona ou não (PRD 3.5).

**Oportunidade pessoal.** O projeto atende a cinco objetivos do autor (stakeholder principal):

| # | Objetivo pessoal | Como o projeto atende |
|---|---|---|
| OP-1 | Ter uma aplicação útil de verdade | O autor é o primeiro usuário e usa o app no dia a dia. |
| OP-2 | Disponibilizar para amigos | Beta fechado com amigos, com app publicado e feedback estruturado. |
| OP-3 | Fortalecer currículo/portfólio | Projeto full stack publicado, com documentação PMBOK, protótipos e README de vitrine. |
| OP-4 | Dominar desenvolvimento com LLM | Processo de vibe coding com prompts versionados, revisão cruzada e testes. |
| OP-5 | Popular o GitHub | Commits frequentes, issues, board, milestones e releases. |

## 3. Objetivos SMART

| ID | Objetivo | Métrica | Prazo |
|---|---|---|---|
| OBJ-01 | Publicar a v1.0 do Outfit Lab na internet, com o fluxo principal completo (RF-01 a RF-12). | Todos os critérios da PRD seção 14 verificados em produção. | 31/12/2026 |
| OBJ-02 | Ter a aplicação em uso por pelo menos **N amigos** no beta. | Amigos com conta criada e ao menos 1 look analisado. N **[EM ABERTO]**, sugestão: **N = 5** (convidar 8, prevendo ~60% de adesão). | 31/12/2026 |
| OBJ-03 | Coletar feedback estruturado do beta. | ≥ 3 respostas ao formulário de feedback e todas triadas em issues com a label `beta-feedback`. | 31/12/2026 |
| OBJ-04 | Garantir a qualidade do núcleo. | 100% das regras do avaliador e dos testes de isolamento por usuário cobertos por testes automatizados; CI verde na `main`. | 31/12/2026 |
| OBJ-05 | Manter rastreabilidade do vibe coding. | 100% das features com issue + PROMPT-NNN + commit referenciando ambos. | Contínuo, verificado em 31/12/2026 |
| OBJ-06 | Montar a vitrine de portfólio. | README raiz com link do deploy, screenshots/GIF, arquitetura e "Como rodar"; release `v1.0.0` publicada. | 31/12/2026 |

**Por que N = 5?** É um número que um grupo de amigos alcança sem esforço de divulgação e que gera feedback variado. Com menos de 3 pessoas, o feedback tende a refletir uma opinião só.

## 4. Descrição de alto nível do produto

Aplicação web (SPA em React + API Java/Spring Boot + MySQL) em que o usuário:
1. cria conta e entra;
2. cadastra peças com foto e atributos (categoria, marca, cores, modelagem);
3. visualiza o guarda-roupa como catálogo editorial, com busca e filtros;
4. seleciona peças e monta um look, identificando a função/camada de cada peça;
5. recebe uma análise determinística, com pontuação orientativa de 0 a 100 e justificativas por critério (cores, camadas/proporções, estilo);
6. salva e consulta seus looks.

## 5. Escopo de alto nível

| Dentro | Fora (v1.0) |
|---|---|
| RF-01 a RF-12 (PRD seção 8) | IA generativa (Gemini), sugestão automática de looks |
| Deploy em produção com HTTPS | Avatar/visualização corporal |
| Beta fechado com amigos | Reconhecimento de peças/cores por imagem |
| Itens mínimos de operação: termos/privacidade, feedback, backup, limites de upload, controle de cadastro, recuperação de senha (Should) | Clima, ocasião, social, compartilhamento público |
| Documentação PMBOK, protótipos e portfólio no GitHub | App mobile nativo, estatísticas avançadas, login social |

O detalhamento está na Declaração de Escopo (`c_planejamento/01_Declaracao_de_Escopo.md`).

## 6. Requisitos de alto nível

| ID | Requisito |
|---|---|
| RF-01 | Cadastro de usuário com dados mínimos |
| RF-02 | Autenticação |
| RF-03 | CRUD de peças |
| RF-04 | Atributos da peça (categoria, nome, marca, cores, modelagem) |
| RF-05 | Imagem da peça |
| RF-06 | Guarda-roupa em coleção visual com filtros |
| RF-07 | Montar look |
| RF-08 | Camadas/funções no look |
| RF-09 | Analisar look por regras próprias |
| RF-10 | Exibir pontuação e justificativas |
| RF-11 | Salvar e consultar looks |
| RF-12 | Estados de interface (sucesso, erro, carregando, validação, vazio) |
| RNF-11 a RNF-15 | Disponibilidade básica, backup, observabilidade mínima, limites de upload, proteção de dados pessoais |

## 7. Premissas

- O autor tem disponibilidade semanal suficiente (carga **[EM ABERTO]**, sugestão: 25 h/semana — ver Cronograma).
- Ferramentas de LLM (geração e revisão) continuam acessíveis durante todo o projeto.
- Há plano gratuito ou de baixo custo que comporte o beta ([VERIFICAR] no Guia de Kickoff Técnico).
- Os amigos convidados aceitam usar uma versão beta e dar feedback.
- O código gerado por LLM, revisado e testado, tem qualidade suficiente para a v1.0.

## 8. Restrições

- **Prazo fixo:** 31/12/2026, sem prorrogação. Se faltar tempo, corta-se escopo (Could → Should), nunca a data.
- **Orçamento ~zero.**
- **Desenvolvedor único**, sem equipe de apoio.
- **Período de festas:** 24, 25 e 31/12 com disponibilidade reduzida; 20/11 é feriado nacional.
- **Dados pessoais de terceiros** exigem conformidade básica com a LGPD.

## 9. Riscos de alto nível

| ID | Risco | Resposta resumida |
|---|---|---|
| RISK-09 | Prazo apertado para o escopo total | Priorização MoSCoW, lista de cortes pré-aprovada, buffer na SPR-06. |
| RISK-10 | Código gerado que o autor não entende | Regra de ouro (explicar em uma frase), revisão por segunda LLM. |
| RISK-11 | Regressões introduzidas pela LLM | Testes automatizados + CI bloqueando merge. |
| RISK-12 | Limites/custos da hospedagem gratuita | Escolher provedor no kickoff e fazer deploy cedo (SPR-03). |
| RISK-13/14 | Perda ou vazamento de dados dos amigos | Backup diário, restauração testada, coleta mínima, segredos fora do Git. |
| RISK-16 | Amigos não usam ou não dão feedback | Beta em ondas, onboarding guiado, formulário curto, lembretes. |

O registro completo está em `c_planejamento/04_Registro_de_Riscos.md`.

## 10. Marcos

| Marco | Descrição | Data-alvo | Sprint |
|---|---|---|---|
| M1 | Kickoff concluído (documentação, design system, protótipos 01–03, AGENTS.md) | 16/11/2026 | SPR-00 |
| M2 | Esqueleto rodando (React + Spring Boot + MySQL + CI + autenticação no backend) | 23/11/2026 | SPR-01 |
| M3 | Guarda-roupa funcional local (login/cadastro, CRUD de peças, upload) | 30/11/2026 | SPR-02 |
| M4 | App no ar (guarda-roupa completo em produção) | 07/12/2026 | SPR-03 |
| M5 | Análise funcionando (montador + avaliador v1 com testes) | 14/12/2026 | SPR-04 |
| M6 | Beta aberto (fluxo completo, amigos convidados) | 21/12/2026 | SPR-05 |
| M7 | **Release v1.0** | **31/12/2026** | SPR-06 |

## 11. Critérios de sucesso

### 11.1 Produto (PRD seção 14)
- [ ] Criar conta e fazer login.
- [ ] Cadastrar, consultar, editar e excluir as próprias peças, com persistência.
- [ ] Guarda-roupa em coleção visual.
- [ ] Selecionar peças e montar look com funções/camadas consistentes.
- [ ] Análise com regras documentadas e explicações compreensíveis.
- [ ] Salvar e consultar looks.
- [ ] Feedback nos principais estados.
- [ ] Dados isolados por usuário, comprovado por teste automatizado.
- [ ] Regras de negócio centrais com testes.

### 11.2 Beta
- [ ] Aplicação acessível por link HTTPS.
- [ ] ≥ N amigos ativos (sugestão: 5), cada um com pelo menos 1 look analisado.
- [ ] ≥ 3 respostas ao formulário de feedback.
- [ ] 100% do feedback triado em issues `beta-feedback`.
- [ ] Nenhuma perda de dados de beta testers.

### 11.3 Portfólio
- [ ] README raiz com link do deploy, screenshots/GIF, stack, arquitetura (Mermaid) e "Como rodar".
- [ ] Releases/tags por marco e `v1.0.0` publicada.
- [ ] Issues rastreadas no GitHub Projects, com milestones M1–M7.
- [ ] Commits frequentes (meta: commits em ≥ 5 dias por semana durante as sprints).
- [ ] Protótipos publicados no GitHub Pages.

## 12. Papéis e responsabilidades

| Papel | Quem | Responsabilidades |
|---|---|---|
| Patrocinador | Cauã Gama Paixão | Aprova o TAP, o escopo e as mudanças; arca com eventuais custos. |
| Gerente de projeto (PM) | Cauã Gama Paixão | Planeja sprints, controla prazo e riscos, mantém documentação. |
| Product Owner (PO) | Cauã Gama Paixão | Prioriza o backlog (MoSCoW) e aceita entregas. |
| Desenvolvedor | Cauã Gama Paixão (dirigindo a LLM) | Escreve prompts, revisa, integra e faz deploy. |
| QA | Cauã Gama Paixão | Define critérios de aceite, roda testes e valida o fluxo. |
| Ferramenta de desenvolvimento | LLM geradora de código | Gera código e documentos a partir dos prompts versionados. **Não toma decisões de projeto.** |
| Ferramenta de revisão | Segunda LLM revisora | Revisa o código gerado antes do merge. |
| Beta testers | Amigos convidados | Usam o app e dão feedback pelo canal oficial. |

## 13. Aprovação

| Nome | Papel | Data | Assinatura |
|---|---|---|---|
| Cauã Gama Paixão | Patrocinador / PM | ___/___/2026 | __________ |

---

## 📚 Por que este documento existe

O TAP é a "certidão de nascimento" do projeto: autoriza o início e registra **por que** o projeto existe, **o que** se espera dele e **até quando**. Num projeto solo ele parece burocrático, mas serve de âncora: quando surgir a vontade de "só adicionar mais uma coisa", os objetivos SMART e a data de 31/12 ajudam a dizer não.
