## Context

Atualmente no repositório, o acesso HTTP é realizado diretamente nos ViewModels (hooks React em `src/features/[feature]/hooks/`). Cada ViewModel instancia ou injeta o `FetchAdapter` (que implementa `HttpPort`) e chama métodos genéricos como `httpAdapter.get(...)` ou `httpAdapter.post(...)`, especificando URLs REST, query params, payloads, tratamento de erros e mappers DTO -> Domínio.

Isso contraria a separação da Arquitetura Hexagonal onde ViewModels devem cuidar apenas de lógica de apresentação e orquestração de UI.

## Goals / Non-Goals

**Goals:**
- Criar a camada `api/` dentro das features `school`, `class`, `lesson` e `bimester` contendo os contratos (`.service.port.ts`) e as implementações (`.service.ts`).
- Encapsular todas as chamadas HTTP, DTOs e aplicação de Mappers dentro dos novos Services de API.
- Injetar os novos API Services nos ViewModels existentes com fallbacks default.
- Atualizar a documentação de arquitetura do projeto (`.agents/instructions.md`, `.agents/rules/01-architecture-domain.md`, `.agents/rules/03-state-ai-simulation.md`).
- Escrever testes unitários Jest para os novos Services e atualizar os testes dos ViewModels.

**Non-Goals:**
- Alterar as rotas da API REST ou mudar os contratos DTO/Backend existentes.
- Mudar a biblioteca base de HTTP (`FetchAdapter` / `HttpPort` continuam como cliente HTTP global de baixo nível).
- Mudar a arquitetura das stores Zustand.

## Decisions

### 1. Nomenclatura e Localização: Opção Colocada (`src/features/[feature]/api/`)
- **Decisão**: Utilizar a pasta `api/` em cada feature slice contendo `[feature].service.port.ts` (Interface) e `[feature].service.ts` (Implementação).
- **Razão**: Evita a explosão de subpastas como `ports/` e `infra/` por feature mantendo tudo relacionado à API agrupado em um único local da feature, mantendo o balanço ideal entre purismo Hexagonal e DX (Developer Experience).
- **Alternativa Considerada**: Criar `ports/` e `infra/` separados dentro de cada feature, o que criaria sobrecarga de navegação de diretórios para o tamanho atual do app.

### 2. Uso do sufixo `Service` em vez de `Provider`
- **Decisão**: Nomear os arquivos como `[feature].service.ts` e interfaces como `[Feature]ServicePort`.
- **Razão**: No ecossistema React/React Native, o termo "Provider" é associado a React Context (`<Provider />`). O termo "Service" descreve com clareza módulos/classes de infraestrutura assíncronos em DDD/Clean Architecture.

### 3. Injeção de Dependência via Default Parameters nos ViewModels
- **Decisão**: 
```typescript
const defaultSchoolService = new SchoolApiService();

export function useSchoolViewModel(
  schoolService: SchoolServicePort = defaultSchoolService,
  // ...
)
```
- **Razão**: Garante 100% de retrocompatibilidade, permite mockar facilmente nos testes Jest e elimina dependências diretas de `FetchAdapter` nos ViewModels.

## Risks / Trade-offs

- **[Risco]** Quebra de testes de ViewModels existentes que esperavam interceptar `httpAdapter`. → **Mitigação**: Atualizar os mocks dos testes de ViewModel para fornecer mocks de `[Feature]ServicePort` ao invés de `HttpPort`.
- **[Risco]** Agentes de IA novos desrespeitarem o padrão em futuras alterações. → **Mitigação**: Atualização explícita dos arquivos `.agents/rules/01-architecture-domain.md` e `.agents/instructions.md`.
