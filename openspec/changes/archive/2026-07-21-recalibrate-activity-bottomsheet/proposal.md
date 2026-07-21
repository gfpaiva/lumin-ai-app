## Why

O fluxo atual de "Recalibrar exercício" no `LessonDetailFeature` abre um bottom sheet com apenas um placeholder de texto. O professor não consegue customizar parâmetros da recalibração antes de acionar a IA, tornando o processo opaco e genérico — sem refletir o contexto específico da turma.

## What Changes

- O bottom sheet de recalibração passa a exibir opções de configuração antes de acionar a IA
- Dois grupos de `ChipRadioGroup` para **Ênfase** (`alta` / `media` / `baixa`) e **Complexidade** (`diminuir` / `manter` / `aumentar`)
- Campo de texto `FormInput` para **Observações** livres do professor
- Botão "Recalibrar exercício ✨" que aciona simulação de chamada IA (futura integração real), fecha o bottom sheet e atualiza o exercício localmente
- O estado de recalibração é por-atividade: ao abrir o bottom sheet, os valores ficam pré-configurados com defaults razoáveis
- A chamada simulada à IA é específica para a lição/classe/escola (contexto passado como parâmetro)

## Capabilities

### New Capabilities
- `recalibrate-activity-bottomsheet`: Bottom sheet de recalibração de exercício com opções de ênfase, complexidade, observações e ação de simulação IA

### Modified Capabilities
- `chip-radio-component`: Nenhuma mudança de requisito — componente existente é reutilizado como está

## Impact

- `src/features/lesson/components/LessonDetailFeature.tsx` — substitui o placeholder do bottom sheet pelo formulário de recalibração
- `src/features/lesson/hooks/useLessonDetailViewModel.ts` — adiciona lógica de recalibragem simulada (`recalibrateActivity`)
- `src/components/chip-radio-group.tsx` (se não existir) — componente `ChipRadioGroup` definido na spec `chip-radio-component` pode precisar ser criado
- Sem novas dependências externas; reutiliza `GenericBottomSheet`, `FormInput`, `Button`, `ChipRadioGroup` e Zustand já presentes
