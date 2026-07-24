## Context

Atualmente, as ações na tela de detalhe da aula (`LessonDetailFeature`) são mockadas ou atuam apenas em estado local temporário no hook `useLessonDetailViewModel`.
O backend NestJS em `lumin-ai-backend` fornece as seguintes rotas na API de planos de aula:
- `PATCH /class-plans/:planId/lessons/:lessonNumber/activities/:activityId` (`ToggleActivityService`)
- `POST /class-plans/:planId/lessons/:lessonNumber/activities/:activityId/recalibrate` (`RecalibrateActivityService`)
- `PUT /class-plans/:planId/lessons/:lessonNumber` (`UpdateLessonService`)

A arquitetura do app segue Domain-Driven Design, Hexagonal/Ports e MVVM com injeção de dependência.

## Goals / Non-Goals

**Goals:**
- Integrar `toggleActivityCompletion` com a rota PATCH via Optimistic UI + SWR nativo.
- Atualizar a UI para exibir "Concluído" (ao invés de "Concluir") no botão da atividade concluída.
- Integrar `recalibrateActivity` com a rota POST mantendo estado de carregamento de fundo (`isRecalibrating`), sobrescrevendo a atividade recalibrada na store e recalculando a duração total da aula.
- Atualizar a ação de exclusão em memória para recalcular a duração total da aula.
- Integrar `saveChanges` com a rota PUT para enviar as alterações da aula via Optimistic UI + SWR.
- Implementar rollback e snapshot de estado em caso de falha de rede.

**Non-Goals:**
- Alterar o layout base ou styling do BottomSheet de recalibração (`RecalibrateBottomSheet`).
- Utilizar bibliotecas externas de cache/fetch como React Query ou SWR lib (deve ser feito manualmente via Zustand e MVVM).

## Decisions

### 1. Extensão das Ports e Métodos Auxiliares na `useLessonStore`
- **Decisão**: Adicionar métodos explícitos em `LessonStorePort` e `useLessonStore` (`updateActivityCompletionOptimistic`, `updateActivityInLesson`, `updateLessonOptimistic`, `rollbackPlan`) para manipulação limpa do estado sem expor os detalhes do Zustand ao ViewModel.
- **Alternativa Considerada**: Fazer mutação manual do estado retornado do `getPlan` e chamar `setPlan` no ViewModel. Descartado por violar o desacoplamento e a regra de mutations otimistas limpas na store.

### 2. Recálculo da Duração da Aula (`calculateTotalLessonDuration`)
- **Decisão**: A duração da aula é derivada da soma das durações das suas atividades (`activities.reduce((sum, act) => sum + (act.duration || 0), 0)`). Sempre que uma atividade for recalibrada, excluída ou editada no `saveChanges`, a propriedade `duration` da aula é atualizada na store e repassada no payload para o backend.
- **Alternativa Considerada**: Manter a duração da aula estática ou string fixa. Descartado pois o contrato da entidade backend (`LessonObject.duration`) recalcula e exige coerência entre os tempos das atividades e o tempo total da aula.

### 3. Alternância de Texto do Botão no Componente Visual
- **Decisão**: Em `LessonDetailFeature.tsx`, renderizar o texto do botão de conclusão condicionalmente baseado em `activity.completed`:
  ```tsx
  {activity.completed ? "Concluído" : "Concluir"}
  ```
  mantendo as variantes visuais de borda e texto azul quando concluído.

### 4. Fluxo de Retorno e Mapeamento de DTOs
- **Decisão**: Reutilizar `mapClassPlanDtoToDomain` para mapear as respostas das chamadas PATCH e PUT para o modelo de domínio do app antes de atualizar a store. Para a resposta do `POST recalibrate` (que retorna um `ActivitySubdoc`), criar um helper `mapActivityDtoToDomain` para atualizar pontualmente a atividade e recomputar a aula.

## Risks / Trade-offs

- **[Risco] Falha de conexão na mutation otimista** → **Mitigação**: Guardar snapshot do plano anterior na memória do ViewModel/Store antes de alterar o estado local, e chamar `rollbackPlan(snapshot)` no bloco `catch`.
- **[Risco] Divergência de formato entre `duration` da aula (string vs number)** → **Mitigação**: Garantir que o recálculo converta valores numéricos e retorne a string/número no formato esperado pelo DTO (`number | null` para backend, exibido como número ou string no front).

## Migration Plan

1. Atualizar interfaces em `src/common/ports/lesson.store.port.ts` e métodos em `src/infra/store/lesson.store.ts`.
2. Atualizar o componente visual `LessonDetailFeature.tsx` para o label "Concluído".
3. Atualizar o ViewModel `useLessonDetailViewModel.ts` para integrar com o `HttpPort`, adicionar snapshot/rollback e lógica das 4 ações.
4. Testar manualmente os fluxos com a API backend ativa ou simulada.
