# school-management Specification

## Purpose
Gerenciamento de escolas (seleção e cadastro) integrado através de um BottomSheet global.

## Requirements
### Requirement: Gestão de Escolas no BottomSheet
O sistema MUST apresentar um BottomSheet contendo a lista de escolas disponíveis para seleção e opções de gerenciamento.

#### Scenario: Visualização do BottomSheet de Escolas
- **WHEN** o BottomSheet de gestão de escolas é acionado
- **THEN** uma lista de escolas cadastradas é exibida
- **AND** a escola atualmente selecionada possui um indicador visual (ex: ícone de check)
- **AND** há um botão/opção visível para adicionar uma nova escola

#### Scenario: Seleção de Escola Existente
- **WHEN** o usuário toca em uma escola não selecionada da lista
- **THEN** a escola selecionada torna-se a escola atual
- **AND** o BottomSheet é fechado automaticamente
- **AND** o estado da aplicação é atualizado refletindo a nova escola selecionada

### Requirement: Cadastro de Novas Escolas
O BottomSheet MUST permitir o acesso a um fluxo ou formulário para o cadastro de novas escolas pelo usuário.

#### Scenario: Acionamento do Cadastro de Escola
- **WHEN** o usuário seleciona a opção de adicionar nova escola no BottomSheet
- **THEN** um formulário para inserção do nome da nova escola (e outros dados necessários) é apresentado
- **AND WHEN** o usuário preenche os dados e confirma
- **THEN** a nova escola é salva e adicionada à lista
- **AND** a nova escola recém-criada é automaticamente selecionada
