## Why

Atualmente, as ações na tela de detalhe da aula (`LessonDetailFeature`) operam com mocks ou apenas em memória local, sem persistência nem integração completa com os contratos do backend de planos de aula. Além disso, o botão de alternância de conclusão da atividade não reflete o estado "Concluído" quando a atividade está finalizada. É necessário integrar as ações com as APIs REST do backend (`PATCH` para alternar conclusão, `POST` para recalibrar atividade, `PUT` para salvar alterações da aula) com suporte a Optimistic UI e SWR, além de manter os recálculos automáticos da duração total da aula.

## What Changes

- **Conclusão de Atividade (`toggleActivityCompletion`)**:
  - Integração com `PATCH /class-plans/:planId/lessons/:lessonNumber/activities/:activityId` enviando `{ "completed": boolean }`.
  - Suporte a Optimistic UI e SWR (atualização instantânea e revalidação com o backend).
  - Alteração na UI: quando a atividade estiver concluída, o texto do botão muda de "Concluir" para "Concluído".
- **Recalibração de Atividade (`recalibrateActivity`)**:
  - Integração com `POST /class-plans/:planId/lessons/:lessonNumber/activities/:activityId/recalibrate`.
  - Envio de payload `{ emphasis, complexity, observations }`.
  - Mantém o estado de carregamento em tela (`ScreenBackground isLoading={isRecalibrating}`).
  - Sobrescreve o nó da atividade atual na store com o retorno do backend e recalculando a duração total da aula.
- **Exclusão de Atividade (`removeActivity`)**:
  - Remoção em memória da atividade no estado local/store.
  - Recálculo da duração total da aula baseado nas atividades restantes.
- **Persistência de Alterações (`saveChanges`)**:
  - Integração com `PUT /class-plans/:planId/lessons/:lessonNumber` enviando o payload completo da aula e atividades.
  - Suporte a Optimistic UI e SWR (salvamento otimista, saída imediata do modo de edição e revalidação do estado).

## Capabilities

### New Capabilities
- Nenhuma nova funcionalidade raiz de alto nível.

### Modified Capabilities
- `lesson-details`: Atualização dos requisitos de ações da atividade para incluir contrato REST de PATCH, POST (recalibrate), PUT (saveChanges), alteração textual do botão "Concluído" e recálculo da duração da aula.

## Impact

- **Componentes Visuais**: `LessonDetailFeature.tsx` (alteração no texto do botão de conclusão para "Concluído").
- **ViewModels**: `useLessonDetailViewModel.ts` (integração das rotas PATCH, POST recalibrate e PUT saveChanges com tratamento de Optimistic/SWR e loading).
- **Gerenciamento de Estado**: `useLessonStore.ts` e `lesson.store.port.ts` (métodos auxiliares para atualizações otimistas, recalibração, salvamento e rollback).
- **Mappers & Types**: `class-plan.mapper.ts` e `lesson.types.ts` (garantia de compatibilidade de DTOs e entidades de domínio).
