## 1. Domain & Data Mapper

- [x] 1.1 Atualizar interfaces `Activity`, `ActivityDto`, `Lesson` e `LessonDto` em `src/features/lesson/types/lesson.types.ts` para incluir `duration?: number` e tipar `aiSuggestions` como `string`.
- [x] 1.2 Atualizar mapeamento em `src/features/lesson/mappers/class-plan.mapper.ts` (`mapActivityDtoToDomain` e `mapLessonDtoToDomain`) para repassar `duration` e `aiSuggestions`.

## 2. Componente Visual (`LessonDetailFeature`)

- [x] 2.1 Renderizar o texto de `aiSuggestions` em `src/features/lesson/components/LessonDetailFeature.tsx` logo abaixo do elemento de Tag "Sugestões geradas com IA ✨".
- [x] 2.2 Importar o ícone `Clock` de `lucide-react-native` e renderizar no rodapé de cada card de atividade em `localActivities` a duração estimada (`duration`) formatada em minutos.

## 3. Testes e Validação

- [x] 3.1 Executar testes unitários e de integração existentes com `rtk npm test` (ou Jest) para garantir regressão zero.
- [x] 3.2 Verificar o comportamento visual da renderização com `duration` e `aiSuggestions` preenchidos e ausentes.
