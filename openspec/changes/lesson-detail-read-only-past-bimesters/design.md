## Context

O app Lumin.AI utiliza a arquitetura Hexagonal + MVVM (Custom Hooks) + Feature Slices. A seleção de bimestres é mantida na `bimesterStore` (`src/infra/store/bimester.store.ts`), que contém a lista de bimestres (`bimesters`) e o ID do bimestre atualmente selecionado (`selectedBimesterId`). Cada bimestre possui um status (`"done" | "in_progress" | "locked"`).

A tela de detalhe da aula é orquestrada pelo ViewModel `useLessonDetailViewModel` e renderizada pelo componente visual `LessonDetailFeature`.

## Goals / Non-Goals

**Goals:**
- Prover a flag `isReadOnly` no ViewModel `useLessonDetailViewModel`, ativada quando o bimestre selecionado não estiver em andamento (`status !== "in_progress"`).
- Ocultar botões de edição/customização ("Customizar ✨" / "Salvar alterações") na View `LessonDetailFeature` quando `isReadOnly` for `true`.
- Garantir que as ações de conclusão de atividade sejam exibidas de forma puramente visual (sem resposta ao toque / `onPress` desativado) quando em modo `isReadOnly`.

**Non-Goals:**
- Modificar o fluxo de seleção ou conclusão de bimestres no `BimesterSelectorBottomSheet`.
- Alterar APIs REST ou DTOs de backend.
- Alterar o comportamento da tela de lista de aulas (`ClassDetailFeature`).

## Decisions

### Decisão 1: Derivação Reativa de `isReadOnly` no ViewModel (`useLessonDetailViewModel`)
- **Abordagem**: Obter `selectedBimester` via selector da `bimesterStore` e derivar `isReadOnly`:
  ```ts
  const selectedBimester = useMemo(
    () => bimesters.find((b) => b.id === activeBimesterId),
    [bimesters, activeBimesterId],
  );
  const isReadOnly = selectedBimester ? selectedBimester.status !== "in_progress" : false;
  ```
- **Raciocínio**: Manter a regra no ViewModel garante o desacoplamento da UI (View "dumb") de acordo com o padrão MVVM estabelecido no projeto.

### Decisão 2: Renderização Visual Estática em `LessonDetailFeature`
- **Abordagem**: Quando `isReadOnly` for `true`:
  1. Ocultar o contêiner inferior com o botão de customização/salvamento.
  2. Forçar `isEditing = false` ou desabilitar alternância para modo de edição.
  3. Renderizar o badge de conclusão como um componente `View` ou `Pressable` com `disabled={true}` sem handler de `onPress`.
- **Raciocínio**: Mantém a paridade visual (o professor ainda consegue ver quais atividades foram concluídas no passado) sem permitir mutações acidentais no histórico.

## Risks / Trade-offs

- **[Risco]** Troca de bimestre enquanto a tela de detalhes está aberta.
  - *Mitigação*: Como a `bimesterStore` é reativa via Zustand, a atualização do `selectedBimesterId` reavalia `isReadOnly` instantaneamente, atualizando a UI em tempo real.
