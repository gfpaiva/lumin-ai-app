## MODIFIED Requirements

### Requirement: Tela de Detalhe da Aula
O sistema SHALL exibir uma tela contendo o detalhamento da aula selecionada obtida a partir da `lessonStore`, apresentando o título real, tempo de aula, sugestões e exercícios planejados trazidos do backend.

#### Scenario: Visualização do detalhe da aula (Modo Padrão)
- **WHEN** a tela de detalhe da aula é carregada via parâmetro de rota (`lessonNumber` e `classId`)
- **THEN** o sistema deve obter os dados da aula selecionada a partir da `lessonStore` (evitando novo fetch caso o plano já esteja em memória)
- **THEN** o sistema deve exibir o número e título real da aula: "Aula X" e `lesson.title`
- **THEN** o sistema deve exibir a tag de sugestões de IA caso `lesson.aiSuggestions` esteja preenchido
- **THEN** o sistema deve exibir o bloco de tempo de aula contendo a duração da aula formatada
- **THEN** o sistema deve listar os exercícios/atividades reais previstos para a aula, apresentando seus respectivos títulos, descrições e status de conclusão
