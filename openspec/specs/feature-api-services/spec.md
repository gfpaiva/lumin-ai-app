# Feature API Services

## Requirements

### Requirement: Isolamento das chamadas de API em serviços por feature
A aplicação DEVE possuir uma camada dedicada de serviços de API em cada slice de feature (`src/features/[feature]/api/`), contendo o contrato da interface (`[feature].service.port.ts`) e a implementação concreta (`[feature].service.ts`), que abstrai o cliente HTTP genérico e orquestra o mapeamento DTO-Domínio.

#### Scenario: Chamada de API encapsulada pelo serviço da feature
- **WHEN** uma operação de API (como buscar planos de aula, salvar escolas ou recadastrar uma turma) for necessária
- **THEN** a chamada DEVE ser executada pelo respectivo `[Feature]ApiService`, utilizando o `HttpPort` e retornando dados já convertidos pelos Mappers para as entidades de Domínio.

### Requirement: ViewModels desacoplados de infraestrutura HTTP direta
Os ViewModels (Custom Hooks em `src/features/[feature]/hooks/`) NÃO DEVEM importar ou instanciar diretamente o `FetchAdapter` ou montar URLs REST hardcoded em seus callbacks.

#### Scenario: Injeção do serviço de API no ViewModel
- **WHEN** o ViewModel for instanciado ou executado
- **THEN** ele DEVE receber a interface do `[Feature]ServicePort` via parâmetro opcional com fallback para a instância padrão do serviço da feature, delegando para este as chamadas de backend.

### Requirement: Atualização e enforcement das regras de arquitetura para IA
As diretrizes e instruções de arquitetura do repositório (`.agents/instructions.md`, `.agents/rules/01-architecture-domain.md` e `.agents/rules/03-state-ai-simulation.md`) DEVEM ser atualizadas para documentar e impor a obrigatoriedade da camada `api/` com `ServicePort` e `ApiService` em cada feature slice.

#### Scenario: Orientação do agente de IA sobre novos desenvolvimentos
- **WHEN** um agente de IA ou desenvolvedor for criar uma nova integração com backend
- **THEN** as regras dos diretórios `.agents/` DEVEM instruir categoricamente que a integração ocorra via `features/[feature]/api/[feature].service.ts` e seja injetada no ViewModel.
