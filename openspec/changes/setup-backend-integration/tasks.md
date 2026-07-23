## 1. Fundação HTTP

- [x] 1.1 Criar `src/common/ports/http.port.ts` com a interface `HttpPort` (GET, POST, PUT, PATCH, DELETE)
- [x] 1.2 Criar `src/infra/http/fetch.adapter.ts` implementando `HttpPort`, integrando baseUrl de envs e AbortController para timeout de 60s
- [x] 1.3 Escrever testes básicos para o `FetchAdapter` garantindo injeção de headers e rules de timeout

## 2. Refatoração e Contratos das Stores

- [x] 2.1 Criar `src/common/ports/bimester.store.port.ts` exportando as assinaturas de estado e a interface `BimesterStorePort`
- [x] 2.2 Atualizar `src/infra/store/bimester.store.ts` para conformar com a tipagem da port, adicionando métodos para `completeBimesterOptimistic` e `rollbackBimester`
- [x] 2.3 Criar `src/common/ports/school.store.port.ts` com a respectiva port, e refatorar `src/infra/store/school.store.ts` para implementá-la
- [x] 2.4 Criar `src/common/ports/class.store.port.ts` com a respectiva port, e refatorar `src/infra/store/class.store.ts` para implementá-la

## 3. Fluxo de Inicialização (Splash)

- [x] 3.1 Criar `src/infra/initialization/initialization.http.adapter.ts` implementando a interface já existente `InitializationPort`
- [x] 3.2 O adapter criado no passo 3.1 deve executar as consultas HTTP (`Bimesters`, `Schools`, `Classes`) simultaneamente usando o `FetchAdapter` e alimentar as respectivas Stores do Zustand
- [x] 3.3 Refatorar `useSplashViewModel.ts` para receber via Injeção de Dependência o `initializationAdapter` no formato Default Parameter (apontando pro `http.adapter` ao invés do `simulator`)
- [x] 3.4 Validar o tratamento de erros da inicialização no Splash, assegurando que o app prossiga ao invés de ficar travado infinitamente

## 4. Refatoração de ViewModels Existentes

- [x] 4.1 Identificar demais componentes/ViewModels que acoplam a Store diretamente (ex: `HomeViewModel`, ou views que chamam `useBimesterStore`)
- [x] 4.2 Alterar assinatura destas ViewModels para receber as `StorePorts` via Default Parameters
- [x] 4.3 Refatorar o action flow nas mutations da ViewModel (como fechar um bimestre): chamar método optimistic na store -> fazer requisição HTTP -> caso throw, acionar rollback da store.

## 5. Atualização das Regras de IA (.agents/rules)

- [x] 5.1 Atualizar `01-architecture-domain.md` reforçando a proibição de acoplamento direto das Views e ViewModels à lib do Zustand e obrigando a Dependency Injection
- [x] 5.2 Atualizar `03-state-ai-simulation.md` detalhando as instruções para criar `StorePorts` com o wildcard genérico `<U>(selector)` 
- [x] 5.3 Documentar em `03-state-ai-simulation.md` a abordagem Stale-While-Revalidate com Optimistic Rollback manual, sinalizando a restrição a `swr` ou `react-query`
