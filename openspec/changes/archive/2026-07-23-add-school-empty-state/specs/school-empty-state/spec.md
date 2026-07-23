## ADDED Requirements

### Requirement: Exibir Estado Vazio de Escola
O sistema MUST exibir um estado vazio dedicado quando não houver nenhuma escola cadastrada, com instrução clara e CTA que abre o formulário de cadastro diretamente.

#### Scenario: Sem escolas cadastradas
- **WHEN** o usuário acessa a tela inicial e `schools.length === 0`
- **THEN** o componente `SchoolEmptyState` é exibido no lugar do conteúdo principal
- **AND** o `SchoolSelector` NÃO é exibido
- **AND** o `BottomAction` (botão flutuante de nova turma) NÃO é exibido
- **AND** o `ClassEmptyState` NÃO é exibido

#### Scenario: CTA do SchoolEmptyState abre formulário de cadastro
- **WHEN** o usuário toca no botão "Cadastrar escola" dentro do `SchoolEmptyState`
- **THEN** o `SchoolBottomSheet` é aberto diretamente na visão de formulário (`activeView = "form"`)
- **AND** a lista de escolas NÃO é exibida antes do formulário

#### Scenario: Retorno ao estado normal após cadastro de escola
- **WHEN** o usuário cadastra a primeira escola através do `SchoolEmptyState`
- **THEN** o `SchoolEmptyState` deixa de ser exibido
- **AND** o `SchoolSelector`, o `ClassEmptyState` e o `BottomAction` voltam a ser exibidos normalmente
