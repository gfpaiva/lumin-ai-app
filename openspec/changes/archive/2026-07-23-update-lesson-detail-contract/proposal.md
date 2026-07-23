## Why

O contrato real retornado pela API do endpoint de planos de aula (`/class-plans`) fornece campos adicionais e atualizados: cada atividade contém o campo `duration` (duração em minutos da atividade) e cada aula contém o campo `aiSuggestions` como texto descritivo com recomendações pedagógicas geradas por IA. A tela de detalhe da aula (`LessonDetailFeature`) precisa ser alinhada a esse contrato para exibir o tempo individual de cada atividade no rodapé do seu card e o texto das sugestões de IA logo abaixo da tag identificadora.

## What Changes

- **Tipagem Domain & DTOs**: Adição do campo `duration` (`number`) em `Activity` e `ActivityDto`, e atualização de `aiSuggestions` para `string` em `Lesson` e `LessonDto`.
- **Mapeamento de Dados**: Atualização do `class-plan.mapper.ts` para mapear `duration` de atividades e `aiSuggestions` como texto de aulas.
- **UI da Aula (`LessonDetailFeature`)**:
  - Exibição do texto descritivo de `aiSuggestions` logo abaixo da tag "Sugestões geradas com IA ✨".
  - Exibição da duração de cada atividade no rodapé do seu respectivo card em `localActivities`, composta por um ícone de relógio Lucide (`Clock`) e a duração (ex: `30 min`).

## Capabilities

### New Capabilities
*(Nenhuma nova capacidade inserida)*

### Modified Capabilities
- `lesson-details`: Atualização da exibição dos detalhes da aula e das atividades de acordo com o contrato da API (`duration` nas atividades e texto de `aiSuggestions` na aula).

## Impact

- `src/features/lesson/types/lesson.types.ts`: Atualização das interfaces de DTO e Domínio.
- `src/features/lesson/mappers/class-plan.mapper.ts`: Atualização das funções de conversão DTO ➔ Domínio.
- `src/features/lesson/components/LessonDetailFeature.tsx`: Atualização de layout e inclusão do ícone `Clock` da biblioteca `lucide-react-native`.
