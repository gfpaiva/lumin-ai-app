# bimester-management Specification

## Purpose
Gerenciamento de bimestres letivos, seleção de bimestres ativos e sincronização de progresso lecionado.

## Requirements
### Requirement: Navegação e Visualização dos Bimestres
O sistema MUST apresentar um BottomSheet contendo chips representativos dos bimestres letivos. Estes chips MUST atuar como abas (tabs) para alterar o conteúdo de progresso exibido abaixo.

#### Scenario: Chips de Bimestres Concluídos
- **WHEN** o usuário visualiza os chips de bimestre no BottomSheet
- **THEN** os bimestres que já foram concluídos MUST exibir um ícone de "check"
- **AND** os chips MUST ser selecionáveis ao clique

#### Scenario: Chip do Bimestre em Andamento
- **WHEN** o usuário visualiza os chips de bimestre no BottomSheet
- **THEN** o bimestre atualmente em andamento MUST exibir um ícone circular de progresso
- **AND** o chip MUST ser selecionável ao clique

#### Scenario: Chips de Bimestres Futuros (Bloqueados)
- **WHEN** o usuário visualiza os chips de bimestre no BottomSheet
- **THEN** os bimestres posteriores ao atual MUST exibir um ícone de "cadeado"
- **AND** a navegação (clique) para estes bimestres MUST ser desabilitada

### Requirement: Exibição do Progresso do Bimestre
O conteúdo do BottomSheet MUST atualizar dinamicamente para exibir informações resumidas do bimestre que está ativamente selecionado nos chips, revalidando assincronamente os dados em segundo plano sempre que ocorrer alteração de progresso em aulas.

#### Scenario: Visualização do Progresso
- **WHEN** o usuário clica em um chip de bimestre (concluído ou em andamento)
- **THEN** o conteúdo abaixo dos chips MUST ser atualizado com os dados daquele bimestre (Conteúdo lecionado, total de aulas, porcentagem, Rendimento das turmas e matérias)

#### Scenario: Revalidação Automática após Alternar Conclusão de Atividade
- **WHEN** o usuário conclui ou desmarca a conclusão de uma atividade em uma aula
- **THEN** o sistema MUST solicitar a atualização dos bimestres em segundo plano ao backend sem bloquear a interface de aula
- **AND** a `BimesterStore` MUST atualizar as métricas do bimestre assim que os dados forem retornados

### Requirement: Conclusão de Bimestre
O sistema MUST permitir a conclusão do bimestre quando este estiver em andamento.

#### Scenario: Exibição do Botão de Conclusão para Bimestre Atual
- **WHEN** o bimestre selecionado ativamente no chip for o bimestre em andamento
- **THEN** um botão principal com o texto "Concluir bimestre" MUST ser exibido no final do BottomSheet

#### Scenario: Ocultação do Botão de Conclusão para Bimestres Passados
- **WHEN** o bimestre selecionado ativamente no chip for um bimestre concluído
- **THEN** o botão "Concluir bimestre" MUST ser ocultado (exibindo apenas o sumário de progresso)
