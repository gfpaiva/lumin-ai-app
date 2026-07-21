## Why

O aplicativo precisa de um componente de Bottom Sheet genérico que siga estritamente o design visual fornecido (fundo escuro e título grande em branco), para ser reutilizado em diversos fluxos. A padronização através de um componente customizado, construído em cima do componente original do Gluestack UI, facilitará a manutenção e garantirá a consistência visual em todo o app.

## What Changes

- Adição do componente de Bottom Sheet do Gluestack UI via CLI.
- Criação de um novo componente genérico, por exemplo `GenericBottomSheet`, que empacota o componente do Gluestack.
- O componente genérico receberá uma propriedade `title`.
- O título será exibido com texto na cor branca, peso bold e tamanho 3xl.
- A cor de fundo do corpo do bottom sheet será `#1B1B1B`.
- O conteúdo interno do bottom sheet será flexível, injetado por composição através da propriedade `children`.

## Capabilities

### New Capabilities
- `generic-bottom-sheet`: Novo componente de UI reutilizável para exibição de modais inferiores padronizados, com suporte a título customizado e injeção de conteúdo (children).

### Modified Capabilities

## Impact

- Adição de novos arquivos de componentes na camada de UI do projeto.
- Instalação de dependência do Gluestack UI (adicionada via CLI).
