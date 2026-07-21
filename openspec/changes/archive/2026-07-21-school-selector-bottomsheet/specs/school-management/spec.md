## ADDED Requirements

### Requirement: Gestão de Escolas no BottomSheet
O sistema SHALL exibir um BottomSheet dedicado para listar, selecionar e cadastrar escolas quando acionado através do seletor da home page.

#### Scenario: Visualização da lista de escolas
- **WHEN** o usuário abre o seletor de escolas
- **THEN** uma lista com as escolas cadastradas é exibida
- **AND** cada item exibe o nome da escola e o resumo de turmas

#### Scenario: Seleção de uma escola diferente
- **WHEN** o usuário clica em uma escola da lista diferente da atual
- **THEN** a escola clicada se torna a escola ativa
- **AND** o BottomSheet é fechado automaticamente

#### Scenario: Indicação da escola atual
- **WHEN** o usuário visualiza a lista de escolas
- **THEN** a escola que está ativa exibe um ícone de "check" e não responde ao clique

### Requirement: Cadastro de Novas Escolas
O sistema SHALL permitir o cadastro de uma nova escola a partir da tela de lista de escolas.

#### Scenario: Navegação para a tela de cadastro
- **WHEN** o usuário clica no botão "Cadastrar escola" na lista de escolas
- **THEN** o conteúdo do BottomSheet transita para um formulário de cadastro
- **AND** o título muda para "Cadastrar escola"

#### Scenario: Criação de uma nova escola
- **WHEN** o usuário preenche o nome, seleciona a categoria e clica em "Salvar"
- **THEN** a nova escola é adicionada na lista de escolas na memória (mock)
- **AND** o BottomSheet pode opcionalmente voltar para a lista de escolas ou fechar

#### Scenario: Reset do fluxo ao fechar
- **WHEN** o usuário fecha o BottomSheet enquanto visualiza a tela de cadastro
- **AND** o usuário reabre o seletor de escolas
- **THEN** o BottomSheet exibe novamente a lista de escolas, e não o formulário
