## Why

A tela inicial (Home) do aplicativo Lumin.AI é o ponto de entrada principal para os professores. Atualmente, precisamos implementar esta interface para que os usuários possam visualizar mensagens de boas-vindas, o bimestre atual, selecionar a escola e gerenciar/acessar suas turmas e disciplinas, de acordo com o design estabelecido. Isso é fundamental para a navegação primária e para o engajamento inicial do usuário com as principais funcionalidades.

## What Changes

- **Nova Tela Home**: Implementação da tela inicial, envolta no componente `screen-background`. A tela `app/index` ou similar apenas fará a chamada do componente principal da feature.
- **Componentes Base Gluestack**: Adição/instalação de componentes necessários do Gluestack v5, como Avatar, Menu, Icon, Box/Card e Pressable/Button.
- **Componentes de Feature (Home)**: Criação de componentes seguindo o padrão de Feature Slices:
  - **Header**: Contendo logo (à esquerda) e Avatar com Dropdown (à direita, com opção provisória de logout).
  - **Welcome & Period**: Seção com texto de boas-vindas ("Olá, {username}!") e bimestre atual com ícone de chevron.
  - **School Selector**: Dropdown para seleção de escola, possivelmente reutilizando a base do menu do Header.
  - **Class List**: Lista scrollável de cards exibindo a série/ano e a disciplina.
  - **Bottom Action**: Botão fixo inferior para cadastro de nova turma ("Cadastrar nova turma").
- **Assets**: Utilização do logotipo já existente em `assets/lumin-logo.svg`.

## Capabilities

### New Capabilities
- `home-page`: Implementação visual e de navegação inicial da tela Home, incluindo agrupamentos lógicos (Header, Seletor de Escola, Lista de Turmas).

### Modified Capabilities

## Impact

- **UI/UX**: Estabelece o layout inicial da aplicação e introduz componentes visuais importantes que poderão ser reaproveitados em outras telas.
- **Dependências**: Inclusão de componentes do Gluestack ui v5 caso ainda não estejam mapeados e instalados no projeto.
- **Navegação**: A tela deixará ganchos visuais e clicáveis (chevrons) preparados para futuros fluxos de navegação (bottomsheet de bimestres, acesso às turmas, fluxo de nova turma, e logout).
