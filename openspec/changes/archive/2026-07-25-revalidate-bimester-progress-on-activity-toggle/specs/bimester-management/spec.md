## MODIFIED Requirements

### Requirement: Exibição do Progresso do Bimestre
O conteúdo do BottomSheet MUST atualizar dinamicamente para exibir informações resumidas do bimestre que está ativamente selecionado nos chips, revalidando assincronamente os dados em segundo plano sempre que ocorrer alteração de progresso em aulas.

#### Scenario: Visualização do Progresso
- **WHEN** o usuário clica em um chip de bimestre (concluído ou em andamento)
- **THEN** o conteúdo abaixo dos chips MUST ser atualizado com os dados daquele bimestre (Conteúdo lecionado, total de aulas, porcentagem, Rendimento das turmas e matérias)

#### Scenario: Revalidação Automática após Alternar Conclusão de Atividade
- **WHEN** o usuário conclui ou desmarca a conclusão de uma atividade em uma aula
- **THEN** o sistema MUST solicitar a atualização dos bimestres em segundo plano ao backend sem bloquear a interface de aula
- **AND** a `BimesterStore` MUST atualizar as métricas do bimestre assim que os dados forem retornados
