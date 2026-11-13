# d_infra — Infraestrutura, deploy e scripts

> Gerado por: PROMPT-001 v2.2 (Parte C2) · v1.0 · 13/11/2026.

| Item | Conteúdo | Gerado por |
|---|---|---|
| `docker-compose.yml` | MySQL 8 local | PROMPT-008 |
| `Dockerfile` | Multi-estágio: build do React → `static/` do Spring Boot → imagem JRE 25 (container único, D-30) | PROMPT-008 / PROMPT-012 |
| `.env.example` | Variáveis de ambiente **sem valores reais** (lista no Guia de Kickoff, seção 3.3) | PROMPT-008 |
| [`a_scripts/`](a_scripts/) | [`validar_pastas.sh`](a_scripts/validar_pastas.sh) (D-25); `backup.sh` e `restore.sh` (PROMPT-012) | PROMPT-002 / PROMPT-012 |

Plano de deploy, ambientes e backup: [Guia de Kickoff Técnico, seção 3](../../b_doc_repo/b_docs/c_planejamento/08_Guia_de_Kickoff_Tecnico.md).
