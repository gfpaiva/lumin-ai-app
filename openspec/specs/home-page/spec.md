# home-page Specification

## Purpose
TBD - created by archiving change implement-home-page. Update Purpose after archive.
## Requirements
### Requirement: Layout Principal da Tela Home
A tela home MUST exibir um layout contendo Header, Mensagem de Boas Vindas com o Bimestre, Seletor de Escola, Lista de Turmas e um Botão Flutuante de Nova Turma. A tela MUST estar envolta em um componente de background.

#### Scenario: Visualização do Background
- **WHEN** o usuário abre a tela inicial
- **THEN** o background principal (`screen-background`) com o gradiente da aplicação é renderizado atrás de todos os elementos

### Requirement: Header da Aplicação
O Header MUST conter a logo do Lumin.AI alinhada à esquerda e um componente de Avatar alinhado à direita. O Avatar MUST possuir um menu dropdown acoplado para opções do usuário.

#### Scenario: Visualização da Logo
- **WHEN** a tela é carregada
- **THEN** a logo da marca é exibida no canto superior esquerdo

#### Scenario: Dropdown do Avatar
- **WHEN** o usuário clica no Avatar do canto superior direito
- **THEN** um menu suspenso é aberto exibindo opções como "Logout"

### Requirement: Saudação e Bimestre
A tela MUST exibir uma saudação dinâmica com o nome do usuário ("Olá, {username}!") e o bimestre atual em andamento. O componente do bimestre atual MUST ser clicável para abrir o BottomSheet de gestão e seleção de bimestres.

#### Scenario: Apresentação da Saudação
- **WHEN** a tela principal é visualizada
- **THEN** o texto "Olá, {username}!" (onde {username} é o nome do professor) deve ser exibido na tela

#### Scenario: Interação com o Bimestre
- **WHEN** o usuário clica no componente do bimestre atual (ex: "3º Bimestre 2026")
- **THEN** o bottomsheet de gestão de bimestres MUST ser acionado e exibido ao usuário

### Requirement: Seletor de Escola
Um componente de seleção MUST ser exibido permitindo ao professor visualizar a escola atual e abrir a gestão de escolas.

#### Scenario: Botão do Seletor Exibido
- **WHEN** a tela principal é visualizada
- **THEN** um botão/seletor contendo o nome da escola atual (ex: "EE Mário Covas") e um chevron para baixo é visível
- **AND WHEN** o botão é clicado
- **THEN** um bottomsheet de gestão de escolas é acionado e exibido ao usuário

### Requirement: Lista de Turmas
A tela MUST listar as turmas do professor naquela escola em formato de cards. Os cards MUST ser passíveis de rolagem caso existam muitas turmas.

#### Scenario: Renderização dos Cards de Turma
- **WHEN** a lista de turmas da escola atual possui itens
- **THEN** os cards são renderizados mostrando a Série/Ano (ex: "2º Ano Ensino Médio") e a disciplina ministrada (ex: "História") em cada card
- **AND** cada card possui um ícone de chevron para a direita indicando navegação

### Requirement: Botão Cadastrar Nova Turma
A tela MUST exibir fixamente no rodapé da página um botão para acionar o fluxo de criação de nova turma.

#### Scenario: Visibilidade do Botão de Nova Turma
- **WHEN** o usuário rola a lista de turmas
- **THEN** o botão "Cadastrar nova turma" com um chevron continua visível e fixo na parte inferior da tela

