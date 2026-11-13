# OUTFIT LAB
## Product Requirements Document (PRD) — Contexto Completo do Produto

**Versão:** 1.0  
**Data:** 13/11/2026  
**Status:** PRD inicial consolidado, sujeito a validação e refinamento  
**Stack planejada:** Angular + Java/Spring Boot + MySQL  
**Direção visual:** Editorial Minimalista

---

# 1. Instruções para a LLM que receber este documento

Este documento deve ser utilizado como fonte principal de contexto do Outfit Lab. Ao apoiar o projeto:

- Preserve as decisões consolidadas e diferencie-as de sugestões e pontos em aberto.
- Não amplie o MVP sem explicar o impacto no escopo e na complexidade.
- Explique conceitos técnicos de forma didática, adequada a um estudante de Análise e Desenvolvimento de Sistemas.
- O proprietário deseja escrever a implementação manualmente para aprender. Priorize documentação, requisitos, modelagem, arquitetura, prototipação, planejamento, explicações e revisão de código. Só gere código de implementação quando houver solicitação explícita.
- Não invente decisões ausentes. Registre dúvidas como pontos em aberto.
- Mantenha rastreabilidade entre requisitos, regras de negócio, telas, dados e critérios de aceitação.
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

O projeto também é uma iniciativa pessoal de aprendizagem. O proprietário pretende implementar o código por conta própria, utilizando apoio de LLM principalmente para planejamento, documentação, modelagem, arquitetura, prototipação e revisão.

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

O público inicial é o próprio criador do projeto, que será o primeiro usuário e utilizará a aplicação como ferramenta pessoal e ambiente de aprendizagem técnica. A estrutura deverá, entretanto, suportar múltiplas contas, mantendo os dados de cada usuário isolados.

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
8. **Aprendizagem prática:** o proprietário deve compreender as decisões e os componentes do sistema.

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

Valores mensuráveis de desempenho, limites de upload, disponibilidade e compatibilidade de navegadores ainda precisam ser definidos.

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

Esta é uma referência inicial, não um design system final. Tokens, contrastes, estados e aplicação por componente serão definidos no documento visual.

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

Fluxos alternativos a detalhar: cadastro inválido, login inválido, peça sem imagem, dados insuficientes para análise, combinação incompleta, falha de rede/API e tentativa de acessar dados de outro usuário.

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

---

# 15. Stack e diretrizes técnicas

## 15.1 Stack planejada

| Camada | Tecnologia | Papel |
|---|---|---|
| Frontend | Angular | Interface, navegação, formulários e interação. |
| Backend | Java + Spring Boot | API, autenticação, regras de negócio e persistência. |
| Banco de dados | MySQL | Armazenamento de usuários, peças, looks e relações. |
| IA futura | Gemini | Comentários/sugestões complementares, fora do MVP. |

## 15.2 Diretrizes de arquitetura

- Angular: apresentação e interação.
- Spring Boot: endpoints, validações, regras de negócio e controle de acesso.
- MySQL: persistência e integridade.
- Avaliador: regras de domínio testáveis, independentes da interface.
- Integrações externas: não são necessárias para o núcleo do MVP.

A estrutura de pacotes, módulos, endpoints, autenticação, armazenamento de imagens e deploy ainda será definida. Não presumir microserviços: o ponto de partida recomendado é uma aplicação modular simples, adequada ao escopo.

## 15.3 Diretriz de desenvolvimento

O proprietário deseja escrever a implementação manualmente. O apoio da LLM deve priorizar explicação de conceitos, planejamento, documentação, modelagem, arquitetura, prototipação, revisão de código e diagnóstico de erros. Não gerar grandes blocos de implementação por iniciativa própria; código somente quando solicitado explicitamente.

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

Este modelo é apenas uma base de discussão, não um DER aprovado. Cardinalidades, atributos, normalização, imagens e persistência de análises serão definidos no documento de modelagem.

---

# 17. Premissas, restrições e riscos

## 17.1 Premissas
- Uso inicial pessoal, com suporte a múltiplas contas.
- Cadastro de peças predominantemente manual.
- O usuário fornece os dados necessários para análise.
- Visualização inicial baseada em cards.
- Avaliador baseado em regras próprias.
- Stack planejada: Angular, Spring Boot e MySQL.

## 17.2 Restrições
- Escopo pequeno o suficiente para um MVP individual.
- IA fora da primeira entrega.
- Visualização corporal fora da primeira entrega.
- Implementação realizada pelo proprietário como exercício de aprendizagem.

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

---

# 18. Decisões consolidadas e pontos em aberto

## 18.1 Decisões consolidadas

- Nome de trabalho: Outfit Lab.
- Produto: aplicação web de guarda-roupa digital, montagem e análise de looks.
- Público inicial: próprio criador, com possibilidade de expansão.
- Stack planejada: Angular, Java/Spring Boot e MySQL.
- Direção visual: Editorial Minimalista.
- Referência visual: paleta neutra com amarelo de destaque, imagens grandes e cards editoriais.
- Visualização do MVP: cards, sem avatar corporal.
- Avaliação do MVP: regras próprias, com explicações.
- Gemini: possibilidade futura, após o núcleo estar funcional.
- Escopo: MVP pequeno, completo e funcional.
- Implementação: escrita manual pelo proprietário, com LLM como apoio de planejamento e revisão.

## 18.2 Pontos em aberto — não inventar decisões

1. Nome definitivo e branding.
2. Campos obrigatórios/opcionais do cadastro de usuário.
3. Necessidade real de altura ou outras medidas corporais; incluir somente se houver regra que dependa delas.
4. Taxonomia final das categorias.
5. Atributos específicos por categoria.
6. Catálogo de cores, seleção manual, HEX e múltiplas cores.
7. Formatos, tamanho máximo e armazenamento de imagens.
8. Representação de camadas e funções.
9. Regras atômicas de cores, camadas, proporções e estilo.
10. Pesos, faixas, dados ausentes e fórmula da pontuação.
11. Edição, exclusão, duplicação e histórico dos looks.
12. Conteúdo definitivo do dashboard.
13. Estratégia técnica de autenticação.
14. Ambiente de deploy.
15. Métricas de sucesso além dos testes funcionais.

---

# 19. Roadmap sugerido

| Etapa | Entregável | Objetivo |
|---|---|---|
| 1 | Documento 01 — Visão e Escopo do MVP | Delimitar produto e primeira versão. |
| 2 | Documento 02 — Requisitos Funcionais e Não Funcionais | Especificar comportamentos e critérios de aceitação. |
| 3 | Identidade visual e protótipo | Definir telas, componentes, navegação e estados. |
| 4 | Modelagem de dados | Criar modelo conceitual, lógico e DER. |
| 5 | Arquitetura da aplicação | Definir módulos, responsabilidades e contratos. |
| 6 | Planejamento de implementação | Dividir desenvolvimento em entregas pequenas. |
| 7 | Implementação | Desenvolver frontend, backend e persistência. |
| 8 | Testes e validação | Verificar regras, fluxos e critérios de aceitação. |
| 9 | Documentação e evolução | Registrar resultados e planejar próximas versões. |

**Próximo passo recomendado:** desenvolver o Documento 02 — Requisitos Funcionais e Não Funcionais, usando este PRD como base. Depois, detalhar o protótipo tela por tela.

---

# 20. Instrução de continuidade para outra LLM

Ao receber este PRD, a LLM deve:

1. Reconhecer o Outfit Lab como uma aplicação web de guarda-roupa digital, montagem e análise explicável de looks.
2. Respeitar o escopo do MVP e não introduzir automaticamente funcionalidades futuras.
3. Considerar a direção Editorial Minimalista em propostas de interface.
4. Considerar Angular, Java/Spring Boot e MySQL como stack planejada, salvo justificativa para discutir mudança.
5. Ajudar o proprietário a aprender e implementar por conta própria; não assumir a escrita do projeto sem solicitação.
6. Priorizar o próximo entregável: Documento 02 — Requisitos Funcionais e Não Funcionais.
7. Fazer perguntas pontuais somente quando uma decisão em aberto for necessária para avançar.
8. Manter registro claro das decisões futuras e atualizar o contexto quando houver mudanças relevantes.

**Resumo em uma frase:** Outfit Lab é uma aplicação web de guarda-roupa digital que permite cadastrar peças, montar looks e receber análises explicáveis de cores, camadas, proporções e estilo, com experiência Editorial Minimalista e MVP planejado em Angular, Spring Boot e MySQL.
