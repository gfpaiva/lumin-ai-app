## MODIFIED Requirements

### Requirement: Gestão de Escolas no BottomSheet
O sistema MUST apresentar um BottomSheet contendo a lista de escolas disponíveis para seleção e opções de gerenciamento. O BottomSheet MUST aceitar uma prop `initialView` para abertura direta no formulário de cadastro, sem passar pela lista.

#### Scenario: Visualização do BottomSheet de Escolas
- **WHEN** o BottomSheet de gestão de escolas é acionado sem `initialView` definido (ou `initialView="list"`)
- **THEN** uma lista de escolas cadastradas é exibida
- **AND** a escola atualmente selecionada possui um indicador visual (ex: ícone de check)
- **AND** há um botão/opção visível para adicionar uma nova escola

#### Scenario: Abertura direta no formulário via initialView
- **WHEN** o BottomSheet de gestão de escolas é acionado com `initialView="form"`
- **THEN** o formulário de cadastro de escola é exibido diretamente, sem passar pela lista de escolas

#### Scenario: Seleção de Escola Existente
- **WHEN** o usuário toca em uma escola não selecionada da lista
- **THEN** a escola selecionada torna-se a escola atual
- **AND** o BottomSheet é fechado automaticamente
- **AND** o estado da aplicação é atualizado refletindo a nova escola selecionada
