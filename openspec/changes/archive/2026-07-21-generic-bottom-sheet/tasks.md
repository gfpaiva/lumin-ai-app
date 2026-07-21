## 1. Setup

- [x] 1.1 Executar `npx gluestack-ui add actionsheet` (ou equivalente na versão v3) para adicionar a dependência base do componente de overlay.

## 2. Criação do Componente

- [x] 2.1 Criar o arquivo do componente `GenericBottomSheet` (ex: `components/shared/GenericBottomSheet.tsx`).
- [x] 2.2 Importar e estruturar os subcomponentes do `Actionsheet` (Backdrop, Content, DragIndicatorWrapper, DragIndicator, etc) vindos do diretório do Gluestack gerado no passo 1.1.
- [x] 2.3 Tipar e receber as propriedades: `isOpen` (boolean), `onClose` (void function), `title` (string) e `children` (ReactNode).

## 3. Estilização Visual

- [x] 3.1 Estilizar o título (`title`) aplicando as classes do Tailwind/Gluestack para obter fonte branca, negrito (bold) e tamanho `3xl`.
- [x] 3.2 Forçar a cor de fundo do content (corpo do bottom sheet) para `#1B1B1B` de forma inline ou com a classe `bg-[#1B1B1B]`.

## 4. Validação

- [x] 4.1 Criar ou utilizar uma tela existente para instanciar o `GenericBottomSheet`, passando um texto e algum conteúdo para o `children`, verificando se abre, renderiza corretamente e fecha ao clicar fora.
