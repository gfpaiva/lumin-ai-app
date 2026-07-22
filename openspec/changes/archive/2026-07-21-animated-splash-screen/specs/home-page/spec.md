## MODIFIED Requirements

### Requirement: Layout Principal da Tela Home
A tela home MUST exibir um layout contendo Header, Mensagem de Boas Vindas com o Bimestre, Seletor de Escola, Lista de Turmas e um Botão Flutuante de Nova Turma. A tela MUST estar envolta em um componente de background. A rota `/` (index) MUST exibir primeiramente a splash screen animada antes de renderizar a home, utilizando `router.replace` ao concluir a inicialização.

#### Scenario: Visualização do Background
- **WHEN** o usuário abre a tela inicial
- **THEN** o background principal (`screen-background`) com o gradiente da aplicação é renderizado atrás de todos os elementos

#### Scenario: Acesso direto após splash
- **WHEN** a splash screen conclui sua animação e o backend mock é resolvido
- **THEN** a home page é exibida automaticamente via `router.replace`
- **AND** o botão de voltar do dispositivo NÃO retorna para a splash screen
