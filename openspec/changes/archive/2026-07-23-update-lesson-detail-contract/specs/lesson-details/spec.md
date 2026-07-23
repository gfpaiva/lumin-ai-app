## MODIFIED Requirements

### Requirement: Tela de Detalhe da Aula
O sistema SHALL exibir uma tela contendo o detalhamento da aula selecionada, apresentando o título, tempo de aula, texto descritivo de sugestões da IA, atividades planejadas com duração em minutos e controlar o estado de "Modo de Edição".

#### Scenario: Visualização do detalhe da aula (Modo Padrão)
- **WHEN** a tela de detalhe da aula é carregada e não está em modo de edição
- **THEN** o sistema deve exibir as informações da aula: Número da aula, Título da Aula.
- **THEN** o sistema deve exibir uma tag de "Sugestões geradas com IA ✨".
- **THEN** o sistema deve exibir o texto descritivo de sugestões geradas por IA (`aiSuggestions`) caso esteja presente na aula, logo abaixo da tag de sugestões.
- **THEN** o sistema deve exibir o bloco de tempo de aula contendo a duração do tema e um texto de suporte indicando o nível da turma correspondente.
- **THEN** o sistema deve listar os exercícios/atividades previstos para essa aula em `localActivities`, com seus respectivos títulos, descrições e duração em minutos exibida no rodapé do card com ícone de relógio Lucide (`Clock`).
- **THEN** o sistema deve exibir um botão "Customizar ✨" fixo na base da tela.

#### Scenario: Ativação do Modo de Edição
- **WHEN** o usuário clica no botão "Customizar ✨"
- **THEN** a tela deve entrar em modo de edição.
- **THEN** a tag superior "Sugestões geradas com IA ✨" deve ser substituída por "Modo edição 👀".
- **THEN** o botão fixo na base da tela deve mudar para "Salvar alterações" (estilo preenchido).

#### Scenario: Salvando e saindo do Modo de Edição
- **WHEN** o usuário clica no botão "Salvar alterações"
- **THEN** o sistema deve simular uma recomputação (estado mockado) e retornar a tela para o modo de visualização padrão.

### Requirement: Ações das Atividades
O sistema SHALL exibir botões de ação e a duração de cada atividade no rodapé do seu respectivo card na lista de exercícios.

#### Scenario: Visualização Padrão
- **WHEN** a tela está em modo de visualização padrão
- **THEN** cada atividade deve exibir um botão "Concluir" (com ícone de check) em variante vazada.
- **THEN** cada atividade deve exibir no rodapé a sua duração em minutos acompanhada de um ícone de relógio Lucide (`Clock`).
- **THEN** ao clicar no botão "Concluir", a atividade deve ser marcada/desmarcada como concluída (toggle de conclusão).

#### Scenario: Visualização no Modo de Edição
- **WHEN** a tela está em modo de edição
- **THEN** o botão "Concluir" é ocultado.
- **THEN** cada atividade deve exibir dois botões de variante vazada: "Recalibrar exercício ✨" e "Excluir" (com ícone de X), mantendo a duração exibida no rodapé.
- **THEN** ao clicar em "Recalibrar exercício ✨", o sistema deve abrir um Bottom Sheet de recalibração.
- **THEN** ao clicar em "Excluir", a atividade correspondente deve ser removida da lista.
