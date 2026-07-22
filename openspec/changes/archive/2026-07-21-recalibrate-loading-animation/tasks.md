## 1. Configuração do Estado Global

- [x] 1.1 Identificar o store (Zustand) adequado da aula ou criar um estado para gerenciar a flag `isRecalibrating`.
- [x] 1.2 Criar as actions para iniciar e finalizar a recalibração, alterando `isRecalibrating` para `true` e `false`.

## 2. Modificações no Modal de Recalibração

- [x] 2.1 Em `src/features/lesson/components/RecalibrateBottomSheet.tsx`, fechar o modal imediatamente após o clique em recalibrar.
- [x] 2.2 Disparar o estado `isRecalibrating` (true) no momento do clique.
- [x] 2.3 Implementar a simulação temporária (timeout) que, ao finalizar, altera `isRecalibrating` para `false`. Garantir que o timeout é limpo no unmount.

## 3. Animação de Conteúdo (Fade-out/Fade-in)

- [x] 3.1 Envolver o conteúdo central da tela de detalhe da aula (ou no wrapper adequado) com Reanimated (`Animated.View`).
- [x] 3.2 Usar `useAnimatedStyle` observando `isRecalibrating` para aplicar `withTiming` na opacidade: ir para 0 (fade-out) e voltar para 1 (fade-in) suavemente.

## 4. Animação de Background (Pulse)

- [x] 4.1 Modificar `src/components/screen-background.tsx` para acessar a flag `isRecalibrating`.
- [x] 4.2 Usar Reanimated para aplicar um efeito cíclico de pulsar (modificando propriedades como opacidade do componente SVG interno, escalas de cor ou preenchimento) enquanto a flag for `true`.
- [x] 4.3 Garantir que o background retorna ao estado padrão quando `isRecalibrating` muda para `false`.
