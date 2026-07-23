## MODIFIED Requirements

### Requirement: Layout Principal da Tela Home
A tela home MUST exibir um layout contendo Header, Mensagem de Boas Vindas com o Bimestre, Seletor de Escola, Lista de Turmas e um Botão Flutuante de Nova Turma. A tela MUST estar envolta em um componente de background. A rota `/` (index) MUST exibir primeiramente a splash screen animada antes de renderizar a home, utilizando `router.replace` ao concluir a inicialização.

Quando não houver escolas cadastradas (`hasSchools === false`), a tela MUST exibir o `SchoolEmptyState` em substituição ao `SchoolSelector`, à lista de turmas e ao `BottomAction`.

#### Scenario: Visualização do Background
- **WHEN** o usuário abre a tela inicial
- **THEN** o background principal (`screen-background`) com o gradiente da aplicação é renderizado atrás de todos os elementos

#### Scenario: Acesso direto após splash
- **WHEN** a splash screen conclui sua animação e o backend mock é resolvido
- **THEN** a home page é exibida automaticamente via `router.replace`
- **AND** o botão de voltar do dispositivo NÃO retorna para a splash screen

#### Scenario: Tela com escolas cadastradas
- **WHEN** o usuário acessa a tela inicial e `schools.length > 0`
- **THEN** o `SchoolSelector`, a lista de turmas e o `BottomAction` são exibidos normalmente

#### Scenario: Tela sem escolas cadastradas
- **WHEN** o usuário acessa a tela inicial e `schools.length === 0`
- **THEN** o `SchoolEmptyState` é exibido
- **AND** o `SchoolSelector`, o `ClassEmptyState` e o `BottomAction` NÃO são exibidos

### Requirement: Seletor de Escola
Um componente de seleção MUST ser exibido permitindo ao professor visualizar a escola atual e abrir a gestão de escolas. O seletor MUST ser ocultado quando não houver escolas cadastradas.

#### Scenario: Botão do Seletor Exibido
- **WHEN** a tela principal é visualizada e há pelo menos uma escola cadastrada
- **THEN** um botão/seletor contendo o nome da escola atual (ex: "EE Mário Covas") e um chevron para baixo é visível
- **AND WHEN** o botão é clicado
- **THEN** um bottomsheet de gestão de escolas é acionado e exibido ao usuário

#### Scenario: Seletor Oculto sem Escolas
- **WHEN** a tela principal é visualizada e não há escolas cadastradas
- **THEN** o `SchoolSelector` NÃO é renderizado

### Requirement: Botão Cadastrar Nova Turma
A tela MUST exibir fixamente no rodapé da página um botão para acionar o fluxo de criação de nova turma quando houver pelo menos uma escola cadastrada. Ao ser tocado, MUST abrir o BottomSheet de cadastro de turma com formulário funcional.

#### Scenario: Visibilidade do Botão de Nova Turma
- **WHEN** o usuário rola a lista de turmas e há pelo menos uma escola cadastrada
- **THEN** o botão "Cadastrar nova turma" com um chevron continua visível e fixo na parte inferior da tela

#### Scenario: Botão Oculto sem Escolas
- **WHEN** a tela principal é visualizada e não há escolas cadastradas
- **THEN** o `BottomAction` NÃO é renderizado

#### Scenario: Acionamento do Cadastro de Turma
- **WHEN** o usuário toca no botão "Cadastrar nova turma"
- **THEN** o BottomSheet com título "Cadastrar turma" é aberto
- **AND** o formulário multi-step de cadastro é exibido no Step 1
