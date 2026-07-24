## ADDED Requirements

### Requirement: Formulário de Cadastro de Turma em Duas Etapas
O sistema SHALL apresentar um formulário de cadastro de turma dentro de um BottomSheet genérico com título "Cadastrar turma", dividido em 2 etapas sequenciais.

#### Scenario: Abertura do BottomSheet de Cadastro
- **WHEN** o usuário toca no botão "Cadastrar nova turma" na Home
- **THEN** o `GenericBottomSheet` é aberto com o título "Cadastrar turma"
- **AND** o Step 1 (dados básicos) é exibido por padrão

#### Scenario: Preenchimento do Step 1 — Dados Básicos
- **WHEN** o Step 1 é exibido
- **THEN** dois campos de input são apresentados: "Nome" e "Disciplina"
- **AND** um botão "Continuar" com ícone de chevron é exibido ao final do step
- **AND WHEN** o usuário preenche os campos e toca em "Continuar"
- **THEN** o formulário avança para o Step 2

#### Scenario: Preenchimento do Step 2 — Classificações
- **WHEN** o Step 2 é exibido
- **THEN** três seções de ChipRadioGroup são apresentadas:
  - "Ensino" com opções: "Fundamental", "Médio"
  - "Perfil de engajamento da turma" com opções: "Participativa", "Focada", "Apática"
  - "Formato de aprendizado predominante" com opções: "Visual", "Manual", "Teórico"
- **AND** um botão "Salvar" é exibido ao final do step

### Requirement: Salvamento da Turma
O sistema SHALL persistir a turma criada e atualizar os contadores associados em memória.

#### Scenario: Salvamento da Turma
- **WHEN** o usuário preenche todas as classificações no Step 2 e toca em "Salvar"
- **THEN** a turma é persistida via backend/store com o `schoolId` da escola atualmente selecionada no `SchoolSelector`
- **AND** a contagem de turmas (`classCount`) da escola correspondente é incrementada em memória na `school.store`
- **AND** o BottomSheet é fechado
- **AND** a nova turma aparece na lista de turmas da Home (desde que a escola selecionada seja a mesma em que a turma foi cadastrada)

#### Scenario: Reset do Formulário ao Fechar
- **WHEN** o BottomSheet de cadastro de turma é fechado (por qualquer meio)
- **THEN** o formulário é resetado para o Step 1 com todos os campos limpos

### Requirement: Micro Store de Turmas (class.store)
O sistema SHALL manter uma micro store Zustand dedicada para gerenciar o estado de turmas.

#### Scenario: Carregamento Inicial com Dados Mock
- **WHEN** o app é carregado
- **THEN** a store de turmas contém dados mock pré-populados vinculados a escolas específicas via `schoolId`
- **AND** apenas as turmas da escola selecionada são exibidas na lista da Home

#### Scenario: Adição de Nova Turma
- **WHEN** o ViewModel de cadastro chama `addClass` na store
- **THEN** a turma é adicionada à lista com um ID único gerado automaticamente e o `schoolId` da escola ativa
- **AND** a lista da Home é atualizada reativamente (se a escola ativa for a mesma)

#### Scenario: Filtragem por Escola
- **WHEN** o usuário troca a escola selecionada no `SchoolSelector`
- **THEN** a lista de turmas na Home é atualizada para exibir apenas as turmas com `schoolId` correspondente à nova escola selecionada

### Requirement: Feature Slice de Turma com MVVM
O sistema SHALL organizar o código de turma em um feature slice vertical em `src/features/class/` seguindo o padrão MVVM com hooks.

#### Scenario: Estrutura de Pastas
- **WHEN** a feature de turma é implementada
- **THEN** a estrutura segue:
  - `types/class.types.ts` — interfaces de domínio (Class, enums)
  - `components/ClassBottomSheet.tsx` — composição do BottomSheet
  - `components/ClassFormStepOne.tsx` — view do Step 1
  - `components/ClassFormStepTwo.tsx` — view do Step 2
  - `hooks/useClassFormViewModel.ts` — ViewModel orquestrando estado, steps e submit

#### Scenario: ViewModel como Orquestrador
- **WHEN** o `useClassFormViewModel` é utilizado
- **THEN** ele gerencia o step atual (1 ou 2)
- **AND** gerencia os dados do formulário (nome, disciplina, ensino, engajamento, formato)
- **AND** expõe callbacks `handleContinue` e `handleSave`
- **AND** o ViewModel consome a store para persistir dados (sem acesso direto pela View)
