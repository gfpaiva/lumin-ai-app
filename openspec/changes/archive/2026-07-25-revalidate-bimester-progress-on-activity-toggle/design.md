## Context

O progresso consolidado de um bimestre é calculado e exibido no componente `BimesterSummaryCard` e alimentado pelo estado global `BimesterStore`. Quando o usuário navega na tela de detalhes da aula (`LessonDetailFeature`) e altera a conclusão de uma atividade (`toggleActivityCompletion`), a atualização otimista e o salvamento ocorrem apenas na `LessonStore`.

Como o progresso do bimestre abrange múltiplas turmas e disciplinas que não estão necessariamente carregadas no cliente, o frontend depende do backend para obter a lista atualizada de bimestres com suas métricas agregadas recalculadas.

## Goals / Non-Goals

**Goals:**
- Garantir que a `BimesterStore` reflita as métricas atualizadas do bimestre em segundo plano após a alteração da conclusão de qualquer atividade (`toggleActivityCompletion`).
- Manter a UI de lição 100% responsiva (sem adicionar loadings na tela de aula enquanto busca os bimestres).
- Falhar silenciosamente se o re-fetch de bimestres em background falhar por instabilidade de rede.
- Manter injeção de dependência desacoplada em `useLessonDetailViewModel` com `BimesterServicePort`.

**Non-Goals:**
- Modificar o payload de resposta do endpoint `PATCH /class-plans/.../activities/...` para embutir dados do bimestre (mantendo os contratos de API REST puros).
- Recalcular métricas globais de bimestre no frontend.

## Decisions

### Decisão 1: Injeção do `BimesterServicePort` no `useLessonDetailViewModel`
Injetar `bimesterService: BimesterServicePort = defaultBimesterService` como dependência no `useLessonDetailViewModel`.

**Alternativas consideradas:**
- *Importar singleton do `BimesterApiService` diretamente*: Violaria a Regra 01 da Arquitetura Hexagonal (MVVM / DI com Ports).
- *Executar o re-fetch no backend via evento de webhook/WebSockets*: Complexidade desnecessária para o aplicativo mobile React Native neste momento.

### Decisão 2: Execução de Re-fetch Fire-and-Forget em Background
No callback `toggleActivityCompletion` do `useLessonDetailViewModel`, após a confirmação bem-sucedida do `lessonService.toggleActivityCompletion(...)`:
```typescript
bimesterService
  .getBimesters()
  .then((updatedBimesters) => {
    if (updatedBimesters) {
      bimesterStore((state) => state.setBimesters)(updatedBimesters);
    }
  })
  .catch((err) => {
    console.debug("[Background Revalidate] Falha ao atualizar bimesters:", err);
  });
```

**Alternativas consideradas:**
- *Aguardar (`await`) a atualização dos bimestres antes de concluir a função `toggleActivityCompletion`*: Prejudicaria a percepção de velocidade e faria o toggle falhar se apenas a requisição do bimestre caísse.

## Risks / Trade-offs

- **[Risk] Condição de Corrida (Rapid Toggling):** Se o usuário marcar e desmarcar múltiplas atividades rapidamente, múltiplas requisições `GET /bimesters` podem ser disparadas em paralelo.
  - *Mitigação:* Como o `bimesterService.getBimesters()` retorna a representação mais recente do backend, a última resposta a resolver atualizará o estado final da `BimesterStore`.
