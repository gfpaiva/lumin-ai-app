## Why

A função `saveChanges` no hook `useLessonDetailViewModel` está falhando ao sincronizar as edições da aula com a API backend NestJS (`PUT /class-plans/:planId/lessons/:lessonNumber`), retornando erro HTTP 400 Bad Request. Isso ocorre porque o payload é montado diretamente com os objetos do domínio da aplicação sem conversão para DTO, resultando no envio de campos no formato incorreto (como a propriedade booleana `completed` em vez do campo `completedAt: string | null` esperado pelo backend, a ausência da propriedade `lessonNumber` no payload e a `duration` em formato string em vez de number).

## What Changes

- **Preservação do campo `completedAt` no domínio**: Atualizar a interface `Activity` no domínio para suportar opcionalmente o atributo `completedAt?: string | null`.
- **Mappers Domínio ➔ DTO**: Implementar as funções de mapeamento `mapActivityDomainToDto` e `mapLessonDomainToDto` em `class-plan.mapper.ts`.
- **Formatação de payload em `saveChanges`**: Ajustar `useLessonDetailViewModel` para processar a aula através do mapper `mapLessonDomainToDto` antes de realizar a chamada HTTP `PUT`.

## Capabilities

### New Capabilities

*(Nenhuma nova capability introduzida)*

### Modified Capabilities

- `lesson-details`: Atualização dos requisitos de sincronização de alteração da aula via API para garantir a conversão correta do contrato de domínio para DTO (`completedAt`, `lessonNumber`, `duration`).

## Impact

- **Código afetado**: 
  - `src/features/lesson/types/lesson.types.ts`
  - `src/features/lesson/mappers/class-plan.mapper.ts`
  - `src/features/lesson/hooks/useLessonDetailViewModel.ts`
- **APIs**: Ajuste no payload enviado na rota `PUT /class-plans/:planId/lessons/:lessonNumber`.
