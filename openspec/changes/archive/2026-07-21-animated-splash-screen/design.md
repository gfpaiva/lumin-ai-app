## Context

O aplicativo Lumin.AI usa Expo Router com `expo-splash-screen` para ocultar a splash nativa até que as fontes sejam carregadas (`SplashScreen.preventAutoHideAsync()` no `_layout.tsx`). Atualmente, após o carregamento das fontes, o app exibe diretamente o `HomeFeature` sem nenhuma experiência de boas-vindas.

O stack de animação disponível inclui `react-native-reanimated` v4.5.0 (já instalado), que oferece a API mais moderna e performática para animações no React Native através de worklets executados na UI thread. O logo SVG já existe como componente React em `src/components/lumin-logo.tsx` com um único `<Path>` cobrindo todas as letras do texto "Lumin".

A análise do SVG revela que o logo possui **um único path composto** por todas as letras. Para a animação de glow sequencial por letra, será necessário decompor o path em paths individuais (um por letra) ou usar uma abordagem de clip-mask animada que revele um overlay de glow progressivamente.

## Goals / Non-Goals

**Goals:**
- Criar splash screen animada custom que aparece após o splash nativo ser ocultado.
- Implementar efeito de "glow" branco sequencial letra a letra usando `react-native-reanimated`.
- Exibir logo pulsando (blinking glow completo) enquanto aguarda backend simulado.
- Transição suave com fade-out da splash e fade-in da home ao concluir inicialização.
- Seguir arquitetura Port/Adapter + MVVM (ViewModel em hook, adapter simulado em `infra/`).
- Rota dedicada `src/app/index.tsx` que controla a exibição inicial (splash → home).

**Non-Goals:**
- Modificar ou substituir o splash nativo do Expo (mantido para carregamento de fontes).
- Implementar chamada real de backend (somente mock com `setTimeout`).
- Criar animações em plataforma Web (foco em iOS e Android).
- Adicionar novas dependências de bibliotecas além das já instaladas.

## Decisions

### D1: Abordagem de animação — `react-native-reanimated` v4 (sem nova dependência)

**Decisão:** Usar exclusivamente `react-native-reanimated` já instalado (v4.5.0) com `useSharedValue`, `withTiming`, `withDelay` e `withSequence`.

**Alternativas consideradas:**
- `react-native-animated` (API original do RN): Mais simples, mas usa JS thread e é mais verbosa para sequências complexas.
- `@legendapp/motion` (já instalado): Voltada para layout animations, não ideal para efeitos glow com shadowOpacity.
- Adicionar nova lib (ex: `lottie-react-native`): Adicionaria dependência desnecessária dado que o stack já tem reanimated v4.

**Rationale:** Reanimated v4 executa na UI thread via worklets, garantindo 60fps suaves mesmo durante carregamento do JS bundle. É a escolha canônica para animações complexas no Expo.

### D2: Estratégia de glow por letra — Múltiplos SVG Paths sobrepostos

**Decisão:** Criar um novo componente `AnimatedLuminLogo` que renderiza múltiplos `<Path>` SVG individuais (um por letra do "Lumin"), extraídos manualmente do path composto original. Cada letra terá um `Animated.View` wrapper controlando `opacity` e um filtro de sombra/glow via `style.textShadowColor` ou `shadowColor/shadowRadius` no SVG.

**Abordagem técnica do glow SVG:**
- Usar `react-native-svg` com múltiplos `<Path>` individuais por letra.
- O efeito glow será simulado com layers sobrepostas do mesmo path: uma em `fill="#FFFFFF"` com `opacity` animado e outra com `style={{ shadowColor: '#FFFFFF', shadowRadius: 20 }}` via um `View` wrapper em volta do `Svg`.
- Para o efeito mais premium: usar `<Defs><Filter>` do react-native-svg com `<feGaussianBlur>` para blur SVG nativo.

**Alternativas consideradas:**
- Usar clip-mask com um único path e animar a posição: Complexo e com resultado visual inferior.
- Usar `Animated.Image` com o SVG como PNG: Perde a vetorização e o controle por letra.

**Rationale:** Paths individuais por letra dão controle granular de opacity/glow por letra. O react-native-svg suporta `<filter>` com blur gaussiano, permitindo glow nativo no SVG.

### D3: Roteamento — Rota dedicada `/splash` com redirect automático

**Decisão:** A rota inicial será `src/app/index.tsx` que renderiza o `SplashScreenFeature`. Ao concluir a animação + mock backend, usa `router.replace('/(tabs)')` ou `router.replace('/home')` para navegar sem histórico. A rota home atual não muda.

**Alternativas consideradas:**
- Controlar via estado global (Zustand) no `_layout.tsx`: Acoplamento desnecessário no layout raiz.
- Usar `expo-splash-screen` custom assets: Limitado a imagens estáticas; não permite animação React.

**Rationale:** Rota dedicada mantém separação de responsabilidades. O Expo Router já suporta `router.replace` para navegação sem voltar para a splash.

### D4: Estrutura de arquitetura — Feature Slice `splash`

**Decisão:**
```
src/
  features/
    splash/
      components/
        SplashScreenFeature.tsx   # View principal (dumb component)
        AnimatedLuminLogo.tsx      # Logo com animação por letra
      hooks/
        useSplashViewModel.ts      # ViewModel: orquestra animações e backend mock
      ports/
        initialization.port.ts     # Interface do contrato de inicialização (em src/common/ports/)
  infra/
    initialization/
      initialization.simulator.adapter.ts  # Mock com setTimeout
  app/
    index.tsx                      # Entry point → renderiza SplashScreenFeature
```

**Rationale:** Segue exatamente o padrão Port/Adapter + Feature Slices definido nas regras de arquitetura. A lógica de animação fica no ViewModel (hook), os componentes são dumb.

## Risks / Trade-offs

- **[Risco] Extração manual dos paths SVG por letra pode ter erros de coordenadas** → Mitigação: Testar visualmente em emulador antes de finalizar. O SVG original tem viewBox `0 0 161 36` e as letras são bem separadas.
- **[Risco] Efeito glow via `shadowColor`/`shadowRadius` pode não funcionar em Android** → Mitigação: Usar abordagem com `<feGaussianBlur>` dentro do SVG via `react-native-svg` `<Filter>` que funciona em ambas as plataformas.
- **[Trade-off] Decompor o logo em paths individuais aumenta o tamanho do componente** → Aceitável; o arquivo ficará maior mas teremos controle granular das animações.
- **[Risco] Sincronização do `SplashScreen.hideAsync()` com a splash custom** → Mitigação: Ocultar o splash nativo no `_layout.tsx` ao carregar fontes (comportamento atual mantido), e a splash custom assumir o controle visual imediatamente após.
