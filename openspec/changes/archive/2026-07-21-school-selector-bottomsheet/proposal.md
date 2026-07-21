## Why

A gestão de escolas e o seletor de escolas atualmente utilizam um menu dropdown simples no `SchoolSelector`. A nova experiência exige a utilização de um `BottomSheet` para apresentar a lista de escolas cadastradas, fornecer um sumário de turmas, permitir a seleção e incluir um fluxo de cadastro de novas escolas diretamente da interface, melhorando a experiência do usuário, especialmente em dispositivos móveis, e agrupando funcionalidades relacionadas.

## What Changes

- Substituição do menu dropdown atual no `SchoolSelector` por uma invocação de um `BottomSheet`.
- Criação de uma lista de escolas dentro do `BottomSheet` com informações de nome, quantidade de turmas (estilo `BimesterSummaryCard`), ícone de check na escola selecionada e clique desabilitado na mesma.
- Inclusão de um botão "Cadastrar escola" no final da lista.
- Implementação de um fluxo de transição de tela dentro do mesmo `BottomSheet`: ao clicar em "Cadastrar escola", o conteúdo muda para um formulário.
- Criação do formulário de cadastro de escola com campos: "Nome" e "Categoria" (seletor: Escola estadual, Escola municipal), além de um botão "Salvar".
- Gerenciamento de estado (modo seleção vs modo cadastro) e persistência mockada em memória utilizando zustand (criação de uma store e feature slice própria para `school`).
- Reset do estado do bottomsheet: se o usuário fechar no modo cadastro, ao abrir novamente deve voltar para a lista de escolas.
- Manuseio adequado de teclado com `KeyboardAvoidingView` para o formulário.
- Inclusão de novos componentes Gluestack v5 (`form-control`, `input`, etc.) se necessário.

## Capabilities

### New Capabilities
- `school-management`: Gerenciamento de escolas, englobando a listagem, seleção e o cadastro via `BottomSheet` mockado em memória.

### Modified Capabilities
- `home-page`: O seletor de escolas da home `SchoolSelector` é modificado para abrir o novo fluxo baseado em `BottomSheet`.

## Impact

- `src/features/home/components/SchoolSelector.tsx` (integração do acionador do bottom sheet)
- `src/features/home/components/HomeFeature.tsx` (se o estado residir mais acima, a ser avaliado)
- Adição de uma nova feature slice `src/features/school/` (contendo models, views, viewmodels, hooks, store).
- Adição de dependências de componentes visuais do Gluestack-ui v5.
