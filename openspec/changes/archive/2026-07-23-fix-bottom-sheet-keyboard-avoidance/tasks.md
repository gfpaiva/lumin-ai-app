## 1. Componentes Base do BottomSheet

- [x] 1.1 Atualizar `BottomSheetPortal` em `src/components/ui/bottomsheet/index.tsx` para configurar e repassar `keyboardBehavior`, `keyboardBlurBehavior` e `android_keyboardInputMode` por padrão.
- [x] 1.2 Atualizar `GenericBottomSheet` em `src/components/generic-bottom-sheet.tsx` para aceitar a prop opcional `keyboardBehavior` (padrão `"interactive"`).

## 2. Refatoração das Views de Formulário em BottomSheets

- [x] 2.1 Refatorar `SchoolFormView.tsx` para remover o `KeyboardAvoidingView` e substituir por `BottomSheetScrollView`.
- [x] 2.2 Refatorar `ClassFormStepOne.tsx` para remover o `KeyboardAvoidingView` e substituir por `BottomSheetScrollView`.
- [x] 2.3 Refatorar `RecalibrateBottomSheet.tsx` para envolver os inputs em `BottomSheetScrollView`.

## 3. Validação e Testes

- [x] 3.1 Executar a suíte de testes unitários com `pnpm test` para assegurar que não haja quebras nos componentes.
- [x] 3.2 Verificar a integridade dos tipos com `pnpm tsc --noEmit`.
