## 1. Criação do Componente

- [x] 1.1 Criar o arquivo `ClassEmptyState.tsx` em `src/features/home/components/`
- [x] 1.2 Estruturar o layout básico estático (textos, ícone central e botão de ação) utilizando NativeWind

## 2. Animação (Breathing Blob)

- [x] 2.1 Importar hooks de animação (`useSharedValue`, `useAnimatedStyle`, `withRepeat`, `withTiming`) do `react-native-reanimated` em `ClassEmptyState`
- [x] 2.2 Criar a lógica de variação do `borderRadius` e rotação usando `useSharedValue` e `withRepeat`
- [x] 2.3 Implementar as camadas de fundo (`Animated.View`) com opacidades e rotações invertidas para gerar o efeito visual

## 3. Integração na Home

- [x] 3.1 Importar `ClassEmptyState` em `src/features/home/components/HomeFeature.tsx`
- [x] 3.2 Modificar a renderização da lista de turmas no `HomeFeature` para exibir o componente vazio condicionalmente (`filteredClasses.length === 0`)
- [x] 3.3 Passar a propriedade `onAddPress={() => setIsClassSheetOpen(true)}` (ou equivalente) para o novo componente
