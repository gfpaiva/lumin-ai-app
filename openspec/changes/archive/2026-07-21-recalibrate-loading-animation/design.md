## Context

Atualmente, ao confirmar a recalibração de um exercício, não há feedback visual imersivo e o tempo de espera fica sem uma resposta polida. O objetivo é fechar imediatamente o `RecalibrateBottomSheet` para transmitir agilidade e coordenar uma transição de loading onde o conteúdo da tela sofre "fade-out" e o background reage com um efeito "pulse". Quando a operação finaliza (simulada por um timeout), o conteúdo volta suavemente em "fade-in". 

## Goals / Non-Goals

**Goals:**
- Coordenar a animação de três elementos independentes: BottomSheet (fechar), Conteúdo Principal (fade-out/fade-in) e ScreenBackground (efeito pulse).
- Utilizar gerenciamento de estado (ex: Zustand) para propagar a flag `isRecalibrating` pela árvore de componentes de forma eficiente.
- Implementar as transições de opacidade e cor/escala usando bibliotecas de animação do ecossistema React Native (ex: `react-native-reanimated`).

**Non-Goals:**
- Mudar a lógica de negócio subjacente de recalibração (apenas o mock temporário e a UI).
- Criar novos componentes visuais que fujam da biblioteca atual (Gluestack v3/NativeWind v5).

## Decisions

1. **Controle de Estado (Zustand):**
   - Criação ou aproveitamento de um store de estado da Lesson (`useLessonStore`) que armazene a flag booleana `isRecalibrating`. Isso é necessário porque `RecalibrateBottomSheet` altera o estado, e `screen-background` precisa consumi-lo globalmente (ou por contexto).
2. **Animação do Conteúdo (Reanimated):**
   - No componente principal de Detalhes da Aula, o conteúdo central será envolvido por um `Animated.View`. Utilizaremos `useAnimatedStyle` e `withTiming` observando `isRecalibrating` para ir de opacidade 1 a 0, e vice-versa.
3. **Animação do Background (Pulse):**
   - O `screen-background` consumirá `isRecalibrating`. Ao ficar true, aplicará uma animação contínua (ex: `withRepeat(withTiming(...))` ou loop via Reanimated) no gradiente, alterando sutilmente a cor, brilho ou opacidade do linear-gradient para gerar a sensação de pulso elétrico ou de processamento da IA.

## Risks / Trade-offs

- **Risk: Lentidão nas animações se realizadas na thread JS.** 
  - *Mitigação:* Utilizar exclusivametne `react-native-reanimated` com `useSharedValue` e rodar as animações na UI thread (sem bloqueio).
- **Risk: Memory leaks com o mock do Timeout.**
  - *Mitigação:* Usar um `useEffect` para gerenciar a simulação de atraso, garantindo o `.clearTimeout()` no retorno.
