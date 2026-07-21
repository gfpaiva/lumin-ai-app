## Context

O projeto Lumin.AI está sendo construído e o usuário precisa visualizar sua tela principal (Home). A página Home servirá como hub central da aplicação, onde o usuário será saudado, visualizará o bimestre atual, poderá selecionar a escola onde atua e visualizará a lista das suas turmas e disciplinas. A aplicação utiliza Expo, React Native, TypeScript, TailwindCSS/NativeWind e Gluestack UI. 

Existem definições visuais claras passadas no protótipo, incluindo:
- Gradiente de fundo já existente (`screen-background`).
- Layout estruturado: Header, Mensagem de Boas-vindas, Seletor de Escola, Cards de Turmas e Botão na parte inferior.
- Os dados, no momento, podem ser mockados para a montagem visual da estrutura.

## Goals / Non-Goals

**Goals:**
- Implementar a UI da Home com precisão em relação ao protótipo.
- Estruturar os componentes de forma reaproveitável, dividindo a responsabilidade da tela em componentes menores (como feature slices: `HomeHeader`, `SchoolSelector`, `ClassCard`, `BottomButton`).
- Configurar corretamente o roteamento com `expo-router` para exibir a página inicial.
- Importar/adicionar corretamente componentes base do Gluestack UI se ainda não existirem (`Avatar`, `Menu`, `Icon`, `Box`/`Card`, `Pressable`/`Button`).
- Implementar o componente `SchoolSelector` utilizando o Gluestack `Menu` visando reutilização conceitual de Dropdown.

**Non-Goals:**
- Implementar a lógica real de busca de dados (API) nesta mudança (dados serão mockados ou injetados por store de teste provisória).
- Implementar as telas destinos de "Cadastrar nova turma" ou o BottomSheet de seleção de bimestre nesta mudança.

## Decisions

- **Estrutura de Componentes**: A tela Home não deve conter toda a UI. O arquivo de rota `app/(app)/index.tsx` (ou equivalente na home) irá importar um `<HomeFeature />` de uma pasta `src/features/home/components/`.
- **Composição**: Utilizaremos o mesmo componente base para Dropdowns (como o `Menu` do Gluestack) tanto para o menu de Avatar (Logout) quanto para o seletor de escola, customizando via propriedades quando necessário.
- **Background**: O componente `screen-background` envolverá o conteúdo principal para renderizar o degradê azul presente no protótipo.
- **Scroll e Fixação**: A lista de turmas estará envolta por um `<ScrollView>` ou `<FlatList>`, enquanto o botão "Cadastrar nova turma" será posicionado com position absolute ou em flex layout inferior para que fique fixo no bottom da tela.
- **Cards (Turmas)**: A opção será utilizar o `Pressable` com `Box` estilizado (ou o componente `Card` se suportar hover/press state de forma fácil) dado que o card necessita de interação (chevron na direita indicando link).

## Risks / Trade-offs

- [Risk] O alinhamento exato de fontes e margens pode sofrer leve distorção dependendo do device.
  - Mitigation: Utilizaremos SafeArea e as classes utilitárias do TailwindCSS de forma responsiva para garantir que em diferentes resoluções os componentes não sobreponham uns aos outros, garantindo uma boa visualização no mobile.
- [Risk] A configuração do `Menu` do Gluestack pode ser chatinha se tentar se adaptar muito dinamicamente para dois fins muito diferentes (Avatar Dropdown e School Selector).
  - Mitigation: Faremos uma avaliação de separar os wrappers mas utilizando os mesmos primitivos base do Gluestack-ui para ambos.

