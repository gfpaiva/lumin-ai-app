## ADDED Requirements

### Requirement: O componente GenericBottomSheet deve oferecer suporte a ajuste automático perante o teclado (Keyboard Avoidance)
O sistema SHALL permitir o ajuste automático da posição do BottomSheet e a rolagem fluida do seu conteúdo quando o teclado virtual da plataforma for acionado pelo foco em campos de input de texto.

#### Scenario: Teclado ativado em campo de texto dentro do BottomSheet
- **WHEN** o usuário toca em um campo de texto (`FormInput` / `TextInput`) contido no corpo do BottomSheet
- **THEN** o BottomSheet SHALL ajustar dinamicamente sua posição e permitir que o conteúdo suba e seja rolável via `BottomSheetScrollView`, mantendo o campo em foco totalmente visível acima do teclado.

#### Scenario: Fechamento do teclado ao arrastar ou desfocar
- **WHEN** o usuário arrasta o BottomSheet para baixo ou desfoca o campo de texto
- **THEN** o teclado virtual deve ser ocultado e o estado da tela restaurado suavemente sem cortar a interface.
