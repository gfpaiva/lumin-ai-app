## MODIFIED Requirements

### Requirement: Seletor de Escola
Um seletor MUST ser exibido permitindo ao professor acionar a gestão e seleção de escolas atuais através de um BottomSheet.

#### Scenario: Seletor Exibido
- **WHEN** a tela principal é visualizada
- **THEN** um botão/seletor contendo o nome da escola atual (ex: "EE Mário Covas") e um chevron para baixo é visível
- **AND WHEN** o botão é clicado
- **THEN** o BottomSheet de gestão de escolas é aberto

## REMOVED Requirements

### Requirement: Seletor de Escola (Dropdown)
**Reason**: Replaced by BottomSheet de Gestão de Escolas.
**Migration**: O clique no seletor da home abrirá o BottomSheet e não o antigo menu suspenso.
