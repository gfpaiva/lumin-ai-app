## Context

Atualmente, o botão "Cadastrar nova turma" na Home abre um `GenericBottomSheet` com conteúdo placeholder. A arquitetura segue Port/Adapter + MVVM + Feature Slices. A feature `school` já existe com store, types, hooks e components. A turma (`Class`) é hierarquicamente subordinada à escola, compartilhando padrões arquiteturais.

O projeto já possui:
- `GenericBottomSheet` reutilizável com `snapPoints` e backdrop
- Padrão de BottomSheet + ViewModel estabelecido na feature `school` (ex: `SchoolBottomSheet` + `useSchoolViewModel`)
- Zustand micro stores em `src/infra/store/` (pattern: `school.store.ts`, `bimester.store.ts`)
- Componentes Gluestack UI base: `Input/InputField`, `Radio/RadioGroup`, `FormControl`
- Componente `Button` customizado em `src/components/button.tsx`

A referência visual mostra chips arredondados com fundo preenchido e ícone de check para seleções ativas — diferente do radio padrão do Gluestack.

## Goals / Non-Goals

**Goals:**
- Implementar fluxo de cadastro de turma em 2 steps dentro do BottomSheet genérico
- Criar componente `FormInput` reutilizável extraído do `SchoolFormView`
- Criar componente `ChipRadioGroup` reutilizável fiel à referência visual
- Criar feature slice `class/` seguindo exatamente o padrão da feature `school/`
- Criar micro store `class.store.ts` com dados mock e actions CRUD
- Vincular turma à escola selecionada: salvar `schoolId` no cadastro e filtrar a lista da Home pela escola ativa do `SchoolSelector`
- Integrar turmas cadastradas à lista da Home (substituir `MOCK_CLASSES` por dados da store, filtrados por escola)
- Refatorar `SchoolFormView` para usar os novos componentes compartilhados

**Non-Goals:**
- Integração com API/backend real (mock-only por enquanto)
- Validação avançada de formulário (React Hook Form + Zod será implementada em change futura)
- Edição/exclusão de turma (apenas cadastro neste momento)
- Navegação para detalhe da turma após cadastro

## Decisions

### 1. Feature slice `class/` independente vs. sub-feature de `school/`

**Decisão**: Criar `src/features/class/` como feature slice independente.

**Alternativas consideradas**:
- **Sub-pasta de school** (`src/features/school/class/`): Acoplamento excessivo; a turma terá futuramente seu próprio domínio rico (planejamento, sessões, tópicos).
- **Feature slice independente** ✅: Segue o padrão existente (`school/`, `bimester/`, `home/`), permite crescimento independente, alinha com DDD (turma é aggregate root futuro).

**Rationale**: A turma eventualmente será o aggregate root mais importante do app (planejamento de aulas). Manter separada permite escalar sem refatorações de namespace.

### 2. Componentes compartilhados `FormInput` e `ChipRadioGroup` — localização

**Decisão**: `src/components/form-input.tsx` e `src/components/chip-radio-group.tsx`

**Alternativas consideradas**:
- **Dentro de `src/components/ui/`**: Essa pasta contém componentes gerados pelo Gluestack CLI — misturar customizados com gerados gera confusão.
- **Em `src/components/` (raiz)** ✅: Segue o mesmo padrão do `button.tsx`, `generic-bottom-sheet.tsx`, `header.tsx` — componentes de aplicação customizados e compartilhados.

### 3. Multi-step form — gerenciamento de estado

**Decisão**: Estado local no ViewModel (`useState` para step + dados do form).

**Alternativas consideradas**:
- **React Hook Form multi-step**: Overhead desnecessário para 2 steps simples com poucos campos. Reservado para forms complexos futuros.
- **useState no ViewModel** ✅: Simples, alinhado ao padrão MVVM existente. O ViewModel gerencia step, dados e submit.

### 4. Estrutura do model `Class`

**Decisão**: Interface `Class` em `src/features/class/types/class.types.ts` com campos:

```typescript
interface Class {
  id: string;
  name: string;            // Nome da turma
  subject: string;         // Disciplina
  educationLevel: EducationLevel;    // Fundamental | Médio
  engagementProfile: EngagementProfile; // Participativa | Focada | Apática
  learningFormat: LearningFormat;      // Visual | Manual | Teórico
  schoolId: string;        // Referência à escola (para vínculo futuro)
}
```

Enums tipados com union types para `EducationLevel`, `EngagementProfile` e `LearningFormat`.

### 5. Renderização do `ClassCard` na Home — display text e filtro por escola

**Decisão**: Manter a prop `grade` do `ClassCard` existente, derivando o texto a partir dos dados da `Class`:
- `grade`: `"{name} Ensino {educationLevel}"` → ex: "2º Ano Ensino Médio"
- `subject`: direto da `Class`

**Racional**: O `ClassCard` permanece "dumb", recebendo strings formatadas. O mapeamento é feito no componente pai.

**Filtro por escola**: A `HomeFeature` consome a lista de turmas da `class.store` filtrada pelo `selectedSchoolId` da `school.store`. A store de turmas expõe um seletor `getClassesBySchoolId` ou a filtragem é feita no nível do componente via `classes.filter(c => c.schoolId === selectedSchoolId)`. O `schoolId` é automaticamente atribuído à turma no momento do cadastro, derivado da escola atualmente selecionada.

### 6. ChipRadioGroup — API do componente

**Decisão**: Componente controlado com API declarativa:

```typescript
interface ChipRadioGroupProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  selectedValue: string;
  onValueChange: (value: string) => void;
}
```

**Rationale**: API simples, reutilizável em qualquer contexto. O label da seção é parte do componente. A lógica de seleção é controlada externamente (controlled component pattern).

## Risks / Trade-offs

- **[Nome da turma livre vs. estruturado]** → O campo "Nome" permite texto livre. Pode gerar inconsistências (ex: "2 ano" vs "2º Ano"). Mitigação: validação será adicionada futuramente com Zod.
- **[Sem persistência real]** → Turmas são perdidas ao recarregar o app. Mitigação: esperado para fase mock. Persistência via AsyncStorage ou API será adicionada em change futura.
- **[Escola deve estar selecionada para cadastrar]** → O cadastro de turma depende de haver uma escola selecionada. Como a Home já inicia com escola pré-selecionada (mock), esse cenário é coberto. Caso futuro permita estado sem escola, o botão de cadastro deverá ser desabilitado.
