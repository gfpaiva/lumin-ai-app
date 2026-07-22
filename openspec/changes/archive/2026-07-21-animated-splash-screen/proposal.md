## Why

O aplicativo Lumin.AI atualmente não possui uma experiência de inicialização visual polida: a tela em branco/preta padrão do Expo aparece enquanto os recursos são carregados. Uma splash screen animada cria uma primeira impressão premium, reforça a identidade visual da marca e oferece feedback visual enquanto o app inicializa a chamada de backend inicial.

## What Changes

- Criação de uma nova feature `splash` com sua própria estrutura de componentes, hooks (ViewModel) e adapter de inicialização simulado.
- O componente `LuminLogo` será refatorado para suportar animação por letras (glow sequencial branco).
- A splash screen exibirá o logo `Lumin` centralizado sobre o `ScreenBackground`, com as letras acendendo uma a uma em efeito "glow" branco via `react-native-reanimated`.
- Após o efeito de introdução, o logo entra em modo "pulsação" (blinking glow completo), aguardando a conclusão de uma chamada de backend simulada (mock com `setTimeout`).
- Ao concluir o backend mock, ocorre um fade-out do logo e fade-in da tela Home (rota `/`).
- O `SplashScreen` nativo do Expo será mantido oculto até que as fontes estejam carregadas, mas a splash screen custom tomará o controle visual após isso, antes de exibir o `HomeFeature`.
- A navegação entre a splash screen e home será gerenciada pelo Expo Router usando uma rota dedicada.

## Capabilities

### New Capabilities

- `animated-splash-screen`: Splash screen animada com efeito glow sequencial por letra do logo, pulsação enquanto aguarda backend, e transição fadeOut/fadeIn para a home page.

### Modified Capabilities

- `home-page`: A rota de entrada do app mudará — ao invés de iniciar diretamente em `HomeFeature`, o usuário verá primeiro a `SplashScreen` e será redirecionado para home ao concluir a inicialização.

## Impact

- **Novas dependências:** Nenhuma nova lib necessária. `react-native-reanimated` (já instalado v4.5.0) será utilizado para todas as animações. `expo-splash-screen` (já instalado) permanece para controle do splash nativo.
- **Arquivos afetados:**
  - `src/app/index.tsx` — Ajuste de roteamento para incluir a splash screen como entry point inicial.
  - `src/app/_layout.tsx` — Possível ajuste para não ocultar o splash nativo antes da splash custom estar pronta.
  - `src/components/lumin-logo.tsx` — Refatoração para suportar props de animação por letra (glow via `Animated` ou `reanimated`).
  - **Novos:** `src/features/splash/` (componentes, hooks/ViewModel, adapter simulado).
  - **Novo:** `src/app/splash.tsx` (rota de entrada) ou uso de `src/app/index.tsx` como splash antes de redirecionar.
- **Dependências de arquitetura:** O adapter de inicialização simulado viverá em `src/infra/` (Port/Adapter). O ViewModel (`useSplashViewModel`) orquestrará o estado das animações e chamará o adapter.
