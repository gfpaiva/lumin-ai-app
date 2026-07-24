## Why

Ao cadastrar uma nova turma (class) com sucesso na aplicação, a contagem de turmas da escola selecionada (`classCount` na `school.store`) não é atualizada em memória. Isso faz com que a interface exiba a contagem de turmas desatualizada até que ocorra uma nova busca completa dos dados no backend.

## What Changes

- Adição da ação `incrementClassCount(schoolId: string)` na porta `SchoolStoreState` (`src/common/ports/school.store.port.ts`) e sua implementação no `useSchoolStore` (`src/infra/store/school.store.ts`).
- Invocação do `incrementClassCount` dentro do hook `useClassFormViewModel` (`src/features/class/hooks/useClassFormViewModel.ts`) imediatamente após o cadastro bem-sucedido de uma turma.

## Capabilities

### New Capabilities

- N/A

### Modified Capabilities

- `class-registration`: Ao criar uma nova turma com sucesso, a contagem de turmas (`classCount`) da escola à qual a turma pertence deve ser incrementada em memória na `school.store`.

## Impact

- `src/common/ports/school.store.port.ts`: Extensão da interface `SchoolStoreState`.
- `src/infra/store/school.store.ts`: Atualização do estado imutável de `schools` incrementando `classCount`.
- `src/features/class/hooks/useClassFormViewModel.ts`: Integração com `incrementClassCount` da `school.store`.
