## Why

Atualmente, ao entrar no modo de edição na tela de detalhes da aula, todas as atividades apresentam os botões "Recalibrar atividade" e "Excluir", independentemente de estarem concluídas ou não. No entanto, atividades que já foram concluídas não devem permitir alteração ou exclusão, pois constituem registro de execução da aula. Para evitar ações acidentais e melhorar a clareza para o professor, atividades concluídas devem ocultar os botões de ação e exibir uma tag estática indicativa de conclusão durante o modo de edição.

## What Changes

- No modo de edição (`isEditing === true`), para atividades que possuem `completed === true`:
  - Ocultar os botões "Recalibrar atividade" e "Excluir".
  - Exibir um badge/tag estático de "Concluído" com ícone de check (não clicável).
- Atividades não concluídas (`completed === false`) mantêm a exibição normal dos botões "Recalibrar atividade ✨" e "Excluir" no modo de edição.

## Capabilities

### New Capabilities

*(Nenhuma nova funcionalidade a nível de especificação global)*

### Modified Capabilities

- `lesson-details`: Atualização dos cenários de exibição de ações de atividades no modo de edição quando a atividade já está concluída.

## Impact

- Modificação exclusiva no componente de UI `LessonDetailFeature.tsx` na renderização das ações por atividade.
- Nenhuma alteração em stores, adapters HTTP ou DTOs de API.
