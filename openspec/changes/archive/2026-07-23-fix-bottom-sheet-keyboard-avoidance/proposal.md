## Why

Atualmente, ao abrir um BottomSheet que contém campos de formulário e focar em um campo de texto (`FormInput`), o teclado virtual da plataforma (iOS/Android) sobrepõe praticamente todo o BottomSheet e oculta o campo de input que está sendo preenchido. Isso prejudica drasticamente a experiência do usuário (UX), impedindo a visualização dos dados digitados.

A causa desse problema é o conflito entre o `<KeyboardAvoidingView>` usado dentro de formulários específicos e o gerenciador de tradução/snap points do `@gorhom/bottom-sheet`, além da falta de repasse e configuração nativa de `keyboardBehavior` no `BottomSheetPortal` e no `GenericBottomSheet`.

## What Changes

- Configurar o `BottomSheetPortal` e `GenericBottomSheet` para repassar e habilitar propriedades nativas de controle de teclado do `@gorhom/bottom-sheet` (`keyboardBehavior="interactive"`, `keyboardBlurBehavior="restore"` e `android_keyboardInputMode="adjustResize"`).
- Atualizar o `GenericBottomSheet` para aceitar opcionalmente a prop `keyboardBehavior` (padrão `"interactive"`).
- Substituir o uso conflitante de `<KeyboardAvoidingView>` e `<ScrollView>` padrão por `<BottomSheetScrollView>` nos formulários consumidos dentro de BottomSheets (`SchoolFormView`, `ClassFormStepOne` e `RecalibrateBottomSheet`).
- Garantir rolagem e visibilidade fluida dos campos de texto quando o teclado virtual for ativado.

## Capabilities

### New Capabilities
<!-- Nenhuma nova capacidade -->

### Modified Capabilities
- `generic-bottom-sheet`: Adicionar requisitos de suporte e tratamento de desvio de teclado (keyboard avoidance) no BottomSheet.

## Impact

- **Componentes Afetados**:
  - `src/components/generic-bottom-sheet.tsx`
  - `src/components/ui/bottomsheet/index.tsx` (`BottomSheetPortal`)
  - `src/features/school/components/SchoolFormView.tsx`
  - `src/features/class/components/ClassFormStepOne.tsx`
  - `src/features/lesson/components/RecalibrateBottomSheet.tsx`
- **APIs / Dependências**: Nenhuma dependência externa nova. Utilização das ferramentas nativas do `@gorhom/bottom-sheet`.
- **Efeitos Colaterais Esperados**: Nenhum comportamento quebrado em BottomSheets sem formulário (como `BimesterSelectorBottomSheet`).
