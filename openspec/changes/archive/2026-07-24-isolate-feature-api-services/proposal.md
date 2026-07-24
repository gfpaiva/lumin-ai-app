## Why

Atualmente, os ViewModels (`useSchoolViewModel`, `useLessonDetailViewModel`, `useClassDetailViewModel`, `useClassFormViewModel`, `useBimesterSelectorViewModel`, `useHomeViewModel`) executam chamadas REST diretas instanciando o `HttpPort` / `FetchAdapter`, contendo URLs hardcoded, tratamento de verbos HTTP, mapeamentos DTO <-> Domínio e tratamento de exceções de rede misturados à lógica de UI/estado de tela.

Isso viola o Princípio de Responsabilidade Única (SRP), prejudica a testabilidade (exigindo mockar URLs genéricas de HTTP em testes de ViewModels) e dificulta a manutenção e reutilização da camada de dados. Isolando a integração HTTP em **Services por Feature** (`src/features/[feature]/api/[feature].service.ts` e `[feature].service.port.ts`), os ViewModels tornam-se limpos e focados na orquestração da apresentação, e as regras de arquitetura no diretório `.agents/` garantem que futuros agentes de IA e desenvolvedores sigam rigorosamente este padrão.

## What Changes

- **Isolamento da camada de API nas Features**: Criação de `api/[feature].service.port.ts` e `api/[feature].service.ts` dentro de cada feature slice (`school`, `class`, `lesson`, `bimester`).
- **Refatoração dos ViewModels**: Remoção de chamadas genéricas diretas ao `HttpPort`/`FetchAdapter` dos ViewModels, delegando todas as operações para os novos API Services injetados por parâmetro default.
- **Mapeamento e DTOs reestruturados**: Movimentação dos DTOs e chamadas de Mapper para dentro dos Services de API das respetivas features.
- **Atualização das Regras e Instruções do Agente de IA**: Atualização dos documentos `.agents/instructions.md`, `.agents/rules/01-architecture-domain.md` e `.agents/rules/03-state-ai-simulation.md` para explicitar a obrigatoriedade da estrutura de serviços de API por feature e proibir chamadas de HTTP diretamente nos ViewModels.

## Capabilities

### New Capabilities
- `feature-api-services`: Camada de serviços de API desacoplada por feature (`src/features/[feature]/api/`) provendo contratos (Ports), implementação concreta via `HttpPort` e isolamento dos Mappers/DTOs.

### Modified Capabilities
<!-- Nenhuma capability existente de spec precisa de alteração de requisitos funcionais -->

## Impact

- **Código Afetado**: `src/features/school/`, `src/features/class/`, `src/features/lesson/`, `src/features/bimester/`, `src/features/home/`.
- **Arquivos de Regra AI Afetados**: `.agents/instructions.md`, `.agents/rules/01-architecture-domain.md`, `.agents/rules/03-state-ai-simulation.md`.
- **Testes**: Suíte de testes Jest de ViewModels e novos testes unitários para cada Service.
