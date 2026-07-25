## Why

Atualmente, quando os professores navegam para bimestres passados (concluídos/`done`), a tela de detalhe da aula ainda permite alternar o status de conclusão das atividades e acionar o modo de customização. Para garantir a integridade do histórico letivo e a consistência da experiência do usuário, bimestres finalizados devem ser estritamente em modo de apenas leitura (*read-only*).

## What Changes

- **Restrição de Edição em Bimestres Concluídos**: Desabilita o modo de edição na tela de detalhes da aula quando o bimestre selecionado for um bimestre passado (concluído/`done`, ou seja, `status !== "in_progress"`).
- **Ocultação dos Botões de Customização**: O botão principal "Customizar ✨" / "Salvar alterações" no rodapé da tela de detalhe da aula não deve ser exibido para bimestres concluídos.
- **Ações de Conclusão Apenas Visuais**: Os botões/badges de conclusão das atividades ("Concluir" / "Concluído") devem ser exibidos de forma puramente visual (estáticos, sem ação de clique/onPress) quando em modo *read-only*.
- **ViewModel Aware of Read-Only State**: Atualização do `useLessonDetailViewModel` para derivar o estado `isReadOnly` com base no `selectedBimester` obtido da `bimesterStore`.

## Capabilities

### New Capabilities
<!-- Nenhuma nova funcionalidade raiz criada -->

### Modified Capabilities
- `lesson-details`: Restrição de edição e interatividade em aulas pertencentes a bimestres passados/concluídos (`status !== "in_progress"`).

## Impact

- **Código Afetado**: `src/features/lesson/hooks/useLessonDetailViewModel.ts` e `src/features/lesson/components/LessonDetailFeature.tsx`.
- **APIs / Data**: Nenhuma mudança no contrato de API backend.
- **Especificações**: Atualização da spec em `openspec/specs/lesson-details/spec.md`.
