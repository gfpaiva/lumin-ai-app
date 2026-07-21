## MODIFIED Requirements

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
