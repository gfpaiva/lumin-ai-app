## Context

Os usuários (professores) precisam gerenciar o andamento de seus bimestres, incluindo a visualização de progresso do que já foi concluído e o encerramento do bimestre em andamento. Essa necessidade traz um novo fluxo a partir da Home Page (especificamente do componente `HomeWelcome`), exigindo a adição de interatividade e a criação de um gerenciador de estado específico para os bimestres, suportado por uma UI no formato de Bottom Sheet contendo informações sumárias sobre o progresso das aulas e rendimento.

## Goals / Non-Goals

**Goals:**
- Implementar o componente `BimesterSelectorBottomSheet` invocável a partir do `HomeWelcome`.
- Criar a navegação interna do BottomSheet via Chips (1º, 2º, 3º, 4º Bim).
- Representar visualmente os estados de um bimestre (Concluído [Check], Em Andamento [Progress], Futuro [Bloqueado]).
- Implementar botão de conclusão para o bimestre em andamento.
- Armazenar o estado dos bimestres usando Zustand, de acordo com as regras arquiteturais, em `src/infra/store/bimester.store.ts`.
- Criar o respectivo ViewModel (`useBimesterSelectorViewModel.ts`) na feature `bimester`.

**Non-Goals:**
- Integração real com API ou banco de dados no momento (os dados serão mockados localmente no estado inicial da store, ou utilizando ports/adapters se envolver buscar remotamente, mas focado no mock estático agora).
- Alteração da lógica interna de como as aulas são contabilizadas. (O "progresso" e "rendimento" são dados sumários apresentados passivamente).

## Decisions

1. **Localização do Estado (Zustand):**
   - **Decisão:** Criação de `src/infra/store/bimester.store.ts`.
   - **Alternativa Considerada:** Colocar o estado dentro do próprio componente ou de um Context API na `home`.
   - **Justificativa:** Conforme `03-state-ai-simulation.md`, micro stores devem ficar em `infra/store/[domain].store.ts`. O domínio é `bimester`.

2. **Criação da Feature Slice `bimester`:**
   - **Decisão:** Criar `src/features/bimester/` para abrigar o BottomSheet e o ViewModel.
   - **Alternativa Considerada:** Acoplar o BottomSheet dentro de `src/features/home/`.
   - **Justificativa:** O gerenciamento do bimestre é um conceito isolado de domínio. A `home` apenas orquestra a chamada, mas toda a lógica, componentes visuais específicos (Chips, Sumário) e hooks pertinentes ao domínio ficam contidos na sua feature slice (`bimester`), mantendo a arquitetura limpa (Feature Slices).

3. **Arquitetura MVVM:**
   - **Decisão:** O `BimesterSelectorBottomSheet` será uma "dumb view" conectada através de `src/features/bimester/hooks/useBimesterSelectorViewModel.ts`. O Hook irá conversar com o `bimester.store.ts`.

4. **Componentes Visuais:**
   - **Decisão:** Utilização do `GenericBottomSheet` existente e criação de `BimesterChip`, `BimesterSummaryCard` e uso do `Button` base para o encerramento. Os componentes devem seguir Gluestack v3.

## Risks / Trade-offs

- **[Risco] Estrutura Fixa de 4 Bimestres:** Atualmente o UI design prescreve estritamente 4 bimestres em formato de Chips.
  - **Mitigação:** A UI deve iterar sobre um array mapeado pelo ViewModel (proveniente do Store) em vez de ser hardcoded na View. Isso permite adaptar a quantidade de bimestres futuramente sem modificar a View, desde que o estilo acomode (ex: Scroll horizontal se passar de 4 ou 5 itens).
- **[Risco] Acesso direto a Store:** Views tentando acessar o Zustand diretamente.
  - **Mitigação:** Criação forçada do ViewModel que orquestra a leitura da store, respeitando o pattern MVVM exigido.
