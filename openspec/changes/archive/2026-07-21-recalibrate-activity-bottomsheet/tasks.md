## 1. ViewModel — Lógica de Recalibração

- [x] 1.1 Adicionar método `recalibrateActivity(params: RecalibrateParams): Promise<void>` no `useLessonDetailViewModel.ts`, com simulação de ~1500ms e atualização local da descrição da atividade
- [x] 1.2 Definir tipo `RecalibrateParams` com campos: `activityId: string`, `emphasis: 'alta' | 'media' | 'baixa'`, `complexity: 'diminuir' | 'manter' | 'aumentar'`, `observations: string`
- [x] 1.3 Expor `recalibrateActivity` e estado de loading (`isRecalibrating: boolean`) no retorno do hook

## 2. Componente RecalibrateBottomSheet

- [x] 2.1 Criar `src/features/lesson/components/RecalibrateBottomSheet.tsx` com props: `isOpen`, `onClose`, `activityId`, `onRecalibrate`
- [x] 2.2 Adicionar `ChipRadioGroup` para **Ênfase** com opções `[{ label: 'Alta', value: 'alta' }, { label: 'Média', value: 'media' }, { label: 'Baixa', value: 'baixa' }]` e default `alta`
- [x] 2.3 Adicionar `ChipRadioGroup` para **Complexidade** com opções `[{ label: 'Diminuir', value: 'diminuir' }, { label: 'Manter', value: 'manter' }, { label: 'Aumentar', value: 'aumentar' }]` e default `diminuir`
- [x] 2.4 Adicionar `FormInput` com label "Observações", multiline habilitado, abaixo dos grupos de chips
- [x] 2.5 Adicionar `Button` com texto "Recalibrar exercício ✨" ao final, com estado de loading enquanto `isRecalibrating` for true
- [x] 2.6 Ao pressionar o botão: chamar `onRecalibrate` com os parâmetros do formulário; fechar o sheet após conclusão; resetar estado do formulário

## 3. Integração no LessonDetailFeature

- [x] 3.1 Adicionar `useState<string | null>(null)` para `selectedActivityId` em `LessonDetailFeature`
- [x] 3.2 Ao pressionar "Recalibrar exercício ✨" de uma atividade, setar `selectedActivityId` com o `activity.id` e abrir o bottom sheet
- [x] 3.3 Substituir o placeholder atual do `GenericBottomSheet` pelo componente `RecalibrateBottomSheet`
- [x] 3.4 Passar `recalibrateActivity` do ViewModel como callback para `RecalibrateBottomSheet`
- [x] 3.5 Garantir que ao fechar o bottom sheet o `selectedActivityId` seja resetado para `null`

## 4. Ajuste no FormInput (se necessário)

- [x] 4.1 Verificar se `FormInput` suporta prop `multiline`; se não, adicionar suporte via prop opcional `multiline?: boolean` repassada ao `InputField`

## 5. Testes

- [x] 5.1 Escrever teste unitário para `recalibrateActivity` no ViewModel: verificar que após conclusão a atividade tem descrição atualizada
- [x] 5.2 Escrever teste de componente para `RecalibrateBottomSheet`: verificar renderização dos chips, campo e botão
- [x] 5.3 Verificar que selecionar opção em `ChipRadioGroup` atualiza o valor correto no estado do formulário
