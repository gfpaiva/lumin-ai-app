## Context

Atualmente, na `HomeFeature`, o usuário seleciona uma escola, um bimestre e visualiza a lista de turmas (via `ClassCard`). Contudo, ao clicar em uma turma, nada acontece. A nova feature de `ClassDetail` visa permitir a navegação para os detalhes dessa turma, seguindo as diretrizes de arquitetura (Feature Slices, MVVM, componentes UI Gluestack v3). 

A interface também necessita de componentes visuais que serão compartilhados, como o bloco de boas-vindas do cabeçalho que atualmente existe hardcoded em `HomeWelcome`.

## Goals / Non-Goals

**Goals:**
- Implementar a tela de detalhes de turma dentro do slice de domínio `class` (`src/features/class/components/ClassDetailFeature.tsx`).
- Criar a rota no Expo Router (ex: `src/app/(tabs)/class/[id].tsx` ou rota aninhada apropriada dependendo da organização).
- Extrair o componente `HomeWelcome` para um componente genérico (ex: `HeroHeader`), configurável para ser usado tanto na Home quanto na ClassDetail.
- Renderizar uma listagem de aulas mockadas com layout em grid usando componentes do Gluestack v3.

**Non-Goals:**
- Integração real de API para a busca de tópicos de aulas neste momento (os dados serão mockados, mas preparados para uso futuro de `Zustand` e API).
- Implementação completa do Bottom Sheet ao clicar no nome da turma (apenas o placeholder será incluído).

## Decisions

1. **Rota e Navegação:**
   - A rota de detalhe será implementada usando Expo Router, provavelmente em `src/app/class/[id].tsx` ou aninhada na stack caso faça sentido para a hierarquia do app. Ao clicar no `ClassCard`, chamaremos `router.push({ pathname: '/class/[id]', params: { schoolId, bimesterId } })` (ou via search params/store).
   - *Alternativa considerada:* Usar modais/bottom sheets. *Por que evitamos:* A complexidade e quantidade de informações (grid de aulas, resumo de bimestre) tornam uma tela completa mais adequada.

2. **Feature Slice `class`:**
   - Toda a UI de detalhes viverá em `src/features/class/components/ClassDetailFeature.tsx`. A UI não terá fetching direto; delegaremos para `useClassDetailViewModel.ts` que gerenciará o estado (inicialmente mockado).

3. **Reuso do Header de Boas Vindas:**
   - O componente `HomeWelcome.tsx` será generalizado para `src/common/components/hero-header.tsx` (ou similar), recebendo as propriedades `title`, `subtitle`, `onTitlePress`, `icon`.

4. **Grid de Aulas:**
   - Construiremos o card da aula (`LessonCard.tsx` dentro do slice `class`) e o alinharemos em grid (duas colunas) usando a flexbox do NativeWind/Gluestack (`flex-row flex-wrap justify-between`).

## Risks / Trade-offs

- **Risk:** Os parâmetros passados na rota (escola, bimestre, id da turma) podem ficar dessincronizados do estado global do Zustand.
  - *Mitigation:* A tela deve priorizar ler os Ids da rota e, se necessário, sincronizar com a Store (ou ler tudo da Store caso seja a fonte da verdade da navegação).
- **Risk:** A extração do `HomeWelcome` para genérico pode quebrar o layout da Home.
  - *Mitigation:* Manter compatibilidade restrita com as props que a Home já envia, ajustando cuidadosamente os tamanhos das fontes.
