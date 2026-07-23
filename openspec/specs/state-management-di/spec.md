## ADDED Requirements

### Requirement: Desacoplamento de Stores e ViewModels
O sistema SHALL proibir que ViewModels realizem binds diretos às implementações reais do Zustand via importação (ex. `import { useBimesterStore }`), obrigando injeção via parâmetro.

#### Scenario: Execução em Runtime Padrão
- **WHEN** a ViewModel é invocada pelo Componente UI sem dependências explícitas
- **THEN** a ViewModel se vale dos Default Parameters (ex: `bimesterStore = useBimesterStore`) onde a implementação real é ativada automaticamente

#### Scenario: Tipagem Protegida
- **WHEN** o desenvolvedor ou IA interagir com o objeto injetado
- **THEN** os tipos inferidos obedecerão exclusivamente a Interface `StorePort` configurada (ex: `<U>(selector: (state) => U): U`), prevenindo lock-in do ecossistema Zustand
