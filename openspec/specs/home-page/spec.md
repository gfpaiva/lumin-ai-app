# home-page Specification

## Purpose
TBD - created by archiving change implement-home-page. Update Purpose after archive.
## Requirements
### Requirement: Layout Principal da Tela Home
A tela home MUST exibir um layout contendo Header, Mensagem de Boas Vindas com o Bimestre, Seletor de Escola, Lista de Turmas e um Botão Flutuante de Nova Turma. A tela MUST estar envolta em um componente de background. A rota `/` (index) MUST exibir primeiramente a splash screen animada antes de renderizar a home, utilizando `router.replace` ao concluir a inicialização.

#### Scenario: Visualização do Background
- **WHEN** o usuário abre a tela inicial
- **THEN** o background principal (`screen-background`) com o gradiente da aplicação é renderizado atrás de todos os elementos

#### Scenario: Acesso direto após splash
- **WHEN** a splash screen conclui sua animação e o backend mock é resolvido
- **THEN** a home page é exibida automaticamente via `router.replace`
- **AND** o botão de voltar do dispositivo NÃO retorna para a splash screen

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
A tela MUST listar as turmas do professor filtradas pela escola atualmente selecionada no `SchoolSelector`, consumindo dados da micro store de turmas. Os cards MUST ser passíveis de rolagem caso existam muitas turmas.

#### Scenario: Renderização dos Cards de Turma Filtrados por Escola
- **WHEN** a store de turmas possui itens com `schoolId` correspondente à escola selecionada
- **THEN** apenas os cards dessas turmas são renderizados, mostrando o nome da turma com o nível de ensino (ex: "2º Ano Ensino Médio") e a disciplina ministrada (ex: "História")
- **AND** cada card possui um ícone de chevron para a direita indicando navegação
- **AND** a lista é reativa — ao adicionar uma turma à escola selecionada, o card aparece imediatamente

#### Scenario: Troca de Escola Atualiza a Lista
- **WHEN** o usuário seleciona uma escola diferente no `SchoolSelector`
- **THEN** a lista de turmas é atualizada imediatamente para exibir apenas turmas com `schoolId` da nova escola selecionada

#### Scenario: Escola Sem Turmas
- **WHEN** a escola selecionada não possui turmas cadastradas
- **THEN** a lista de turmas é exibida vazia (sem cards)

### Requirement: Botão Cadastrar Nova Turma
A tela MUST exibir fixamente no rodapé da página um botão para acionar o fluxo de criação de nova turma. Ao ser tocado, MUST abrir o BottomSheet de cadastro de turma com formulário funcional.

#### Scenario: Visibilidade do Botão de Nova Turma
- **WHEN** o usuário rola a lista de turmas
- **THEN** o botão "Cadastrar nova turma" com um chevron continua visível e fixo na parte inferior da tela

#### Scenario: Acionamento do Cadastro de Turma
- **WHEN** o usuário toca no botão "Cadastrar nova turma"
- **THEN** o BottomSheet com título "Cadastrar turma" é aberto
- **AND** o formulário multi-step de cadastro é exibido no Step 1

