## ADDED Requirements

### Requirement: Componente FormInput Reutilizável
O sistema SHALL fornecer um componente `FormInput` reutilizável que encapsula o padrão de label + input com underline styling utilizado nos formulários da aplicação.

#### Scenario: Renderização do FormInput
- **WHEN** o `FormInput` é renderizado com props `label`, `value`, `onChangeText` e `placeholder`
- **THEN** o label é exibido acima do input com estilo `text-muted-foreground text-sm`
- **AND** o input possui borda inferior (underline) com cor `border-b-surface-neutral/30`
- **AND** o texto digitado é exibido com estilo `text-white text-xl font-semibold`

#### Scenario: Input Controlado
- **WHEN** o usuário digita no campo
- **THEN** o callback `onChangeText` é invocado com o novo texto
- **AND** o componente reflete o `value` passado externamente (controlled component)

#### Scenario: Reutilização no SchoolFormView
- **WHEN** o `FormInput` é utilizado no `SchoolFormView` para o campo "Nome"
- **THEN** ele substitui o bloco inline de `FormControl + Input + InputField` mantendo a mesma aparência e funcionalidade

#### Scenario: Uso no ClassFormStepOne
- **WHEN** o `FormInput` é utilizado no Step 1 do cadastro de turma
- **THEN** dois inputs são renderizados: "Nome" e "Disciplina"
- **AND** ambos seguem o mesmo padrão visual do formulário de escola
