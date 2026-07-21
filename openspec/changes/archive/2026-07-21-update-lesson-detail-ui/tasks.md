## 1. Atualização dos Modelos de Dados e ViewModel

- [x] 1.1 Adicionar propriedade opcional `completed?: boolean` na interface `Activity` em `useLessonViewModel.ts`.
- [x] 1.2 No `useLessonDetailViewModel.ts`, adicionar estado local para `isEditing` e expor funções `toggleEditMode` e `saveChanges`.
- [x] 1.3 No `useLessonDetailViewModel.ts`, criar estado local derivado de `lesson.activities` para permitir manipulação temporária (concluir toggle e remover atividade) sem alterar o mock global caso o salvamento falhe (ou alterar o mock global se preferir pela simplicidade).

## 2. Atualização da UI (LessonDetailFeature)

- [x] 2.1 Adicionar botão de "Customizar ✨" / "Salvar alterações" na parte inferior da tela, reagindo ao estado `isEditing`.
- [x] 2.2 Atualizar a Tag superior: exibir "Modo edição 👀" quando `isEditing` for true.
- [x] 2.3 Em cada `activity` renderizada, adicionar o botão "Concluir" (com ícone check) para o modo padrão.
- [x] 2.4 Em cada `activity` renderizada, substituir o "Concluir" pelos botões "Recalibrar exercício ✨" e "Excluir" (com ícone X) quando `isEditing` for true.

## 3. Integração do Bottom Sheet

- [x] 3.1 Importar e instanciar o componente `GenericBottomSheet` (ou equivalente da pasta components/specs).
- [x] 3.2 Conectar a ação "Recalibrar exercício ✨" para abrir o Bottom Sheet contendo o texto placeholder.
