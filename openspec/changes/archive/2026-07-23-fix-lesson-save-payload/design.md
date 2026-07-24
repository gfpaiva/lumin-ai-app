## Context

A funcionalidade de salvar edições de uma aula (`saveChanges`) em `useLessonDetailViewModel.ts` envia os dados diretamente da entidade de domínio `Lesson` para a rota HTTP `PUT /class-plans/:planId/lessons/:lessonNumber`.

O backend NestJS exige um payload formatado como DTO:
- `lessonNumber`: número da aula (`number`)
- `title`: título da aula (`string`)
- `aiSuggestions`: sugestões de IA (`string`)
- `duration`: duração total em minutos (`number`)
- `activities`: array de `ActivityDto`, contendo `id`, `title`, `description`, `duration` (`number`) e `completedAt` (`string | null` em formato ISO Date).

Como o front-end utiliza no domínio a propriedade booleana `completed` e duração formatada, o envio direto sem mapeamento para DTO resulta em falha de validação (HTTP 400 Bad Request) no NestJS.

## Goals / Non-Goals

**Goals:**
- Manter o modelo de domínio do front-end com `completed: boolean` para facilidade de manipulação em UI e otimização de estado.
- Criar a camada de mapeamento Domínio ➔ DTO em `class-plan.mapper.ts` (`mapActivityDomainToDto` e `mapLessonDomainToDto`).
- Garantir a conversão correta dos campos `completedAt` (ISO Date string ou `null`), `lessonNumber` e `duration` (`number`).
- Atualizar a chamada `saveChanges` em `useLessonDetailViewModel` para enviar o DTO mapeado.

**Non-Goals:**
- Alterar o estado global ou o comportamento da `useLessonStore`.
- Modificar o contrato do backend NestJS.

## Decisions

### 1. Extensão do Tipo de Domínio `Activity`
- **Decisão**: Adicionar `completedAt?: string | null;` na interface `Activity` no domínio (`src/features/lesson/types/lesson.types.ts`).
- **Motivação**: Preservar a data/hora original da conclusão quando a atividade já vier concluída do backend, garantindo idempotência ao salvar sem alterar a conclusão.

### 2. Mapeamento de Domínio para DTO (`mapActivityDomainToDto` e `mapLessonDomainToDto`)
- **Decisão**: Em `class-plan.mapper.ts`, adicionar os mappers:
  ```ts
  export function mapActivityDomainToDto(activity: Activity): ActivityDto {
    const completedAt = activity.completed
      ? (activity.completedAt || new Date().toISOString())
      : null;

    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      duration: activity.duration,
      completedAt,
    };
  }

  export function mapLessonDomainToDto(lesson: Lesson): LessonDto {
    return {
      id: lesson.id,
      lessonNumber: lesson.lessonNumber,
      title: lesson.title,
      aiSuggestions: lesson.aiSuggestions,
      duration: typeof lesson.duration === "number" ? lesson.duration : Number(lesson.duration) || 0,
      activities: (lesson.activities || []).map(mapActivityDomainToDto),
    };
  }
  ```
- **Alternativas Consideradas**: Montar o payload dinamicamente inline no ViewModel. Descartado por violar o princípio de separação de responsabilidades (Mappers/DDD).

### 3. Integração em `useLessonDetailViewModel.ts`
- **Decisão**: Atualizar a construção do payload em `saveChanges()`:
  ```ts
  const payload = mapLessonDomainToDto(lesson);
  ```

## Risks / Trade-offs

- **[Risco] Formato de data inconsistente ao marcar/desmarcar conclusão** → **Mitigação**: Se `completed` for `true` e a atividade não tiver um `completedAt` prévio, utilizar a data atual em ISO String (`new Date().toISOString()`). Se `completed` for `false`, passar `null`.
