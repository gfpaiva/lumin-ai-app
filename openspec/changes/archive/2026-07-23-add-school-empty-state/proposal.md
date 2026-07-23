## Why

Atualmente, a tela Home não trata o cenário em que o professor ainda não cadastrou nenhuma escola. Nesse estado, o `SchoolSelector` é exibido com texto sem sentido ("Selecionar escola"), o `ClassEmptyState` aparece com a mensagem errada ("Nenhuma turma") e o botão de nova turma fica visível sem contexto — criando uma experiência confusa e visualmente inconsistente.

## What Changes

- **[NEW]** Componente genérico `EmptyState` em `src/components/` com suporte a ícone, título, descrição e CTA via `children`
- **[MODIFY]** `ClassEmptyState` refatorado para usar o novo `EmptyState` genérico
- **[NEW]** Componente `SchoolEmptyState` na feature home, usando `EmptyState` com botão "Cadastrar escola"
- **[MODIFY]** `SchoolBottomSheet` passa a aceitar prop `initialView?: ViewState` para abrir diretamente no formulário
- **[MODIFY]** `useHomeViewModel` expõe `hasSchools: boolean` (derivado da school store) para controle de renderização condicional
- **[MODIFY]** `HomeFeature` trata o estado `hasSchools === false`: oculta `SchoolSelector`, `ClassEmptyState` e `BottomAction`; exibe `SchoolEmptyState`

## Capabilities

### New Capabilities
- `school-empty-state`: Estado vazio da tela home quando não há escolas cadastradas, com CTA direto para cadastro de escola via BottomSheet no formulário

### Modified Capabilities
- `home-page`: A home page agora possui lógica de ramificação entre "sem escolas" e "com escolas", alterando quais elementos são visíveis em cada cenário
- `school-management`: O `SchoolBottomSheet` passa a aceitar `initialView` para abertura direta no formulário, sem passar pela lista

## Impact

- `src/components/empty-state.tsx` — novo arquivo
- `src/features/home/components/ClassEmptyState.tsx` — refatoração para usar `EmptyState`
- `src/features/home/components/SchoolEmptyState.tsx` — novo arquivo
- `src/features/home/components/HomeFeature.tsx` — lógica condicional por `hasSchools`
- `src/features/home/hooks/useHomeViewModel.ts` — expõe `hasSchools`
- `src/features/school/components/SchoolBottomSheet.tsx` — prop `initialView`
