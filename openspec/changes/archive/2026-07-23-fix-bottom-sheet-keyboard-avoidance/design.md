## Context

O aplicativo utiliza o `@gorhom/bottom-sheet` envelopado no componente visual `GenericBottomSheet` (baseado em Gluestack UI) para exibir modais de cadastro e seleções (`SchoolBottomSheet`, `ClassBottomSheet`, `RecalibrateBottomSheet`, etc.). 

Quando um formulário dentro do BottomSheet contém campos de entrada de texto (`FormInput`), o foco no input ativa o teclado virtual da plataforma. Atualmente, o teclado sobrepõe o conteúdo do BottomSheet e esconde o campo de texto. Isso ocorre devido a:
1. Conflito entre o `<KeyboardAvoidingView>` usado dentro das views de formulário e a transformação translateY interna do `@gorhom/bottom-sheet`.
2. Falta de repasse e configuração nativa das props de teclado no `BottomSheetPortal` e no `GenericBottomSheet`.
3. Utilização de `ScrollView` padrão em vez de `BottomSheetScrollView`.

## Goals / Non-Goals

**Goals:**
- Garantir que o conteúdo e os campos de input em qualquer BottomSheet sejam elevados/rolados automaticamente quando o teclado virtual for exibido, mantendo o campo de texto focado visível.
- Padronizar o tratamento de teclado no `GenericBottomSheet` através das props nativas do `@gorhom/bottom-sheet`.
- Refatorar as views de formulário (`SchoolFormView`, `ClassFormStepOne`, `RecalibrateBottomSheet`) para utilizar `BottomSheetScrollView` e remover o `KeyboardAvoidingView` conflitante.

**Non-Goals:**
- Alterar o design visual ou os temas de cores dos BottomSheets.
- Criar novos componentes de input específicos fora do padrão do Design System existente.

## Decisions

### Decisão 1: Propagação de Propriedades de Teclado no `BottomSheetPortal` e `GenericBottomSheet`
- **Escolha**: Habilitar por padrão `keyboardBehavior="interactive"`, `keyboardBlurBehavior="restore"` e `android_keyboardInputMode="adjustResize"` no `BottomSheetPortal` (em `src/components/ui/bottomsheet/index.tsx`) e expor a propriedade opcional `keyboardBehavior` na interface `GenericBottomSheetProps` com padrão `"interactive"`.
- **Racional**: O `@gorhom/bottom-sheet` possui uma engine interna de cálculo de posicionamento frente ao teclado que funciona perfeitamente quando devidamente configurada na raiz do portal.
- **Alternativas Consideradas**: 
  - Usar `KeyboardAvoidingView` externo ao BottomSheet (Rejeitado: causava comportamento instável no iOS e glitches no Android).
  - Usar `keyboardBehavior="extend"` por padrão (Rejeitado: expande a folha para a altura máxima mesmo em formulários curtos; `"interactive"` oferece transição mais suave e responsiva).

### Decisão 2: Uso de `BottomSheetScrollView` nos Formulários Internos
- **Escolha**: Substituir `<KeyboardAvoidingView>` e `<ScrollView>` padrão por `<BottomSheetScrollView>` em `SchoolFormView.tsx`, `ClassFormStepOne.tsx` e `RecalibrateBottomSheet.tsx`.
- **Racional**: O `BottomSheetScrollView` é integrado com a biblioteca de gestos do `@gorhom/bottom-sheet`, permitindo rolar o conteúdo suavemente para cima do teclado sem bloquear o gesto de arrastar para fechar (pan down to close).

## Risks / Trade-offs

- **[Risco] Conteúdo curto sem necessidade de scroll em telas grandes** → *Mitigação*: O `BottomSheetScrollView` preserva a funcionalidade do `ScrollView`, mantendo o layout intacto quando não há overflow e permitindo rolagem apenas quando o teclado é acionado.
- **[Risco] Comportamento em dispositivos Android com `android_keyboardInputMode` diferente** → *Mitigação*: Definir explicitamente `android_keyboardInputMode="adjustResize"` assegura comportamento predizível no Android.
