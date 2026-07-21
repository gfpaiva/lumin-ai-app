---
trigger: glob
description: Testes (Jest, Testing Library), Padrões de Código e Package Manager.
globs: tests/**/*
---

# 1. Package Manager
- O uso de **pnpm** é obrigatório e estrito: `pnpm add`, `pnpm run`, `pnpx`.
- Nunca use `npm`, `npx` ou `yarn`. O projeto deve respeitar o `pnpm-lock.yaml`.

# 2. Testes (Jest + Testing Library React Native)
- **Estrutura:** Devem ficar na pasta `tests/` na raiz, espelhando a estrutura exata de `src/`.
- **Sufixo:** `.spec.ts` ou `.spec.tsx` (nunca `.test.ts`).
- **Foco de Testes:**
  - **Priority 1:** ViewModels (Custom Hooks) — Teste de lógicas de negócio, mocks dos adapters de IA, estados de carregamento.
  - **Priority 2:** Mappers — Garantir que dados mockados/futuros da API são tipados e transformados corretamente para as Models (Plan, Session, Topic).
  - **Priority 3:** Componentes burros (UI isolada) — renderização, disparo de eventos ao clicar botões.
- **Mocks:** Sempre "mocke" os adapters na infraestrutura (via `jest.mock()`) e stores do Zustand para isolar testes.

# 3. Code Style e Qualidade (Quality Gate)
- **Inglês para Código:** Variáveis, funções, types, interfaces e descrições nos testes (`it('should...')`) devem ser escritos em **inglês**.
- **Português para UI:** Apenas textos diretamente visíveis para o usuário final no app devem ser em português.
- **TypeScript:** Não adicione `any`, tipos desconhecidos soltos, `// @ts-ignore` ou desabilite regras do linter sem expressa autorização ou necessidade crítica devidamente documentada.
- **Comentários:** Não escreva blocos de comentários de documentação ou explicativos a não ser que extremamente complexo ou caso tenha sido explicitamente solicitado. Código limpo se explica pelas funções bem nomeadas e variáveis.

# 4. Exemplos de Estilo de Código (Referência Enxuta)

**Componente Visual (View - Dumb Component):**
```tsx
import { Box, Text, Button, ButtonText } from '@/components/ui';

type ClassCardProps = {
  title: string;
  onSelect: () => void;
};

export function ClassCard({ title, onSelect }: ClassCardProps) {
  return (
    <Box className="p-4 bg-slate-800 rounded-lg">
      <Text className="text-white font-bold">{title}</Text>
      <Button onPress={onSelect} className="mt-2 bg-indigo-600">
        <ButtonText>Selecionar</ButtonText>
      </Button>
    </Box>
  );
}
```

**ViewModel (Custom Hook):**
```ts
import { useState } from 'react';
import { generatePlan } from '@/common/ports/ai.port';

export function useGeneratePlanViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);

  const handleGenerate = async (context: string) => {
    setIsLoading(true);
    try {
      const result = await generatePlan(context);
      setPlan(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, plan, handleGenerate };
}
```

**Teste de ViewModel:**
```ts
import { renderHook, act } from '@testing-library/react-native';
import { useGeneratePlanViewModel } from '@/features/planning/hooks/useGeneratePlanViewModel';
import { generatePlan } from '@/common/ports/ai.port';

jest.mock('@/common/ports/ai.port');

it('should set isLoading to true while generating', async () => {
  (generatePlan as jest.Mock).mockResolvedValueOnce({ id: '1' });
  const { result } = renderHook(() => useGeneratePlanViewModel());
  
  act(() => {
    result.current.handleGenerate('History class');
  });
  
  expect(result.current.isLoading).toBe(true);
});
```
