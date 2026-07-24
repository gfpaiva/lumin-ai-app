# generic-bottom-sheet Specification

## Purpose
TBD - created by archiving change generic-bottom-sheet. Update Purpose after archive.
## Requirements
### Requirement: O componente GenericBottomSheet deve renderizar o conteúdo encapsulado
O sistema SHALL exibir um componente modal de overlay na parte inferior da tela, que suporta injeção de componentes React filhos, quando o estado for marcado como aberto.

#### Scenario: Abertura do bottom sheet com children customizado
- **WHEN** o pai altera a propriedade `isOpen` para `true` e passa um componente React na propriedade `children`
- **THEN** o modal de bottom sheet deve abrir exibindo o conteúdo fornecido dentro de seu corpo.

### Requirement: O componente deve exibir o título com o estilo exigido
O componente SHALL receber uma propriedade `title` e exibi-la estilizada estritamente com as definições de fonte estipuladas.

#### Scenario: Exibição do título
- **WHEN** uma propriedade `title` de valor "Meu Título" é fornecida
- **THEN** o cabeçalho do bottom sheet exibe o texto "Meu Título" com a cor branca, negrito (bold) e no tamanho 3xl.

### Requirement: O componente deve possuir o fundo na cor #1B1B1B
A superfície do corpo do bottom sheet SHALL obrigatoriamente possuir a cor de fundo hex `#1B1B1B` de forma a aderir estritamente à referência visual anexada.

#### Scenario: Renderização com cor de fundo
- **WHEN** o bottom sheet é renderizado na tela
- **THEN** o container de fundo principal (`Actionsheet.Content` ou div similar) deve apresentar a cor `background-color` igual a `#1B1B1B`.

### Requirement: O componente deve permitir ser fechado
O sistema SHALL permitir que o usuário feche o modal (através de interação, como clicar fora do modal, arrastar para baixo ou botão específico, conforme suporte da base do Gluestack).

#### Scenario: Fechar o bottom sheet
- **WHEN** o usuário realiza uma ação de fechamento (por exemplo, tap fora da área do conteúdo)
- **THEN** o callback `onClose` fornecido via propriedades é acionado, permitindo que o pai altere `isOpen` para `false`.

### Requirement: O componente GenericBottomSheet deve oferecer suporte a ajuste automático perante o teclado (Keyboard Avoidance)
O sistema SHALL permitir o ajuste automático da posição do BottomSheet e a rolagem fluida do seu conteúdo quando o teclado virtual da plataforma for acionado pelo foco em campos de input de texto.

#### Scenario: Teclado ativado em campo de texto dentro do BottomSheet
- **WHEN** o usuário toca em um campo de texto (`FormInput` / `TextInput`) contido no corpo do BottomSheet
- **THEN** o BottomSheet SHALL ajustar dinamicamente sua posição e permitir que o conteúdo suba e seja rolável mantendo o campo em foco totalmente visível acima do teclado.

#### Scenario: Fechamento do teclado ao arrastar ou desfocar
- **WHEN** o usuário arrasta o BottomSheet para baixo ou desfoca o campo de texto
- **THEN** o teclado virtual deve ser ocultado e o estado da tela restaurado suavemente sem cortar a interface.

