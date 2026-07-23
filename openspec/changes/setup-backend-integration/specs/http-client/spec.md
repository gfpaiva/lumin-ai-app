## ADDED Requirements

### Requirement: Cliente HTTP Nativo
O sistema SHALL prover uma abstração `HttpPort` com os métodos básicos GET, POST, PUT, PATCH e DELETE, implementada através do `FetchAdapter`.

#### Scenario: Requisição bem-sucedida
- **WHEN** o adapter é chamado para processar a request
- **THEN** ele concatena a URL via `process.env.EXPO_PUBLIC_API_URL`, inclui Headers (Application/JSON e Auth token caso presente) e devolve a resposta tratada

#### Scenario: Timeout Nativo (60s)
- **WHEN** a requisição exceder 60 segundos
- **THEN** o request é abortado utilizando `AbortController` evitando locks indesejados na UI
