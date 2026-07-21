## Context

O projeto Lumin.AI possui uma estrutura inicial com NativeWind v5 e Gluestack UI v5, porém com tokens genéricos de tema claro/escuro. Para alinhar o aplicativo com a identidade dos protótipos de alta fidelidade fornecidos, é preciso fundar o Design System definitivo do projeto. Isso engloba redefinir os tokens CSS, carregar a fonte Inter, definir a escala de cantos arredondados/espaçamentos e implementar a estrutura base de gradiente para as telas.

## Goals / Non-Goals

**Goals:**

- Configurar paleta semântica única no `global.css` baseada nos valores exatos das imagens de referência (`#081652`, `#2C365E`, `#1B1B1B`, `#272727`, `#FFFFFF` com opacidades).
- Remover suporte e estilos redundantes de tema claro (Light Theme), mantendo um tema escuro padronizado em `:root`.
- Instalar e carregar a família de fontes **Inter** via `@expo-google-fonts/inter` e `expo-font` no layout raiz `src/app/_layout.tsx`.
- Registrar as variantes da fonte Inter no `@theme inline` do Tailwind CSS.
- Criar o componente container `ScreenBackground` utilizando `expo-linear-gradient` com as paradas de cor `#081652` (0%) até `#000000` (61% / opacidade 39%).
- Validar a compatibilidade da árvore do `GluestackUIProvider`.

**Non-Goals:**

- Construir ou refatorar as telas exibidas nas imagens de referência (Dashboard, Seletor de Bimestre, Lista de Aulas) - essas serão desenvolvidas em mudanças futuras.
- Criar mecanismos de alternância ou toggle de temas (dark/light mode).

## Decisions

### Decisão 1: Consolidação em Tema Escuro Único em `:root`

**Opção escolhida:** Remover declarações `@media (prefers-color-scheme)` e `:root.light` do `global.css`, unificando todas as variáveis semânticas dentro do bloco `:root`.
**Justificativa:** O aplicativo é projetado exclusivamente com estética escura de alta fidelidade. Eliminar a lógica de múltiplos temas reduz a complexidade do CSS e garante consistência em iOS, Android e Web.

### Decisão 2: Uso de `expo-linear-gradient` no Componente `ScreenBackground`

**Opção escolhida:** Encapsular a renderização do gradiente `#081652` -> `#000000` em um componente `ScreenBackground` dedicado (`src/components/ui/screen-background/`).
**Justificativa:** O suporte a gradientes via classes utilitárias CSS do Tailwind/NativeWind possui limitações de renderização nativa. O `expo-linear-gradient` é nativo, performático e garante suporte em iOS, Android e Web.

### Decisão 3: Gerenciamento de Fontes com `@expo-google-fonts/inter` e `expo-splash-screen`

**Opção escolhida:** Utilizar `@expo-google-fonts/inter` conjuntamente com o hook `useFonts` do `expo-font` e `SplashScreen.preventAutoHideAsync()` no `src/app/_layout.tsx`.
**Justificativa:** Evita o efeito "FOUT" (Flash of Unstyled Text) ou colapsos de layout durante a inicialização, liberando a renderização somente após o carregamento completo das fontes.

## System Tokens (Resumo)

| Token                                | Hex / Valor                     | Uso                                              |
| :----------------------------------- | :------------------------------ | :----------------------------------------------- |
| `background-gradient-start`          | `#081652`                       | Topo do gradiente de fundo                       |
| `background-gradient-end`            | `#000000` (opacidade 39% stop)  | Base do gradiente de fundo                       |
| `card` / `accent-blue`               | `#2C365E`                       | Cards ativos, destaques de bimestres e seletores |
| `surface-dark`                       | `#1B1B1B`                       | Superfície de botões secundários / modais        |
| `surface-neutral` / `border-neutral` | `#272727`                       | Borders e pills neutros                          |
| `foreground`                         | `#FFFFFF`                       | Textos principais                                |
| `muted-foreground`                   | `#FFFFFF` (80% / 60% opacidade) | Textos secundários / descritivos                 |

## Risks / Trade-offs

- **[Risco]** Atraso de renderização na inicialização ao aguardar carregamento de fontes.
  - _Mitigação:_ Usar `SplashScreen.hideAsync()` dentro de um `useEffect` assim que `fontsLoaded` for `true`.
- **[Risco]** Fundo gradiente cortado ao rolar a página em telas compridas (`ScrollView`).
  - _Mitigação:_ Estruturar `ScreenBackground` com `flex-1` envolto em `View` raiz flexível que preenche 100% da viewport independentemente do conteúdo interno.
