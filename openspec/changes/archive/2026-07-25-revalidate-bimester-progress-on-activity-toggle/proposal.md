## Why

Atualmente, ao concluir ou alternar o estado de conclusão de uma atividade em uma aula (`toggleActivityCompletion`), a `LessonStore` é atualizada com sucesso, mas o progresso consolidado do bimestre mantido na `BimesterStore` fica desatualizado (defasado). Como o frontend não carrega em memória todas as turmas do bimestre simultaneamente, a atualização do progresso agregado do bimestre exige uma revalidação silenciosa em segundo plano junto ao backend.

## What Changes

- Adicionada revalidação assíncrona em background do progresso dos bimestres na `BimesterStore` após o encerramento bem-sucedido de `toggleActivityCompletion` no `useLessonDetailViewModel`.
- A chamada em segundo plano dispara `bimesterService.getBimesters()` sem bloquear a interface ou a conclusão da atividade no frontend.
- Falhas na requisição de background são capturadas de forma silenciosa, sem exibir erros ao usuário nem desfazer a alteração da atividade.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `bimester-management`: Atualização e revalidação assíncrona em background do progresso do bimestre selecionado ao alternar a conclusão de atividades de aula.

## Impact

- `src/features/lesson/hooks/useLessonDetailViewModel.ts`: Receberá `BimesterServicePort` (com fallback para `bimesterApiService`) e disparará o re-fetch dos bimestres após o toggle da atividade.
- `src/features/bimester/api/bimester.service.ts`: Utilizado para buscar a lista atualizada de bimestres.
- `src/infra/store/bimester.store.ts`: Receberá o payload atualizado via `setBimesters`.
