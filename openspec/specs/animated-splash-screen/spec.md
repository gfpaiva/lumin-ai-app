## ADDED Requirements

### Requirement: Exibição da Splash Screen Animada ao Iniciar o Aplicativo
O sistema SHALL exibir uma splash screen animada customizada como primeira tela ao inicializar o aplicativo, após o splash nativo do Expo ser ocultado. A splash screen MUST ser composta pelo componente `ScreenBackground` com gradiente e o logo `AnimatedLuminLogo` centralizado na tela.

#### Scenario: Renderização inicial da splash screen
- **WHEN** o aplicativo é iniciado e as fontes são carregadas
- **THEN** a splash screen customizada é exibida com o logo Lumin centralizado sobre o background gradiente azul-escuro da aplicação
- **AND** nenhum elemento da home page é visível durante a exibição da splash

### Requirement: Animação de Glow Sequencial por Letra
O logo MUST exibir um efeito de "glow" branco que percorre sequencialmente cada letra da palavra "Lumin", da esquerda para a direita. Cada letra SHALL acender com um efeito de brilho branco (glow) e permanecer iluminada enquanto a próxima letra acende. A animação SHALL ser implementada com `react-native-reanimated` executando na UI thread.

#### Scenario: Sequência de glow letra a letra
- **WHEN** a splash screen é exibida pela primeira vez
- **THEN** a letra "L" começa a acender com efeito glow branco
- **AND** após a letra "L" estar totalmente iluminada, a letra "u" começa a acender
- **AND** o processo continua sequencialmente por "m", "i", "n" e o ponto separador
- **AND** ao final, todas as letras estão iluminadas simultaneamente com glow branco

#### Scenario: Duração total da animação sequencial
- **WHEN** a animação sequencial de glow é iniciada
- **THEN** cada letra acende em aproximadamente 200-300ms
- **AND** a animação total não ultrapassa 2 segundos

### Requirement: Pulsação do Logo Aguardando Backend
Após a conclusão da animação sequencial, o logo completo SHALL entrar em modo de pulsação (blinking glow), com o brilho total do logo alternando entre intensidade máxima e mínima em ciclo contínuo. O logo MUST permanecer piscando enquanto a chamada de inicialização do backend estiver pendente.

#### Scenario: Início da pulsação após animação sequencial
- **WHEN** a animação de glow sequencial por letra é concluída
- **THEN** o logo inicia uma animação de pulsação com o glow completo oscilando ciclicamente
- **AND** a pulsação continua enquanto o backend simulado não responde

#### Scenario: Pulsação contínua enquanto aguarda
- **WHEN** o timeout do backend simulado ainda não foi concluído
- **THEN** o logo continua pulsando ininterruptamente com intervalo de 1-1.5 segundos por ciclo

### Requirement: Inicialização do Backend Simulado (Mock)
O sistema SHALL simular uma chamada de inicialização de backend via adapter simulado em `src/infra/initialization/`. A chamada MUST ser feita via Port definido em `src/common/ports/initialization.port.ts`. Nesta fase, o adapter usará um `setTimeout` de 2-4 segundos para simular o tempo de resposta.

#### Scenario: Chamada do adapter simulado ao montar a splash
- **WHEN** a splash screen é montada
- **THEN** o ViewModel (`useSplashViewModel`) invoca o adapter de inicialização via port
- **AND** o adapter resolve após o timeout simulado configurável

#### Scenario: Conclusão do backend simulado
- **WHEN** o adapter de inicialização resolve com sucesso
- **THEN** o ViewModel sinaliza que a inicialização foi concluída
- **AND** a transição de saída da splash screen é iniciada

### Requirement: Transição Fade-Out da Splash e Fade-In da Home
Após a conclusão da inicialização (backend mock + animação mínima concluída), o sistema SHALL iniciar uma transição suave com fade-out do logo/splash screen e navegação para a tela home. A home page SHALL aparecer com um fade-in visual, garantindo uma transição fluida entre as telas.

#### Scenario: Fade-out da splash screen ao concluir inicialização
- **WHEN** o backend simulado resolve e a animação sequencial de glow foi concluída
- **THEN** o logo inicia um fade-out com duração de 400-600ms
- **AND** o background da splash também desaparece gradualmente

#### Scenario: Navegação para a home após fade-out
- **WHEN** o fade-out da splash screen é concluído
- **THEN** o Expo Router navega para a rota home usando `router.replace`
- **AND** a home page é exibida sem a possibilidade de voltar para a splash via botão de voltar
