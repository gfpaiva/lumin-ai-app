## 1. Domain Types, Store Port & Micro Store

- [x] 1.1 Criar a definição dos tipos e modelos de domínio em `src/features/lesson/types/lesson.types.ts` (`ClassPlan`, `Lesson`, `Activity`) e DTOs de resposta da API
- [x] 1.2 Criar o mapper `src/features/lesson/mappers/class-plan.mapper.ts` para converter respostas de API (`ClassPlanDto`) em entidades de domínio
- [x] 1.3 Criar a interface de contrato da store `src/common/ports/lesson.store.port.ts` (`LessonStoreState` e `LessonStorePort`)
- [x] 1.4 Criar a micro store Zustand `src/infra/store/lesson.store.ts` indexando planos por `${classId}_${bimesterId}`

## 2. ViewModel & Fetch Integration

- [x] 2.1 Refatorar `useClassDetailViewModel` em `src/features/class/hooks/useClassDetailViewModel.ts` para integrar com `httpAdapter`, `lessonStore`, `classStore`, `schoolStore` e `bimesterStore`
- [x] 2.2 Refatorar `useLessonDetailViewModel` em `src/features/lesson/hooks/useLessonDetailViewModel.ts` para obter os dados da aula da `lessonStore` com base em `classId` e `lessonNumber`
- [x] 2.3 Atualizar ou aposentar a lógica legada/mockada em `useLessonViewModel.ts`

## 3. UI Component Integration & Routing

- [x] 3.1 Atualizar `ClassDetailFeature` (`src/features/class/components/ClassDetailFeature.tsx`) para renderizar informações reais da turma, escola, resumo do bimestre e grade de aulas trazidos do ViewModel
- [x] 3.2 Atualizar o handler de clique em `LessonCard` no `ClassDetailFeature` para passar a `classId` e `lessonNumber` na navegação do Expo Router
- [x] 3.3 Atualizar `LessonDetailFeature` (`src/features/lesson/components/LessonDetailFeature.tsx`) e `src/app/lesson/[id].tsx` para consumir os parâmetros da rota e exibir as informações reais da aula e dos exercícios

## 4. Verification

- [x] 4.1 Testar navegação Home -> Class Details -> Lesson Details e validar chamadas HTTP e cache da store
- [x] 4.2 Executar suíte de testes unitários Jest/pnpm para garantir integridade do sistema
