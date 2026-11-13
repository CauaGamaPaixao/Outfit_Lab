# c_database — Documentação e scripts do banco

> Gerado por: PROMPT-001 v2.2 (Parte C2) · v1.0 · 13/11/2026 · Conteúdo gerado pelo **PROMPT-006** (modelagem) e pelo **PROMPT-012** (backup/restore).

| Conteúdo previsto | Gerado por |
|---|---|
| DER (Mermaid `erDiagram`) e dicionário de dados | PROMPT-006 |
| Descrição dos seeds (categorias, cores) | PROMPT-006 |
| Procedimento de backup e restauração | PROMPT-012 |

- **Local:** MySQL 8 via Docker Compose (`../d_infra/`).
- **Produção:** TiDB Cloud Starter (compatível com MySQL; D-30) — evite gatilhos, procedures e recursos específicos do MySQL.
- As **migrations** ficam em `../b_backend/src/main/resources/db/migration/` (exigência do Flyway).
- Subpastas criadas aqui seguem a D-25 (ex.: `a_modelagem/`, `b_scripts/`).
