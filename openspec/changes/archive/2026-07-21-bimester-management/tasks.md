## 1. Configuração do Estado e Tipagens (Feature Bimester)

- [x] 1.1 Criar o arquivo de tipos `src/features/bimester/types/bimester.types.ts` definindo a interface `Bimester` e o enum/type `BimesterStatus` (Concluído, Em Andamento, Futuro).
- [x] 1.2 Criar a store Zustand `src/infra/store/bimester.store.ts` com a lista inicial mockada de bimestres, o controle de qual bimestre está ativo (em andamento) e qual está selecionado no BottomSheet.

## 2. Implementação do ViewModel (MVVM)

- [x] 2.1 Criar o hook `src/features/bimester/hooks/useBimesterSelectorViewModel.ts` que irá encapsular as chamadas à store `bimester.store.ts` e exportar funções (`selectBimester`, `completeBimester`) e variáveis reativas para a UI.

## 3. Componentes Visuais do BottomSheet

- [x] 3.1 Criar o componente `BimesterChip.tsx` em `src/features/bimester/components/`, suportando as variações visuais (ícones e cores) baseadas no status do bimestre (selecionado, concluído, em andamento, bloqueado).
- [x] 3.2 Criar o componente `BimesterSummaryCard.tsx` para exibir os textos "Conteúdo lecionado", "Aulas totais", "%" e "Rendimento das turmas".
- [x] 3.3 Construir o componente orquestrador `BimesterSelectorBottomSheet.tsx` utilizando o ViewModel para iterar os chips, exibir o sumário do bimestre selecionado e renderizar o botão "Concluir bimestre" se aplicável.

## 4. Integração na Home Page

- [x] 4.1 Alterar `src/features/home/components/HomeWelcome.tsx` para interceptar o clique no texto do bimestre atual e emitir um evento `onPeriodPress`.
- [x] 4.2 Atualizar `src/features/home/components/HomeFeature.tsx` para controlar a abertura/fechamento do `BimesterSelectorBottomSheet` em resposta ao clique em `HomeWelcome`.
