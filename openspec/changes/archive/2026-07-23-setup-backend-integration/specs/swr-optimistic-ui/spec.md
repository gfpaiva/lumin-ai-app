## ADDED Requirements

### Requirement: Optimistic Feedback e Stale Data
O sistema SHALL adotar atualizações otimistas da UI (Stale-While-Revalidate pattern na View) interagindo com as micro-stores para mascarar o tempo de latência da rede e garantir a percepção de performance.

#### Scenario: Mutação de Sucesso (Stale/Optimistic)
- **WHEN** a ViewModel executa uma ação de gravação (ex: concluir um bimestre)
- **THEN** o estado global é imediatamente atualizado via `actionOptimistic`, a interface renderiza o novo estado e, simultaneamente, o `HttpPort` envia o PATCH ao backend

#### Scenario: Mutação Falha e Rollback (Revalidate Error)
- **WHEN** o backend recusa a mutação (Erro 4xx/5xx ou Timeout)
- **THEN** a ViewModel aciona a action de `rollback` passando o snapshot devolvido no passo inicial e os dados da tela revertem de modo atômico e determinístico
