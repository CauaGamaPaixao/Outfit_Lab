# Declaração de Escopo — Outfit Lab v1.0

| Campo | Valor |
|---|---|
| Documento | Declaração de Escopo do Projeto |
| Versão | 1.2 |
| Data | 13/11/2026 |
| Autor | Cauã Gama Paixão |
| Gerado por | PROMPT-001 v2.0 |
| Status | Em revisão |
| Referências | PRD v1.1 · TAP · `02_EAP_e_Dicionario.md` |

### Histórico de revisões

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | 13/11/2026 | Cauã Gama Paixão | Versão inicial. |
| 1.1 | 13/11/2026 | Cauã Gama Paixão | Caminhos atualizados para a convenção de pastas D-25 e prompts previstos renumerados (+1) — PROMPT-002. |
| 1.2 | 13/11/2026 | Cauã Gama Paixão | Prompts previstos renumerados (+1) porque o PROMPT-003 passou a ser o das telas no Figma (D-33). |

---

## 1. Tailoring

Juntei a Declaração de Escopo e a priorização (MoSCoW) num documento só, e não há um documento separado de "Requisitos do Projeto": os requisitos detalhados virão do PROMPT-004. Critérios de aceite estão no nível de **entrega**; os de **história/issue** ficam no backlog do GitHub. Motivo: evitar duplicação num projeto solo.

## 2. Escopo do produto

Aplicação web Outfit Lab v1.0, conforme PRD v1.1:
- **Funcional:** RF-01 a RF-12 (cadastro, login, CRUD de peças com imagem e atributos, guarda-roupa em cards com filtros, montador de looks com camadas, análise determinística com pontuação 0–100 e justificativas, looks salvos, estados de interface).
- **Não funcional:** RNF-01 a RNF-15, incluindo os novos de operação (disponibilidade básica, backup, observabilidade mínima, limites de upload, proteção de dados pessoais).
- **Telas:** TELA-01 Login, TELA-02 Cadastro, TELA-03 Guarda-roupa, TELA-04 Dashboard, TELA-05 Cadastro/edição de peça, TELA-06 Montador de look, TELA-07 Resultado da análise, TELA-08 Looks salvos, TELA-09 Perfil.

> A numeração TELA-xx segue a ordem de prototipação (PROMPT-001 gera 01–03; PROMPT-005 gera 04–09), não a ordem do PRD 12.4.

## 3. Escopo do projeto

Além do produto, o projeto entrega:
1. **Documentação de gerenciamento** (PMBOK adaptado): TAP, stakeholders, escopo, EAP, cronograma, riscos, qualidade, comunicação/configuração/beta, decisões, relatórios de sprint, lições aprendidas.
2. **Design:** análise do moodboard, design tokens (regra 60/30/10), specs e protótipos navegáveis.
3. **Prompts versionados** que geraram cada artefato (`b_doc_repo/a_prompts/`).
4. **Infraestrutura:** ambiente local com Docker, CI no GitHub Actions, deploy em produção.
5. **Beta fechado** com amigos: convite, onboarding, coleta e triagem de feedback.
6. **Portfólio:** README de vitrine, releases, board, GitHub Pages com protótipos.

## 4. Entregas e critérios de aceitação

| ID | Entrega | Critério de aceitação | EAP |
|---|---|---|---|
| ENT-01 | Pacote de documentação de kickoff | Todos os documentos da Parte A/B/C do PROMPT-001 revisados e com status "Aprovado". | 1.1, 2, 3.1–3.2 |
| ENT-02 | Protótipos TELA-01 a TELA-09 | Abrem no navegador, funcionam em 375 px e 1440 px e todos os estados acessíveis pelo painel "Estados". | 3.2, 3.3 |
| ENT-03 | Modelo de dados e migrations | DER aprovado; `docker compose up` cria o schema via Flyway sem erro. | 4 |
| ENT-04 | API REST | Endpoints documentados em OpenAPI; testes de integração passando; todo endpoint de peça/look filtra pelo usuário autenticado. | 5 |
| ENT-05 | Frontend React | Telas 01–09 implementadas conforme specs, com os estados do RF-12. | 6 |
| ENT-06 | Avaliador de looks v1 | Regras documentadas; cada regra com teste unitário; ≥ 10 looks de exemplo com resultado esperado. | 7 |
| ENT-07 | Suíte de testes | CI verde; testes de isolamento por usuário cobrindo peças e looks. | 8 |
| ENT-08 | Aplicação em produção | Acessível por HTTPS; health check respondendo; backup diário ativo e restauração testada uma vez. | 9 |
| ENT-09 | Beta executado | ≥ N amigos ativos (sugestão: 5); feedback triado em issues `beta-feedback`. | 10 |
| ENT-10 | Release v1.0 + portfólio | Tag `v1.0.0`, CHANGELOG, README final com link do deploy e screenshots; lições aprendidas registradas. | 11, 1.4 |

## 5. Priorização MoSCoW das funcionalidades

**Must** = sem isso não há v1.0. **Should** = importante, sai se o prazo apertar (com alternativa). **Could** = desejável, primeiro a sair. **Won't** = fora da v1.0.

| Funcionalidade | Ref. | MoSCoW | Observação |
|---|---|---|---|
| Cadastro com dados mínimos | RF-01 | Must | Nome, sobrenome, e-mail, senha, confirmação, aceite de termos. |
| Login / logout | RF-02 | Must | |
| CRUD de peças | RF-03 | Must | |
| Atributos da peça | RF-04 | Must | Atributos por categoria definidos no PROMPT-004. |
| Upload e exibição de imagem | RF-05 | Must | Peça sem imagem também é aceita (placeholder). |
| Guarda-roupa em cards | RF-06 | Must | |
| Busca por nome/marca e filtro por categoria | RF-06 | Must | |
| Filtros por modelagem e cor | RF-06 | Should | Se faltar tempo, fica só o filtro por categoria. |
| Montar look | RF-07 | Must | |
| Funções/camadas no look | RF-08 | Must | |
| Avaliador v1 (cores, camadas/proporções) | RF-09 | Must | |
| Avaliador: perfil de estilo | RF-09 | Should | Se faltar tempo, sai na v1.1 e o resultado mostra apenas cores e camadas. |
| Pontuação 0–100 + justificativas | RF-10 | Must | |
| Salvar e listar looks | RF-11 | Must | |
| Excluir look salvo | RF-11 | Should | |
| Editar/duplicar look salvo | RF-11 | Could | |
| Histórico de versões do look | RF-11 | Won't | |
| Estados de interface | RF-12 | Must | |
| Dashboard com atalhos | PRD 10.2 | Should | Versão mínima: 3 atalhos + contagem de peças e looks. |
| Dashboard com resumos/estatísticas | PRD 10.2 | Won't | |
| Perfil: ver dados, trocar senha, sair | TELA-09 | Should | |
| Perfil: excluir conta (autosserviço) | TELA-09 | Could | No beta, a exclusão é feita sob pedido (ver 6.8). |
| Login social (Google/Apple) | — | Won't | Botões removidos ou "em breve". |
| Ilustração/composição visual do look | RF-07 | Could | O mínimo são os cards das peças lado a lado. |

## 6. Itens do beta — avaliação um a um

| # | Item | Recomendação | MoSCoW | Esforço | Justificativa |
|---|---|---|---|---|---|
| 6.1 | **Recuperação de senha** | Fluxo "Esqueci minha senha" com link por e-mail (token de uso único, validade de 30 min). **Plano B:** sem e-mail, o autor redefine a senha manualmente sob pedido (script documentado). | **Should** | ~0,5 dia (≈ 5 h, back + front + serviço de e-mail [VERIFICAR plano gratuito]) | Amigos esquecem senha. Mas, com até ~8 usuários, o reset manual resolve. É Should porque depende de um serviço externo de e-mail. Decidir até **30/11** (fim da SPR-02). |
| 6.2 | **Termos de uso e política de privacidade (LGPD)** | Página estática simples: dados coletados, finalidade, onde ficam, por quanto tempo, como pedir exclusão, contato. Aceite obrigatório no cadastro. | **Must** | ~2 h | Haverá dados pessoais de terceiros (nome, e-mail, fotos). A coleta mínima e a transparência são exigência básica da LGPD e custam pouco. |
| 6.3 | **Canal de feedback** | Link "Dar feedback" fixo no app → formulário externo (Google Forms ou Tally) + grupo de mensagens do beta. | **Must** | ~1 h | Sem canal não há OBJ-03. Formulário externo evita construir uma feature. |
| 6.4 | **Backup do banco** | Backup diário automático (do provedor, se houver; senão, `mysqldump` agendado via GitHub Actions para armazenamento privado), retenção de 7 dias, 1 teste de restauração antes do beta. | **Must** | ~3 h | Perder os dados dos amigos destrói a confiança no beta (RISK-13). |
| 6.5 | **Limites de upload** | JPEG/PNG/WebP; máx. **5 MB** por arquivo [EM ABERTO]; validação no cliente e no servidor; limite de **200 peças por usuário** [EM ABERTO]. Compressão/redimensionamento no cliente: Could. | **Must** (limites) / **Could** (compressão) | ~2 h (dentro de EAP 5.5) | Protege o armazenamento gratuito e o custo (RISK-17). |
| 6.6 | **Convite ou cadastro aberto** | **Lista de e-mails permitidos** via variável de ambiente (`BETA_ALLOWED_EMAILS`). Cadastro de e-mail fora da lista recebe a mensagem "Este e-mail ainda não está no beta. Peça um convite ao autor." | **Should** | ~1 h | Mais simples que código de convite (não muda o formulário) e impede cadastros de estranhos se o link vazar. Alternativa: cadastro aberto (0 h), aceitável se o link não for divulgado. |
| 6.7 | **Monitoramento de erros** | Logs da API no painel da hospedagem + endpoint de health check (Must). Captura de erros do frontend com serviço externo (Could). | **Must** (logs + health) / **Could** (front) | ~2 h / +2 h | Sem logs, um bug relatado por um amigo é impossível de diagnosticar. |
| 6.8 | **Exclusão de conta e dos dados** | Durante o beta: pedido pelo canal de feedback e exclusão manual em até 7 dias. Autosserviço: Could. | **Must** (processo) / **Could** (tela) | 0 h / +3 h | Direito do titular na LGPD; um processo manual basta para poucos usuários. |
| 6.9 | **Custo de hospedagem** | Teto **[EM ABERTO]**, sugestão: R$ 0, admitindo até R$ 30/mês só se o plano gratuito impedir o beta. Escolha do provedor no Guia de Kickoff Técnico. | **Must** (restrição) | — | Orçamento ~zero é restrição do TAP. |
| 6.10 | **Aviso de "versão beta"** | Selo "Beta" no cabeçalho + texto curto no onboarding: dados podem ser apagados ao fim do beta (ver plano do beta). | **Must** | ~0,5 h | Alinha expectativas e reduz frustração. |

**Impacto total dos itens do beta:** Must ≈ 10,5 h; Should ≈ 6 h; Could ≈ 7 h. Já está somado na EAP (pacotes 2.3, 5.3, 5.5, 9.4, 10.1).

## 7. Exclusões explícitas (Won't na v1.0)

- Integração com Gemini ou qualquer IA generativa **no produto**.
- Sugestão automática de looks.
- Avatar/visualização corporal.
- Reconhecimento automático de peças, categorias ou cores por imagem.
- Recomendações por clima, ocasião ou evento.
- Feed, seguidores, curtidas, comentários e compartilhamento público de looks.
- Estatísticas avançadas de uso.
- App mobile nativo (a v1.0 é web responsiva).
- Login social (Google/Apple).
- Painel administrativo e papéis de usuário.
- Internacionalização (só pt-BR).
- Histórico de versões dos looks.
- Coleta de dados corporais (altura, tom de pele, sexo, data de nascimento) — **[EM ABERTO]** até o PROMPT-011 confirmar que nenhuma regra precisa deles.

## 8. Restrições e premissas de escopo

- Toda inclusão de escopo passa pelo controle de mudanças (Plano de Comunicação, seção 2.4): novo D-xx, impacto em horas e MoSCoW.
- Se o cronograma apontar déficit, a ordem de corte é: **Could → Should**, seguindo a lista do Cronograma (seção 6).

---

## 📚 Por que este documento existe

A Declaração de Escopo traça a fronteira: o que **está dentro**, o que **está fora** e como saber se cada entrega está **pronta**. Com prazo fixo, o MoSCoW vira uma ferramenta de sobrevivência: a lista de cortes é decidida agora, com calma, e não às 23h do dia 30/12.
