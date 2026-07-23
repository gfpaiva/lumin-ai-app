## MODIFIED Requirements

### Requirement: Informações da Turma e Bimestre
O sistema SHALL exibir as informações principais da disciplina, escola, turma e resumo do bimestre buscados do backend e das stores globais (`classStore`, `schoolStore`, `bimesterStore`, `lessonStore`).

#### Scenario: Visualização das informações de boas-vindas
- **WHEN** o usuário acessa a tela de detalhe da turma
- **THEN** o sistema deve obter a disciplina e o nível de ensino da turma através do `classStore` e a escola através do `schoolStore`
- **THEN** o sistema deve exibir a disciplina e a escola do professor na primeira linha do bloco de boas-vindas (ex: "História • EE Mário Covas")
- **THEN** o sistema deve exibir o nome da turma selecionada em destaque na segunda linha (ex: "2º Ano Ensino Médio")
- **THEN** ao clicar no nome da turma, um Bottom Sheet (placeholder) deve ser aberto

#### Scenario: Visualização do resumo do bimestre
- **WHEN** a tela de detalhe é carregada
- **THEN** o sistema deve buscar o plano da turma via API `GET /class-plans?classId={classId}&bimesterId={bimesterId}` se não estiver presente na `lessonStore`
- **THEN** o sistema deve exibir o texto descritivo do tema retornado pelo plano de aula (`plan.theme`)

### Requirement: Listagem de Aulas do Bimestre
O sistema SHALL exibir os tópicos (aulas) previstas para o bimestre na tela de detalhe da turma e permitir a navegação para os detalhes da aula correspondente.

#### Scenario: Exibição da grade de aulas
- **WHEN** a tela de detalhe é carregada
- **THEN** o sistema deve exibir uma lista em formato de grid contendo cards de aulas baseados nos dados reais de `plan.lessons`
- **THEN** cada card deve exibir a indicação "Aula X", o título correspondente e o percentual de progresso calculado com base nas atividades da aula

#### Scenario: Navegação para o detalhe da aula
- **WHEN** o usuário clica em um card de aula
- **THEN** o sistema deve utilizar a navegação em stack (push) para direcionar o usuário até a tela de Detalhe da Aula passagens dos parâmetros de rota (`lessonNumber` e `classId`)
