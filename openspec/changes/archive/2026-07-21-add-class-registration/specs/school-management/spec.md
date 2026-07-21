## MODIFIED Requirements

### Requirement: Cadastro de Novas Escolas
O BottomSheet MUST permitir o acesso a um fluxo ou formulário para o cadastro de novas escolas pelo usuário. O formulário MUST utilizar os componentes compartilhados `FormInput` e `ChipRadioGroup`.

#### Scenario: Acionamento do Cadastro de Escola
- **WHEN** o usuário seleciona a opção de adicionar nova escola no BottomSheet
- **THEN** um formulário para inserção do nome da nova escola é apresentado utilizando o componente `FormInput`
- **AND** a seleção de categoria utiliza o componente `ChipRadioGroup`
- **AND WHEN** o usuário preenche os dados e confirma
- **THEN** a nova escola é salva e adicionada à lista
- **AND** a nova escola recém-criada é automaticamente selecionada
