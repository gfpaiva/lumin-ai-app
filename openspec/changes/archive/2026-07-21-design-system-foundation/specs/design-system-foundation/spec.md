## ADDED Requirements

### Requirement: Design System Tokens e Paleta de Cores Semânticas
O sistema SHALL definir tokens semânticos de cores no `global.css` alinhados estritamente à paleta visual de referência do aplicativo, sem suporte a alternância para tema claro (Light Theme).

#### Scenario: Resolução dos tokens de cores de superfície e texto
- **WHEN** componentes utilizam classes utilitárias derivadas dos tokens semânticos (ex: `bg-card`, `bg-surface-dark`, `text-foreground`, `border-border`)
- **THEN** o sistema deve resolver as cores `#2C365E` para superfícies de cards e seletores ativos, `#1B1B1B` para superfícies escuras de ação, `#272727` para bordas/pills neutros, `#FFFFFF` para textos principais e opacidades de branco para variação secundária/muda.

### Requirement: Configuração e Carregamento da Tipografia Inter
O sistema SHALL incorporar e carregar assincronamente a fonte "Inter" (variantes Regular 400, Medium 500, SemiBold 600 e Bold 700) utilizando `expo-font` / `@expo-google-fonts/inter` e registrá-la na configuração do Tailwind.

#### Scenario: Carregamento assíncrono de fontes no layout raiz
- **WHEN** o aplicativo é carregado no `src/app/_layout.tsx`
- **THEN** o hook `useFonts` garante o carregamento completo da fonte Inter antes de liberar a renderização da árvore de componentes, disponibilizando a fonte através das utilitárias de tipografia.

### Requirement: Padronização de Espaçamentos e Raios de Borda
O sistema SHALL estabelecer uma escala coerente de raios de borda (`border-radius`) e espaçamentos (paddings/margins) baseada nos componentes apresentados nos protótipos visuais.

#### Scenario: Renderização de cards e bottom sheets com cantos arredondados padronizados
- **WHEN** componentes como cards, pills de bimestre e modais do tipo bottom sheet são exibidos
- **THEN** eles devem utilizar tokens de borda arredondada (`rounded-xl`, `rounded-2xl`, `rounded-full`) e espaçamento interno padronizados conforme o design system.

### Requirement: Componente de Fundo Gradiente Reutilizável
O sistema SHALL fornecer o componente `ScreenBackground` baseado em `expo-linear-gradient` para envolver as telas do aplicativo com o fundo gradiente padrão.

#### Scenario: Renderização de tela envelopada por ScreenBackground
- **WHEN** qualquer tela renderiza o componente `ScreenBackground`
- **THEN** o fundo deve apresentar um gradiente linear vertical suave partindo da cor `#081652` no topo até a cor `#000000` (com opacidade/ponto final de 39%) na base.
