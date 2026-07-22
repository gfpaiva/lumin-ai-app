## ADDED Requirements

### Requirement: Modal de Recalibração fecha imediatamente ao salvar
O sistema MUST fechar o `RecalibrateBottomSheet` imediatamente quando o usuário acionar o botão de salvar/recalibrar, independentemente da resposta da API.

#### Scenario: Acionamento do botão de recalibração
- **WHEN** o usuário toca no botão de recalibrar no BottomSheet
- **THEN** o `RecalibrateBottomSheet` é fechado imediatamente e o estado de recalibração (`isRecalibrating`) é definido como `true`

### Requirement: Conteúdo da aula realiza fade-out
A tela de detalhe da aula MUST transitar a opacidade do seu conteúdo principal para 0 (fade-out) enquanto a recalibração estiver em andamento.

#### Scenario: Início da recalibração
- **WHEN** o estado de recalibração (`isRecalibrating`) muda para `true`
- **THEN** o conteúdo principal da tela realiza uma animação suave (com Reanimated) até atingir opacidade 0

### Requirement: Background exibe animação de pulse
O componente `screen-background` MUST iniciar uma animação de "pulsar" no seu gradiente enquanto a recalibração estiver ativa.

#### Scenario: Background recebe estado de loading
- **WHEN** o estado de recalibração (`isRecalibrating`) muda para `true`
- **THEN** o gradiente linear no background inicia uma animação cíclica contínua

### Requirement: Mock temporário e fade-in no término
O sistema MUST simular o tempo da requisição com um timeout (ou aguardar API), finalizar o estado de loading e restaurar a opacidade do conteúdo principal da aula (fade-in).

#### Scenario: Fim da recalibração
- **WHEN** a requisição ou o tempo limite simulado (timeout) for alcançado
- **THEN** o estado de recalibração (`isRecalibrating`) muda para `false` e o conteúdo principal da tela realiza uma animação suave (fade-in) até atingir opacidade 1
