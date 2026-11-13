# b_doc_repo — Índice da documentação do Outfit Lab

| Campo | Valor |
|---|---|
| Versão | 1.3 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.0 · atualizado por PROMPT-002 v1.1, PROMPT-001 v2.1/v2.2 (Partes B e C) e PROMPT-003 v1.0 |
| Status | Em revisão (atualizar a cada novo artefato) |

Este diretório guarda **todo o conteúdo documental** do projeto: prompts, documentos de gerenciamento (PMBOK adaptado) e design. O código fica em [`../a_tech_repo/`](../a_tech_repo/).

> **Convenção de pastas (D-25):** toda pasta de organização usa o prefixo `<letra>_` que indica sua ordem dentro da pasta-mãe. Ver [`a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md`](a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md).

**Legenda de status:** ✅ Aprovado · 📝 Em revisão · 🚧 Rascunho · ⏳ Pendente (ainda não gerado)

---

## 🧠 Prompts — [`a_prompts/`](a_prompts/)

> Regra: toda tarefa relevante começa por um prompt versionado aqui (D-17).
>
> Convenções que todo prompt deve seguir: [`a_prompts/a_convencoes/`](a_prompts/a_convencoes/) — [Convenção de pastas](a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md).

| ID | Arquivo | Objetivo | Versão | Status |
|---|---|---|---|---|
| PROMPT-001 | [PROMPT_001_kickoff_documentacao_design.md](a_prompts/PROMPT_001_kickoff_documentacao_design.md) | Documentação PMBOK, design system, protótipos 01–03, AGENTS.md, guia técnico | 2.2 | 📝 Partes A, B e C executadas (aguarda revisão) |
| PROMPT-002 | [PROMPT_002_convencao_de_pastas.md](a_prompts/PROMPT_002_convencao_de_pastas.md) | Convenção de prefixo alfabético nas pastas (D-25) + script de validação | 1.1 | ✅ Executado |
| PROMPT-003 | [PROMPT_003_telas_no_figma.md](a_prompts/PROMPT_003_telas_no_figma.md) | Telas 01–03 no Figma Make + pós-processamento para o Figma MCP (D-33) | 1.0 | ⏳ Pronto para execução (autor, no Figma) |
| PROMPT-004 | — | Requisitos detalhados e regras de negócio | — | ⏳ |
| PROMPT-005 | — | Specs e telas 04–09 no Figma (D-33) | — | ⏳ |
| PROMPT-006 | — | Modelagem de dados (DER + migrations) | — | ⏳ |
| PROMPT-007 | — | Arquitetura e contratos da API (OpenAPI) | — | ⏳ |
| PROMPT-008 | — | Setup do monorepo (React + Spring Boot + Docker + CI) | — | ⏳ |
| PROMPT-009 | — | Autenticação | — | ⏳ |
| PROMPT-010 | — | CRUD de peças + upload | — | ⏳ |
| PROMPT-011 | — | Regras do avaliador v1 | — | ⏳ |
| PROMPT-012 | — | Deploy e beta | — | ⏳ |

## 📄 Documentos

### a — Contexto — [`b_docs/a_contexto/`](b_docs/a_contexto/)

| Documento | Versão | Status |
|---|---|---|
| [PRD — Contexto Completo v1.1](b_docs/a_contexto/Outfit_Lab_PRD_Contexto_Completo_v1.1.md) (**vigente**) | 1.1 | 📝 |
| [PRD — Contexto Completo v1.0](b_docs/a_contexto/Outfit_Lab_PRD_Contexto_Completo_v1.0.md) (histórico) | 1.0 | Substituído pela v1.1 |

### b — Iniciação — [`b_docs/b_iniciacao/`](b_docs/b_iniciacao/)

| Documento | Versão | Status |
|---|---|---|
| [Termo de Abertura do Projeto (TAP)](b_docs/b_iniciacao/01_Termo_de_Abertura_do_Projeto.md) | 1.1 | 📝 |
| [Registro de Stakeholders](b_docs/b_iniciacao/02_Registro_de_Stakeholders.md) | 1.0 | 📝 |

### c — Planejamento — [`b_docs/c_planejamento/`](b_docs/c_planejamento/)

| Documento | Versão | Status |
|---|---|---|
| [Declaração de Escopo](b_docs/c_planejamento/01_Declaracao_de_Escopo.md) | 1.2 | 📝 |
| [EAP e Dicionário](b_docs/c_planejamento/02_EAP_e_Dicionario.md) | 1.2 | 📝 |
| [Cronograma e Marcos](b_docs/c_planejamento/03_Cronograma_e_Marcos.md) | 1.2 | 📝 |
| [Registro de Riscos](b_docs/c_planejamento/04_Registro_de_Riscos.md) | 1.2 | 📝 |
| [Plano de Qualidade](b_docs/c_planejamento/05_Plano_de_Qualidade.md) | 1.2 | 📝 |
| [Plano de Comunicação, Configuração e Beta](b_docs/c_planejamento/06_Plano_de_Comunicacao_Configuracao_e_Beta.md) | 1.2 | 📝 |
| [Registro de Decisões, Premissas e Lições](b_docs/c_planejamento/07_Registro_de_Decisoes_Premissas_e_Licoes.md) | 1.3 | 📝 |
| [Guia de Kickoff Técnico](b_docs/c_planejamento/08_Guia_de_Kickoff_Tecnico.md) | 1.0 | 📝 |

### d — Execução — `b_docs/d_execucao/`

| Documento | Status |
|---|---|
| Relatórios de sprint (`SPR-01.md` … `SPR-06.md`) | ⏳ A partir de 23/11 |
| Feedback consolidado do beta | ⏳ A partir de 10/12 |

### e — Encerramento — `b_docs/e_encerramento/`

| Documento | Status |
|---|---|
| Lições aprendidas consolidadas | ⏳ 30/12 |
| Release notes v1.0 | ⏳ 30/12 |

## 🎨 Design — `c_design/`

| Artefato | Caminho | Status |
|---|---|---|
| Moodboard v0 | `c_design/a_referencias/moodboard_v0.png` | ⏳ Falta adicionar ao repositório |
| Análise do moodboard | [`c_design/00_Analise_do_Moodboard.md`](c_design/00_Analise_do_Moodboard.md) | 📝 v1.0 ([VERIFICAR] com a imagem do moodboard) |
| Design tokens (doc, CSS, TS) | [`design_tokens.md`](c_design/b_tokens/design_tokens.md) · [`tokens.css`](c_design/b_tokens/tokens.css) · [`tokens.ts`](c_design/b_tokens/tokens.ts) | 📝 v1.0 |
| Specs TELA-01 a 03 | [TELA-01 Login](c_design/c_specs/TELA-01_login.md) · [TELA-02 Cadastro](c_design/c_specs/TELA-02_cadastro.md) · [TELA-03 Guarda-roupa](c_design/c_specs/TELA-03_guarda_roupa.md) | 📝 v1.0 |
| Protótipos TELA-01 a 03 | [`c_design/d_prototipos/`](c_design/d_prototipos/README.md) (01_login, 02_cadastro, 03_guarda_roupa + checklist B5) | 📝 v1.0 |
| Arquivo Figma `Outfit Lab — UI` (telas 01–03, variáveis = tokens) | link a registrar | ⏳ PROMPT-003 (autor, no Figma) |
| Specs e protótipos TELA-04 a 09 | `c_design/c_specs/`, `c_design/d_prototipos/` | ⏳ PROMPT-005 |

## 🧭 Por onde começar

1. **Entender o produto:** [PRD v1.1](b_docs/a_contexto/Outfit_Lab_PRD_Contexto_Completo_v1.1.md).
2. **Entender o projeto:** [TAP](b_docs/b_iniciacao/01_Termo_de_Abertura_do_Projeto.md) → [Cronograma](b_docs/c_planejamento/03_Cronograma_e_Marcos.md).
3. **Gerar código com uma LLM:** [`AGENTS.md`](../AGENTS.md) (raiz) + o prompt da tarefa.

---

## 📚 Por que este documento existe

Com dezenas de documentos e prompts, o risco é ninguém (nem você daqui a um mês) achar nada. O índice é o mapa: mostra o que existe, onde está e em que estado. Também é a porta de entrada para professores e recrutadores que quiserem ver o processo além do código.
