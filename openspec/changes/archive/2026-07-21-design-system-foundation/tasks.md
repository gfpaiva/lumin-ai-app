## 1. Instalação de Dependências e Configuração de Tipografia

- [x] 1.1 Instalar os pacotes `@expo-google-fonts/inter` e `expo-linear-gradient` via `pnpm`
- [x] 1.2 Configurar o carregamento assíncrono das variantes da fonte Inter (400, 500, 600, 700) no `src/app/_layout.tsx` integrando com `expo-font` e `expo-splash-screen`

## 2. Estruturação dos Tokens de Tema e CSS Global

- [x] 2.1 Reestruturar o arquivo `global.css` eliminando o suporte a alternância de Light/Dark mode e unificando a especificação do tema único em `:root`
- [x] 2.2 Definir e exportar os tokens semânticos de cores (`#081652`, `#2C365E`, `#1B1B1B`, `#272727`, `#FFFFFF` com opacidades) e a família tipográfica Inter no bloco `@theme inline` do Tailwind v4 / NativeWind v5

## 3. Criação do Componente Base ScreenBackground

- [x] 3.1 Criar o componente reutilizável `ScreenBackground` em `src/components/ui/screen-background/index.tsx` utilizando `expo-linear-gradient` com as paradas de cor entre `#081652` e `#000000`
- [x] 3.2 Envelopar a renderização no `src/app/_layout.tsx` ou layout base garantindo preenchimento de 100% da tela e suporte a `SafeAreaView`

## 4. Validação e Verificação

- [x] 4.1 Validar a renderização da fonte Inter e resolução das variáveis de cores semânticas
- [x] 4.2 Executar verificações de TypeScript (`pnpm lint` / typecheck) para confirmar ausência de erros
