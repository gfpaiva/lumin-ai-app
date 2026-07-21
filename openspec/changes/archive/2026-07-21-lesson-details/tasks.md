## 1. Feature Slices e Refatoração de Domínio

- [x] 1.1 Criar a estrutura de diretórios para a feature `lesson` (`src/features/lesson`, `src/features/lesson/hooks`, `src/features/lesson/components`, etc).
- [x] 1.2 Mover/extrair a tipagem e os mocks de lessons de `src/features/class/hooks/useClassDetailViewModel.ts` para um novo hook `useLessonViewModel.ts` dentro da feature de lesson.

## 2. Componentes Compartilhados e de Layout

- [x] 2.1 Criar o componente genérico `Tag` em `src/components/ui/tag.tsx` utilizando Tailwind Variants (com suporte às variantes `neutral` e `primary/blue`, e tamanhos `md` e `lg`).
- [x] 2.2 Extrair a estrutura de cabeçalho (Header com avatar, botão chevron-left de Voltar, e HeroHeader) da view de `ClassDetail` para um novo componente de agrupamento `LayoutHeader` em `src/components/layout-header.tsx`.
- [x] 2.3 Refatorar a view atual de `ClassDetail` para utilizar o novo `LayoutHeader`, garantindo que não há regressões visuais.

## 3. Tela de Detalhes da Aula

- [x] 3.1 Criar o arquivo de rota da tela de Detalhes da Aula no Expo Router (ex: `app/lesson/[id].tsx`).
- [x] 3.2 Implementar a ViewModel (`useLessonDetailViewModel.ts`) para gerenciar as atividades mockadas, tempo de aula, nível e sugestões.
- [x] 3.3 Construir a view de Detalhes da Aula renderizando o componente compartilhado `LayoutHeader` com as props corretas (número da aula e título).
- [x] 3.4 Inserir na view a tag de "Sugestões geradas com IA ✨".
- [x] 3.5 Implementar a sessão de "Tempo de aula" com a label branca, a `Tag` (azul, larga) com o valor mockado, e o texto de apoio referenciando o nível da turma.
- [x] 3.6 Implementar a listagem (scrollable) das atividades utilizando a estrutura de dados do mock (título e suporte textual).
- [x] 3.7 Adicionar o botão "Customizar ✨" fixo no final da tela (bottom pad / safe area).

## 4. Integração e Navegação

- [x] 4.1 Atualizar `src/features/class/components/LessonCard.tsx` e/ou a listagem na view de turma para possuir `onPress` e navegar (via `router.push`) para a nova tela de detalhe da aula.
- [x] 4.2 Testar todo o fluxo de navegação (ida e volta) verificando as animações da stack e a consistência do `LayoutHeader` em ambas as telas.
