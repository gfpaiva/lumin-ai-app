## Context

A tela Home exibe uma lista de turmas filtradas pela escola selecionada. Atualmente não existe tratamento para o cenário onde `schools.length === 0` — o que resulta em uma interface confusa com o `SchoolSelector` exibindo "Selecionar escola" sem ação útil e o `ClassEmptyState` aparecendo com mensagem errada.

O sistema já possui o `ClassEmptyState` com uma linguagem visual animada (anéis orbitais + ícone central) que deve ser generalizada em um componente reutilizável.

## Goals / Non-Goals

**Goals:**
- Criar um componente genérico `EmptyState` em `src/components/` reutilizável via props + `children`
- Refatorar `ClassEmptyState` para consumir o `EmptyState` genérico
- Criar `SchoolEmptyState` que abre o formulário de cadastro diretamente
- Ocultar `SchoolSelector`, `BottomAction` e `ClassEmptyState` quando não há escolas
- Expor `hasSchools` via `useHomeViewModel` (sem acessar store diretamente nos componentes)
- Permitir que `SchoolBottomSheet` abra diretamente no formulário via `initialView`

**Non-Goals:**
- Criar um estado de loading para a busca de escolas
- Alterar o fluxo de cadastro de escola (formulário, validação, API)
- Tratar estado de erro na busca de escolas

## Decisions

### 1. Componente `EmptyState` genérico com `children` para CTA

**Decisão:** `EmptyState` aceita `icon`, `title`, `description` como props e `children` como slot opcional para o CTA (botão ou qualquer elemento).

**Alternativas consideradas:**
- Props puras com `action?: ReactNode` — equivalente ao `children`, mas menos idiomático no React Native
- Composição via sub-componentes (`EmptyState.Icon`, `EmptyState.Title`) — desnecessariamente complexo para apenas 2 casos de uso

**Rationale:** `children` como slot de CTA é o padrão mais simples que cobre os requisitos sem over-engineering.

---

### 2. `hasSchools` exposto via `useHomeViewModel`

**Decisão:** `useHomeViewModel` acessa a school store internamente e expõe `hasSchools: boolean`.

**Alternativas consideradas:**
- `HomeFeature` chamar `useSchoolStore` diretamente — viola o padrão MVVM adotado no projeto (componentes não acessam stores diretamente)
- Criar um hook dedicado `useSchoolEmptyState` — overhead desnecessário para um valor derivado simples

**Rationale:** Mantém a arquitetura MVVM consistente; `HomeFeature` só lida com lógica de UI.

---

### 3. `SchoolBottomSheet` aceita `initialView?: ViewState`

**Decisão:** Nova prop opcional `initialView` com default `"list"`.

**Alternativas consideradas:**
- Criar um segundo bottomsheet dedicado para criação — duplicação desnecessária
- Controlar o `activeView` de fora via ref/callback — viola encapsulamento

**Rationale:** Extensão mínima e backward-compatible do contrato existente do `SchoolBottomSheet`.

---

### 4. `SchoolEmptyState` vive em `src/features/home/components/`

**Decisão:** O componente fica na feature `home`, não em `school`.

**Rationale:** O `SchoolEmptyState` é uma variação do layout da home — ele usa o `EmptyState` genérico mas seu contexto e CTA são específicos da tela home. A lógica de abertura do bottomsheet pertence à `HomeFeature`.

## Risks / Trade-offs

- **`useSchoolStore` chamado em dois hooks (`useHomeViewModel` + `useSchoolViewModel`)** → Ambos acessam a mesma store Zustand — sem risco de inconsistência por serem reativas à mesma fonte de verdade. Sem mitigação necessária.
- **Prop `initialView` ignora o `useEffect` de reset** → O `useSchoolViewModel` reseta `activeView` para `"list"` ao fechar o sheet. Isso é correto: na próxima abertura via `SchoolSelector`, o default volta a ser `"list"`. O `initialView` só define o estado inicial da montagem, não interfere no reset.
