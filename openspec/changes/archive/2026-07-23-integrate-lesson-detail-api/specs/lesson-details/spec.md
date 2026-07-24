## MODIFIED Requirements

### Requirement: Ações das Atividades
O sistema SHALL exibir botões de ação e a duração de cada atividade no rodapé do seu respectivo card na lista de exercícios, suportando integração REST com o backend, atualização otimista, recálculo de duração da aula e exibição adequada de estado.

#### Scenario: Visualização Padrão
- **WHEN** a tela está em modo de visualização padrão
- **THEN** cada atividade deve exibir o botão de conclusão com a cor e texto de acordo com o estado: texto "Concluído" (com borda e cor de texto primárias) quando `completed` for `true`, e texto "Concluir" quando `completed` for `false`.
- **THEN** cada atividade deve exibir no rodapé a sua duração em minutos acompanhada de um ícone de relógio Lucide (`Clock`).

#### Scenario: Alternância de Conclusão da Atividade (toggleActivityCompletion)
- **WHEN** o usuário aciona o botão de conclusão da atividade
- **THEN** o sistema deve atualizar instantaneamente a interface e a store (Optimistic UI) alternando o estado de conclusão da atividade.
- **THEN** o sistema deve disparar uma requisição `PATCH /class-plans/:planId/lessons/:lessonNumber/activities/:activityId` enviando `{ "completed": boolean }`.
- **THEN** caso a chamada retorne sucesso, o sistema deve revalidar a store com o plano retornado pelo backend; em caso de falha, deve realizar o rollback do estado otimista para o snapshot anterior e notificar o usuário.

#### Scenario: Recalibração de Atividade (recalibrateActivity)
- **WHEN** o usuário confirma a recalibração através do Bottom Sheet
- **THEN** o sistema deve exibir o estado de carregamento global da tela (`isRecalibrating` / `<ScreenBackground isLoading>`).
- **THEN** o sistema deve disparar uma requisição `POST /class-plans/:planId/lessons/:lessonNumber/activities/:activityId/recalibrate` enviando os parâmetros `{ emphasis, complexity, observations }`.
- **THEN** ao receber a resposta com o objeto de atividade recalibrado (`ActivitySubdoc`), o sistema deve sobrescrever o nó da atividade na store/estado e recalcular a duração total da aula somando a duração das atividades da aula.

#### Scenario: Exclusão de Atividade no Modo de Edição (removeActivity)
- **WHEN** o usuário clica no botão "Excluir" em uma atividade no modo de edição
- **THEN** a atividade deve ser removida da lista em memória local e o sistema deve recalcular a duração total da aula com base nas atividades restantes.

#### Scenario: Salvamento de Alterações da Aula (saveChanges)
- **WHEN** o usuário clica no botão "Salvar alterações" no modo de edição
- **THEN** o sistema deve sair otimisticamente do modo de edição e atualizar a store com os dados editados (título, duração recalculada, sugestões da IA e atividades).
- **THEN** o sistema deve disparar uma requisição `PUT /class-plans/:planId/lessons/:lessonNumber` com o payload completo da aula e atividades.
- **THEN** em caso de sucesso, revalida a store com a resposta do backend; em caso de falha, realiza o rollback do estado anterior e notifica o usuário.
