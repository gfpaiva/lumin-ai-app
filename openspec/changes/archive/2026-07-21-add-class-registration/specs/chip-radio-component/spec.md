## ADDED Requirements

### Requirement: Componente ChipRadioGroup
O sistema SHALL fornecer um componente `ChipRadioGroup` reutilizável que apresenta opções de seleção única em formato de "chips" arredondados com feedback visual customizado.

#### Scenario: Renderização das Opções
- **WHEN** o `ChipRadioGroup` é renderizado com um `label` e uma lista de `options`
- **THEN** o label da seção é exibido acima das opções
- **AND** cada opção é renderizada como um chip arredondado (`rounded-full`) com borda
- **AND** as opções são dispostas em layout de `flex-row` com wrap

#### Scenario: Estado Não Selecionado
- **WHEN** uma opção do chip NÃO está selecionada
- **THEN** o chip exibe apenas o texto do label
- **AND** o fundo é transparente ou com cor de superfície neutra sutil
- **AND** possui borda visível

#### Scenario: Estado Selecionado
- **WHEN** uma opção do chip ESTÁ selecionada
- **THEN** o fundo do chip é preenchido com a cor de superfície (`bg-surface-neutral`)
- **AND** um ícone de check (✓) é exibido à direita do texto
- **AND** a borda é destacada

#### Scenario: Seleção de Opção
- **WHEN** o usuário toca em um chip não selecionado
- **THEN** o `onValueChange` é chamado com o value da opção tocada
- **AND** a opção previamente selecionada perde o destaque visual
- **AND** a opção tocada ganha o destaque visual (fundo preenchido + check)

#### Scenario: Reutilização no SchoolFormView
- **WHEN** o componente `ChipRadioGroup` é utilizado no `SchoolFormView` para a seleção de Categoria
- **THEN** ele substitui o `RadioGroup` inline existente mantendo a mesma funcionalidade
