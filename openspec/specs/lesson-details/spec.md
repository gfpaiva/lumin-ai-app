## ADDED Requirements

### Requirement: Tela de Detalhe da Aula
O sistema SHALL exibir uma tela contendo o detalhamento da aula selecionada, apresentando o título, tempo de aula, sugestões e atividades planejadas.

#### Scenario: Visualização do detalhe da aula
- **WHEN** a tela de detalhe da aula é carregada
- **THEN** o sistema deve exibir as informações da aula: Número da aula, Título da Aula.
- **THEN** o sistema deve exibir uma tag de "Sugestões geradas com IA ✨"
- **THEN** o sistema deve exibir o bloco de tempo de aula contendo a duração (ex: "4 dias") e um texto de suporte indicando o nível da turma correspondente.
- **THEN** o sistema deve listar os exercícios/atividades previstos para essa aula, com seus respectivos títulos e descrições de forma 'scrollable'.
- **THEN** o sistema deve exibir um botão "Customizar ✨" fixo na base da tela.

### Requirement: Componentes Visuais Reutilizáveis (Tag e Header)
O sistema SHALL utilizar componentes isolados para as tags e para o layout do cabeçalho da página de detalhes.

#### Scenario: Visualização do cabeçalho unificado
- **WHEN** a tela de detalhe da aula é acessada
- **THEN** a tela deve exibir o componente de agrupamento que contém o header global, o botão chevron de voltar (que navega de volta pra tela anterior) e o hero header com os dados da aula.

#### Scenario: Visualização das Tags
- **WHEN** a tela exibe informações complementares (Sugestões, Tempo de Aula)
- **THEN** deve usar o componente de `Tag`, variando de acordo com as propriedades (neutra para IA, azul e larga para tempo).
