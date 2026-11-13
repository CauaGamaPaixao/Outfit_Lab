# b_backend — API Spring Boot do Outfit Lab

> Gerado por: PROMPT-001 v2.2 (Parte C2) · v1.0 · 13/11/2026 · O projeto Maven é criado pelo **PROMPT-009**.

**Stack:** Java 25 · Spring Boot 4.x · Maven · Spring Security (sessão em cookie + CSRF, Spring Session JDBC) · Spring Data JPA · Flyway · Bean Validation · springdoc-openapi · Actuator · JUnit + Mockito + Testcontainers (D-29, D-31).

## Estrutura prevista

Pastas exigidas por Maven, Spring e Flyway e pacotes Java **sem prefixo** (exceção da D-25).

```
b_backend/
├── pom.xml · mvnw
└── src/
    ├── main/java/com/outfitlab/
    │   ├── auth/        # login, sessão, CSRF, allowlist do beta
    │   ├── usuario/
    │   ├── peca/        # CRUD de peças
    │   ├── imagem/      # ImageStorage (local | S3)
    │   ├── look/
    │   ├── avaliador/   # domínio puro: regras, sem Spring/JPA
    │   └── shared/      # erros, configuração
    ├── main/resources/
    │   ├── application.yml · application-local.yml · application-prod.yml
    │   └── db/migration/   # V1__schema.sql … (Flyway)
    └── test/java/com/outfitlab/…
```

Regras invioláveis (isolamento por usuário, segredos, testes): ver [`AGENTS.md`](../../AGENTS.md).
