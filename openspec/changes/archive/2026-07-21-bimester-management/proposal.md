## Why

Os usuários precisam de uma forma intuitiva de navegar, visualizar e gerenciar o status dos bimestres do ano letivo diretamente da página inicial. Atualmente, a informação do bimestre atual é estática. Esta mudança visa trazer interatividade, permitindo aos professores consultar o progresso de bimestres passados e concluir o bimestre em andamento, mantendo o fluxo de trabalho centralizado na Home.

## What Changes

- A label do bimestre atual em `HomeWelcome` passará a ser interativa (clicável), abrindo um `GenericBottomSheet`.
- O BottomSheet conterá um seletor em formato de chips (pílulas) arredondados para navegar entre os bimestres:
  - Bimestres concluídos terão um ícone de "check".
  - Bimestre em andamento (atual) terá um ícone circular de progresso.
  - Bimestres futuros terão um ícone de "cadeado" e não serão clicáveis (bloqueados).
- O conteúdo abaixo dos chips mostrará um sumário do progresso das aulas do bimestre selecionado (inicialmente dados mockados).
- Se o bimestre selecionado for o bimestre em andamento, um botão "Concluir bimestre" será exibido.
- Criação de uma micro store (Zustand), seguindo arquitetura Feature Slices (em uma feature como `bimester-management` ou dentro da própria `home`), para gerenciar o estado global do bimestre ativo e o selecionado para visualização.
- Criação de um custom hook MVVM para servir a View do BottomSheet.

## Capabilities

### New Capabilities
- `bimester-management`: Visualização e gestão do status dos bimestres (navegação por chips baseados no status e conclusão de bimestre) via BottomSheet.

### Modified Capabilities
- `home-page`: Interatividade do componente `HomeWelcome` para acionar a seleção e gestão de bimestres.

## Impact

- **UI/Componentes:** `HomeWelcome.tsx` passará a emitir ação de clique (trigger). Criação de novos componentes visuais para os Chips de status e Sumário de progresso, seguindo Gluestack v3.
- **Estado Global:** Criação de uma nova store Zustand para o domínio de "Bimestres".
- **Arquitetura:** Inclusão de hooks no modelo MVVM para conectar o bottomsheet com a nova store e aplicar a lógica de bloqueio de navegação para bimestres futuros.
