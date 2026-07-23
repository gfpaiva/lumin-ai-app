## Why

Atualmente, quando um usuário cadastra uma nova escola (sem turmas), a tela inicial (`HomeFeature`) exibe um espaço em branco onde a lista de turmas deveria estar. Isso pode causar confusão ao usuário, que não recebe um feedback visual claro de que precisa cadastrar uma turma para começar a utilizar o app. A introdução de um "empty state" (estado vazio) amigável resolve esse problema e guia o usuário em seus próximos passos.

## What Changes

- Criação de um novo componente `ClassEmptyState` para representar a ausência de turmas.
- Inclusão de uma animação fluida (estilo "Breathing Blob") utilizando o `react-native-reanimated` (dependência já existente no projeto) para proporcionar um visual premium, de acordo com as diretrizes do app.
- Atualização do componente `HomeFeature` para renderizar o `ClassEmptyState` quando a lista `filteredClasses` estiver vazia.

## Capabilities

### New Capabilities
- `class-empty-state`: Exibição do estado vazio e chamada para ação (cadastrar turma) na tela inicial.

### Modified Capabilities
- Nenhum requisito estrutural de funcionalidades existentes foi modificado, apenas a UI de feedback da Home.

## Impact

- **UI/UX**: Melhoria significativa na retenção de novos usuários, fornecendo um fluxo claro de onboarding e preenchendo a tela em branco.
- **Componentes**: Criação do arquivo `ClassEmptyState.tsx` na pasta de componentes da feature Home (`src/features/home/components/`). Modificação do `HomeFeature.tsx`.
