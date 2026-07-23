## 1. Componente Genérico EmptyState

- [x] 1.1 Criar `src/components/empty-state.tsx` com props `icon`, `title`, `description` e slot `children` para CTA
- [x] 1.2 Extrair a lógica de animação (anéis orbitais + breathing scale) do `ClassEmptyState` para dentro do `EmptyState`
- [x] 1.3 Garantir que o ícone central é configurável via prop `icon` (LucideIcon)

## 2. Refatoração do ClassEmptyState

- [x] 2.1 Refatorar `src/features/home/components/ClassEmptyState.tsx` para usar o `EmptyState` genérico (sem animações próprias)
- [x] 2.2 Validar que a UI do `ClassEmptyState` permanece visualmente idêntica após refatoração

## 3. SchoolBottomSheet — suporte a initialView

- [x] 3.1 Adicionar prop opcional `initialView?: ViewState` em `SchoolBottomSheet` com default `"list"`
- [x] 3.2 Passar `initialView` para `useSchoolViewModel` como estado inicial do `activeView`
- [x] 3.3 Garantir que o `useEffect` de reset ao fechar continua funcionando corretamente (independente do `initialView`)

## 4. SchoolEmptyState

> Depende de: Tarefa 1 (EmptyState genérico) e Tarefa 3 (SchoolBottomSheet com initialView)

- [x] 4.1 Criar `src/features/home/components/SchoolEmptyState.tsx` usando `EmptyState` com ícone `SchoolIcon`, título e descrição adequados
- [x] 4.2 Adicionar botão "Cadastrar escola" como `children` que ao ser pressionado aciona `onAddSchool`
- [x] 4.3 Definir interface de props com `onAddSchool: () => void`

## 5. useHomeViewModel — exposição de hasSchools

> Pode ser desenvolvido em paralelo com as Tarefas 1–4

- [x] 5.1 Acessar `useSchoolStore` dentro de `useHomeViewModel` e derivar `hasSchools: boolean` (schools.length > 0)
- [x] 5.2 Expor `hasSchools` no retorno do hook
- [x] 5.3 Expor `isSchoolSheetOpen` e `setIsSchoolSheetOpen` no retorno do hook (caso ainda não estejam expostos — verificar)

## 6. HomeFeature — lógica condicional

> Depende de: Tarefas 3, 4 e 5

- [x] 6.1 Consumir `hasSchools` via `useHomeViewModel` em `HomeFeature`
- [x] 6.2 Renderizar `SchoolEmptyState` quando `hasSchools === false`, passando callback que abre `SchoolBottomSheet` com `initialView="form"`
- [x] 6.3 Ocultar `SchoolSelector` quando `hasSchools === false`
- [x] 6.4 Ocultar `BottomAction` quando `hasSchools === false`
- [x] 6.5 Ocultar `ClassEmptyState` quando `hasSchools === false` (a lista não deve ser exibida nesse cenário)

## 7. Testes

> Depende de: todas as tarefas anteriores

- [x] 7.1 Escrever testes unitários para `EmptyState` (renderiza ícone, título, descrição e children) — (Pulado a pedido do usuário)
- [x] 7.2 Escrever testes unitários para `SchoolEmptyState` (renderiza corretamente e aciona `onAddSchool`) — (Pulado a pedido do usuário)
- [x] 7.3 Escrever/atualizar testes de `useHomeViewModel` para cobrir `hasSchools` — (Pulado a pedido do usuário)
- [x] 7.4 Escrever/atualizar testes de `HomeFeature` para os dois cenários: sem escolas (SchoolEmptyState visível) e com escolas (conteúdo normal visível) — (Pulado a pedido do usuário)
