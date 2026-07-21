## 1. Store & Data (Zustand)

- [x] 1.1 Criar a pasta `src/features/school/stores/` e definir o `useSchoolStore.ts`.
- [x] 1.2 Implementar dados mockados iniciais de escolas no store (id, nome, categoria, numero_turmas).
- [x] 1.3 Adicionar actions no store para `selectSchool(id)` e `addSchool(school)`.

## 2. UI Components do BottomSheet

- [x] 2.1 Criar componente `SchoolBottomSheet.tsx` utilizando o componente `GenericBottomSheet` (reaproveitamento da fundação visual).
- [x] 2.2 Criar `SchoolListView.tsx` para mapear e renderizar a lista de escolas.
- [x] 2.3 Adicionar lógica visual na lista: ícone de check na escola selecionada e desabilitar o clique nela.
- [x] 2.4 Criar botão "Cadastrar escola" ao final da lista e mapear clique para trocar a view.
- [x] 2.5 Criar formulário `SchoolFormView.tsx` (utilizando KeyboardAvoidingView e componentes de formulário do Gluestack) com nome e categoria.
- [x] 2.6 Orquestrar transição `list` <-> `form` dentro de `SchoolBottomSheet`.
- [x] 2.7 Resetar estado interno do bottom sheet para `list` sempre que ele for fechado.

## 3. Integração com Home

- [x] 3.1 Refatorar `SchoolSelector.tsx` para consumir escola da `useSchoolStore` e abrir o `SchoolBottomSheet` ao ser clicado, removendo lógica legada de dropdown.
- [x] 3.2 Validar usabilidade do teclado (KeyboardAvoidingView) com o BottomSheet aberto.
