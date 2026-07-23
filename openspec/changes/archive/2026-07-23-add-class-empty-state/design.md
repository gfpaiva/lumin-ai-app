## Context

O aplicativo atual possui uma tela `HomeFeature` que exibe a lista de turmas cadastradas para uma escola selecionada. Quando não existem turmas para a escola, a tela apresenta um espaço em branco, sem instrução clara ao usuário. É necessário fornecer um feedback visual adequado ("empty state"), adotando uma linguagem visual "premium" através de animações fluídas, sem impactar drasticamente a performance ou o tamanho do aplicativo com novas dependências.

## Goals / Non-Goals

**Goals:**
- Implementar o componente `ClassEmptyState` na estrutura da `HomeFeature`.
- Adicionar uma animação estilo "Breathing Blob" fluída e orgânica.
- Garantir que a animação não afete a performance da thread de JS, utilizando ferramentas adequadas do ecossistema.

**Non-Goals:**
- Não iremos adicionar dependências pesadas de animação (como `@shopify/react-native-skia` ou `react-native-svg` avançado) para simular o efeito exato de "Gooey Morph" da web baseado em SVG Matrix Filters.
- Não iremos modificar as planilhas ou o fluxo de criação de turmas, focando estritamente na interface de estado vazio.

## Decisions

**1. Uso do `react-native-reanimated` (Breathing Blob):**
- **Decisão:** Optou-se por utilizar o `react-native-reanimated` (já presente no repositório) para criar bolhas flutuantes (`Animated.View`) com variações contínuas de `borderRadius` e `rotation`.
- **Alternativas consideradas:** Usar `lottie-react-native` (exigiria importar o pacote e um arquivo JSON, perdendo o dinamismo da cor do tema); ou `@shopify/react-native-skia` (entregaria o visual gooey perfeito, mas exigiria nova dependência binária).
- **Justificativa:** É a abordagem de melhor custo-benefício. Garante animações 60fps rodando inteiramente na UI thread, não requer novas instalações, e entrega a estética "premium" esperada pelos guidelines de UI do projeto.

**2. Localização do Componente:**
- **Decisão:** O novo componente ficará em `src/features/home/components/ClassEmptyState.tsx`.
- **Justificativa:** Pertence estritamente ao escopo de visualização da Home, não sendo um componente compartilhado de UI até que surja necessidade real em outra feature.

## Risks / Trade-offs

- **[Risco] Consumo de bateria:** Animações rodando infinitamente podem consumir bateria se continuarem ativas quando o app for para o background.
  - **Mitigação:** Como estamos utilizando `withRepeat` do `react-native-reanimated`, o framework lida de forma otimizada com a interrupção da animação quando as views saem da tela ou o app está em background.
- **[Risco] Fidelidade ao design "Gooey" original:** O efeito resultante da variação de bordas (breathing blob) é esteticamente diferente (menos viscoso) do que os filtros `<feColorMatrix>`.
  - **Mitigação:** Alinhado previamente (opção C). A leveza e simplicidade do componente justificam a escolha visual.
