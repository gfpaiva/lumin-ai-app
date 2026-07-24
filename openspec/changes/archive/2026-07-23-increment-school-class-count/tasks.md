## 1. Contratos e Porta de Estado (School Store Port)

- [x] 1.1 Adicionar a assinatura `incrementClassCount(schoolId: string): void` na interface `SchoolStoreState` em `src/common/ports/school.store.port.ts`

## 2. Implementação da Store (School Store)

- [x] 2.1 Implementar a ação `incrementClassCount` em `src/infra/store/school.store.ts` atualizando imutavelmente a contagem da escola pelo `schoolId`

## 3. ViewModel e Orquestração (Class Form ViewModel)

- [x] 3.1 Consumir `incrementClassCount` da `schoolStore` em `src/features/class/hooks/useClassFormViewModel.ts`
- [x] 3.2 Executar `incrementClassCount(selectedSchoolId)` no método `handleSave` após o sucesso do `httpAdapter.post`

## 4. Validação

- [x] 4.1 Verificar se o projeto compila sem erros TypeScript (`rtk npx tsc --noEmit`)
