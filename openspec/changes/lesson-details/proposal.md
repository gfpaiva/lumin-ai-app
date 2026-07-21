## Why

O usuário precisa visualizar e interagir com os detalhes específicos de uma aula, incluindo sugestões da IA e a lista de atividades planejadas. A criação de uma tela própria de "Detalhe da Aula" permite uma navegação fluída, mantendo a arquitetura limpa ao separar as responsabilidades e reutilizando componentes visuais comuns.

## What Changes

- **Nova Tela**: Adição da tela de Detalhes da Aula (Lesson Details) que será acessada ao clicar em um `LessonCard`.
- **Refatoração de Componentes (Reuso)**: Agrupamento do `Header`, "Chevron de Voltar" e `HeroHeader` em um novo componente reutilizável para telas de detalhe (como Class e Lesson details).
- **Separação de Feature (Slices)**: A estrutura de dados e as lógicas de aulas (lessons) atualmente em `useClassDetailViewModel.ts` serão extraídas para a feature `lesson` e consumidas pela tela de Detalhes da Aula.
- **Novos Componentes Visuais (Tags)**: Componentização de um elemento de Tag (que aceita variações) para a "Sugestões geradas com IA ✨" e para a exibição de "Tempo de aula" (ex: "4 dias" em fundo azul com variante `large`).
- **Lista de Atividades**: Adição de uma lista com scroll de atividades (com título e suporte textual) mockadas, preparada para integração com API.
- **Botão Customizar**: Adição de um botão fixo no final da tela chamado "Customizar ✨".

## Capabilities

### New Capabilities
- `lesson-details`: Visualização dos detalhes de uma aula, incluindo tempo estimado, sugestões geradas por IA e atividades.

### Modified Capabilities
- `class-detail-view`: Refatoração da view e model de Turma (Class) para compartilhar componentes de layout (Layout de detalhes com HeroHeader e Back Button) e consumir o novo domínio de aulas (Lessons) separado.

## Impact

- **UI/Componentes**: Criação de novo componente agrupador (layout-header), componente de tag, modificação de navegação no `LessonCard`.
- **Arquitetura/Estado**: Nova store/hook de view model para a tela de `lesson-details`, extração da lógica de aulas que atualmente reside no hook `useClassDetailViewModel.ts` (na feature `class`).
- **Navegação (Expo Router)**: Adição de nova rota de navegação para a feature de `lesson`.
