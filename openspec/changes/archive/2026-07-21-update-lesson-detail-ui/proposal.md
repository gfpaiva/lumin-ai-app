## Why

É necessário permitir que os professores interajam com as atividades sugeridas na aula, possibilitando a conclusão, edição (recalibragem) ou exclusão de exercícios. Isso aumenta o valor do conteúdo gerado por IA, permitindo que o professor faça a curadoria e personalize o plano de aula de acordo com a realidade da sua turma.

## What Changes

- Adição de um botão "Concluir" (estilo vazado com ícone de check) em cada atividade para marcar sua conclusão. Inicialmente o estado será mockado, com preparo para integração via API.
- Criação de um "Modo Edição" na visualização de detalhes da aula.
- Ao clicar no botão "Customizar ✨", o modo de edição é ativado e a tag superior "Sugestões geradas com IA ✨" muda para "Modo edição 👀".
- No modo de edição, o botão "Concluir" de cada atividade é substituído por dois botões: "Recalibrar exercício ✨" (que abre um bottom sheet genérico) e "Excluir" (com ícone de X, que remove a atividade da lista).
- O botão "Customizar ✨" muda para "Salvar alterações" (estilo preenchido, conforme imagem de referência) durante o modo de edição.
- Ao salvar as alterações, simula-se uma recomputação da IA via API e o usuário retorna ao modo de visualização padrão.

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. Replace <name> with kebab-case identifier (e.g., user-auth, data-export, api-rate-limiting). Each creates specs/<name>/spec.md -->

### Modified Capabilities
<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->
- `lesson-details`: Adição do fluxo de edição, ações de atividades (concluir, recalibrar, excluir) e simulação de estados.
- `generic-bottom-sheet`: Integração com a ação de recalibrar exercício para exibir conteúdo (inicialmente placeholder).

## Impact

- `LessonDetailFeature`: Passará a gerenciar estado de modo de edição (isEditing) e ações de manipular a lista de atividades.
- `useLessonDetailViewModel`: Implementará a lógica de conclusão (toggle), remoção de atividade e simulação de salvamento.
- UI: Introdução de novos botões de ação e integração com Bottom Sheet.
