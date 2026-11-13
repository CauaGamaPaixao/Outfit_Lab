# OUTFIT LAB
## Product Requirements Document (PRD) — Contexto Completo do Produto

**Versão:** 1.1  
**Data:** 13/11/2026  
**Autor:** Cauã Gama Paixão  
**Gerado por:** PROMPT-001 v2.0 (a partir do PRD v1.0)  
**Status:** Em revisão  
**Stack planejada:** React + Java/Spring Boot + MySQL  
**Forma de desenvolvimento:** 100% vibe coding, com prompts versionados  
**Prazo da v1.0:** 31/12/2026  
**Direção visual:** Editorial Minimalista

---

## Changelog

| Versão | Data | Seção | Alteração | Decisão |
|---|---|---|---|---|
| 1.1 | 13/11/2026 | Cabeçalho | Stack trocada para React; inclusão da forma de desenvolvimento e do prazo. | D-01, D-02, D-05 |
| 1.1 | 13/11/2026 | 1 | Reescrita: a LLM passa a gerar o código a partir de prompts versionados. | D-01 |
| 1.1 | 13/11/2026 | 2 | Último parágrafo atualizado (vibe coding, prazo, beta e deploy). | D-01, D-05, D-06, D-07 |
| 1.1 | 13/11/2026 | 4.1 | Público inicial inclui o beta fechado com amigos. | D-06 |
| 1.1 | 13/11/2026 | 5 | Princípio 8 adaptado ao vibe coding. | D-01 |
| 1.1 | 13/11/2026 | 6.3 (nova) | Escopo de operação: deploy, beta e itens mínimos para usuários reais. | D-06, D-07 |
| 1.1 | 13/11/2026 | 9 | Novos RNF-11 a RNF-15 (disponibilidade, backup, observabilidade, limites de upload, privacidade/LGPD). | D-06, D-07 |
| 1.1 | 13/11/2026 | 12.4 | Nota sobre os protótipos gerados pelo PROMPT-001. | D-08 |
| 1.1 | 13/11/2026 | 15.1, 15.2 | Angular → React. | D-02 |
| 1.1 | 13/11/2026 | 15.3 | Reescrita: diretriz de desenvolvimento em vibe coding. | D-01 |
| 1.1 | 13/11/2026 | 17.1, 17.2 | Premissas e restrições atualizadas (stack, prazo, orçamento, beta). | D-01, D-02, D-05, D-06 |
| 1.1 | 13/11/2026 | 17.3 | Referência ao Registro de Riscos completo. | — |
| 1.1 | 13/11/2026 | 18.1 | Reescrita com D-01 a D-09. | D-01 a D-09 |
| 1.1 | 13/11/2026 | 18.2 | Itens 13 (autenticação) mantido, 14 (deploy) desdobrado; novos itens 16 a 21. | D-07 |
| 1.1 | 13/11/2026 | 19 | Roadmap reorganizado em sprints até 31/12/2026. | D-05 |
| 1.1 | 13/11/2026 | 20 | Instrução de continuidade atualizada (React, vibe coding, AGENTS.md). | D-01, D-02 |
| 1.1 | 13/11/2026 | Várias | Revisão editorial: caminhos de pastas atualizados para a convenção D-25 e números dos prompts previstos renumerados (+1), sem mudança de conteúdo (PROMPT-002). | D-25 |
| 1.1 | 13/11/2026 | Várias | Revisão editorial: números dos prompts previstos renumerados (+1) com a criação do PROMPT-003 (telas no Figma), sem mudança de conteúdo. | D-33 |
| 1.1 | 13/11/2026 | Várias | Revisão editorial: prompts previstos renumerados (+1) com a criação do PROMPT-004 (frontend), sem mudança de conteúdo. | D-34 |
| 1.0 | 13/11/2026 | — | PRD inicial consolidado. | — |

> As decisões D-01 a D-09 estão detalhadas em `b_doc_repo/b_docs/c_planejamento/07_Registro_de_Decisoes_Premissas_e_Licoes.md`.

---

# 1. Instruções para a LLM que receber este documento

Este documento deve ser utilizado como fonte principal de contexto do Outfit Lab. Ao apoiar o projeto:

- Preserve as decisões consolidadas e diferencie-as de sugestões e pontos em aberto.
- Não amplie o MVP sem explicar o impacto no escopo, na complexidade e **no prazo (31/12/2026)**.
- Explique conceitos técnicos de forma didática, adequada a um estudante de Análise e Desenvolvimento de Sistemas.
- **O projeto é desenvolvido em vibe coding (D-01).** A LLM gera o código a partir de prompts versionados em `b_doc_repo/a_prompts/`. O autor dirige, revisa, testa e integra. Gere código quando o prompt pedir, seguindo o `AGENTS.md` da raiz do repositório.
- Todo código gerado precisa ser explicável: ao entregar, resuma o que foi feito, por que e como testar. Prefira soluções simples que o autor consiga entender e manter.
- Não invente decisões ausentes. Registre dúvidas como pontos em aberto.
- Mantenha rastreabilidade entre requisitos, regras de negócio, telas, dados, critérios de aceitação e prompts.
- Trate as análises de moda como orientativas, baseadas em regras explícitas, e não como verdades universais.

**Objetivo do documento:** permitir que uma LLM que não participou das conversas anteriores compreenda o produto e continue o trabalho sem reconstruir decisões já tomadas.

---

# 2. Resumo executivo

O **Outfit Lab** é uma aplicação web de guarda-roupa digital e exploração de estilo pessoal. O usuário poderá cadastrar suas peças de roupa, organizá-las em uma coleção visual, montar combinações (looks) e receber uma análise orientativa da composição.

A análise deverá considerar critérios como compatibilidade de cores, coerência das camadas, proporções/modelagem e características de estilo. No MVP, a avaliação será realizada por regras próprias, explícitas e documentadas, sem depender de inteligência artificial generativa.

O produto combina duas dimensões:

- **Experiência criativa e visual:** interface inspirada em catálogos editoriais de moda, valorizando as imagens das peças.
- **Organização e análise:** estruturação dos dados das peças e apresentação de observações compreensíveis sobre os looks.

O MVP deverá ser pequeno, completo e funcional. O fluxo central será: criar conta ou entrar, cadastrar peças, visualizar o guarda-roupa, montar um look, solicitar análise, compreender o resultado e salvar a combinação.

O projeto também é uma iniciativa pessoal de aprendizagem. **A partir da v1.1, o desenvolvimento é 100% em vibe coding:** a LLM gera o código a partir de prompts versionados, e o proprietário dirige, revisa, testa e integra. A v1.0 do produto deve estar **publicada na internet até 31/12/2026** e em uso por um **grupo fechado de amigos (beta)**, além do próprio autor.

---

# 3. Visão do produto

## 3.1 Declaração de visão

Construir uma aplicação web que transforme o guarda-roupa físico do usuário em uma coleção digital organizada, permitindo explorar combinações de roupas e receber análises explicáveis que auxiliem na descoberta e expressão do estilo pessoal.

## 3.2 Objetivo geral

Desenvolver uma aplicação web que permita ao usuário digitalizar e organizar suas peças de roupa, montar looks e consultar uma análise orientativa baseada em regras de cores, camadas, proporções e estilo.

## 3.3 Objetivos específicos

- Permitir cadastro e autenticação de usuários.
- Manter um guarda-roupa digital próprio por usuário.
- Cadastrar peças com imagem e atributos relevantes.
- Organizar e visualizar peças em uma interface de catálogo.
- Selecionar peças e montar combinações.
- Representar a composição do look, incluindo funções/camadas.
- Avaliar combinações por regras internas documentadas.
- Apresentar pontuação orientativa acompanhada de justificativas.
- Permitir salvar e consultar looks criados.
- Construir uma base técnica evolutiva para recursos inteligentes futuros.

## 3.4 Proposta de valor

O Outfit Lab oferece um espaço digital para transformar o guarda-roupa em uma coleção visual, experimentar combinações e compreender os fatores considerados na análise de um look.

## 3.5 Problema

O usuário pode possuir diversas peças, mas ter dificuldade para visualizar o conjunto do guarda-roupa, lembrar possibilidades de combinação e avaliar de forma organizada os elementos de um look. O Outfit Lab centraliza as peças e oferece ferramentas para organizar, combinar e refletir sobre escolhas, sem substituir o gosto pessoal nem impor regras absolutas de moda.

---

# 4. Público-alvo

## 4.1 Público inicial

O público inicial é o próprio criador do projeto, que será o primeiro usuário e utilizará a aplicação como ferramenta pessoal e ambiente de aprendizagem técnica. **Na v1.0, um grupo fechado de amigos convidados usará a aplicação publicada por um período de beta (D-06)**, com dados reais e feedback estruturado. A estrutura deverá, portanto, suportar múltiplas contas reais, mantendo os dados de cada usuário isolados.

## 4.2 Perfil inicial

- Interesse em moda, streetwear, sneakers e combinações de roupas.
- Desejo de organizar peças e visualizar possibilidades de looks.
- Valorização de interface visual limpa, semelhante a um catálogo de moda.
- Disposição para cadastrar manualmente informações das peças.
- Interesse em compreender os critérios usados pelo sistema.
- Interesse em desenvolver e entender uma aplicação full stack.

## 4.3 Expansão

Futuramente, o produto poderá atender outras pessoas interessadas em organizar o guarda-roupa e explorar seu estilo. Recursos sociais, compartilhamento e comunidade não fazem parte do MVP.

---

# 5. Princípios do produto

1. **Visual em primeiro plano:** imagens das peças devem ter destaque.
2. **Organização simples:** cadastrar, encontrar e selecionar peças deve ser intuitivo.
3. **Análise explicável:** toda pontuação deve estar associada a critérios compreensíveis.
4. **Liberdade de estilo:** regras são orientativas, não verdades universais.
5. **MVP enxuto:** priorizar o fluxo central antes de funcionalidades avançadas.
6. **Evolução incremental:** manter uma base evolutiva sem antecipar recursos futuros.
7. **Privacidade por usuário:** peças e looks pertencem à conta correspondente.
8. **Aprendizagem prática:** o proprietário deve compreender as decisões e os componentes do sistema. Em vibe coding, isso significa que **nenhum código entra no repositório sem que o autor consiga explicá-lo em uma frase**.

---

# 6. Escopo do produto

## 6.1 Dentro do MVP

1. Cadastro de usuário.
2. Login/autenticação.
3. Gerenciamento de peças (criar, consultar, editar e excluir).
4. Cadastro de informações e imagem das peças.
5. Visualização do guarda-roupa em cards.
6. Organização básica por categorias e filtros simples.
7. Montagem de looks por seleção de peças.
8. Organização ou identificação das funções/camadas das peças.
9. Análise baseada em regras próprias.
10. Exibição de resultado com pontuação orientativa e justificativas.
11. Salvamento e consulta posterior dos looks.
12. Feedback visual para carregamento, sucesso, erro, validação e ausência de dados.

## 6.2 Fora do MVP

- Integração com Gemini ou outro serviço de IA generativa.
- Sugestão automática de looks.
- Visualização de roupas aplicadas a corpo humano ou avatar.
- Reconhecimento automático de peças, categorias ou cores por imagem.
- Recomendações considerando clima, temperatura ou previsão do tempo.
- Recomendações por ocasião ou evento.
- Feed, comunidade, seguidores, curtidas e comentários.
- Compartilhamento público de looks.
- Estatísticas avançadas de uso das peças.
- Aplicativo mobile nativo.
- Personalização avançada de preferências e objetivos de estilo.

## 6.3 Escopo de operação da v1.0 (novo na v1.1)

Como a v1.0 será publicada e usada por amigos (D-06, D-07), entram no escopo itens que não são funcionalidades do produto, mas são necessários para operá-lo com usuários reais. A priorização de cada um está na Declaração de Escopo (`c_planejamento/01_Declaracao_de_Escopo.md`).

- Publicação da aplicação na internet, com HTTPS, acessível por link.
- Termos de uso e política de privacidade simples (LGPD).
- Canal de feedback do beta.
- Backup do banco de dados durante o beta.
- Limites de upload (tamanho e formato).
- Controle de quem pode se cadastrar durante o beta.
- Recuperação de senha (prioridade definida na Declaração de Escopo).
- Observabilidade mínima: logs da API e health check.

---

# 7. Usuários e permissões

## 7.1 Usuário autenticado

Poderá acessar seu guarda-roupa, cadastrar/consultar/editar/excluir suas peças, montar looks, solicitar análises, salvar e consultar suas combinações.

## 7.2 Isolamento de dados

Cada peça e look deverá estar associado ao usuário proprietário. Um usuário não poderá consultar, alterar ou excluir dados de outro usuário pela interface ou API. Não há definição de painel administrativo ou papéis administrativos no MVP.

---

# 8. Requisitos funcionais preliminares

Os IDs abaixo são preliminares e poderão ser ajustados na especificação formal, preservando a rastreabilidade.

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-01 | Cadastro | Criar conta com os dados necessários. | Obrigatória |
| RF-02 | Autenticação | Entrar com credenciais válidas e acessar dados próprios. | Obrigatória |
| RF-03 | Gerenciar peças | Criar, consultar, editar e excluir peças. | Obrigatória |
| RF-04 | Atributos da peça | Registrar categoria, nome, marca, cores e modelagem. | Obrigatória |
| RF-05 | Imagem da peça | Associar e exibir imagem quando disponível. | Obrigatória |
| RF-06 | Visualizar guarda-roupa | Exibir peças em coleção visual, com organização básica. | Obrigatória |
| RF-07 | Montar look | Selecionar peças cadastradas para compor um look. | Obrigatória |
| RF-08 | Camadas/funções | Identificar a função das peças na composição. | Obrigatória |
| RF-09 | Analisar look | Aplicar regras internas à combinação. | Obrigatória |
| RF-10 | Exibir resultado | Mostrar pontuação orientativa e justificativas. | Obrigatória |
| RF-11 | Salvar look | Salvar combinação e recuperá-la posteriormente. | Obrigatória |
| RF-12 | Feedback de interface | Exibir estados de sucesso, erro, carregamento, validação e vazio. | Obrigatória |

> Os itens de operação do beta (seção 6.3), como recuperação de senha, ganharão IDs RF próprios no PROMPT-005 (requisitos detalhados).

---

# 9. Requisitos não funcionais preliminares

| ID | Requisito | Diretriz |
|---|---|---|
| RNF-01 | Usabilidade | Interface clara, consistente e fácil de aprender. |
| RNF-02 | Responsividade | Telas adaptáveis a desktop e dispositivos menores. |
| RNF-03 | Segurança | Credenciais não devem ser armazenadas em texto puro; acesso aos dados deve ser protegido. |
| RNF-04 | Privacidade | Dados de peças e looks isolados por usuário. |
| RNF-05 | Manutenibilidade | Separar frontend, API, regras de negócio e persistência. |
| RNF-06 | Consistência | Validar dados e preservar integridade das relações. |
| RNF-07 | Feedback | Informar resultados das operações e erros recuperáveis. |
| RNF-08 | Evolutividade | Permitir inclusão de novas regras e funcionalidades. |
| RNF-09 | Acessibilidade básica | Contraste adequado, rótulos claros e controles compreensíveis. |
| RNF-10 | Testabilidade | Regras de negócio importantes devem ser testáveis independentemente da interface. |
| RNF-11 | Disponibilidade básica *(novo)* | Aplicação acessível por HTTPS durante o beta, sem meta formal de SLA. Indisponibilidades planejadas são avisadas aos beta testers com antecedência. Tempo de "acordar" (cold start) de planos gratuitos é aceitável se for comunicado. |
| RNF-12 | Backup *(novo)* | Backup do banco de produção pelo menos diário durante o beta, com retenção mínima de 7 dias e pelo menos um teste de restauração antes do início do beta. Imagens com estratégia de backup definida no plano de deploy. |
| RNF-13 | Observabilidade mínima *(novo)* | API com logs estruturados acessíveis pelo painel da hospedagem e endpoint de health check. Captura de erros do frontend é opcional. |
| RNF-14 | Limites de upload *(novo)* | Apenas JPEG, PNG e WebP, com tamanho máximo por arquivo definido (sugestão: 5 MB — [EM ABERTO]) e validação no cliente e no servidor. |
| RNF-15 | Proteção de dados pessoais *(novo)* | Coleta mínima de dados pessoais, termos e política de privacidade aceitos no cadastro, e atendimento a pedidos de exclusão de conta durante o beta (LGPD). |

Valores mensuráveis de desempenho e compatibilidade de navegadores ainda precisam ser definidos (PROMPT-005).

---

# 10. Módulos e experiência esperada

## 10.1 Cadastro e autenticação

O usuário cria uma conta e autentica-se para acessar seus dados.

Campos considerados em conversas anteriores incluíam nome, sobrenome, e-mail, senha, data de nascimento, altura, tom de pele e sexo. **Essa lista não está aprovada como formulário definitivo.** A coleta deve ser minimizada e cada campo precisa ter justificativa funcional. Altura ou outras características corporais só devem ser solicitadas se uma regra realmente depender delas. Informações sensíveis ou desnecessárias devem ser evitadas.

## 10.2 Dashboard

Tela inicial após autenticação. A proposta preliminar é oferecer acesso rápido ao guarda-roupa, à montagem de looks e aos looks salvos, podendo exibir resumos simples. O conteúdo exato ainda será definido no protótipo.

## 10.3 Guarda-roupa digital

As peças serão exibidas em cards. A experiência deve lembrar um catálogo pessoal, não uma tabela administrativa.

Categorias preliminares:
- Partes superiores.
- Partes inferiores.
- Calçados.
- Acessórios.

A taxonomia final precisa ser definida antes da modelagem.

## 10.4 Cadastro de peça

O usuário adicionará uma peça com imagem e atributos. Recomenda-se foto frontal, boa iluminação e fundo simples, mas isso não será uma obrigação rígida.

Atributos inicialmente considerados:
- Nome.
- Categoria.
- Marca.
- Uma ou mais cores.
- Cor dominante e, quando necessário, cores secundárias/de detalhe.
- Modelagem/caimento (slim, regular, oversized, wide, cropped).
- Comprimento (curto, médio, longo), quando aplicável.
- Altura da cintura (baixa, média, alta), quando aplicável.
- Função na composição (base, intermediária, externa, parte inferior, calçado ou acessório).

Nem todos os atributos se aplicam a todas as categorias. O modelo deve evitar exigir campos irrelevantes.

## 10.5 Montagem de looks

O usuário selecionará peças cadastradas para compor um look. A visualização inicial será por cards e composição visual das peças. A função/camada de cada item deverá ser identificável. Avatar corporal está fora do MVP.

## 10.6 Análise do look

A análise usa os dados das peças selecionadas e aplica regras internas. O resultado deverá apresentar:
- Pontuação orientativa, caso a fórmula seja definida e documentada.
- Avaliação por critério.
- Pontos positivos.
- Pontos de atenção, quando existirem.
- Explicação simples do resultado.

O sistema não deve produzir uma nota sem justificativa.

## 10.7 Looks salvos

O usuário poderá salvar uma combinação e consultá-la posteriormente. Edição, duplicação, exclusão e histórico de versões ainda precisam ser especificados.

---

# 11. Avaliador de looks

O avaliador é um diferencial do produto. No MVP, será determinístico e baseado em regras próprias. IA generativa será uma camada complementar futura, não a fonte primária da pontuação.

## 11.1 Dimensões preliminares

### A. Compatibilidade de cores
- Relação entre cores dominantes.
- Uso de cores neutras.
- Combinações complementares ou de contraste.
- Relação entre cor principal e cor de destaque.
- Distribuição de cores entre as peças.

### B. Camadas e proporções
- Ordem e função das camadas.
- Compatibilidade entre peças sobrepostas.
- Relação entre volumes e modelagens.
- Comprimentos relativos.
- Relação visual entre parte superior e inferior.

### C. Perfil de estilo
Categorias iniciais possíveis:
- Casual.
- Streetwear.
- Social.
- Esportivo.

O sistema poderá reconhecer características de mais de um estilo. Não deverá forçar classificação única quando os dados forem insuficientes.

## 11.2 Pontuação

Foi proposta uma escala de 0 a 100, mas fórmula, pesos, faixas e critérios ainda não foram definidos.

A pontuação representa o resultado das regras do Outfit Lab, não uma medida objetiva de beleza, elegância ou adequação universal.

Antes da implementação:
1. Definir regras atômicas para cada dimensão.
2. Definir os dados necessários para cada regra.
3. Definir tratamento de dados ausentes/incompletos.
4. Definir pesos e agregação.
5. Criar looks de exemplo para validar resultados.
6. Explicar como cada critério influenciou a pontuação.

## 11.3 Gemini e IA

A integração com Gemini foi considerada futura. Poderá transformar resultados estruturados em comentários ou sugestões textuais, mas não deverá inventar atributos ausentes nem substituir silenciosamente as regras do sistema.

> Nota v1.1: o uso de LLM no **desenvolvimento** (vibe coding, D-01) é diferente do uso de IA **no produto**. A IA no produto continua fora do MVP (D-09).

---

# 12. Direção visual e identidade

## 12.1 Conceito

A direção escolhida é **Editorial Minimalista**. A aplicação deve transmitir a sensação de um catálogo ou editorial de moda contemporâneo.

Princípios:
- Interface limpa, com espaços em branco.
- Hierarquia tipográfica clara.
- Imagens das peças como protagonistas.
- Cards com aparência de coleção curada.
- Poucos elementos decorativos.
- Navegação objetiva.
- Espaçamento e alinhamento consistentes.

## 12.2 Paleta inicial de referência

| Papel | Cor | Hex |
|---|---|---|
| Preto principal | Preto quase absoluto | `#0A0A0A` |
| Cinza escuro | Texto/elementos escuros | `#1F1F1F` |
| Cinza claro | Superfícies e divisões | `#E5E5E5` |
| Off-white | Fundo claro | `#FAFAFA` |
| Amarelo de destaque | Acento inspirado em sneaker | `#FACC15` |

Esta é uma referência inicial, não um design system final. Tokens, contrastes, estados e aplicação por componente serão definidos no documento visual (PROMPT-001, Parte B), seguindo a regra de cores 60/30/10.

## 12.3 Tipografia

A referência visual inicial utilizou Inter. A escolha final e a escala tipográfica devem ser formalizadas no protótipo/design system.

## 12.4 Telas previstas

1. Login.
2. Cadastro.
3. Dashboard.
4. Meu guarda-roupa.
5. Cadastro/edição de peça.
6. Montagem de look.
7. Resultado da análise.
8. Looks salvos.
9. Perfil/configurações, se necessário ao MVP.

Looks salvos e perfil foram considerados no conceito visual, mas conteúdo e prioridade precisam ser confirmados nos requisitos.

> Nota v1.1 (D-08): os protótipos das telas 1, 2 e 4 (TELA-01 a TELA-03) são gerados pelo PROMPT-001 (Parte B). As demais telas, pelo PROMPT-006. Todos ficam versionados em `b_doc_repo/c_design/d_prototipos/`.

---

# 13. Fluxo principal do usuário

1. Usuário acessa a aplicação.
2. Cria uma conta ou realiza login.
3. Acessa o dashboard.
4. Abre o guarda-roupa.
5. Cadastra peças com atributos.
6. Sistema exibe peças em cards.
7. Usuário seleciona peças para montar um look.
8. Organiza ou identifica as camadas/funções.
9. Solicita a análise.
10. Sistema verifica se há dados suficientes e executa as regras.
11. Sistema apresenta pontuação (se habilitada), critérios e justificativas.
12. Usuário decide salvar o look.
13. Look fica disponível para consulta posterior.

Fluxos alternativos a detalhar: cadastro inválido, login inválido, peça sem imagem, dados insuficientes para análise, combinação incompleta, falha de rede/API, tentativa de acessar dados de outro usuário, **senha esquecida e cadastro de e-mail não convidado durante o beta**.

---

# 14. Critérios de sucesso do MVP

O MVP será considerado funcional quando:
- O usuário conseguir criar conta e realizar login.
- Conseguir cadastrar, consultar, editar e excluir suas próprias peças.
- Peças e atributos permanecerem persistidos.
- O guarda-roupa for exibido em coleção visual.
- O usuário conseguir selecionar peças e montar um look.
- Funções/camadas forem representadas consistentemente.
- O sistema executar regras documentadas.
- O resultado apresentar explicações compreensíveis.
- O usuário conseguir salvar e consultar looks.
- A aplicação apresentar feedback nos principais estados.
- Dados de usuários diferentes permanecerem isolados.
- As regras de negócio centrais tiverem testes.

O sucesso não será medido pela quantidade de recursos avançados, mas pela conclusão confiável do fluxo principal.

> Nota v1.1: os critérios de sucesso do **beta** e do **portfólio** estão no Termo de Abertura (`b_iniciacao/01_Termo_de_Abertura_do_Projeto.md`).

---

# 15. Stack e diretrizes técnicas

## 15.1 Stack planejada

| Camada | Tecnologia | Papel |
|---|---|---|
| Frontend | **React** | Interface, navegação, formulários e interação. |
| Backend | Java + Spring Boot | API, autenticação, regras de negócio e persistência. |
| Banco de dados | MySQL | Armazenamento de usuários, peças, looks e relações. |
| IA futura | Gemini | Comentários/sugestões complementares, fora do MVP. |

Versões, bibliotecas complementares (roteamento, estado do servidor, formulários, estilização), ferramenta de build e hospedagem são definidas no Guia de Kickoff Técnico (PROMPT-001, Parte C).

## 15.2 Diretrizes de arquitetura

- React: apresentação e interação (SPA que consome a API).
- Spring Boot: endpoints, validações, regras de negócio e controle de acesso.
- MySQL: persistência e integridade.
- Avaliador: regras de domínio testáveis, independentes da interface.
- Integrações externas: não são necessárias para o núcleo do MVP.

A estrutura de pacotes, módulos, endpoints, autenticação e armazenamento de imagens ainda será definida. Não presumir microserviços: o ponto de partida recomendado é uma aplicação modular simples, adequada ao escopo.

## 15.3 Diretriz de desenvolvimento (reescrita na v1.1)

O projeto é desenvolvido **100% em vibe coding (D-01)**:

1. Toda tarefa relevante começa com um prompt versionado em `b_doc_repo/a_prompts/PROMPT_NNN_descricao.md`, ligado a uma issue do GitHub.
2. A LLM gera o código usando o `AGENTS.md` (raiz do repositório) como contexto permanente.
3. O autor **dirige** (escreve o prompt e os critérios de aceite), **revisa** (lê o código e pede explicações do que não entender), **testa** (roda os testes e o fluxo manualmente) e **integra** (commit, PR, deploy).
4. Uma segunda LLM revisa o código antes do merge.
5. Regra de ouro: **nenhum commit de código que o autor não consiga explicar em uma frase**.
6. Testes automatizados são obrigatórios para as regras do avaliador e para o isolamento de dados por usuário.

O objetivo de aprendizagem permanece, mas muda de foco: o autor aprende a **especificar, revisar, testar e operar** código gerado, além dos conceitos de cada camada.

---

# 16. Modelo conceitual preliminar de dados

Hipótese inicial de entidades:
- **USUARIO:** conta e proprietário dos dados.
- **PECA:** item do guarda-roupa.
- **COR:** cor associada às peças.
- **OUTFIT:** combinação criada pelo usuário.
- **OUTFIT_PECA:** entidade associativa entre look e peça, podendo armazenar função/ordem da peça no look.

Relacionamentos sugeridos:
- Um usuário possui várias peças.
- Um usuário possui vários looks.
- Uma peça pode estar associada a várias cores.
- Um look contém várias peças.
- Uma peça pode participar de vários looks.
- A relação entre look e peça pode guardar camada, posição ou papel na composição.

Este modelo é apenas uma base de discussão, não um DER aprovado. Cardinalidades, atributos, normalização, imagens e persistência de análises serão definidos no documento de modelagem (PROMPT-007).

---

# 17. Premissas, restrições e riscos

## 17.1 Premissas
- Uso inicial pessoal **e por um grupo fechado de amigos (beta)**, com suporte a múltiplas contas.
- Cadastro de peças predominantemente manual.
- O usuário fornece os dados necessários para análise.
- Visualização inicial baseada em cards.
- Avaliador baseado em regras próprias.
- Stack planejada: **React**, Spring Boot e MySQL.
- Existe hospedagem gratuita ou de baixo custo suficiente para o volume do beta ([VERIFICAR] no Guia de Kickoff Técnico).
- Os amigos convidados aceitam usar uma versão beta e responder ao formulário de feedback.

## 17.2 Restrições (reescrita na v1.1)
- **Prazo fixo:** aplicação v1.0 completa, publicada e em uso até **31/12/2026** (D-05).
- **Desenvolvedor único:** o autor acumula os papéis de patrocinador, PM, PO, dev e QA.
- **Orçamento próximo de zero:** hospedagem, domínio e serviços devem ser gratuitos ou de custo mínimo.
- **Desenvolvimento em vibe coding** (D-01), com revisão obrigatória pelo autor e por uma segunda LLM.
- Escopo funcional limitado ao MVP (RF-01 a RF-12) mais o escopo de operação (seção 6.3).
- IA no produto fora da primeira entrega.
- Visualização corporal fora da primeira entrega.
- Conformidade básica com a LGPD, já que haverá dados pessoais de terceiros (amigos).

## 17.3 Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Crescimento excessivo do escopo | MVP incompleto | Manter recursos futuros fora do MVP. |
| Atributos insuficientes | Análise pouco confiável | Definir dados mínimos por categoria. |
| Subjetividade da moda | Pontuação arbitrária | Documentar regras, pesos e justificativas. |
| Cadastro trabalhoso | Baixa utilização | Formulário simples e campos úteis. |
| Complexidade do upload | Atraso no fluxo | Definir armazenamento simples para o MVP. |
| Arquitetura complexa | Dificuldade de manutenção | Começar com arquitetura modular simples. |
| Dependência de IA | Imprevisibilidade/custo | Núcleo determinístico e independente de IA. |
| Coleta excessiva de dados | Risco de privacidade | Coletar apenas dados com finalidade clara. |

> Nota v1.1: o registro completo, com os riscos novos (prazo, vibe coding, hospedagem, LGPD, beta), está em `c_planejamento/04_Registro_de_Riscos.md`.

---

# 18. Decisões consolidadas e pontos em aberto

## 18.1 Decisões consolidadas (reescrita na v1.1)

- Nome de trabalho: Outfit Lab.
- Produto: aplicação web de guarda-roupa digital, montagem e análise de looks.
- Público da v1.0: próprio criador **+ beta fechado com amigos** (D-06).
- Stack: **React** (D-02), Java/Spring Boot (D-03) e MySQL (D-04).
- Direção visual: Editorial Minimalista.
- Referência visual: paleta neutra com amarelo de destaque, imagens grandes e cards editoriais, aplicada pela regra de cores 60/30/10.
- Visualização do MVP: cards, sem avatar corporal.
- Avaliação do MVP: regras próprias, com explicações.
- Gemini: possibilidade futura, após o núcleo estar funcional.
- Escopo funcional: MVP pequeno, completo e funcional, RF-01 a RF-12 (D-09).
- Desenvolvimento: **100% vibe coding** com prompts versionados; o autor dirige, revisa, testa e integra (D-01).
- Prazo: **v1.0 completa até 31/12/2026** (D-05).
- Deploy: **dentro do escopo**; a aplicação estará publicada na internet (D-07).
- Protótipos: gerados por prompt e versionados no repositório (D-08).
- Repositório: monorepo com `a_tech_repo/` (técnico) e `b_doc_repo/` (documental).

## 18.2 Pontos em aberto — não inventar decisões

1. Nome definitivo e branding.
2. Campos obrigatórios/opcionais do cadastro de usuário.
3. Necessidade real de altura ou outras medidas corporais; incluir somente se houver regra que dependa delas.
4. Taxonomia final das categorias.
5. Atributos específicos por categoria.
6. Catálogo de cores, seleção manual, HEX e múltiplas cores.
7. Formatos, tamanho máximo e armazenamento de imagens **no ambiente local**.
8. Representação de camadas e funções.
9. Regras atômicas de cores, camadas, proporções e estilo.
10. Pesos, faixas, dados ausentes e fórmula da pontuação.
11. Edição, exclusão, duplicação e histórico dos looks.
12. Conteúdo definitivo do dashboard.
13. Estratégia técnica de autenticação (JWT ou sessão em cookie).
14. ~~Ambiente de deploy~~ → **decidido que haverá deploy (D-07)**; a escolha do provedor foi desdobrada no item 16.
15. Métricas de sucesso além dos testes funcionais.
16. **Hospedagem** de frontend, API e banco em produção (*novo*).
17. **Armazenamento de imagens em produção** (serviço de objetos ou disco do servidor) e estratégia de backup das imagens (*novo*).
18. **Domínio**: subdomínio gratuito do provedor ou domínio próprio (*novo*).
19. **Forma de convite dos amigos**: cadastro aberto, código de convite ou lista de e-mails permitidos (*novo*).
20. **Duração do beta** e número de amigos convidados (*novo*).
21. **Carga semanal de horas** disponível para o projeto (*novo*).

Recomendações e datas-limite para cada ponto estão em `c_planejamento/07_Registro_de_Decisoes_Premissas_e_Licoes.md`.

---

# 19. Roadmap sugerido (reorganizado na v1.1)

| Sprint | Período | Entregável | Marco |
|---|---|---|---|
| SPR-00 | 13–16/11 | Documentação PMBOK, PRD v1.1, design system, protótipos TELA-01 a 03, AGENTS.md, guia técnico | M1 — Kickoff concluído |
| SPR-01 | 17–23/11 | Requisitos detalhados, DER, contratos da API, setup React + Spring Boot + MySQL, CI, autenticação no backend | M2 — Esqueleto rodando |
| SPR-02 | 24–30/11 | Login/cadastro no front, CRUD de peças, upload de imagem | M3 — Guarda-roupa funcional local |
| SPR-03 | 01–07/12 | Guarda-roupa completo, filtros, primeiro deploy | M4 — App no ar |
| SPR-04 | 08–14/12 | Montador de looks + avaliador v1 | M5 — Análise funcionando |
| SPR-05 | 15–21/12 | Resultado da análise, looks salvos, beta com amigos | M6 — Beta aberto |
| SPR-06 | 22–31/12 | Correções do feedback, estabilização, README final | M7 — Release v1.0 |

O detalhamento (Gantt, caminho crítico e capacidade) está em `c_planejamento/03_Cronograma_e_Marcos.md`.

**Próximo passo recomendado:** concluir as Partes B e C do PROMPT-001 e, em seguida, o PROMPT-005 (requisitos detalhados e regras de negócio).

---

# 20. Instrução de continuidade para outra LLM

Ao receber este PRD, a LLM deve:

1. Reconhecer o Outfit Lab como uma aplicação web de guarda-roupa digital, montagem e análise explicável de looks.
2. Respeitar o escopo do MVP e não introduzir automaticamente funcionalidades futuras.
3. Considerar a direção Editorial Minimalista em propostas de interface, com a regra de cores 60/30/10.
4. Considerar **React**, Java/Spring Boot e MySQL como stack definida.
5. **Ler o `AGENTS.md` antes de gerar código** e seguir o prompt versionado da tarefa. Gerar código quando o prompt pedir, sempre explicando o que foi feito e como testar.
6. Proteger o prazo de **31/12/2026**: toda sugestão que aumente o escopo vem com impacto em dias e classificação MoSCoW.
7. Fazer perguntas pontuais somente quando uma decisão em aberto for necessária para avançar.
8. Manter registro claro das decisões futuras (novo D-xx) e atualizar o contexto (nova versão do PRD) quando houver mudanças relevantes.

**Resumo em uma frase:** Outfit Lab é uma aplicação web de guarda-roupa digital que permite cadastrar peças, montar looks e receber análises explicáveis de cores, camadas, proporções e estilo, com experiência Editorial Minimalista, desenvolvida em vibe coding com React, Spring Boot e MySQL, e publicada para um beta com amigos até 31/12/2026.

---

## 📚 Por que este documento existe

O PRD é a "fonte da verdade" do produto: diz **o que** será construído e **por quê**. Em vibe coding ele fica ainda mais importante, porque é o contexto que a LLM recebe. Um PRD desatualizado gera código que resolve o problema errado. Por isso cada mudança relevante vira uma nova versão com changelog.
