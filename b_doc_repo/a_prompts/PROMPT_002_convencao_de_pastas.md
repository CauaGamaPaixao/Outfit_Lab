# PROMPT 002 — Padronização da nomenclatura de pastas (prefixo alfabético)

| Campo | Valor |
|---|---|
| ID | PROMPT-002 |
| Versão | 1.1 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão (desenvolvimento assistido por LLM) |
| Fase do projeto | Iniciação (organização do repositório) |
| Entradas obrigatórias | Repositório `Outfit_Lab` no estado atual (árvore de pastas + todos os `.md`) · `PROMPT_001_kickoff_documentacao_design.md` v2.0 |
| Saídas | Pastas renomeadas · referências de caminho atualizadas · PROMPT-001 v2.1 · READMEs atualizados · `b_doc_repo/a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md` · script de validação |
| Status | Executado (13/11/2026) |

### Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | 13/11/2026 | Criação da regra de prefixo alfabético para todas as pastas do projeto. |
| 1.1 | 13/11/2026 | Ajustes da execução: a decisão passa de **D-10** para **D-25** (D-10 já estava ocupado no Registro de Decisões); nome real do arquivo do PROMPT-001 corrigido; a renumeração dos próximos prompts (+1) vale para **todas** as referências `PROMPT-0NN` dos documentos (EAP, cronograma, riscos etc. já usavam números até PROMPT-019); o PRD v1.1 recebeu revisão editorial dos caminhos; busca da Parte D ajustada para não casar com os caminhos novos (`a_prompts/` contém `prompts/`). |

> **Como usar:** cole este prompt numa LLM ou agente de código com acesso ao repositório. Execute em ordem: Parte A (decidir e documentar), depois Parte B (renomear), Parte C (atualizar referências) e Parte D (validar). Revise o diff antes do commit.

---

## 0. Papel da LLM

Você vai atuar como **tech lead responsável pela organização do repositório**. Aplique a regra abaixo com segurança: preserve o histórico do Git, não quebre nenhuma referência e não renomeie pastas que ferramentas ou frameworks exigem com nome fixo.

## 1. Contexto

O Outfit Lab é um projeto pessoal desenvolvido 100% em vibe coding (React + Java/Spring Boot + MySQL), com entrega prevista para 31/12/2026. O repositório já separa conteúdo técnico (`a_tech_repo/`) de conteúdo documental (`b_doc_repo/`). A partir de agora, **essa lógica de prefixos vale para todas as pastas criadas no projeto**, em qualquer nível.

## 2. A regra (decisão D-25)

**D-25: toda pasta criada para organizar o projeto começa com uma letra minúscula seguida de `_`, que indica sua ordem dentro da pasta-mãe.**

```
<letra>_<nome_em_snake_case>
```

1. **Letra de ordem:** `a_`, `b_`, `c_`… em sequência, **reiniciando em cada pasta-mãe**. A letra indica a ordem lógica de leitura/uso (do mais fundamental ao mais derivado, ou na ordem cronológica do projeto), e não a ordem alfabética do nome.
2. **Nome:** minúsculas, `snake_case`, sem acentos, sem espaços, sem hífens. Exemplo: `c_planejamento`, não `c_Planejamento` nem `c-planejamento`.
3. **Mais de 26 pastas no mesmo nível:** continue com `aa_`, `ab_`… Isso é sinal de que a pasta precisa ser subdividida, então registre um alerta.
4. **Sem lacunas:** a sequência não pula letras. Ao remover uma pasta, reordene as irmãs na mesma mudança e atualize as referências.
5. **Inserção no meio:** se uma pasta nova precisar entrar entre duas existentes, reordene as seguintes. Não use sufixos como `b2_`.
6. **Arquivos não seguem a regra.** Ela vale só para pastas. Os arquivos mantêm suas convenções próprias (ex.: `PROMPT_NNN_descricao.md`, `01_Termo_de_Abertura_do_Projeto.md`, `README.md`).

### 2.1 Exceções (pastas que NÃO recebem prefixo)

A regra vale para pastas **de organização do projeto**. Ficam de fora as pastas cujo nome é **exigido por uma ferramenta, linguagem ou framework**, porque renomeá-las quebraria o build, o deploy ou as convenções da stack:

| Exceção | Motivo |
|---|---|
| `.git/`, `.github/` (e `workflows/`, `ISSUE_TEMPLATE/` dentro dela), `.vscode/`, `.idea/` e qualquer pasta iniciada por `.` | Lidas por nome fixo pelo Git, pelo GitHub e pelas IDEs |
| `node_modules/`, `dist/`, `build/`, `target/`, `coverage/` | Geradas por ferramentas e ignoradas no Git |
| `public/`, `src/` e a estrutura interna gerada pelo Vite/React (`src/assets/` etc.) | Convenção do Vite/React |
| `src/main/java/`, `src/main/resources/`, `src/test/java/`, `db/migration/` | Exigidas por Maven/Gradle, Spring Boot e Flyway |
| **Pacotes Java** (ex.: `com/outfitlab/peca/`) | O nome do pacote faz parte do código e segue a convenção Java |
| Pastas de código **dentro de `src/`** no frontend (`components/`, `pages/`, `hooks/`…) | Viram caminho de import; a convenção da comunidade React deixa o código mais legível e portável |
| `docs/` na raiz, se for usada pelo GitHub Pages | O GitHub Pages aceita apenas `/` ou `/docs` como pasta de publicação |

**Resumo:** **organização** (documentação, design, prompts, divisão de módulos do repositório) usa prefixo; **código e ferramentas** (tudo dentro de `src/` e das pastas exigidas pela stack) não usam. Se aparecer um caso ambíguo, aplique o prefixo **se e somente se** isso não quebrar nenhuma ferramenta, e registre a decisão.

## 3. Estrutura alvo

```
Outfit_Lab/
├── AGENTS.md
├── README.md
├── .github/                        # exceção
├── a_tech_repo/
│   ├── a_frontend/                 # projeto React (dentro: src/, public/… sem prefixo)
│   ├── b_backend/                  # projeto Spring Boot (dentro: src/main/java… sem prefixo)
│   ├── c_database/                 # scripts, seeds e documentação do banco
│   └── d_infra/                    # docker-compose e configs de deploy
└── b_doc_repo/
    ├── a_prompts/
    │   └── a_convencoes/           # convenções que todo prompt deve seguir
    ├── b_docs/
    │   ├── a_contexto/             # antes: 00_contexto
    │   ├── b_iniciacao/            # antes: 01_iniciacao
    │   ├── c_planejamento/         # antes: 02_planejamento
    │   ├── d_execucao/             # antes: 03_execucao
    │   └── e_encerramento/         # antes: 04_encerramento
    └── c_design/
        ├── a_referencias/
        ├── b_tokens/
        ├── c_specs/
        └── d_prototipos/
```

### 3.1 Tabela de mapeamento (antigo → novo)

| Caminho atual | Caminho novo | Situação atual |
|---|---|---|
| `a_tech_repo/` | `a_tech_repo/` (sem mudança) | Existe |
| `a_tech_repo/frontend/` | `a_tech_repo/a_frontend/` | Planejada no PROMPT-001 |
| `a_tech_repo/backend/` | `a_tech_repo/b_backend/` | Planejada |
| `a_tech_repo/database/` | `a_tech_repo/c_database/` | Planejada |
| `a_tech_repo/infra/` | `a_tech_repo/d_infra/` | Planejada |
| `b_doc_repo/` | `b_doc_repo/` (sem mudança) | Existe |
| `b_doc_repo/prompts/` | `b_doc_repo/a_prompts/` | **Existe** |
| `b_doc_repo/docs/` | `b_doc_repo/b_docs/` | **Existe** |
| `b_doc_repo/docs/00_contexto/` | `b_doc_repo/b_docs/a_contexto/` | **Existe** |
| `b_doc_repo/docs/01_iniciacao/` | `b_doc_repo/b_docs/b_iniciacao/` | Planejada |
| `b_doc_repo/docs/02_planejamento/` | `b_doc_repo/b_docs/c_planejamento/` | Planejada |
| `b_doc_repo/docs/03_execucao/` | `b_doc_repo/b_docs/d_execucao/` | Planejada |
| `b_doc_repo/docs/04_encerramento/` | `b_doc_repo/b_docs/e_encerramento/` | Planejada |
| `b_doc_repo/design/` | `b_doc_repo/c_design/` | **Existe** |
| `b_doc_repo/design/referencias/` | `b_doc_repo/c_design/a_referencias/` | **Existe** |
| `b_doc_repo/design/tokens/` | `b_doc_repo/c_design/b_tokens/` | Planejada |
| `b_doc_repo/design/specs/` | `b_doc_repo/c_design/c_specs/` | Planejada |
| `b_doc_repo/design/prototipos/` | `b_doc_repo/c_design/d_prototipos/` | Planejada |
| — | `b_doc_repo/a_prompts/a_convencoes/` | Nova |

Antes de executar, **liste a árvore real do repositório** e compare com esta tabela. Pastas que existirem e não estiverem na tabela devem ser classificadas (renomear ou exceção) e incluídas no relatório.

---

## PARTE A — Documentar a convenção

Crie `b_doc_repo/a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md` contendo:
- a regra D-25 completa (seção 2), com exemplos certos e errados;
- a tabela de exceções (seção 2.1);
- a estrutura alvo (seção 3);
- o procedimento para **criar**, **inserir**, **remover** e **reordenar** pastas sem quebrar referências;
- a forma de rodar o script de validação da Parte D;
- cabeçalho padrão com `Gerado por: PROMPT-002 v1.1`.

## PARTE B — Renomear as pastas existentes

1. Use **`git mv`** em todas as renomeações, para que o Git registre a mudança como rename e preserve o histórico. Se a pasta ainda não estiver versionada, faça `git add` antes do `git mv`.
2. Renomeie primeiro as pastas-mãe e depois as filhas (ex.: `git mv b_doc_repo/docs b_doc_repo/b_docs` e só então `git mv b_doc_repo/b_docs/00_contexto b_doc_repo/b_docs/a_contexto`).
3. Pastas vazias não são versionadas pelo Git. Para criar as pastas planejadas que precisam existir desde já, adicione um `.gitkeep` em cada uma. Crie as pastas de `a_tech_repo/` só com `.gitkeep`, sem código.
4. Não mova nem altere o conteúdo dos arquivos nesta parte. Só os caminhos mudam.

Comandos esperados (ajuste conforme a árvore real):

```bash
git mv b_doc_repo/prompts  b_doc_repo/a_prompts
git mv b_doc_repo/docs     b_doc_repo/b_docs
git mv b_doc_repo/design   b_doc_repo/c_design
git mv b_doc_repo/b_docs/00_contexto      b_doc_repo/b_docs/a_contexto
git mv b_doc_repo/c_design/referencias    b_doc_repo/c_design/a_referencias
```

## PARTE C — Atualizar todas as referências

1. Procure em **todos** os arquivos de texto (`.md`, `.html`, `.css`, `.ts`, `.json`, `.yml`) os caminhos antigos da tabela 3.1, incluindo links relativos (`](prompts/...)`), blocos de árvore de pastas e tabelas de índice. Use, por exemplo: `grep -rnE "(^|[^a-z_])(prompts|docs|design)/|0[0-4]_(contexto|iniciacao|planejamento|execucao|encerramento)|design/(referencias|tokens|specs|prototipos)|tech_repo/(frontend|backend|database|infra)" --include="*.md" .`
2. Atualize:
   - `README.md` (raiz), `a_tech_repo/README.md`, `b_doc_repo/README.md` e o índice de prompts (em `b_doc_repo/README.md`, seção Prompts);
   - **PROMPT-001 → v2.1**: troque todos os caminhos (cabeçalho, seção 1.3, saídas de cada parte, seções B1–B4 e C2) pela estrutura nova; acrescente **D-25** à tabela de decisões da seção 1.1 e uma linha no histórico de versões ("2.1 — aplica a convenção de pastas D-25 (PROMPT-002)");
   - na Parte C do PROMPT-001 (`AGENTS.md`), inclua a regra D-25 e o link para `CONVENCAO_DE_PASTAS.md` nas **regras invioláveis**, para que toda LLM que gerar código ou documentos já crie pastas no padrão;
   - na A9 do PROMPT-001 (Registro de Decisões), inclua D-25 na lista de decisões a registrar, e registre D-25 no próprio Registro de Decisões.
3. **Renumeração dos próximos prompts:** este prompt ocupa o número 002. Na lista "Próximos prompts" do PROMPT-001 (item C2.9), avance a numeração em 1 (o antigo PROMPT-002 de requisitos vira PROMPT-003, e assim por diante até PROMPT-011) e ajuste as referências cruzadas em todos os documentos.
4. Atualize o índice `b_doc_repo/README.md` com o PROMPT-002 e a nova versão do PROMPT-001.
5. **Não altere** o texto do PRD v1.0 (é registro histórico). Se ele citar caminhos, a correção fica para o PRD v1.1.

## PARTE D — Validar

1. Crie o script `a_tech_repo/d_infra/a_scripts/validar_pastas.sh` (a pasta de scripts também segue a regra). O script deve:
   - percorrer o repositório ignorando as exceções da seção 2.1 (pastas iniciadas por `.`, `node_modules`, `dist`, `build`, `target`, `coverage`, e tudo **dentro** de `a_tech_repo/a_frontend/` e `a_tech_repo/b_backend/`, exceto as próprias raízes);
   - verificar se cada pasta casa com a regex `^[a-z]{1,2}_[a-z0-9]+(_[a-z0-9]+)*$`;
   - verificar se, em cada nível, as letras são sequenciais e sem lacunas (`a, b, c…`);
   - imprimir as violações e sair com código diferente de zero se houver alguma.
2. Rode o script e mostre a saída. Ela deve vir **sem violações**.
3. Rode a busca da Parte C de novo e confirme **zero ocorrências** de caminhos antigos (fora dos documentos históricos e das tabelas de mapeamento antigo → novo).
4. Mostre a árvore final com `tree -a -I '.git|node_modules' -d` (ou equivalente).
5. Opcional (recomendado): proponha um passo no workflow de CI (`.github/workflows/`) que rode o script em todo push. Só proponha; a criação do CI pertence ao prompt de setup.

---

## 4. Formato da resposta esperada

1. Resumo de até 5 linhas do que será alterado.
2. Árvore **antes** e árvore **depois**.
3. Lista de comandos `git mv` executados.
4. Cada arquivo criado ou alterado num bloco separado, precedido do caminho completo (para arquivos grandes alterados só nos caminhos, mostre o diff).
5. Saída do script de validação e da busca por caminhos antigos.
6. Casos ambíguos encontrados e a decisão tomada para cada um.
7. Mensagem de commit sugerida:
   `refactor(repo): aplica convenção de prefixo alfabético nas pastas (D-25)`
   com corpo listando os renames e a atualização do PROMPT-001 para v2.1.
