## 1. Store & Ports (Gerenciamento de Estado)

- [x] 1.1 Atualizar `LessonStorePort` em `src/common/ports/lesson.store.port.ts` adicionando tipos e assinaturas para mutação otimista de conclusão, substituição de nó de atividade recalibrada, atualização de aula e rollback.
- [x] 1.2 Implementar as funções auxiliares em `src/infra/store/lesson.store.ts` para aplicar atualizações otimistas, recálculo de duração total da aula e reversão de snapshot.

## 2. Componentes Visuais (UI Updates)

- [x] 2.1 Atualizar `LessonDetailFeature.tsx` para exibir dinamicamente o texto "Concluído" (quando `activity.completed === true`) ou "Concluir" (quando `false`).

## 3. ViewModel & Integração com Backend API

- [x] 3.1 Implementar a ação `toggleActivityCompletion` em `useLessonDetailViewModel.ts` utilizando Optimistic UI + SWR com a rota `PATCH /class-plans/:planId/lessons/:lessonNumber/activities/:activityId`.
- [x] 3.2 Implementar a ação `recalibrateActivity` em `useLessonDetailViewModel.ts` utilizando estado de carregamento de tela (`isRecalibrating`), requisição `POST /class-plans/:planId/lessons/:lessonNumber/activities/:activityId/recalibrate`, substituição da atividade na store e recálculo da duração da aula.
- [x] 3.3 Atualizar a ação `removeActivity` em `useLessonDetailViewModel.ts` para recalcular a duração total da aula em memória após a exclusão de uma atividade.
- [x] 3.4 Implementar a ação `saveChanges` em `useLessonDetailViewModel.ts` utilizando Optimistic UI + SWR com a rota `PUT /class-plans/:planId/lessons/:lessonNumber` e envio do payload da aula atualizada.

## 4. Validação & Testes

- [x] 4.1 Validar a compilação TypeScript, linting do projeto e execução dos testes unitários referentes à tela de detalhe da aula.
