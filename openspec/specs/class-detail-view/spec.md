## ADDED Requirements

### Requirement: Navegação para o detalhe da turma
O sistema SHALL permitir que o usuário navegue para a tela de detalhe da turma a partir da tela inicial (Home).

#### Scenario: Usuário clica em uma turma na Home
- **WHEN** o usuário toca no card de uma turma específica na lista da tela Home
- **THEN** o sistema deve navegar para a tela de detalhe da turma utilizando a navegação (push) da stack, passando o contexto (escola, bimestre, id da turma)
- **THEN** a tela de detalhe deve ser exibida com a animação padrão do sistema

### Requirement: Estrutura do Header da tela de Detalhe da Turma
O sistema SHALL exibir um cabeçalho e informações de boas-vindas na tela de detalhe da turma, utilizando o novo componente de agrupamento compartilhado.

#### Scenario: Visualização do cabeçalho
- **WHEN** o usuário acessa a tela de detalhe da turma
- **THEN** o sistema deve utilizar o componente agrupador (`LayoutHeader` ou similar)
- **THEN** o sistema deve exibir o logo/menu global padrão (`Header`) no topo
- **THEN** abaixo dele, deve exibir um ícone clicável de "voltar" (`chevron-left`) que retorna à tela anterior

### Requirement: Informações da Turma e Bimestre
O sistema SHALL exibir as informações principais da disciplina, escola, turma e resumo do bimestre.

#### Scenario: Visualização das informações de boas-vindas
- **WHEN** o usuário acessa a tela de detalhe da turma
- **THEN** o sistema deve exibir a disciplina e a escola do professor na primeira linha do bloco de boas-vindas
- **THEN** o sistema deve exibir o nome da turma selecionada em destaque na segunda linha
- **THEN** ao clicar no nome da turma, um Bottom Sheet (placeholder) deve ser aberto

#### Scenario: Visualização do resumo do bimestre
- **WHEN** a tela de detalhe é carregada
- **THEN** o sistema deve exibir um texto descritivo com o resumo do conteúdo do bimestre atual para a referida turma

### Requirement: Listagem de Aulas do Bimestre
O sistema SHALL exibir os tópicos (aulas) previstas para o bimestre na tela de detalhe da turma e permitir a navegação para os detalhes.

#### Scenario: Exibição da grade de aulas
- **WHEN** a tela de detalhe é carregada
- **THEN** o sistema deve exibir uma lista em formato de grid contendo cards de aulas
- **THEN** cada card deve exibir a indicação "Aula X", o título correspondente e o percentual de progresso de conclusão do tema (mockado)

#### Scenario: Navegação para o detalhe da aula
- **WHEN** o usuário clica em um card de aula
- **THEN** o sistema deve utilizar a navegação em stack (push) para direcionar o usuário até a tela de Detalhe da Aula correspondente
