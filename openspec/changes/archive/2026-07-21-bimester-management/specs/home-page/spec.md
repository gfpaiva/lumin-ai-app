## MODIFIED Requirements

### Requirement: Saudação e Bimestre
A tela MUST exibir uma saudação dinâmica com o nome do usuário ("Olá, {username}!") e o bimestre atual em andamento. O componente do bimestre atual MUST ser clicável para abrir o BottomSheet de gestão e seleção de bimestres.

#### Scenario: Apresentação da Saudação
- **WHEN** a tela principal é visualizada
- **THEN** o texto "Olá, {username}!" (onde {username} é o nome do professor) deve ser exibido na tela

#### Scenario: Interação com o Bimestre
- **WHEN** o usuário clica no componente do bimestre atual (ex: "3º Bimestre 2026")
- **THEN** o bottomsheet de gestão de bimestres MUST ser acionado e exibido ao usuário
