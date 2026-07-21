## 1. Tipos de Domínio e Store

- [x] 1.1 Criar `src/features/class/types/class.types.ts` com interface `Class` (incluindo campo `schoolId`) e union types `EducationLevel`, `EngagementProfile`, `LearningFormat`
- [x] 1.2 Criar micro store `src/infra/store/class.store.ts` com dados mock vinculados a escolas via `schoolId`, `addClass` e lista de turmas (seguindo padrão do `school.store.ts`)

## 2. Componentes Compartilhados

- [x] 2.1 Criar `src/components/form-input.tsx` — componente `FormInput` reutilizável extraído do padrão de input do `SchoolFormView` (FormControl + label + InputField com underline)
- [x] 2.2 Criar `src/components/chip-radio-group.tsx` — componente `ChipRadioGroup` com chips arredondados, fundo preenchido no estado selecionado e ícone de check (fiel à referência visual)

## 3. Feature Slice — Class Components

- [x] 3.1 Criar `src/features/class/components/ClassFormStepOne.tsx` — View do Step 1 com dois `FormInput` (Nome, Disciplina) e botão "Continuar" com chevron
- [x] 3.2 Criar `src/features/class/components/ClassFormStepTwo.tsx` — View do Step 2 com três `ChipRadioGroup` (Ensino, Perfil de engajamento, Formato de aprendizado) e botão "Salvar"
- [x] 3.3 Criar `src/features/class/hooks/useClassFormViewModel.ts` — ViewModel gerenciando step, dados do form, `schoolId` da escola ativa e callbacks `handleContinue`/`handleSave`
- [x] 3.4 Criar `src/features/class/components/ClassBottomSheet.tsx` — composição do BottomSheet com título "Cadastrar turma" e alternância entre Step 1 e Step 2

## 4. Integração na Home

- [x] 4.1 Atualizar `HomeFeature.tsx` — substituir `MOCK_CLASSES` pelo consumo da `class.store` filtrado por `selectedSchoolId` da `school.store`, e substituir o BottomSheet placeholder pelo `ClassBottomSheet` passando `schoolId`

## 5. Refatoração do SchoolFormView

- [x] 5.1 Refatorar `SchoolFormView.tsx` para usar `FormInput` no campo "Nome" e `ChipRadioGroup` no campo "Categoria" (substituindo código inline)

## 6. Verificação

- [ ] 6.1 Verificar que o app compila sem erros (build check)
- [ ] 6.2 Testar fluxo completo: abrir BottomSheet → preencher Step 1 → avançar → preencher Step 2 → salvar → turma aparece na lista
- [ ] 6.3 Verificar que o SchoolFormView refatorado funciona corretamente
