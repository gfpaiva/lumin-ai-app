## 1. Setup e Configuração Inicial

- [x] 1.1 Utilizar o logotipo e union SVG a partir do arquivo existente em `assets/lumin-logo.svg`
- [x] 1.2 Verificar e instalar os componentes necessários do Gluestack UI v5 (`npx gluestack-ui@latest add avatar menu box pressable icon`)
- [x] 1.3 Configurar ícones base de Chevron (`lucide-react-native`)

## 2. Componentização (Feature Slices)

- [x] 2.1 Criar estrutura da feature `home` (ex: `src/features/home/components`)
- [x] 2.2 Implementar componente `HomeHeader.tsx` (logo à esquerda e Avatar Menu à direita)
- [x] 2.3 Implementar componente `HomeWelcome.tsx` (saudação ao usuário e texto do bimestre com chevron)
- [x] 2.4 Implementar componente genérico Dropdown / `SchoolSelector.tsx` utilizando componentes base do Menu/Gluestack
- [x] 2.5 Implementar componente `ClassCard.tsx` (Card renderizando título da série, subtítulo da disciplina e chevron para a direita)
- [x] 2.6 Implementar componente `BottomAction.tsx` (Botão com tamanho da fonte 16, border radius configurado e posição absoluta/flex bottom)

## 3. Integração na Tela Principal

- [x] 3.1 Criar componente contêiner `HomeFeature.tsx` e integrar todos os subcomponentes recém criados
- [x] 3.2 Implementar dados mockados para o seletor de escolas (ex: "EE Mário Covas") e para a lista de turmas na tela (`HomeFeature.tsx`)
- [x] 3.3 Utilizar `<ScrollView>` ao redor dos cards de turma para permitir rolagem e manter o bottom action visível
- [x] 3.4 Modificar a rota raiz ou tela inicial (`app/(app)/index.tsx` ou análogo) para envolver o `<HomeFeature />` com o componente `<ScreenBackground>`

## 4. Revisão e Refinamentos

- [x] 4.1 Ajustar espaçamentos, tipografia (font sizes e pesos) para equiparar o máximo possível ao protótipo do design (utilizando Tailwind utility classes)
- [x] 4.2 Testar interação dos chevrons e expansão correta dos Menus Dropdown (School Selector e Avatar Logout)
- [x] 4.3 Garantir a responsividade em diferentes proporções de tela do mobile
