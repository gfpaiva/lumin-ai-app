# recalibrate-activity-bottomsheet Specification

## Purpose
TBD - created by archiving change recalibrate-activity-bottomsheet. Update Purpose after archive.
## Requirements
### Requirement: Bottom Sheet de Recalibração de Exercício
O sistema SHALL exibir um bottom sheet configurável ao acionar "Recalibrar exercício" de uma atividade específica em modo de edição, permitindo ao professor definir parâmetros antes de solicitar recalibração por IA.

#### Scenario: Abertura do Bottom Sheet com atividade correta
- **WHEN** o professor pressiona "Recalibrar exercício ✨" de uma atividade específica
- **THEN** o `GenericBottomSheet` deve abrir com o título "Recalibrar Exercício"
- **AND** o estado interno deve ser associado ao `id` da atividade pressionada

#### Scenario: Exibição do grupo de Ênfase
- **WHEN** o bottom sheet está aberto
- **THEN** um `ChipRadioGroup` com label "Ênfase" SHALL ser exibido
- **AND** as opções disponíveis SHALL ser: `alta`, `media`, `baixa`
- **AND** a opção `alta` SHALL estar pré-selecionada por padrão

#### Scenario: Exibição do grupo de Complexidade
- **WHEN** o bottom sheet está aberto
- **THEN** um `ChipRadioGroup` com label "Complexidade" SHALL ser exibido
- **AND** as opções disponíveis SHALL ser: `diminuir`, `manter`, `aumentar`
- **AND** a opção `diminuir` SHALL estar pré-selecionada por padrão

#### Scenario: Campo de Observações
- **WHEN** o bottom sheet está aberto
- **THEN** um `FormInput` com label "Observações" SHALL ser exibido abaixo dos chips
- **AND** o campo SHALL aceitar texto livre multiline

#### Scenario: Botão de ação
- **WHEN** o bottom sheet está aberto
- **THEN** um `Button` com texto "Recalibrar exercício ✨" SHALL ser exibido ao final do conteúdo

### Requirement: Simulação de Recalibração por IA
O sistema SHALL simular uma chamada assíncrona de recalibração de exercício ao acionar o botão, com feedback visual e atualização local do exercício.

#### Scenario: Estado de loading ao acionar recalibração
- **WHEN** o professor pressiona "Recalibrar exercício ✨"
- **THEN** o botão SHALL exibir estado de loading (texto ou indicador visual)
- **AND** as interações do formulário SHALL ser bloqueadas durante o loading

#### Scenario: Conclusão da simulação
- **WHEN** a simulação de IA completa (após ~1500ms)
- **THEN** o bottom sheet SHALL fechar automaticamente
- **AND** a descrição da atividade SHALL ser atualizada localmente com indicação de que foi recalibrada pela IA
- **AND** o estado do formulário SHALL ser resetado para os valores padrão

#### Scenario: Contexto da recalibração
- **WHEN** a simulação é acionada
- **THEN** o contexto enviado SHALL incluir: `lessonId`, `activityId`, e parâmetros `emphasis` (ênfase selecionada), `complexity` (complexidade selecionada) e `observations` (texto de observações)

