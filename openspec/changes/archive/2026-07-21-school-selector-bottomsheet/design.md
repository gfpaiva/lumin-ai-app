## Context

Atualmente, a tela inicial (Home) possui um `SchoolSelector` que utiliza um dropdown básico para permitir a alteração da escola atual do professor. O design evoluiu para utilizar um padrão de `BottomSheet` mais moderno, onde não apenas a seleção ocorre, mas também o cadastro rápido de novas escolas, agrupando as operações de escola em um único ponto de contato na UI.

## Goals / Non-Goals

**Goals:**
- Implementar um BottomSheet de escolas a partir do `SchoolSelector`.
- Exibir a lista de escolas mockadas com o número de turmas (estilo `BimesterSummaryCard`).
- Permitir a seleção da escola, fechando o bottom sheet.
- Habilitar um fluxo interno ao bottom sheet para "Cadastro de Escola" (transição de conteúdo).
- Manter o estado desse fluxo limpo (se fechar no cadastro, ao abrir novamente deve iniciar na lista).
- Criar a camada store Zustand para gerenciar o estado efêmero e persistente dessa feature, com uma possível feature slice `school`.

**Non-Goals:**
- Integração com backend real.
- Validação avançada dos formulários de cadastro.
- Remoção ou edição de escolas existentes (neste momento apenas seleção e adição).

## Decisions

- **Uso do Componente GenericBottomSheet:** Devemos tentar reaproveitar a fundação do GenericBottomSheet estabelecida na feature de bimestres para garantir a padronização visual da UI e simplificar a implementação, embora o conteúdo injetado possua dois estados (lista e formulário).
- **Zustand Micro-store:** Criaremos um micro-store para `school` dentro de `src/features/school/stores/`. O store guardará a escola selecionada, a lista de escolas disponíveis, e funções para setar e adicionar novas escolas (persistindo na memória durante a sessão).
- **Feature Slice de School:** Será criada a feature slice `src/features/school` para encapsular a UI e a lógica de escolas (Store, Componentes, ViewModels).
- **KeyboardAvoidingView:** O formulário de cadastro exigirá cuidado extra com teclado mobile. O BottomSheet em si, quando expandido, deverá comportar o `KeyboardAvoidingView` ou lidar via as `props` do BottomSheet da biblioteca gluestack se suportado nativamente.
- **Transição de Tela no BottomSheet:** O estado de "tela ativa" no bottomsheet ficará local ao componente que orquestra o conteúdo (ex: `SchoolBottomSheetContent`), alternando a renderização entre `<SchoolListView />` e `<SchoolFormView />`. Esse estado deve ser resetado quando o bottom sheet fecha (detectável pelo hook de `onClose` do GenericBottomSheet).

## Risks / Trade-offs

- **[Risk]** Usabilidade do Teclado dentro do Bottom Sheet. → **Mitigation:** Testar exaustivamente a exibição do teclado com o formulário no Bottom Sheet utilizando propriedades adequadas do ScrollView ou KeyboardAvoidingView.
- **[Risk]** Complexidade de aninhamento de estado. → **Mitigation:** Manter o estado de visualização do Bottom Sheet estritamente local (React state) para evitar sujeira global na store do Zustand. A store do Zustand só saberá da lista de escolas e da escola atualmente selecionada.
