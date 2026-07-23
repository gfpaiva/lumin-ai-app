## Why

Integrar a busca de planos de aula (`class-plans`) e aulas (`lessons`) com o backend real (`GET /class-plans`), substituindo os dados estáticos mockados por dados persistidos em uma micro store Zustand (`lessonStore`). Isso garante consistência de dados entre turmas/escolas/bimestres e evita requisições redundantes à API quando o usuário navega entre as telas.

## What Changes

- Criar a **Port** `LessonStorePort` (`src/common/ports/lesson.store.port.ts`) e a **Micro Store** `useLessonStore` (`src/infra/store/lesson.store.ts`), indexando os planos de aula pela chave `${classId}_${bimesterId}`.
- Criar a camada de **DTO** e **Mapper** (`class-plan.mapper.ts`) no módulo de lessons para transformar as respostas de API do backend (`GET /class-plans?classId=...&bimesterId=...`) em entidades de domínio (`ClassPlan`, `Lesson`, `Activity`).
- Modificar `useClassDetailViewModel`: realizar o fetch via `HttpPort` caso o plano de aula da turma e bimestre selecionado ainda não esteja armazenado na store, concatenando os dados de disciplina, turma (de `classStore`), escola (de `schoolStore`) e tema/resumo do bimestre.
- Modificar a navegação de `ClassDetailFeature` para passar a `classId` e `lessonNumber` ao direcionar para a rota `/lesson/[id]`.
- Modificar `useLessonDetailViewModel`: ler os dados dinâmicos da aula diretamente da `lessonStore` a partir do parâmetro da rota.

## Capabilities

### Modified Capabilities
- `class-detail-view`: Integração dinâmica do detalhamento da turma e lista de aulas com a API `/class-plans` e stores globais.
- `lesson-details`: Exibição dos dados reais da aula (título, número, duração, sugestões de IA e exercícios) buscados do backend através da store.

## Impact

- **Código afetado**: `src/features/class/`, `src/features/lesson/`, `src/common/ports/`, `src/infra/store/`.
- **APIs**: Consumo da rota backend `GET /class-plans?classId={classId}&bimesterId={bimesterId}`.
- **Roteamento**: Atualização da navegação `/lesson/[id]?classId=...` no Expo Router.
