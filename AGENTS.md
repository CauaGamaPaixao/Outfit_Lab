# AGENTS.md — Contexto permanente para LLMs e agentes de código

> Gerado por: PROMPT-001 v2.2 (Parte C1) · v1.0 · 13/11/2026. Leia este arquivo **inteiro** antes de gerar código ou documentos.

## Produto

**Outfit Lab**: guarda-roupa digital web. O usuário cadastra peças (foto + atributos), monta looks e recebe uma **análise explicável** (0–100 + justificativas) feita por **regras determinísticas próprias** (cores, camadas/proporções, estilo). Sem IA no produto (D-09). Beta fechado com amigos; entrega em **31/12/2026**.

- Produto: [PRD v1.1](b_doc_repo/b_docs/a_contexto/Outfit_Lab_PRD_Contexto_Completo_v1.1.md) · Decisões: [Registro de Decisões](b_doc_repo/b_docs/c_planejamento/07_Registro_de_Decisoes_Premissas_e_Licoes.md) · Técnica: [Guia de Kickoff Técnico](b_doc_repo/b_docs/c_planejamento/08_Guia_de_Kickoff_Tecnico.md)
- Telas: specs em [`c_design/c_specs/`](b_doc_repo/c_design/c_specs/) · tokens em [`c_design/b_tokens/`](b_doc_repo/c_design/b_tokens/) · visual no Figma (`Outfit Lab — UI`)

## Stack

| Camada | Tecnologia |
|---|---|
| Front | React 19 + Vite + TypeScript estrito · React Router · TanStack Query · React Hook Form + Zod · **CSS Modules + `tokens.css`** · Vitest + Testing Library |
| Back | Java 25 · Spring Boot 4.x · Maven · Spring Security (**sessão em cookie** + CSRF, Spring Session JDBC) · Spring Data JPA · Flyway · Bean Validation · springdoc-openapi · Actuator · JUnit + Mockito + Testcontainers |
| Banco | MySQL 8 (Docker local); produção MySQL-compatível (TiDB Cloud Starter) — evite recursos específicos do MySQL |
| Deploy | Container único (Spring Boot serve o build do React) no Render · imagens em bucket S3 privado (R2) |

## Estrutura

```
AGENTS.md · README.md · .github/
a_tech_repo/  a_frontend/ (Vite: src/{app,pages,components,features,lib,styles})
              b_backend/  (Maven: src/main/java/com/outfitlab/{auth,usuario,peca,imagem,look,avaliador,shared}, db/migration)
              c_database/ (DER, dicionário, scripts) · d_infra/ (compose, Dockerfile, a_scripts/)
b_doc_repo/   a_prompts/ (PROMPT_NNN + a_convencoes/) · b_docs/ (a_contexto … e_encerramento) · c_design/ (a_referencias, b_tokens, c_specs, d_prototipos)
```

## Convenções de código

- **Idioma:** domínio e textos de interface em **português** (`Peca`, `Look`, `usuarioId`, "Adicionar peça"); termos técnicos em inglês (`Controller`, `Service`, `Repository`, `useQuery`). Comentários em português, só quando explicam o *porquê*.
- **Spring:** pacotes por funcionalidade; `Controller` → `Service` → `Repository`; DTOs `record` (`PecaRequest`, `PecaResponse`), nunca expor entidade JPA; erros pelo handler global num formato único; `avaliador` é domínio puro (sem Spring/JPA).
- **React:** componentes em PascalCase com **os nomes e props das specs** (`PieceCard`, `TextField`, `AuthLayout`); um `Component.tsx` + `Component.module.css` por pasta; dados do servidor só via TanStack Query em `features/*`; validação com esquema Zod que repete as regras e mensagens da spec.
- **Estilo:** só tokens (`var(--color-accent)`). Regra 60/30/10; amarelo nunca como texto sobre fundo claro.
- **Commits:** Conventional Commits + rodapé `Refs: #<issue>` e `Prompt: PROMPT-NNN`.

## Regras invioláveis

1. **Isolamento por usuário em todo endpoint:** toda consulta filtra pelo usuário autenticado; acesso a recurso de outro usuário → 404. Teste de integração obrigatório.
2. **Segredos só em variáveis de ambiente.** Nada de senha, chave ou URL de produção no código, nos logs ou no Git. Atualize `d_infra/.env.example` sem valores reais.
3. **Testes obrigatórios** para cada regra do avaliador e para o isolamento por usuário. CI verde antes do merge.
4. **Não adicionar dependência sem justificativa** (uma linha no PR: por quê, alternativa sem ela).
5. **Não alterar escopo.** Fora do MVP (PRD 6.2, Escopo seção 7) = pergunte. Ponto **[EM ABERTO]** = não decida: pergunte ou implemente a recomendação marcada e avise.
6. **Pastas seguem a D-25:** toda pasta nova de organização é `<letra>_<nome_em_snake_case>` (exceto as exigidas pela stack: `src/`, `.github/`, `db/migration/`, pacotes Java…). Ver [`CONVENCAO_DE_PASTAS.md`](b_doc_repo/a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md) e rode `bash a_tech_repo/d_infra/a_scripts/validar_pastas.sh`.
7. **Sem HEX solto, sem imagens de terceiros, sem logos de marcas, sem fotos de pessoas reais.**
8. **Senhas com BCrypt; mensagens de login genéricas; upload validado por conteúdo** (JPEG/PNG/WebP, ≤ 5 MB).

## Figma → React (Figma MCP)

Quando o autor enviar **links de frames do Figma**:
1. Leia o frame pelo MCP (contexto de design, variáveis e screenshot) **e** a spec `TELA-xx` correspondente.
2. **Figma manda no visual, a spec manda no comportamento e nos textos.** Variáveis do Figma → `var(--token)`; cor fora dos tokens = use o token mais próximo e avise.
3. Reaproveite componentes de `src/components/`; crie só os que faltam, com os nomes da spec.
4. A saída padrão do MCP é React + Tailwind: **traduza para CSS Modules**, nunca cole.
5. Ilustrações: SVG exportado do Figma para `src/assets/`.
6. Implemente todos os estados da spec, escreva os testes e compare com o screenshot em 375 e 1440 px.
7. Divergência entre Figma e spec → pergunte antes de decidir.

## Como rodar, testar e fazer lint

> Comandos válidos depois do PROMPT-009 (setup do monorepo).

```bash
docker compose -f a_tech_repo/d_infra/docker-compose.yml up -d      # MySQL local
cd a_tech_repo/b_backend && ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
cd a_tech_repo/b_backend && ./mvnw verify                            # testes + Testcontainers
cd a_tech_repo/a_frontend && npm ci && npm run dev                   # front com proxy /api
cd a_tech_repo/a_frontend && npm run lint && npm run typecheck && npm test
bash a_tech_repo/d_infra/a_scripts/validar_pastas.sh                 # D-25
```

## Regra dos prompts (D-17)

Toda tarefa relevante começa por `b_doc_repo/a_prompts/PROMPT_NNN_descricao.md` (cabeçalho + histórico). Artefatos indicam `Gerado por: PROMPT-NNN vX.Y`. Prompts não são apagados: mudança = nova versão ou novo prompt.

## Checklist de revisão (o autor aplica em cada entrega)

- [ ] Consigo explicar cada mudança em uma frase?
- [ ] Segue a spec (campos, textos de erro, estados) e o frame do Figma em 375 e 1440 px?
- [ ] Toda consulta nova filtra pelo usuário? Há teste de acesso negado?
- [ ] Testes novos passam e falhariam sem a mudança? CI verde?
- [ ] Nenhum segredo, HEX solto, `console.log`/`System.out` esquecido ou dependência sem justificativa?
- [ ] Nenhum [EM ABERTO] decidido em silêncio e nenhum item fora do escopo?
- [ ] Pastas novas passam no `validar_pastas.sh`?
- [ ] Commit com `Refs` e `Prompt`; lição registrada se algo surpreendeu?
