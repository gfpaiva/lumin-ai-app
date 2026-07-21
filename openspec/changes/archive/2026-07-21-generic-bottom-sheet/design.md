## Context

O projeto precisa de modais inferiores ("bottom sheets") que sigam consistentemente o design system estipulado. O design exige um fundo escuro (`#1B1B1B`) e um cabeçalho que inclua um título em fonte branca, com tamanho 3xl e peso bold. O Gluestack UI v5 possui componentes base de overlay (como Actionsheet ou BottomSheet), mas eles não vêm estilizados com essas propriedades exatas por padrão, o que demanda repetidas customizações se não houver um componente abstraído.

## Goals / Non-Goals

**Goals:**

- Prover um componente reutilizável `GenericBottomSheet` que empacota as funcionalidades do Actionsheet/BottomSheet do Gluestack UI, já com os estilos padrão exigidos injetados.
- Suportar a renderização de componentes filhos flexíveis dentro do corpo do modal.
- Garantir que a configuração do componente base do Gluestack UI via CLI seja documentada e aplicada como pré-requisito.

**Non-Goals:**

- Implementar uma store de gerenciamento de estado global para modais; o componente em si será controlado (controlled component) pelo estado de abertura/fechamento injetado pelo componente pai.

## Decisions

- **Componente Base:** Utilizaremos o componente Actionsheet (BottomSheet) fornecido pelo Gluestack UI v5, que deve ser instalado via comando CLI (ex: `npx gluestack-ui add actionsheet`).
- **Abstração (Wrapper):** Criaremos um componente customizado `GenericBottomSheet` que consome o componente interno do Gluestack.
- **Propriedades (`Props`):**
  - `title` (`string`, obrigatório ou opcional dependendo do uso): Renderizado dentro de um cabeçalho. As classes de estilo serão aplicadas para fonte bold, cor branca e tamanho 3xl.
  - `isOpen` (`boolean`): Estado controlado que indica se está aberto.
  - `onClose` (`() => void`): Callback de fechamento para descartar o modal.
  - `children` (`React.ReactNode`): Para permitir a injeção do conteúdo através de composição.
- **Estilização de Cores:** O `ActionsheetContent` (ou o elemento correspondente ao corpo) terá a cor de fundo hardcoded ou injetada via tailwind/nativewind para `#1B1B1B`.

## Risks / Trade-offs

- **Risco:** Aplicar a cor arbitrária `#1B1B1B` pode entrar em conflito com o tema de cores nativo (tokens) do Gluestack se não houver um token específico de design configurado para isso.
  - **Mitigação:** Como o design visual é rigoroso quanto à cor e foi explicitamente requerido `#1B1B1B`, usaremos classes literais do Tailwind (ex: `bg-[#1B1B1B]`) garantindo que a cor seja exatamente a solicitada. Se o projeto adotar tokens universais, no futuro isso poderá ser substituído por um token (ex: `bg-background-dark`).
