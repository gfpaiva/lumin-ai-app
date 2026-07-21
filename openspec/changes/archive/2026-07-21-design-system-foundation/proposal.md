## Why

Para garantir consistência visual, escalabilidade e alinhamento com a identidade visual do Lumin.AI, é necessário estabelecer a fundação do Design System do aplicativo. Isso inclui padronizar tokens semânticos de cores extraídos das telas de referência, configurar a tipografia oficial com a fonte "Inter", definir a escala de espaçamentos e implementar o container base com fundo gradiente único (`#081652` a `#000000`), eliminando alternâncias entre temas (Light/Dark) em favor de um tema escuro padrão de referência.

## What Changes

- **Padronização de Cores e Tokens Semânticos**: Reconfiguração das variáveis no `global.css` com tokens Tailwind v4 e NativeWind v5 baseados na paleta extraída dos designs de referência:
  - Gradiente de fundo: linear entre `#081652` (100%) e `#000000` (39%).
  - Cores de superfície e destaque: `#2C365E` (cards/marcação ativa), `#1B1B1B` (superfície dark/botão de ação), `#272727` (bordas e pills neutros).
  - Variantes e opacidades de `#FFFFFF` para textos (`text-foreground`, `text-muted-foreground`, etc.).
- **Remoção de Tema Claro (Single Dark Theme)**: Consolidação de todas as variáveis `:root` para o tema único de referência, simplificando tokens CSS e evitando transições/toggles indesejados.
- **Integração da Tipografia Inter**: Configuração da fonte Google Inter via `@expo-google-fonts/inter`, garantia do carregamento assíncrono via `expo-font` no layout principal (`_layout.tsx`) e declaração da família no `@theme` Tailwind.
- **Configuração de Espaçamentos e Borda**: Alinhamento dos tokens de espaçamento e `border-radius` (pills, cards, bottom sheets).
- **Componente Container com Fundo Gradiente**: Criação de um componente reutilizável `ScreenBackground` utilizando `expo-linear-gradient` para que todas as telas possuam o padrão visual idêntico.

## Capabilities

### New Capabilities
- `design-system-foundation`: Define os tokens fundamentais de tema (cores semânticas, tipografia Inter, ranhuras e bordas) e provê a estrutura de layout com fundo em gradiente linear.

### Modified Capabilities

*(Nenhuma funcionalidade existente teve seus requisitos alterados.)*

## Impact

- **Estilização Global**: `global.css` será atualizado para refletir a nova paleta e remover tokens redundantes de theme toggle.
- **Fontes e App Layout**: Dependência de `@expo-google-fonts/inter` e inclusão do hook `useFonts` no `src/app/_layout.tsx`.
- **Componentes Base**: Criação do container `ScreenBackground` (`src/components/ui/screen-background/` ou similar).
- **Dependências**: `expo-linear-gradient` e `@expo-google-fonts/inter`.
