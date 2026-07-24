## MODIFIED Requirements

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
