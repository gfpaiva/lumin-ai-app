## Context

Atualmente no `LessonDetailFeature.tsx`, quando a tela entra no modo de edição (`isEditing === true`), o renderizador de ações de atividade ignora o estado `activity.completed` e renderiza para todas as atividades os botões "Recalibrar atividade ✨" e "Excluir".

## Goals / Non-Goals

**Goals:**
- Ajustar a renderização condicional das ações de cada atividade em `LessonDetailFeature.tsx` levando em consideração tanto `isEditing` quanto `activity.completed`.
- Quando `isEditing` for `true` e `activity.completed` for `true`, exibir uma tag/badge estática de "Concluído" (sem handlers de clique de recalibração ou remoção).
- Manter o comportamento existente para atividades não concluídas (`isEditing === true` e `activity.completed === false`), onde os botões de recalibrar e excluir continuam ativos.

**Non-Goals:**
- Alterar as regras do ViewModel `useLessonDetailViewModel` ou a lógica de conclusão de atividades no repositório/store.
- Modificar o Bottom Sheet de recalibração ou contratos de API.

## Decisions

### Decisão 1: Exibir Tag Estática em vez de Ocultar Completamente (Opção B)
- **Escolha**: Em modo de edição, se a atividade estiver concluída, exibe-se um elemento estático `<View>` estilizado como o indicador de concluído (borda primária, fundo transparente/suave, texto "Concluído" e ícone `Check`).
- **Alternativas consideradas**:
  - *Opção A (Ocultar totalmente)*: Deixar o container sem nenhum botão. Foi descartado pois deixaria o usuário em dúvida sobre o status daquela atividade no modo de edição.
- **Racional**: A tag estática comunica visualmente de forma clara que a atividade foi finalizada e por isso não pode ser alterada ou excluída no modo de edição.

## Risks / Trade-offs

- **[Risco]** Confusão visual se a tag estática parecer clicável.
  - **Mitigação**: Renderizar como um `<View>` (e não um `<Pressable>`), sem feedback ao toque, podendo aplicar opacidade suave se necessário para indicar estado informativo.
