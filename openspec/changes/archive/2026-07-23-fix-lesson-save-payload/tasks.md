## 1. Tipos de Domínio e Mappers

- [x] 1.1 Atualizar a interface `Activity` em `src/features/lesson/types/lesson.types.ts` adicionando a propriedade opcional `completedAt?: string | null;`
- [x] 1.2 Atualizar `mapActivityDtoToDomain` em `src/features/lesson/mappers/class-plan.mapper.ts` para mapear `completedAt: dto.completedAt ?? null`
- [x] 1.3 Implementar `mapActivityDomainToDto` e `mapLessonDomainToDto` em `src/features/lesson/mappers/class-plan.mapper.ts`

## 2. Integração no ViewModel

- [x] 2.1 Atualizar `saveChanges` em `src/features/lesson/hooks/useLessonDetailViewModel.ts` para utilizar `mapLessonDomainToDto` na montagem do payload da requisição PUT

## 3. Validação e Verificação

- [x] 3.1 Executar validação de código e testes automatizados para verificar ausência de regressões
