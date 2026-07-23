## Context

O backend do Lumin AI atualizou o contrato do endpoint `/class-plans`. Em particular:
1. O objeto `lesson` envia um campo `aiSuggestions` contendo uma string informativa com sugestões de condução de aula geradas por IA com base no perfil da turma.
2. Cada objeto no array `activities` contém o campo `duration`, representando a duração estimada em minutos (tipo `number`).

Atualmente, no frontend:
- `Activity` / `ActivityDto` não mapeiam `duration`.
- `Lesson` / `LessonDto` definem `aiSuggestions` como `boolean`, mas não exibem seu conteúdo de texto na interface.
- `LessonDetailFeature` não exibe a duração da atividade nem o texto de `aiSuggestions`.

## Goals / Non-Goals

**Goals:**
- Atualizar a tipagem de domínio (`Activity`, `Lesson`) e DTOs (`ActivityDto`, `LessonDto`) para suportar os novos tipos de dados do contrato.
- Atualizar o mapper `class-plan.mapper.ts` para repassar `duration` e `aiSuggestions`.
- Exibir a mensagem descritiva de `aiSuggestions` logo abaixo da tag "Sugestões geradas com IA ✨".
- Exibir no rodapé do card de cada atividade (em `localActivities`) o ícone `Clock` da biblioteca `lucide-react-native` acompanhado do tempo (ex: `30 min`).

**Non-Goals:**
- Alterar o comportamento dos fluxos de edição, exclusão ou recalibração das atividades.
- Fazer chamadas a novas rotas de API não especificadas no contrato.

## Decisions

1. **Tipagem de `aiSuggestions`**:
   - Alterar em `LessonDto` e `Lesson` para `string | boolean | undefined` (ou `string | undefined`), tratando com segurança `typeof lesson.aiSuggestions === "string"` no componente visual para renderização.
   - *Alternativa considerada*: Forçar estritamente `string`. *Razão da escolha*: Manter flexibilidade caso versões legadas ou testes mockados passem booleanos ou nulos.

2. **Exibição da Duração da Atividade (`activity.duration`)**:
   - Exibir no rodapé da atividade um container flex em linha alinhado (`flex-row items-center gap-1.5`) utilizando o ícone `Clock` de `lucide-react-native` com tamanho 14-16px.
   - Posição: Alinhado à direita ou junto às ações da atividade em `localActivities`.

3. **Manutenção do `localActivities` em Edição**:
   - `localActivities` preserva o objeto `Activity` completo, garantindo que edições (toggle, recalibração) não percam o valor de `duration`.

## Risks / Trade-offs

- **[Risco]** Atividades antigas ou dados legados onde `duration` seja nulo/indefinido.
  → **Mitigação**: Renderizar a tag/badge de duração condicionalmente (`{activity.duration ? <View>...</View> : null}`).
- **[Risco]** `aiSuggestions` recebendo valor booleano ou nulo em dados antigos.
  → **Mitigação**: Renderizar o bloco de texto apenas quando `typeof lesson.aiSuggestions === "string" && lesson.aiSuggestions.length > 0`.
