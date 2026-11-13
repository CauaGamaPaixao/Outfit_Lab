# a_tech_repo — Conteúdo técnico do Outfit Lab

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-002 v1.1 |
| Status | Rascunho (estrutura criada; o código vem dos próximos prompts) |

Todo o código do projeto fica aqui. A documentação fica em [`../b_doc_repo/`](../b_doc_repo/).

| Pasta | Conteúdo | Gerado por |
|---|---|---|
| [`a_frontend/`](a_frontend/) | Projeto React (Vite). Dentro dele, `src/`, `public/` etc. **sem prefixo** (exceção da D-25) | PROMPT-007 (setup) |
| [`b_backend/`](b_backend/) | Projeto Java + Spring Boot. Dentro dele, `src/main/java/` etc. **sem prefixo** | PROMPT-007 (setup) |
| [`c_database/`](c_database/) | Scripts, seeds e documentação do banco MySQL | PROMPT-005 |
| [`d_infra/`](d_infra/) | `docker-compose`, configs de deploy e scripts utilitários | PROMPT-007 / PROMPT-011 |
| [`d_infra/a_scripts/`](d_infra/a_scripts/) | [`validar_pastas.sh`](d_infra/a_scripts/validar_pastas.sh) — valida a convenção de pastas | PROMPT-002 |

## Convenção de pastas (D-25)

Toda pasta de organização usa `<letra>_<nome_em_snake_case>`, com a letra indicando a ordem dentro da pasta-mãe. Pastas exigidas pela stack (`src/`, `src/main/java/`, `db/migration/`, pacotes Java, `node_modules/`…) ficam sem prefixo. Regras completas: [`CONVENCAO_DE_PASTAS.md`](../b_doc_repo/a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md).

```bash
bash a_tech_repo/d_infra/a_scripts/validar_pastas.sh
```
