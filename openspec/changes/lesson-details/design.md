## Context

O projeto Lumin AI App está organizado através de feature slices e utiliza MVVM com `Zustand` para gerenciar estado e side-effects. Atualmente, a tela de detalhe de turmas (class detail) gerencia também a listagem das aulas ("lessons"), mantendo o controle das entidades de `lesson` atrelado ao hook `useClassDetailViewModel`. 

O novo requisito exige criar a funcionalidade de clicar no `LessonCard` para navegar (via push) para uma nova tela de detalhe da aula. Como consequência arquitetural, é apropriado extrair a responsabilidade (o domínio) de "lessons" para a sua própria feature (`src/features/lesson`). Adicionalmente, as duas telas (Detalhe da Turma e Detalhe da Aula) compartilham estruturas visuais idênticas de cabeçalho, exigindo refatoração para reaproveitamento dos componentes em comum.

## Goals / Non-Goals

**Goals:**
- Separar o domínio `lesson` do domínio `class` extraindo a lógica da View Model de `class` para `lesson`.
- Agrupar e extrair componentes de cabeçalho (logo, menu avatar, botão de voltar e `HeroHeader`) para um novo componente customizado (`LayoutHeader` ou `DetailLayout`) reutilizável, reduzindo duplicação entre as telas de detalhes.
- Criar a nova tela de detalhe da aula, aderindo fielmente à referência visual providenciada pelo usuário.
- Criar um componente de `Tag` flexível via `Tailwind Variants`/Gluestack para suportar variações visuais como a tag de "Sugestões de IA ✨" e a tag azul de "Tempo de aula".
- Adicionar lista scrollable de atividades da aula mockada e um botão "Customizar ✨" fixo no final da tela.

**Non-Goals:**
- Integração real de API das atividades ou geração de IA na tela de aula (os dados seguirão mockados inicialmente).
- Definir ação real para o botão "Customizar ✨" (não fará nada, ou apenas alert/mock navigation).

## Decisions

- **Extração da Feature `lesson`**: A lógica e a tipagem das aulas (Lessons) existente no `useClassDetailViewModel` será extraída para a diretório da feature `lesson`. Uma View Model específica (ex: `useLessonDetailViewModel.ts`) administrará a estrutura da tela nova de aula (buscando o dado pelo Id passado no route params), utilizando `Zustand` se dados globais precisarem ser sincronizados, ou simplesmente React hooks isolados para os mocks (preparado para API).
- **Agrupador `Header`**: Criaremos um componente em `src/components/` (ex: `detail-header.tsx` ou `page-header.tsx`) que encapsula o fluxo de exibição:
  1. Topo: `<Header />` (Logo e Avatar)
  2. Meio: Chevron de voltar (`<Pressable>` com ícone da Lucide ou router.back())
  3. Fim: `<HeroHeader />` (subtitle e title).
  Essa abstração será injetada tanto em ClassDetail quanto em LessonDetail.
- **Componente `Tag`**: Faremos um novo componente (ou estenderemos um `<Badge>` existente se houver) capaz de receber variantes (como cor e tamanho) via `tailwind-variants` (ex: `variant: "neutral" | "primary"`, `size: "md" | "lg"`). 
  - Tag Sugestão: fundo cinza escuro (surface-neutral/50), texto com brilho.
  - Tag Tempo de Aula: variant `large`, fundo azul, cobrindo quase toda a largura.

## Risks / Trade-offs

- **Regressão na tela de Class Detail** -> Alterar a estrutura do Header para isolá-lo num componente compartilhado pode afetar as margens (padding e gaps) na tela existente de Turma.
  - *Mitigação*: Testaremos o layout visualmente em tela cheia na ClassDetail antes de declarar a refatoração concluída, respeitando as classes do `NativeWind/Tailwind` existentes.
