---
trigger: model_decision
description: Arquitetura geral, DDD, Arquitetura Hexagonal, MVVM com hooks, e Feature Slices.
---

# 1. Domain-Driven Design (Ubiquitous Language)
- **AcademicYear:** Container raiz de tempo (O Ano Letivo).
- **Bimester:** Ciclo dentro do ano. Estados: `Done`, `InProgress`, `Draft`, `NotStarted`.
- **Plan:** Conteúdo sugerido pela IA para um Bimestre.
- **Session:** Um dia específico de aula.
- **Topic:** A menor unidade de atividade em uma Sessão (Teoria, Prática, Tarefa).
- **Calibrators:** Parâmetros UI para ajustar a geração da IA (Proficiência, Engajamento, Infraestrutura).

# 2. Port/Adapter (Hexagonal) e Feature API Services
- Features (`src/features/`) **NUNCA** importam bibliotecas externas de infraestrutura HTTP (`FetchAdapter` / `fetch` direto) dentro dos ViewModels ou Components.
- **Ports Globais:** Contratos genéricos ficam em `src/common/ports/` (ex: `ai.port.ts`, `http.port.ts`).
- **Feature API Services (`src/features/[feature]/api/`):** Cada feature slice que realiza chamadas REST DEVE conter a sua própria camada de serviços de API com:
  - `[feature].service.port.ts`: Interface/Contrato contendo os métodos de API da feature (ex: `SchoolServicePort`).
  - `[feature].service.ts`: Implementação concreta (ex: `SchoolApiService`) utilizando `HttpPort` / `FetchAdapter` e convertendo DTOs <-> Entidades de Domínio via Mappers.
- **Adapters Globais:** Implementações de infraestrutura e clientes HTTP de baixo nível ficam em `src/infra/` (ex: `infra/http/fetch.adapter.ts`).

# 3. Features Slices (Vertical)
- `src/features/[featureName]/`: Todo o código de um domínio vive aqui (`api/`, `components/`, `hooks/`, `mappers/`, `types/`).
- `src/app/`: **APENAS** roteamento Expo Router. Zero lógica de negócio ou fetching de dados.

# 4. MVVM — Custom Hooks como ViewModels
- **Views (Componentes):** Devem ser "dumb". Recebem propriedades e eventos, sem realizar chamadas de API, acesso direto a Zustand (mesmo em stores globais) ou regras de negócio complexas.
- **ViewModels (Hooks):** Toda orquestração (estados, chamadas de serviço, submit de parâmetros) vive em `features/[feature]/hooks/use[Nome]ViewModel.ts`.
- **Desacoplamento e Injeção de Dependência:**
  - ViewModels NUNCA importam nem instanciam `FetchAdapter` ou executam URLs REST hardcoded diretamente.
  - ViewModels recebem a interface do serviço de API (`[Feature]ServicePort`) e as `StorePorts` por parâmetros opcionais com fallbacks default (ex: `schoolService: SchoolServicePort = defaultSchoolService`, `schoolStore: SchoolStorePort = useSchoolStore`).
- O ViewModel consome a interface do serviço (`[Feature]ServicePort`) para requisitar ações assíncronas do backend.

# 5. Mapeamento de Dados (Data Integrity)
- Qualquer retorno de API deve ser processado e convertido pelos Mappers dentro dos `[Feature]ApiService`.
- A UI e os ViewModels nunca consomem "DTOs" crus. O `[Feature]ApiService` é responsável por invocar os Mappers e retornar modelos/entidades de Domínio tipadas (Plan, School, Class, Lesson, etc.).

# 6. Exemplo de Arquitetura de Pastas (Referência)
A estrutura do projeto deve seguir rigorosamente o padrão abaixo:

```text
src/
  app/                    # Rotas do Expo Router (sem lógica de negócio)
    (tabs)/               # Grupos de rotas
    bimester/             # Telas específicas
  assets/                 # Imagens, fontes
  common/                 # Código compartilhado transversal
    components/           # Componentes genéricos da aplicação (não UI library)
    hooks/                # Hooks utilitários genéricos
    ports/                # Interfaces/Contratos Hexagonais globais (ex: http.port.ts, ai.port.ts)
    utils/                # Funções utilitárias (formatações, validações puras)
  components/
    ui/                   # Componentes base do Gluestack UI / NativeWind
  features/               # Slices de Domínio (Onde a lógica vive)
    school/               # Ex: feature de escolas
      api/                # Contrato (school.service.port.ts) e Implementação (school.service.ts)
      components/         # Componentes visuais exclusivos desta feature
      hooks/              # ViewModels (ex: useSchoolViewModel.ts)
      types/              # Interfaces de Domínio da feature
    class/                # Ex: feature de turmas
      api/                # class.service.port.ts e class.service.ts
      components/
      hooks/
      types/
    lesson/               # Ex: feature de lições/planos
      api/                # lesson.service.port.ts e lesson.service.ts
      mappers/            # Conversores DTO <-> Domain
      types/
  infra/                  # Camada de Adapters e Implementação Externa
    ai/                   # Implementação do simulador/integração real (ai.simulator.adapter.ts)
    http/                 # Fetch client base (fetch.adapter.ts)
    storage/              # Async Storage / Secure Store adapters
    store/                # Zustand micro stores (school.store.ts, class.store.ts)
```
