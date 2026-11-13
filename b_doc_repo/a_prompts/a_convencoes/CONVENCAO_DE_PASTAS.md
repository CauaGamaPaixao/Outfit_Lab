# Convenção de pastas — prefixo alfabético (D-25)

| Campo | Valor |
|---|---|
| Documento | Convenção de nomenclatura de pastas do repositório |
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-002 v1.1 |
| Decisão | D-25 (Registro de Decisões, seção 2.3) |
| Status | Em revisão |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial. |

> **Sobre o ID:** o PROMPT-002 v1.0 chamava esta regra de "D-10". Esse ID já estava ocupado no Registro de Decisões (D-10 = nome de trabalho "Outfit Lab"), então a regra foi registrada com o próximo ID livre, **D-25**.

---

## 1. A regra

**D-25: toda pasta criada para organizar o projeto começa com uma letra minúscula seguida de `_`, que indica sua ordem dentro da pasta-mãe.**

```
<letra>_<nome_em_snake_case>
```

1. **Letra de ordem:** `a_`, `b_`, `c_`… em sequência, **reiniciando em cada pasta-mãe**. A letra indica a ordem lógica de leitura/uso (do mais fundamental ao mais derivado, ou a ordem cronológica do projeto), e não a ordem alfabética do nome.
2. **Nome:** minúsculas, `snake_case`, sem acentos, sem espaços, sem hífens.
3. **Mais de 26 pastas no mesmo nível:** continue com `aa_`, `ab_`… Isso indica que a pasta precisa ser subdividida: registre um alerta (issue com label `docs`).
4. **Sem lacunas:** a sequência não pula letras. Ao remover uma pasta, reordene as irmãs na mesma mudança e atualize as referências.
5. **Inserção no meio:** se uma pasta nova precisa entrar entre duas existentes, reordene as seguintes. Não use sufixos como `b2_`.
6. **Arquivos não seguem a regra.** Ela vale só para pastas. Arquivos mantêm suas convenções (`PROMPT_NNN_descricao.md`, `01_Termo_de_Abertura_do_Projeto.md`, `README.md`).

### 1.1 Exemplos

| ✅ Certo | ❌ Errado | Por quê |
|---|---|---|
| `c_planejamento/` | `c_Planejamento/` | Maiúscula |
| `c_planejamento/` | `c-planejamento/` | Hífen em vez de `_` |
| `a_referencias/` | `a_referências/` | Acento |
| `b_tokens/` | `tokens/` | Sem prefixo |
| `b_iniciacao/` | `01_iniciacao/` | Prefixo numérico |
| `a_x/`, `b_y/`, `c_z/` | `a_x/`, `c_z/` | Lacuna (falta `b_`) |
| `c_novo/` (e a antiga `c_` vira `d_`) | `b2_novo/` | Sufixo em vez de reordenar |
| `d_prototipos/` | `d_prototipos_v2/` | Versão vai no nome do **arquivo**, não da pasta |

## 2. Exceções (pastas que NÃO recebem prefixo)

A regra vale para pastas **de organização do projeto**. Ficam de fora as pastas cujo nome é **exigido por uma ferramenta, linguagem ou framework**:

| Exceção | Motivo |
|---|---|
| `.git/`, `.github/` (e `workflows/`, `ISSUE_TEMPLATE/` dentro dela), `.vscode/`, `.idea/` e qualquer pasta iniciada por `.` | Lidas por nome fixo pelo Git, pelo GitHub e pelas IDEs |
| `node_modules/`, `dist/`, `build/`, `target/`, `coverage/` | Geradas por ferramentas e ignoradas no Git |
| `public/`, `src/` e a estrutura interna gerada pelo Vite/React (`src/assets/` etc.) | Convenção do Vite/React |
| `src/main/java/`, `src/main/resources/`, `src/test/java/`, `db/migration/` | Exigidas por Maven/Gradle, Spring Boot e Flyway |
| **Pacotes Java** (ex.: `com/outfitlab/peca/`) | O nome do pacote faz parte do código e segue a convenção Java |
| Pastas de código **dentro de `src/`** no frontend (`components/`, `pages/`, `hooks/`…) | Viram caminho de import; a convenção da comunidade React é mais legível e portável |
| `docs/` na raiz, se for usada pelo GitHub Pages | No modo "deploy from branch", o Pages só aceita `/` ou `/docs` |

**Resumo:** **organização** (documentação, design, prompts, divisão de módulos do repositório) usa prefixo; **código e ferramentas** (tudo dentro de `a_tech_repo/a_frontend/` e `a_tech_repo/b_backend/`, e as pastas exigidas pela stack) não usam. Em caso ambíguo, aplique o prefixo **se e somente se** isso não quebrar nenhuma ferramenta, e registre a decisão no Registro de Decisões.

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
│       └── a_scripts/              # scripts utilitários (validar_pastas.sh)
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

Pastas ainda vazias levam um `.gitkeep` (o Git não versiona pastas vazias). Remova o `.gitkeep` quando a pasta receber o primeiro arquivo real.

## 4. Procedimentos

Sempre use **`git mv`** para renomear (o Git registra como rename e preserva o histórico) e faça renomeação + atualização de referências **no mesmo commit**.

### 4.1 Criar uma pasta no fim da sequência

1. Veja a última letra usada na pasta-mãe (`ls -d */`).
2. Crie com a letra seguinte: `mkdir b_doc_repo/b_docs/f_nova` (+ `.gitkeep` se ficar vazia).
3. Atualize o README/índice da pasta-mãe.
4. Rode o script de validação (seção 5).

### 4.2 Inserir uma pasta no meio

Exemplo: inserir `b_novo` entre `a_x` e `b_y` (que tem a irmã `c_z`):

```bash
git mv pai/c_z pai/d_z        # renomeie de trás para frente para não colidir
git mv pai/b_y pai/c_y
mkdir pai/b_novo
```

Depois atualize todas as referências (seção 4.5) e valide.

### 4.3 Remover uma pasta

```bash
git rm -r pai/b_y
git mv pai/c_z pai/b_z        # feche a lacuna, da frente para trás
```

Atualize as referências e valide.

### 4.4 Reordenar pastas

Use um nome temporário para trocar duas pastas de posição:

```bash
git mv pai/a_x pai/tmp_x
git mv pai/b_y pai/a_y
git mv pai/tmp_x pai/b_x
```

### 4.5 Atualizar referências

Procure o caminho antigo em todos os arquivos de texto e corrija links relativos, árvores de pastas e tabelas de índice:

```bash
grep -rnE "caminho/antigo" --include="*.md" --include="*.html" --include="*.css" \
  --include="*.ts" --include="*.json" --include="*.yml" .
```

**Não altere documentos históricos** (ex.: PRD v1.0). Se citarem caminhos antigos, a correção vai para a próxima versão do documento.

## 5. Validação automática

O script [`a_tech_repo/d_infra/a_scripts/validar_pastas.sh`](../../../a_tech_repo/d_infra/a_scripts/validar_pastas.sh) percorre o repositório (ignorando as exceções da seção 2), verifica o formato de cada pasta com a regex `^[a-z]{1,2}_[a-z0-9]+(_[a-z0-9]+)*$` e confere se as letras de cada nível são sequenciais e sem lacunas.

```bash
bash a_tech_repo/d_infra/a_scripts/validar_pastas.sh        # na raiz do repositório
bash a_tech_repo/d_infra/a_scripts/validar_pastas.sh /caminho/do/repo
```

Saída `0` = sem violações; `1` = há violações (listadas na saída). Rode antes de todo commit que crie, mova ou remova pastas. Proposta para o CI (a criar no prompt de setup do monorepo):

```yaml
# .github/workflows/ci.yml (trecho)
- name: Validar convenção de pastas (D-25)
  run: bash a_tech_repo/d_infra/a_scripts/validar_pastas.sh
```

---

## 📚 Por que este documento existe

Pastas são o primeiro mapa que alguém vê ao abrir o repositório. Com o prefixo de ordem, o GitHub e o explorador de arquivos mostram as pastas na ordem em que devem ser lidas, sem depender do alfabeto. Como a LLM cria pastas o tempo todo, a regra precisa estar escrita, ter exceções claras para não quebrar a stack e ser verificada por um script, e não pela memória de quem revisa.
