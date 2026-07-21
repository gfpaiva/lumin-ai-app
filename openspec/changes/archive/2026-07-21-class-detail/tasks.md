## 1. Refatoração e Componentes Base

- [x] 1.1 Criar o componente genérico `HeroHeader` em `src/common/components/` extraindo o layout e lógica visual do atual `HomeWelcome.tsx`.
- [x] 1.2 Atualizar o `HomeWelcome.tsx` na feature `home` para utilizar o novo `HeroHeader`, garantindo que não haja regressões visuais.
- [x] 1.3 Criar o componente `LessonCard.tsx` dentro de `src/features/class/components/` contendo o número da aula, título e barra/texto de progresso de conclusão.

## 2. Implementação da UI de Detalhe da Turma

- [x] 2.1 Criar o componente principal `ClassDetailFeature.tsx` em `src/features/class/components/`.
- [x] 2.2 Adicionar o `Header` global no topo da tela `ClassDetailFeature` seguido de um ícone `chevron-left` clicável para voltar.
- [x] 2.3 Incluir o `HeroHeader` com os textos formatados (Disciplina/Escola na linha 1, Turma na linha 2) e ação para o Bottom Sheet de placeholder.
- [x] 2.4 Adicionar a seção de texto em branco, tamanho large, contendo o resumo mockado do bimestre.
- [x] 2.5 Montar o Grid (usando wrap e flexbox) renderizando uma lista de componentes `LessonCard` com dados mockados.

## 3. Estado e ViewModel

- [x] 3.1 Criar o hook `useClassDetailViewModel.ts` em `src/features/class/hooks/` responsável por capturar os parâmetros da rota (escola, bimestre, turma) e prover os dados mockados de aulas e resumo.
- [x] 3.2 Conectar o `useClassDetailViewModel` ao `ClassDetailFeature` para popular a interface dinamicamente.

## 4. Navegação e Roteamento (Expo Router)

- [x] 4.1 Criar a página de rota no Expo Router (ex: `src/app/class/[id].tsx` ou aninhamento equivalente aplicável na arquitetura atual).
- [x] 4.2 Implementar a chamada de navegação (push) ao pressionar o `ClassCard` na tela `HomeFeature`, repassando os parâmetros necessários.
- [x] 4.3 Testar todo o fluxo ponta a ponta: Home -> Seleção da Turma -> Detalhe da Turma -> Voltar.
