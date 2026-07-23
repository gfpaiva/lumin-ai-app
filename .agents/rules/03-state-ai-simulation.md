---
trigger: model_decision
description: Estado global, Zustand, Simulação de IA, Adapters de IA.
---

# 1. Zustand — Micro Stores e Injeção de Dependência
- Evite criar uma "mega store global". Crie micro stores separadas por domínio (ex: `classStore`, `planningStore`).
- Stores devem ficar em `src/infra/store/[domain].store.ts`.
- Components e Hooks NÃO DEVEM importar a store diretamente. Crie interfaces "StorePorts" em `src/common/ports/` contendo o estado (ex: `ClassStoreState`) e defina a port com o wildcard genérico de seletor:
  ```typescript
  export type ClassStorePort = <U>(selector: (state: ClassStoreState) => U) => U;
  ```
- O ViewModel receberá a `StorePort` como parâmetro e usará o seletor para pegar variáveis/funções com tipagem 100% segura sem saber que é do Zustand.

# 2. SWR (Stale-While-Revalidate) e Optimistic UI (Manual)
- É PROIBIDO o uso de libs de cache de rede como `swr` ou `@tanstack/react-query`. O SWR deve ser conduzido nativamente com Zustand.
- Para mutations otimistas, a store deve prover métodos com o sufixo `Optimistic` (ex: `completeBimesterOptimistic`), que atualizam a store de forma instantânea e retornam um **snapshot do estado anterior**.
- Em caso de falha na request, o ViewModel chama o método `rollback(snapshot)` passando o estado anterior devolvido, garantindo atomicidade.

# 2. Arquitetura da IA (Simulação via Port/Adapter)
- Embora a aplicação simule a IA no momento, ela será integrada a uma API real.
- Todo processamento de IA deve ser tratado como uma chamada de rede externa (Service Layer).
- **Port:** Crie `src/common/ports/ai.port.ts` definindo os métodos (ex: `generateBimesterPlan(context, calibrators) => Promise<Plan>`).
- **Adapter (Mock):** Crie `src/infra/ai/ai.simulator.adapter.ts` implementando o Port. Este arquivo usará `setTimeout` para introduzir delay e retornar dados hardcoded ou gerados aleatoriamente estruturados, simulando o delay de um LLM ou rede.
- Quando o backend real existir, criaremos um `ai.http.adapter.ts` sem alterar a camada de ViewModels ou Features.

# 3. Regra de Interação com a IA
- **NÃO IMPLEMENTE CHATBOTS.** A aplicação não é conversacional.
- A interação do usuário com a IA ocorre por botões, formulários, sliders (Calibrators), e movimentação de itens.
- A IA responde sempre com dados estruturados para preencher a UI (ex: uma lista de tópicos formatada para a UI renderizar).

# 4. Fetching e ViewModels
- Toda chamada à IA ou salvamento de classes deve passar pelo ViewModel.
- O ViewModel gerencia o estado de loading (`isGenerating`), chama o Adapter da IA e atualiza o estado local (ou a Store) com o resultado.
- **Não use `useEffect` para iniciar fetching complexo diretamente em Views.** Ação é disparada por eventos (ex: `onPress`).
