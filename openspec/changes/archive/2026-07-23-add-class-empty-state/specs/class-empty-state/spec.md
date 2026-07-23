## ADDED Requirements

### Requirement: Exibir Estado Vazio
O sistema DEVE exibir um componente visual de estado vazio quando não houver nenhuma turma cadastrada para a escola selecionada na tela inicial. O componente DEVE conter uma instrução clara e um call to action (botão) que incentiva o cadastro de uma nova turma.

#### Scenario: Escola sem turmas
- **WHEN** o usuário acessa a tela inicial (`HomeFeature`) e a lista de turmas da escola atual (`filteredClasses`) está vazia (length igual a 0)
- **THEN** o sistema exibe o componente `ClassEmptyState` em vez da lista vazia
- **THEN** a tela informa visualmente que não há turmas e disponibiliza um botão para adicionar turma

#### Scenario: Escola com turmas
- **WHEN** o usuário acessa a tela inicial e a lista de turmas contém um ou mais itens
- **THEN** o sistema exibe a lista de `ClassCard` normalmente e não exibe o `ClassEmptyState`
