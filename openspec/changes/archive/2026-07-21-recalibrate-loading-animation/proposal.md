## Why

A experiência atual durante a recalibração de exercícios não possui um feedback visual claro após o usuário tocar no botão de salvar, o que pode causar dúvidas se a ação foi realmente registrada. É necessário adicionar uma animação de loading imersiva que mascare a espera da requisição e torne a transição mais fluida e agradável.

## What Changes

- Fechamento imediato do BottomSheet de Recalibração assim que o usuário toca no botão de salvar/recalibrar.
- Efeito de *fade out* (opacidade para 0) de todo o conteúdo da tela principal (detalhe da aula).
- Animação de pulsar ("pulse") no *linear gradient* do componente `screen-background` durante a espera (simulada com timeout para a chamada de API).
- Retorno do conteúdo principal com um *fade in* suave quando o processo de recalibração for concluído.

## Capabilities

### New Capabilities
- `recalibrate-loading-animation`: Feedback visual e animações (fade-in, fade-out, pulse) coordenados entre o fechamento do modal, o conteúdo da tela e o fundo da tela durante o processo de recalibração.

### Modified Capabilities


## Impact

- `src/features/lesson/components/RecalibrateBottomSheet.tsx`: Modificado para fechar imediatamente e iniciar o estado de loading.
- `src/components/screen-background.tsx`: Modificado para aplicar a animação de pulsar no gradiente.
- Será necessário um gerenciamento de estado (possivelmente Zustand) para orquestrar as animações de opacidade do conteúdo da tela e do background entre diferentes componentes.
