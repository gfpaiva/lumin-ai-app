## Why

O app atualmente utiliza mocks estáticos para inicialização e simulação das Stores (Zustand) e não possui um client HTTP consolidado. Com o backend sendo estruturado, precisamos criar a fundação HTTP baseada em Arquitetura Hexagonal (Ports & Adapters) para conectar a UI ao backend real, implementando uma estratégia de `Stale-While-Revalidate` (SWR) nativa com Zustand para garantir `Optimistic Feedback` e uma UI extremamente rápida e responsiva. Além disso, precisamos garantir que as ViewModels não fiquem acopladas às implementações de estado global (Zustand), permitindo Injeção de Dependências.

## What Changes

- Criação de interface `HttpPort` para padronização de requisições.
- Implementação de um `FetchAdapter` nativo customizável (com timeouts de 60s via AbortController).
- Criação de interfaces "Store Ports" em `src/common/ports/` (ex: `BimesterStorePort`) para abstrair o hook do Zustand.
- Refatoração das ViewModels (ex: `useSplashViewModel`, `useHomeViewModel`) para receberem os Ports como injeção de dependências (com valores default).
- Implementação de um `AppInitializationAdapter` real que fará os fetches assíncronos (`bimesters`, `schools`, `classes`) durante o Splash.
- Atualização das regras do agente na pasta `.agents/` para documentar esses padrões.

## Capabilities

### New Capabilities
- `http-client`: Client HTTP via Port/Adapter nativo usando Fetch API com regras de timeout.
- `state-management-di`: Arquitetura de Dependency Injection e abstração de Store via Hooks Tipados (Store Ports).
- `swr-optimistic-ui`: Padrão de cache local nas micro-stores do Zustand operando como "stale data", revalidação em background via `FetchAdapter` e atualizações otimistas.
- `app-initialization`: Fluxo real de inicialização conectando ao backend.

### Modified Capabilities
- N/A

## Impact

- Modificará o fluxo de carregamento da aplicação (`Splash`).
- Alterará a forma como as `ViewModels` interagem com as `Stores` (desacoplamento total do Zustand na view model).
- Atualizará os `rules` dos agentes em `.agents/` garantindo os novos padrões para codificações futuras.
