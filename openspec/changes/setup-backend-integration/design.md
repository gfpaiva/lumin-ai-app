## Context
O sistema atualmente depende de mocks em `initializationSimulatorAdapter` e nas Stores (`bimester.store`, `school.store`, `class.store`) para responder a interações da interface e inicializar. O backend (`lumin-ai-backend`) já se encontra modelado com contratos definidos no `api-collection`.
Para integrar de maneira escalável, adotaremos uma Arquitetura Hexagonal rigorosa onde a comunicação HTTP e as Stores globais atuarão atrás de interfaces (Ports), permitindo um sistema Injeção de Dependências puro e desacoplado nas ViewModels.

## Goals / Non-Goals

**Goals:**
- Prover a fundação de rede (`HttpPort` e `FetchAdapter`) para o App.
- Garantir que as ViewModels consumam as Stores (Zustand) via abstração (`StorePorts`) através de parâmetros default (DI).
- Estabelecer um padrão de `SWR` e `Optimistic UI` que vive puramente na relação Store <-> ViewModel, proporcionando a melhor experiência sem dependências extras.
- Substituir o mock do Splash Screen por fetch real de Bimesters, Schools e Classes.

**Non-Goals:**
- Adotar/instalar bibliotecas de cache externas (`swr`, `@tanstack/react-query`). O app suportará o fluxo nativamente com Zustand.

## Decisions

- **Adapter HTTP (FetchAdapter):** A Fetch API nativa foi escolhida pela simplicidade. Um `AbortController` global definirá o limite de 60s sugerido. Os headers de autorização e base URL estarão concentrados neste arquivo.
- **Zustand Hook Interface (StorePorts):** Tiparemos o hook através da assinatura genérica `<U>(selector)` para que as ViewModels não referenciem os tipos internos do Zustand (`UseBoundStore`, `StoreApi`).
- **Lógica de SWR e Optimistic UI:** A View exibirá a Store. A ViewModel fará a ação otimista chamando `actionOptimistic()` na Store (que retorna o estado anterior), em seguida despachará o request para a API; se falhar, aciona `rollback()`.
- **Regras da IA (.agents):** Como essa mudança estabelece novos paradigmas que devem ser estritamente seguidos, eles serão adicionados aos arquivos de regras da IA da arquitetura.

## Risks / Trade-offs

- [Tipagem Boilerplate] → As abstrações de `StorePort` exigem mais arquivos e definições de interfaces. Mitigação: Documentação clara em `.agents/rules` para que as automações e IAs escrevam com precisão.
- [Complexidade de Rollback Manual] → Implementar SWR manual expõe a complexidade do rollback nas mutations se houver updates simultâneos. Mitigação: A Store manterá o rollback atômico e as funções otimistas sempre retornarão um snapshot pontual do estado anterior.
