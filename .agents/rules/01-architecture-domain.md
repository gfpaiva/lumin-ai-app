---
trigger: model_decision
description: Arquitetura geral, DDD, Arquitetura Hexagonal, MVVM com hooks, e Feature Slices.
---

# 1. Domain-Driven Design (Ubiquitous Language)
- **AcademicY:** Container raiz de tempo (O Ano Letivo).
- **Bimester:** Ciclo dentro do ano. Estados: `Done`, `InProgress`, `Draft`, `NotStarted`.
- **Plan:** Conteúdo sugerido pela IA para um Bimestre.
- **Session:** Um dia específico de aula.
- **Topic:** A menor unidade de atividade em uma Sessão (Teoria, Prática, Tarefa).
- **Calibrators:** Parâmetros UI para ajustar a geração da IA (Proficiência, Engajamento, Infraestrutura).

# 2. Port/Adapter (Hexagonal)
- Features (`src/features/`) **NUNCA** importam bibliotecas externas de infraestrutura diretamente (fetch, APIs reais).
- **Ports:** Contratos de interface ficam em `src/common/ports/` (ex: `ai.port.ts`, `http.port.ts`).
- **Adapters:** Implementações reais ou simulações ficam em `src/infra/` (ex: `ai.simulator.adapter.ts`). Inicialmente usaremos mocks via adapters simulados, mas a arquitetura deve suportar transição para API real.

# 3. Features Slices (Vertical)
- `src/features/[featureName]/`: Todo o código de um domínio vive aqui (components locais, hooks, mappers, types, domain models).
- `src/app/`: **APENAS** roteamento Expo Router. Zero lógica de negócio ou fetching de dados.

# 4. MVVM — Custom Hooks como ViewModels
- **Views (Componentes):** Devem ser "dumb". Recebem propriedades e eventos, sem realizar chamadas de API, acesso direto a Zustand (mesmo em stores globais) ou regras de negócio complexas.
- **ViewModels (Hooks):** Toda orquestração (estados, fetch, submit de parâmetros para IA) vive em `features/[feature]/hooks/use[Nome]ViewModel.ts`.
- **Desacoplamento e Injeção de Dependência:** É ESTUDAMENTE PROIBIDO que Views ou ViewModels realizem binds diretos às implementações reais do Zustand via importação (ex. `import { useBimesterStore }`). ViewModels devem receber as Stores abstratas (`StorePorts`) através de Dependency Injection via Default Parameters (ex: `bimesterStore: BimesterStorePort = useBimesterStore`).
- O ViewModel consome as interfaces (Ports) para requisitar ações (ex: pedir para a IA gerar um plano, ou disparar mutations HTTP).

# 5. Mapeamento de Dados (Data Integrity)
- Qualquer retorno de API ou de um Adapter simulado deve ser tipado e passar por um Mapper antes de chegar à UI.
- A UI nunca consome "DTOs" crus. O Mapper converte a resposta para as entidades do Domínio (Plan, Session, Topic, etc.).

# 6. Exemplo de Arquitetura de Pastas (Referência)
A estrutura do projeto deve seguir rigorosamente o padrão abaixo (inspirado no repo de referência):

```text
src/
  app/                    # Rotas do Expo Router (sem lógica de negócio)
    (tabs)/               # Grupos de rotas
    bimester/             # Telas específicas
  assets/                 # Imagens, fontes
  common/                 # Código compartilhado transversal
    components/           # Componentes genéricos da aplicação (não UI library)
    hooks/                # Hooks utilitários genéricos
    ports/                # Interfaces/Contratos Hexagonais (ex: ai.port.ts)
    utils/                # Funções utilitárias (formatações, validações puras)
  components/
    ui/                   # Componentes base do Gluestack UI / NativeWind
  features/               # Slices de Domínio (Onde a lógica vive)
    planning/             # Ex: feature de planejamento
      api/                # Definições de DTOs de rede/simulador da feature
      components/         # Componentes visuais exclusivos desta feature
      hooks/              # ViewModels (ex: useGeneratePlanViewModel.ts)
      mappers/            # Conversores (DTO -> Domain Model)
      types/              # Interfaces de Domínio
    classes/              # Ex: feature de turmas
  infra/                  # Camada de Adapters e Implementação Externa
    ai/                   # Implementação do simulador/integração real (ai.simulator.adapter.ts)
    http/                 # Fetch client base
    storage/              # Async Storage / Secure Store adapters
    store/                # Zustand micro stores (planning.store.ts)
```
