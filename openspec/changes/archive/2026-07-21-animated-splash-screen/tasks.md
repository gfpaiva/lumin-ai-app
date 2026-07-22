## 1. Infraestrutura — Port e Adapter de Inicialização

- [x] 1.1 Criar o arquivo de Port `src/common/ports/initialization.port.ts` com a interface `InitializationPort` contendo o método `initialize(): Promise<void>`
- [x] 1.2 Criar o adapter simulado `src/infra/initialization/initialization.simulator.adapter.ts` implementando `InitializationPort` com um `setTimeout` de 3 segundos (configurável)

## 2. Componente AnimatedLuminLogo

- [x] 2.1 Analisar o SVG do logo (`assets/lumin-logo.svg`) e extrair os paths individuais para cada letra: "L", "u", "m", "i", "n" e o ponto separador (".")
- [x] 2.2 Criar o componente `src/features/splash/components/AnimatedLuminLogo.tsx` com cada letra como um `<Path>` SVG separado dentro de um único `<Svg>`
- [x] 2.3 Adicionar suporte a `<Defs><Filter id="glow"><feGaussianBlur stdDeviation="3"/></Filter></Defs>` no SVG para efeito de blur/glow nativo
- [x] 2.4 Implementar `useSharedValue` para a opacidade de cada letra (6 valores: L, u, m, i, n, ponto)
- [x] 2.5 Implementar a animação sequencial de glow com `withDelay` + `withTiming` via `react-native-reanimated`, acendendo cada letra com intervalo de 250ms
- [x] 2.6 Adicionar overlay de cada letra em branco (`fill="#FFFFFF"`) com `animatedStyle` de opacidade para o efeito glow branco
- [x] 2.7 Implementar a animação de pulsação (blinking) com `withSequence` + `withRepeat` para o modo de aguardo do backend
- [x] 2.8 Expor via props: `onSequenceComplete: () => void` (callback ao fim da animação sequencial) e `isPulsing: boolean` (ativa o modo de pulsação)

## 3. ViewModel da Splash Screen

- [x] 3.1 Criar o hook `src/features/splash/hooks/useSplashViewModel.ts`
- [x] 3.2 Implementar o estado interno: `animationPhase: 'sequence' | 'pulsing' | 'fadeout' | 'done'`
- [x] 3.3 Chamar o `InitializationPort` via adapter simulado ao montar o hook
- [x] 3.4 Implementar a lógica de transição de fase: ao `onSequenceComplete` ser chamado → entrar em `pulsing`; ao backend resolver → entrar em `fadeout`; garantir que ambas as condições sejam satisfeitas antes de `fadeout`
- [x] 3.5 Implementar o `useSharedValue` para o fade-out do container e o estilo animado de opacidade
- [x] 3.6 Implementar o callback `onFadeOutComplete` que chama `router.replace('/')` ou a rota home correta via Expo Router
- [x] 3.7 Retornar do hook: `{ animationPhase, isPulsing, onSequenceComplete, fadeStyle }`

## 4. Componente SplashScreenFeature (View)

- [x] 4.1 Criar o componente `src/features/splash/components/SplashScreenFeature.tsx`
- [x] 4.2 Usar o `ScreenBackground` existente como wrapper de fundo com o gradiente da aplicação (`#081652` → `#000000`)
- [x] 4.3 Centralizar o `AnimatedLuminLogo` vertical e horizontalmente na tela (usando `flex: 1`, `justifyContent: 'center'`, `alignItems: 'center'`)
- [x] 4.4 Envolver o conteúdo em um `Animated.View` de `react-native-reanimated` para aplicar o `fadeStyle` retornado pelo ViewModel
- [x] 4.5 Consumir o `useSplashViewModel` e passar as props necessárias para o `AnimatedLuminLogo`
- [x] 4.6 Garantir que o componente seja "dumb" — toda lógica fica no ViewModel

## 5. Integração com Expo Router

- [x] 5.1 Substituir o conteúdo de `src/app/index.tsx` para renderizar o `SplashScreenFeature` ao invés de `HomeFeature`
- [x] 5.2 Criar a rota `src/app/(home)/index.tsx` (ou mover `HomeFeature` para `src/app/home.tsx`) para ser o destino do `router.replace` após a splash
- [x] 5.3 Verificar e ajustar o `_layout.tsx` para registrar a nova rota no `Stack` sem `header` visível
- [x] 5.4 Confirmar que o botão de voltar do dispositivo Android não retorna para a splash após a navegação (comportamento do `router.replace`)

## 6. Ajuste no _layout.tsx

- [x] 6.1 Verificar se o `SplashScreen.hideAsync()` está sendo chamado no momento correto (após fontes carregadas) — não bloquear a splash custom
- [x] 6.2 Garantir que o `backgroundColor` do `contentStyle` do Stack seja transparente ou compatível com o gradiente da splash screen

## 7. Testes

- [x] 7.1 Criar teste unitário para `useSplashViewModel.ts`: verificar transição de fases (`sequence` → `pulsing` → `fadeout`) usando `jest.useFakeTimers`
- [x] 7.2 Criar teste unitário para `initialization.simulator.adapter.ts`: verificar que resolve após o timeout simulado
- [x] 7.3 Criar teste de snapshot para `AnimatedLuminLogo.tsx` verificando a estrutura dos paths SVG individuais
- [x] 7.4 Criar teste de snapshot para `SplashScreenFeature.tsx` verificando que o `ScreenBackground` e o `AnimatedLuminLogo` são renderizados
