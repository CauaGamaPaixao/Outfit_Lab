# Registro de Riscos — Outfit Lab v1.0

| Campo | Valor |
|---|---|
| Documento | Registro de Riscos |
| Versão | 1.2 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.0 |
| Status | Em revisão |
| Referências | PRD v1.1 seção 17.3 · `03_Cronograma_e_Marcos.md` · `05_Plano_de_Qualidade.md` |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial: 8 riscos do PRD + 12 novos. |
| 1.1 | 13/11/2026 | Cauã Gama Paixão | Caminhos atualizados para a convenção de pastas D-25 e prompts previstos renumerados (+1) — PROMPT-002. |
| 1.2 | 13/11/2026 | Cauã Gama Paixão | Prompts previstos renumerados (+1) porque o PROMPT-003 passou a ser o das telas no Figma (D-33). |

---

## 1. Tailoring

- Escalas qualitativas de 1 a 5. **Exposição = Probabilidade × Impacto** (1–25). Faixas: **Alta ≥ 15**, **Média 8–14**, **Baixa ≤ 7**.
- Não há análise quantitativa (Monte Carlo, VME): não compensa num projeto solo de 7 semanas.
- Responsável é sempre o autor (CGP), e por isso a coluna indica o **papel** que age (PM, Dev, QA, Ops).
- Revisão: no fim de cada sprint (15 min), atualizar P, I e status e conferir os gatilhos.

**Estratégias (PMBOK):** Evitar · Mitigar · Transferir · Aceitar (ativa = com plano de contingência; passiva = sem ação).

## 2. Registro

| ID | Descrição (causa → evento → efeito) | Categoria | P | I | Exp. | Estratégia | Resposta | Gatilho | Resp. |
|---|---|---|---|---|---|---|---|---|---|
| RISK-01 | Desejo de adicionar recursos → escopo cresce além do MVP → MVP incompleto em 31/12 | Escopo | 4 | 4 | **16** | Evitar | MoSCoW na Declaração de Escopo; toda inclusão vira D-xx com impacto em horas; lista de exclusões explícitas. | Issue nova sem pacote da EAP | PM |
| RISK-02 | Modelo de dados com poucos atributos → regras sem dados → análise pouco confiável | Produto | 3 | 4 | 12 | Mitigar | PROMPT-004 define atributos mínimos por categoria antes do DER; regras declaram dados de que precisam. | Regra do avaliador sem atributo correspondente | PO |
| RISK-03 | Moda é subjetiva → pontuação parece arbitrária → amigos desconfiam do app | Produto | 4 | 3 | 12 | Mitigar | Regras documentadas, nota sempre com justificativa, texto "orientativo" na tela de resultado. | Feedback "a nota não faz sentido" | PO |
| RISK-04 | Formulário longo → cadastro de peça trabalhoso → amigos cadastram poucas peças | Produto | 3 | 4 | 12 | Mitigar | Campos por categoria, só o essencial obrigatório, peça sem foto permitida. | Média < 5 peças por amigo na onda 1 | PO |
| RISK-05 | Upload exige armazenamento e validação → complexidade maior que o previsto → atraso na SPR-02 | Técnico | 3 | 3 | 9 | Mitigar | Armazenamento simples (decidido no Guia Técnico); upload isolado num pacote (5.5) com prompt próprio. | 5.5 passar de 7 h | Dev |
| RISK-06 | LLM sugere padrões "enterprise" → arquitetura complexa → difícil de entender e manter | Técnico | 4 | 3 | 12 | Evitar | AGENTS.md proíbe microserviços/camadas desnecessárias; dependências novas exigem justificativa. | PR com dependência ou camada não prevista | Dev |
| RISK-07 | Uso de IA no produto → imprevisibilidade e custo → núcleo instável | Técnico | 1 | 3 | 3 | Evitar | IA no produto fora do MVP (D-09). | — | PO |
| RISK-08 | Coleta de dados além do necessário → risco de privacidade → exposição legal e de confiança | Legal | 2 | 4 | 8 | Evitar | Cadastro mínimo; dados corporais fora do formulário (decisão [EM ABERTO] revisada no PROMPT-011). | Pedido de novo campo pessoal | PO |
| RISK-09 | Escopo de 174 h para ~171 h de capacidade → atrasos acumulam → v1.0 incompleta em 31/12 | Cronograma | 4 | 5 | **20** | Mitigar | Plano de cortes pré-aprovado (Cronograma, seção 6); revisão de horas por sprint; release no dia 30/12. | Saldo da sprint < −2 h | PM |
| RISK-10 | LLM gera código que o autor não domina → débito técnico invisível → bugs impossíveis de corrigir e perda do valor de aprendizagem/portfólio | Vibe coding | 4 | 4 | **16** | Mitigar | Regra de ouro (explicar em uma frase); pedir explicação à LLM; revisão por segunda LLM; entregas pequenas (1 issue = 1 PR). | Autor não sabe explicar um trecho no PR | Dev |
| RISK-11 | Prompt novo altera código existente → regressão silenciosa → funcionalidade antiga quebra | Vibe coding | 4 | 4 | **16** | Mitigar | Testes automatizados + CI bloqueando merge; prompts com escopo de arquivos explícito; diff revisado. | Teste antigo falhando ou bug em área não tocada | QA |
| RISK-12 | Plano gratuito tem limites (sleep, horas, armazenamento) ou muda de preço → app lento/fora do ar ou custo inesperado | Infra | 3 | 4 | 12 | Mitigar | Escolher provedor com limites verificados no kickoff; deploy cedo (SPR-03); plano B documentado; alerta de uso. | Uso > 70% de qualquer cota; aviso de mudança de plano | Ops |
| RISK-13 | Falha do provedor, migration errada ou exclusão acidental → perda de dados dos amigos → beta perde credibilidade | Dados | 2 | 5 | 10 | Mitigar | Backup diário com retenção de 7 dias; restauração testada antes do beta; migrations só via Flyway e testadas no CI. | Backup falhar 1 vez; migration destrutiva num PR | Ops |
| RISK-14 | Falha de autorização ou configuração exposta → vazamento de dados pessoais (nome, e-mail, fotos) → violação da LGPD e dano à confiança | Segurança/Legal | 2 | 5 | 10 | Mitigar | Testes de isolamento obrigatórios (8.1); imagens servidas só ao dono; coleta mínima; checklist de segurança no Plano de Qualidade. | Teste de isolamento ausente para endpoint novo | Dev |
| RISK-15 | Uso de `.env` ou chaves no código gerado → segredo commitado → acesso indevido ao banco/serviços | Segurança | 3 | 5 | **15** | Evitar | `.gitignore` com `.env*`; `.env.example` sem valores; secret scanning e push protection do GitHub ativados [VERIFICAR disponibilidade]; revisão de diff. | Alerta de secret scanning; string suspeita no diff | Dev |
| RISK-16 | Amigos ocupados/sem hábito → não usam o app ou não respondem → OBJ-02 e OBJ-03 não atingidos | Beta | 4 | 3 | 12 | Mitigar | Convite pessoal; onboarding com 3 passos; formulário de 3 min; beta em ondas; lembrete após 3 dias; convidar 8 para ter 5. | < 2 usuários ativos 5 dias após o convite | PM |
| RISK-17 | Uploads grandes ou em excesso → estouro do armazenamento/banda → custo ou indisponibilidade | Infra/Segurança | 2 | 3 | 6 | Mitigar | Limite de 5 MB, formatos JPEG/PNG/WebP, validação no servidor, limite de peças por usuário, allowlist do beta. | Armazenamento > 50% da cota | Dev |
| RISK-18 | Provas finais, trabalho ou imprevistos pessoais → capacidade semanal cai → atraso acumulado | Recurso | 4 | 4 | **16** | Mitigar | Definir carga semanal realista no kickoff; antecipar trabalho nas semanas mais leves; plano de cortes. | Semana com < 70% das horas planejadas | PM |
| RISK-19 | Limites de uso, indisponibilidade ou mudança da ferramenta de LLM → geração/revisão bloqueada | Ferramenta | 2 | 4 | 8 | Mitigar | Prompts versionados e AGENTS.md tornam o trabalho portável entre LLMs; ter uma segunda ferramenta configurada. | Ferramenta indisponível por > 1 dia | Dev |
| RISK-20 | Regras do avaliador definidas sob pressão → resultados incoerentes nos looks reais → percepção de "app que não funciona" | Produto | 3 | 4 | 12 | Mitigar | ≥ 10 looks de exemplo com resultado esperado; validar com looks do próprio autor antes do beta; textos que explicam a regra. | Mais de 2 feedbacks discordando do resultado | PO |

## 3. Matriz Probabilidade × Impacto

| P \ I | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **5** | | | | | |
| **4** | | | RISK-03, RISK-06, RISK-16 | 🔴 RISK-01, RISK-10, RISK-11, RISK-18 | 🔴 RISK-09 |
| **3** | | | RISK-05 | RISK-02, RISK-04, RISK-12, RISK-20 | 🔴 RISK-15 |
| **2** | | | RISK-17 | RISK-08, RISK-19 | RISK-13, RISK-14 |
| **1** | | | RISK-07 | | |

Faixas: exposição ≥ 15 (alta) · 8–14 (média) · ≤ 7 (baixa).

## 4. Top 5 riscos (foco de atenção)

1. **RISK-09 — Prazo (20).** Resposta principal: plano de cortes e controle de horas por sprint.
2. **RISK-10 — Código não compreendido (16)** e **RISK-11 — Regressões (16).** Juntos, são o "custo oculto" do vibe coding. A resposta está no Plano de Qualidade.
3. **RISK-18 — Capacidade do autor (16).** Ligado ao RISK-09; decidir a carga semanal até 16/11.
4. **RISK-01 — Crescimento de escopo (16).** A LLM facilita "só mais uma feature"; o controle de mudanças existe para isso.
5. **RISK-15 — Segredos commitados (15).** Barato de evitar, caro de corrigir: um segredo vazado num repositório público precisa ser revogado e trocado, não só apagado.

---

## 📚 Por que este documento existe

Risco é tudo o que **ainda não deu errado, mas pode dar**. O registro obriga a pensar nisso com calma e a definir **gatilhos**, ou seja, sinais concretos de que o risco está virando problema. Num projeto com prazo fixo, reagir ao gatilho na hora certa (por exemplo, cortar escopo na SPR-02) vale mais do que qualquer heroísmo no fim.
