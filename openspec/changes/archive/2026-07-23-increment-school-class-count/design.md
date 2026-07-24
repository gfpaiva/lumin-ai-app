## Context

Atualmente, ao cadastrar uma turma via `useClassFormViewModel`, o hook realiza a chamada `POST /classes` através do adapter HTTP e adiciona a nova turma ao estado local do `classStore`. No entanto, o atributo `classCount` presente nas escolas mantidas pelo `schoolStore` não é alterado em memória.

Para manter a consistência da UI de forma reativa e leve (sem requisições HTTP adicionais para revalidar a lista de escolas), a store de escolas deve expor um método específico para incrementar o contador `classCount` da escola alvo.

## Goals / Non-Goals

**Goals:**
- Estender a porta `SchoolStoreState` em `src/common/ports/school.store.port.ts` com a ação `incrementClassCount(schoolId: string): void`.
- Implementar o método `incrementClassCount` em `src/infra/store/school.store.ts` atualizando imutavelmente a escola correspondente.
- Invocar o `incrementClassCount(selectedSchoolId)` no ViewModel `useClassFormViewModel.ts` após o envio com sucesso do formulário.

**Non-Goals:**
- Revalidar a lista de escolas no backend via HTTP.
- Alterar a lista de turmas no backend além do endpoint existente `POST /classes`.

## Decisions

### Decisão 1: Incrementar contador em memória diretamente no `school.store`

- **Opção Escolhida**: Adicionar o método `incrementClassCount(schoolId: string)` na store de escolas.
- **Motivação**: Respeita o padrão MVVM e Hexagonal. O ViewModel apenas chama o contrato exposto pela porta `SchoolStorePort` e a store lida com a mutação imutável do estado.
- **Alternativas Consideradas**:
  - *Re-fetch de escolas via API*: Fazer uma requisição GET para buscar a lista atualizada de escolas. Rejeitado por introduzir latência desnecessária.
  - *Contagem calculada no selector*: Derivar a contagem filtrando `classes` da `classStore`. Rejeitado pois `classStore` contém apenas as turmas já carregadas para a escola ativa, não sendo o acumulador geral de `School.classCount`.

## Risks / Trade-offs

- **Sincronização Temporária**: O incremento é local (em memória). Se a aba for recarregada ou a sessão for reiniciada, os dados virão do backend normalmente.
