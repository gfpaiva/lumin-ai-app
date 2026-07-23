## Context

Atualmente, a tela `ClassDetailFeature` exibe dados de turma e aulas estáticos e mockados, e `LessonDetailFeature` depende de `useLessonViewModel.ts` (que contém uma lista hardcoded de lições). As chamadas HTTP de consulta para o backend `GET /class-plans?classId={classId}&bimesterId={bimesterId}` precisam ser integradas utilizando a arquitetura Hexagonal (Ports & Adapters) do projeto e a micro store Zustand (`lessonStore`) em `src/infra/store/`.

## Goals / Non-Goals

**Goals:**
- Criar a Port `LessonStorePort` em `src/common/ports/lesson.store.port.ts`.
- Criar a Micro Store `useLessonStore` em `src/infra/store/lesson.store.ts` para persistência dos planos por `${classId}_${bimesterId}`.
- Integrar a chamada `GET /class-plans` via `HttpPort` em `useClassDetailViewModel`.
- Garantir a retenção dos planos na `lessonStore` para evitar chamadas de API repetidas quando o usuário sai e retorna para a tela.
- Passar os parâmetros de rota (`lessonNumber` e `classId`) para navegar até `LessonDetailFeature`.
- Exibir dados integrados (escola, turma, disciplina, tema, aulas e atividades) nas telas.

**Non-Goals:**
- Implementar as mutações de toggle de atividades ou de recalibração de IA nesta etapa (ficam mantidas as ações visuais sem persistência remota/AI por ora).
- Alterar o layout visual de Gluestack ou componentes de interface já estabelecidos.

## Decisions

### 1. Indexação dos Planos por `${classId}_${bimesterId}` na `lessonStore`
- **Decisão**: Armazenar os planos de aula em um mapa/dicionário `plansByClassAndBimester: Record<string, ClassPlan>`.
- **Justificativa**: Cada plano de aula no backend é único por par (turma, bimestre). Essa chave garante buscas instantâneas $O(1)$ sem colisão.
- **Alternativa Considerada**: Armazenar uma lista `plans: ClassPlan[]`. Requereria `find` a cada renderização e dificultaria invalidar ou verificar o estado de `fetchedKeys`.

### 2. Roteamento da Aula via Query Parameters
- **Decisão**: Navegar para `/lesson/${lessonNumber}?classId=${classId}` a partir do card da aula em `ClassDetailFeature`.
- **Justificativa**: O Expo Router lê `useLocalSearchParams<{ id: string; classId: string }>()`. A aula é identificada no plano pelo seu `lessonNumber`.

### 3. Injeção de Dependências em ViewModels
- **Decisão**: `useClassDetailViewModel` e `useLessonDetailViewModel` utilizam injeção via parâmetros default (`lessonStore: LessonStorePort = useLessonStore`, `httpAdapter: HttpPort = defaultHttpAdapter`), conforme as regras do projeto (`01-architecture-domain.md`).

## Risks / Trade-offs

- **[Navegação direta / Deep linking sem cache preexistente]** → Se o usuário acessar a rota `/lesson/1` sem passar por `ClassDetailFeature`, a `lessonStore` pode não possuir o plano carregado.
  - *Mitigação*: `useLessonDetailViewModel` pode verificar a ausência do plano e acionar o fetch do plano da turma caso `classId` esteja presente.
