## 1. Atualização do ViewModel

- [x] 1.1 Injetar `bimesterService: BimesterServicePort` com fallback para `bimesterApiService` nos parâmetros de `useLessonDetailViewModel`.
- [x] 1.2 Disparar `bimesterService.getBimesters()` em background após o sucesso de `toggleActivityCompletion`, atualizando a `BimesterStore` via `setBimesters`.
- [x] 1.3 Garantir tratamento de erro silencioso (`.catch`) para que qualquer falha na revalidação do bimestre em background não afete a experiência de uso.

## 2. Testes Unitários e Validação

- [x] 2.1 Atualizar os testes unitários de `useLessonDetailViewModel` para validar a chamada de revalidação da `BimesterStore`.
- [x] 2.2 Executar a suíte de testes (`rtk npm test` ou `rtk npx jest`) para garantir regressão zero.
