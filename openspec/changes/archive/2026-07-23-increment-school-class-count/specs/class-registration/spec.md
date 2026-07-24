## MODIFIED Requirements

### Requirement: Salvamento da Turma
O sistema SHALL persistir a turma criada e atualizar os contadores associados em memória.

#### Scenario: Salvamento da Turma
- **WHEN** o usuário preenche todas as classificações no Step 2 e toca em "Salvar"
- **THEN** a turma é persistida via backend/store com o `schoolId` da escola atualmente selecionada no `SchoolSelector`
- **AND** a contagem de turmas (`classCount`) da escola correspondente é incrementada em memória na `school.store`
- **AND** o BottomSheet é fechado
- **AND** a nova turma aparece na lista de turmas da Home (desde que a escola selecionada seja a mesma em que a turma foi cadastrada)
