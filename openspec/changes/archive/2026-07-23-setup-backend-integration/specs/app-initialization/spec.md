## ADDED Requirements

### Requirement: Carga de Dados Iniciais no Splash
O sistema SHALL implementar o `AppInitializationAdapter` que consulta as apis essenciais base (`Bimesters`, `Schools`, `Classes`) para alimentar o cache do Zustand durante a Splash.

#### Scenario: Load de Dados Resolve Corretamente
- **WHEN** o aplicativo inicializa e aciona o adapter pelo hook `useSplashViewModel`
- **THEN** chamadas GET simultâneas ocorrem preenchendo as stores. O `Splash` desfaz seu fade-out transicionando para a rota Home

#### Scenario: Load de Dados com Degradação/Erro
- **WHEN** o adapter sofre erro ao trazer uma collection não bloqueante
- **THEN** o fluxo ainda avança garantindo que o usuário navegue e, no máximo, lide com fallbacks (empty states) no App, nunca ficando trancado em loading infinito
