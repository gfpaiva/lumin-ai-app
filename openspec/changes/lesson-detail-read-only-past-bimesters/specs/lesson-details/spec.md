## ADDED Requirements

### Requirement: Modo Apenas Leitura para Bimestres Concluídos
O sistema SHALL restringir ações de edição e alternâncias de conclusão de atividades quando a aula pertencer a um bimestre cujo status seja diferente de `in_progress` (por exemplo, bimestres `done` ou `locked`).

#### Scenario: Visualização do detalhe da aula em bimestre concluído (Modo Read-Only)
- **WHEN** o usuário visualiza uma aula pertencente a um bimestre com status `done` ou `locked` (`status !== "in_progress"`)
- **THEN** o sistema deve definir `isReadOnly` como `true` no ViewModel
- **THEN** o botão inferior "Customizar ✨" / "Salvar alterações" não deve ser renderizado
- **THEN** a alternância para o modo de edição deve ser desabilitada
- **THEN** o status de conclusão das atividades ("Concluir" / "Concluído") deve ser exibido como um elemento estático e não clicável (sem ação `onPress`)

#### Scenario: Visualização do detalhe da aula em bimestre em andamento (Modo Editável)
- **WHEN** o usuário visualiza uma aula pertencente a um bimestre com status `in_progress`
- **THEN** o sistema deve definir `isReadOnly` como `false` no ViewModel
- **THEN** o botão inferior "Customizar ✨" deve permanecer visível e funcional
- **THEN** as atividades devem responder ao clique no botão "Concluir" para marcar ou desmarcar a tarefa
