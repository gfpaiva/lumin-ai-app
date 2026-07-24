---
trigger: model_decision
description: Estado global, Zustand, Simulação de IA, Adapters de IA e Fluxo de Serviços.
---

# 1. Fluxo Obrigatório de Comunicação (Architecture Pipeline)
Toda requisição HTTP / comunicação com backend deve respeitar estritamente o fluxo unidirecional:
```text
View (Componente UI) 
  └─► ViewModel (Custom Hook) 
        └─► Feature API Service ([Feature]ApiService via [Feature]ServicePort) 
              └─► HttpPort (FetchAdapter / Infrastructure Client)
```
- **Views**: Disparam callbacks expostos pelo ViewModel.
- **ViewModels**: Gerenciam estados de tela (loading, error), aplicam atualizações otimistas na store Zustand e delegam chamadas assíncronas para o `[Feature]ServicePort`.
- **Services (`src/features/[feature]/api/`)**: Realizam a chamada REST via `HttpPort`, aplicam a conversão DTO <-> Domínio via Mappers e retornam Entidades de Domínio.
- **HttpPort**: Abstração HTTP de baixo nível (`FetchAdapter`).

# 2. Zustand — Micro Stores e Injeção de Dependência
- Evite criar uma "mega store global". Crie micro stores separadas por domínio (ex: `classStore`, `schoolStore`, `lessonStore`).
- Stores devem ficar em `src/infra/store/[domain].store.ts`.
- Components e Hooks NÃO DEVEM importar a store diretamente. Crie interfaces "StorePorts" em `src/common/ports/` contendo o estado (ex: `ClassStoreState`) e defina a port com o wildcard genérico de seletor:
  ```typescript
  export type ClassStorePort = <U>(selector: (state: ClassStoreState) => U) => U;
  ```
- O ViewModel receberá a `StorePort` como parâmetro opcional via Default Parameter e usará o seletor para capturar o estado com tipagem segura.

# 3. SWR (Stale-While-Revalidate) e Optimistic UI (Manual)
- É PROIBIDO o uso de libs de cache de rede como `swr` ou `@tanstack/react-query`. O SWR deve ser conduzido nativamente com Zustand.
- Para mutations otimistas, a store deve prover métodos com o sufixo `Optimistic` (ex: `updateActivityCompletionOptimistic`), que atualizam a store de forma instantânea e mantêm um snapshot do estado anterior.
- Em caso de falha na requisição tratada no ViewModel, este chama o método `rollbackPlan(snapshot)` passando o estado anterior devolvido, garantindo atomicidade.

# 4. Arquitetura da IA (Simulação via Port/Adapter)
- Toda integração com inteligência artificial deve ser encapsulada como um serviço.
- **Port:** Crie `src/common/ports/ai.port.ts` definindo os contratos (ex: `generateBimesterPlan(context, calibrators) => Promise<Plan>`).
- **Adapter (Mock):** Crie `src/infra/ai/ai.simulator.adapter.ts` implementando o Port. Este arquivo usará `setTimeout` para introduzir delay e retornar dados estruturados, simulando a resposta de um LLM.

# 5. Regra de Interação com a IA
- **NÃO IMPLEMENTE CHATBOTS.** A aplicação não é conversacional.
- A interação do usuário com a IA ocorre por botões, formulários, sliders (Calibrators), e movimentação de itens.
- A IA responde sempre com dados estruturados para preencher a UI.

# 6. Fetching e ViewModels
- Toda chamada ao backend ou salvamento de dados passa pelo ViewModel via `[Feature]ServicePort`.
- O ViewModel gerencia o estado de loading (`isLoading`), chama o serviço da feature e atualiza o estado local ou a Store Zustand com o resultado.
- **Não use `useEffect` para iniciar fetching complexo diretamente em Views.** Ação é disparada por eventos (ex: `onPress`) ou centralizada no ViewModel.
