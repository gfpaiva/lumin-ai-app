## Purpose
Exibir e interagir com os detalhes de uma aula.
## Requirements
### Requirement: Tela de Detalhe da Aula
O sistema SHALL exibir uma tela contendo o detalhamento da aula selecionada obtida a partir da `lessonStore`, apresentando o título real, tempo de aula, sugestões e exercícios planejados trazidos do backend, permitindo editar e salvar as alterações enviando o DTO mapeado corretamente (`completedAt`, `lessonNumber`, `duration` numérico) para a API backend.

#### Scenario: Visualização do detalhe da aula (Modo Padrão)
- **WHEN** a tela de detalhe da aula é carregada via parâmetro de rota (`lessonNumber` e `classId`)
- **THEN** o sistema deve obter os dados da aula selecionada a partir da `lessonStore` (evitando novo fetch caso o plano já esteja em memória)
- **THEN** o sistema deve exibir o número e título real da aula: "Aula X" e `lesson.title`
- **THEN** o sistema deve exibir a tag de sugestões de IA caso `lesson.aiSuggestions` esteja preenchido
- **THEN** o sistema deve exibir o bloco de tempo de aula contendo a duração da aula formatada
- **THEN** o sistema deve listar os exercícios/atividades reais previstos para a aula, apresentando seus respectivos títulos, descrições e status de conclusão

#### Scenario: Salvar alterações da aula (Modo de Edição)
- **WHEN** o usuário finaliza a edição e aciona `saveChanges`
- **THEN** o sistema deve converter o objeto de domínio `Lesson` para DTO através do mapper `mapLessonDomainToDto`
- **THEN** cada atividade com `completed == true` deve ser enviada com `completedAt` preenchido com uma data ISO válida e atividades com `completed == false` com `completedAt: null`
- **THEN** a requisição `PUT /class-plans/:planId/lessons/:lessonNumber` deve receber o DTO com `lessonNumber`, `duration` numérico e lista de `activities` em formato `ActivityDto`

### Requirement: Componentes Visuais Reutilizáveis (Tag e Header)
O sistema SHALL utilizar componentes isolados para as tags e para o layout do cabeçalho da página de detalhes.

#### Scenario: Visualização do cabeçalho unificado
- **WHEN** a tela de detalhe da aula é acessada
- **THEN** a tela deve exibir o componente de agrupamento que contém o header global, o botão chevron de voltar (que navega de volta pra tela anterior) e o hero header com os dados da aula.

#### Scenario: Visualização das Tags
- **WHEN** a tela exibe informações complementares (Sugestões, Tempo de Aula)
- **THEN** deve usar o componente de `Tag`, variando de acordo com as propriedades (neutra para IA, azul e larga para tempo).

### Requirement: Ações das Atividades
O sistema SHALL exibir botões de ação e a duração de cada atividade no rodapé do seu respectivo card na lista de exercícios.

#### Scenario: Visualização Padrão
- **WHEN** a tela está em modo de visualização padrão
- **THEN** cada atividade deve exibir um botão "Concluir" (com ícone de check) em variante vazada.
- **THEN** cada atividade deve exibir no rodapé a sua duração em minutos acompanhada de um ícone de relógio Lucide (`Clock`).
- **THEN** ao clicar no botão "Concluir", a atividade deve ser marcada/desmarcada como concluída (toggle de conclusão).

#### Scenario: Visualização no Modo de Edição para Atividades Pendentes
- **WHEN** a tela está em modo de edição e a atividade não foi concluída (`completed == false`)
- **THEN** o botão "Concluir" é ocultado.
- **THEN** a atividade deve exibir dois botões de variante vazada: "Recalibrar atividade ✨" e "Excluir" (com ícone de X), mantendo a duração exibida no rodapé.
- **THEN** ao clicar em "Recalibrar atividade ✨", o sistema deve abrir um Bottom Sheet de recalibração.
- **THEN** ao clicar em "Excluir", a atividade correspondente deve ser removida da lista.

#### Scenario: Visualização no Modo de Edição para Atividades Concluídas
- **WHEN** a tela está em modo de edição e a atividade já foi concluída (`completed == true`)
- **THEN** o botão "Concluir" clicável é ocultado.
- **THEN** os botões "Recalibrar atividade ✨" e "Excluir" devem ser ocultados.
- **THEN** a atividade deve exibir uma tag/badge estática de "Concluído" com ícone de check (não clicável).
