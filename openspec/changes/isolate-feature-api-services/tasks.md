## 1. Criação dos Serviços de API por Feature

- [x] 1.1 Criar `src/features/school/api/school.service.port.ts` e `src/features/school/api/school.service.ts` para abstrair chamadas de rede de escolas.
- [x] 1.2 Criar `src/features/class/api/class.service.port.ts` e `src/features/class/api/class.service.ts` para abstrair chamadas de turmas e planos.
- [x] 1.3 Criar `src/features/lesson/api/lesson.service.port.ts` e `src/features/lesson/api/lesson.service.ts` para abstrair requisições de aula e recalibração.
- [x] 1.4 Criar `src/features/bimester/api/bimester.service.port.ts` e `src/features/bimester/api/bimester.service.ts` para abstrair busca de bimestres.

## 2. Refatoração dos ViewModels

- [x] 2.1 Refatorar `useSchoolViewModel.ts` para utilizar `SchoolApiService` através de injeção de dependência.
- [x] 2.2 Refatorar `useClassDetailViewModel.ts` e `useClassFormViewModel.ts` para utilizar `ClassApiService`.
- [x] 2.3 Refatorar `useLessonDetailViewModel.ts` para utilizar `LessonApiService`.
- [x] 2.4 Refatorar `useBimesterSelectorViewModel.ts` para utilizar `BimesterApiService`.
- [x] 2.5 Refatorar `useHomeViewModel.ts` removendo qualquer dependência direta de `FetchAdapter`.

## 3. Atualização das Regras e Instruções da IA (`.agents/`)

- [x] 3.1 Atualizar `.agents/rules/01-architecture-domain.md` descrevendo a pasta `api/` por feature com `.service.port.ts` e `.service.ts`.
- [x] 3.2 Atualizar `.agents/rules/03-state-ai-simulation.md` especificando o fluxo obrigatório `View -> ViewModel -> Service -> HttpPort`.
- [x] 3.3 Atualizar `.agents/instructions.md` com as novas referências de arquitetura de serviços.

## 4. Testes e Validação

- [ ] 4.1 Criar testes unitários em Jest para os novos serviços em `src/features/[feature]/api/*.spec.ts`.
- [ ] 4.2 Atualizar e executar os testes existentes dos ViewModels garantindo que passam 100%.
- [ ] 4.3 Executar `pnpm test` e `pnpm type-check` para validar ausência de erros de compilação ou regressões.
