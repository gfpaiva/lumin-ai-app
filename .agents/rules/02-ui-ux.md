---
trigger: model_decision
description: UI, Gluestack, NativeWind, Estilização, Cores, Componentes Visuais, Animações, Drag and Drop.
---

# 1. Gluestack UI + NativeWind
- Utilize os componentes do **Gluestack UI v3** com **NativeWind** para a construção da interface primária (localizados em `src/components/ui/`).
- Antes de criar um componente do zero (ex: botões, inputs, modais), verifique se o Gluestack não possui uma abstração pronta.
- Use classes utilitárias do Tailwind via prop `className` para customizar layouts.

# 2. Design System & Tema (Dark Mode)
- **Tema Padrão:** O aplicativo deve utilizar paletas escuras (Dark Theme) por padrão.
- **Cores base:** Use a escala de cinzas `slate`, `gray` ou `zinc` para fundos e superfícies.
- **Cores de destaque (Acentos):** Use tons vívidos como `purple` e `indigo` para botões primários e, principalmente, **ações relacionadas à IA** (ex: Gerar Plano, Calibrar).
- Crie interfaces elegantes, não sobrecarregadas de texto. O foco é na usabilidade via controles visuais (Sliders, Drag & Drop, Calendários).

# 3. Interações & Loading States
- **IA em Background:** Ao simular a geração da IA, bloqueie ou sinalize fortemente o estado de carregamento.
- **Skeleton Loaders:** O uso de Skeletons (esqueletos de carregamento) é **obrigatório** em telas onde conteúdo está sendo gerado pela IA ou requisitado da API. Evite "Spinners" genéricos soltos na tela inteira, prefira Skeletons desenhando a futura UI (ex: blocos de aulas).

# 4. Drag & Drop (Workspace)
- A tela de "Refinement Workspace" (Onde o professor ajusta as sugestões) depende fortemente de reordenação (Drag & Drop) dos `Topics` e `Sessions`.
- *(Nota: A biblioteca exata para DnD será definida durante a implementação técnica. Prepare os componentes de lista isolando-os para aceitarem facilmente integração com bibliotecas de gestos futuras).*

# 5. Componentes "Dumb"
- Componentes de UI não possuem conhecimento de como os dados são salvos. Disparam callbacks via props (ex: `onGeneratePlan`, `onReorderTopics`).
