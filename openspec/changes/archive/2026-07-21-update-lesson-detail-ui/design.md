## Context

Atualmente, a tela de detalhes de aula (`LessonDetailFeature`) exibe as atividades sugeridas pela IA de forma estática. Não há interatividade para marcar como concluído, nem forma de o professor editar, recalibrar ou remover essas atividades. A adição de um "Modo de Edição" é necessária para permitir a personalização do plano de aula, o que agregará mais valor ao conteúdo gerado pela IA.

## Goals / Non-Goals

**Goals:**
- Implementar estado local/view model para controle do "Modo Edição" (`isEditing`).
- Adicionar ação "Concluir" (com toggle) às atividades na visualização padrão.
- Adicionar ações "Recalibrar exercício ✨" e "Excluir" às atividades quando em modo de edição.
- Trocar o texto da tag de IA para "Modo edição 👀" quando ativo.
- Substituir o botão "Customizar ✨" por "Salvar alterações" (estilo solid) quando ativo.
- Integrar a ação de recalibrar com o componente `GenericBottomSheet` (com conteúdo placeholder).

**Non-Goals:**
- Integração real com API ou IA neste primeiro momento (as ações de salvar e recalibrar serão mockadas).
- Alterações em outras telas além de `LessonDetailFeature`.

## Decisions

- **Gerenciamento de Estado**: O estado `isEditing` será mantido no hook `useLessonDetailViewModel` ou localmente no próprio componente, dependendo da necessidade de acessá-lo em outros componentes. Como a interface inteira muda com base nele e ações como "Salvar" afetam os dados mockados, será inserido no `useLessonDetailViewModel`.
- **Estilo dos Botões das Atividades**: Serão utilizados os componentes `Button` do design system com a `variant="outline"` (vazada, fundo transparente, bordas correspondentes e texto).
- **BottomSheet de Recalibragem**: Será importado o componente padrão da especificação `generic-bottom-sheet` já existente (ou adaptado se necessário) para a ação de "Recalibrar".
- **Toggle de Conclusão**: O modelo de dados das atividades local (mockado) deverá suportar a propriedade `completed: boolean`. 

## Risks / Trade-offs

- **Complexidade do Componente Visual**: A tela `LessonDetailFeature` pode ficar extensa com a lógica de renderização condicional entre modo leitura e edição.
  - *Mitigação*: Se necessário, extrair a renderização do item da lista de exercícios para um sub-componente `LessonActivityItem`.
- **Estado Mockado vs Real**: A ação de salvar vai mockar um "recompute" que posteriormente será assíncrono.
  - *Mitigação*: Deixar a função `onSave` assíncrona, simulando o delay de API com `setTimeout`, para facilitar a integração futura.
