## Context

O `LessonDetailFeature` já possui um `GenericBottomSheet` com título "Recalibrar Exercício", aberto quando o professor toca em "Recalibrar exercício ✨" no modo de edição. Atualmente esse sheet contém apenas um `Text` placeholder. O ViewModel (`useLessonDetailViewModel`) expõe `localActivities` mas não possui lógica de recalibração.

O projeto usa `ChipRadioGroup` (spec: `chip-radio-component`) como componente de seleção visual de opção única, `FormInput` para campos de texto, `Button` para ações primárias, Zustand para estado global de lições e Gluestack v3 para UI.

## Goals / Non-Goals

**Goals:**
- Exibir no bottom sheet dois grupos de chips (`ChipRadioGroup`) para **Ênfase** e **Complexidade**
- Exibir campo de texto `FormInput` com label "Observações"
- Exibir botão "Recalibrar exercício ✨" que: aciona simulação assíncrona de IA, fecha o bottom sheet e atualiza o exercício localmente com um feedback de loading
- O estado de recalibração (parâmetros + observações) é mantido por instância de bottom sheet (não persistido globalmente)
- A simulação deve passar como contexto: `lessonId`, `activityId`, `classId` (obtido do store de turma ou da lição)

**Non-Goals:**
- Integração real com API/IA (fase futura)
- Persistência dos parâmetros de recalibração entre sessões
- Histórico de recalibrações
- Validação de formulário com Zod/React Hook Form (simples o suficiente para estado local)

## Decisions

### 1. Estado local vs. store para parâmetros de recalibração
**Decisão**: Usar `useState` local no componente (ou hook dedicado `useRecalibrateForm`) — não Zustand.  
**Rationale**: Os parâmetros de ênfase/complexidade/observações são efêmeros: só existem enquanto o bottom sheet está aberto. Não há necessidade de compartilhamento global.  
**Alternativa descartada**: Zustand slice — overhead desnecessário para estado transiente de formulário.

### 2. Qual atividade está sendo recalibrada
**Decisão**: Armazenar `selectedActivityId: string | null` em `useState` no `LessonDetailFeature`. Ao abrir o bottom sheet, passar o `activity.id`. O bottom sheet recebe `activityId` como prop.  
**Rationale**: Evita prop drilling profundo e mantém o state no componente Feature que já controla `isBottomSheetOpen`.

### 3. Simulação da chamada de IA
**Decisão**: Método `recalibrateActivity(params)` no ViewModel que faz `await new Promise(r => setTimeout(r, 1500))` simulando latência, depois atualiza o `description` da atividade localmente com texto indicando a recalibração.  
**Rationale**: Permite validar o fluxo de UX completo (loading, fechamento, atualização) sem backend real.

### 4. Criação do ChipRadioGroup
**Decisão**: Verificar se `src/components/chip-radio-group.tsx` já existe. Se não, criá-lo nesta tarefa conforme a spec `chip-radio-component`.  
**Rationale**: A spec já está definida; o componente pode estar pendente de implementação.

### 5. Multiselect vs. radio para Ênfase e Complexidade
**Decisão**: Radio (seleção única) via `ChipRadioGroup` para ambos os grupos, com valor default pré-selecionado.  
**Defaults**: Ênfase = `alta`, Complexidade = `diminuir` (conforme solicitação do usuário).

## Risks / Trade-offs

- **Risco: `ChipRadioGroup` não existe** → Mitigation: tarefa dedicada para criá-lo antes do bottom sheet
- **Risco: `FormInput` não suporta multiline** → Mitigation: verificar e adicionar prop `multiline` se necessário (campo de observações pode precisar de mais de uma linha)
- **Trade-off**: Estado por-abertura do sheet significa que os parâmetros são resetados ao fechar. Aceitável para V1.
