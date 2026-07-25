## 1. ViewModel & Lógica de Negócio

- [x] 1.1 Atualizar `useLessonDetailViewModel.ts` para capturar `selectedBimester` da `bimesterStore` e calcular a flag `isReadOnly` (`selectedBimester?.status !== "in_progress"`).
- [x] 1.2 Expor `isReadOnly` no retorno do hook `useLessonDetailViewModel`.

## 2. Interface do Usuário (UI & Interatividade)

- [x] 2.1 Ocultar a barra/botão inferior de customização ("Customizar ✨" / "Salvar alterações") em `LessonDetailFeature.tsx` quando `isReadOnly` for `true`.
- [x] 2.2 Renderizar os botões de conclusão das atividades de forma puramente visual (sem handler `onPress` ou com `disabled={true}`) quando `isReadOnly` for `true`.

## 3. Testes & Validação

- [x] 3.1 Criar ou atualizar testes unitários do `useLessonDetailViewModel` cobrindo o comportamento do modo `isReadOnly` para bimestres em andamento e concluídos.
- [x] 3.2 Executar verificação de tipos e testes do projeto com pnpm.
