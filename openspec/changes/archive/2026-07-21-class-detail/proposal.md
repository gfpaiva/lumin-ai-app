## Why

Permitir que o professor acesse os detalhes de uma turma específica após selecioná-la na tela inicial (Home). Essa tela é fundamental para visualizar o progresso da turma, o resumo do bimestre e os tópicos (aulas) planejados ou em andamento.

## What Changes

- Adição de navegação (push) no `ClassCard` da `HomeFeature` para a nova tela de detalhe da turma.
- Criação da `ClassDetailFeature` (dentro de `src/features/class/`) para encapsular toda a UI e lógica da nova tela.
- Extração do layout do `HomeWelcome` para um componente genérico reaproveitável (ex: `HeroHeader`), que será usado tanto na Home quanto na nova tela de detalhe.
- Inclusão do header padrão e um botão de "voltar" (chevron-left) no topo da nova tela.
- O componente genérico de boas-vindas exibirá:
  - Linha 1: Disciplina e Nome da Escola.
  - Linha 2: Nome da turma e um ícone para abrir um BottomSheet (placeholder).
- Adição de uma seção textual para o resumo do conteúdo do bimestre (mockado inicialmente, preparado para integração com API/store).
- Adição de uma listagem em grid de cards representando os tópicos (aulas) do bimestre, contendo: número da aula, título e porcentagem de progresso.

## Capabilities

### New Capabilities
- `class-detail-view`: Visualização dos detalhes da turma, incluindo o resumo do bimestre e a lista de aulas programadas com seus respectivos progressos.

### Modified Capabilities
- Não há mudanças de requisitos em capabilities existentes. Apenas refatoração visual na Home (extração de componente).

## Impact

- `src/features/home/components/HomeFeature.tsx`: Alteração para incluir a navegação.
- `src/features/home/components/HomeWelcome.tsx`: Será refatorado para usar um componente comum ou movido para `src/common/components/`.
- `src/features/class/`: Receberá novos componentes (`ClassDetailFeature`, `LessonCard`, etc) e hook (`useClassDetailViewModel`).
- `src/app/`: Criação de uma nova rota (ex: `src/app/class/[id].tsx` ou similar) para acoplar a navegação do Expo Router.
