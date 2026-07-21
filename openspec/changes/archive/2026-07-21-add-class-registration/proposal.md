## Why

O botão "Cadastrar nova turma" já existe na Home, porém ao ser acionado abre um BottomSheet placeholder sem funcionalidade real. A turma é a entidade central do app (planejamento de aulas depende dela), e sem um fluxo de cadastro funcional o professor não consegue avançar no uso da aplicação. A turma pertence hierarquicamente a uma escola, integrando-se diretamente ao domínio de `school`.

## What Changes

- **Novo componente reutilizável `FormInput`**: Extraído do input customizado do `SchoolFormView` (label + underline input) para ser compartilhado entre school e class.
- **Novo componente reutilizável `ChipRadioGroup`**: Radio buttons visuais em formato de "chips" arredondados (fundo preenchido + ícone de check quando selecionado), substituindo o radio padrão do Gluestack. Reutilizável também no `SchoolFormView`.
- **Nova feature slice `class`**: Slice vertical em `src/features/class/` contendo types, components, hooks (ViewModel) — integrado hierarquicamente à school (turma pertence a uma escola).
- **Formulário multi-step no BottomSheet**: 2 etapas — Step 1 (Nome + Disciplina + Continuar) e Step 2 (Ensino, Perfil de engajamento, Formato de aprendizado + Salvar).
- **Micro store `class.store.ts`**: Zustand store em `src/infra/store/` para persistir turmas localmente (mock).
- **Integração na Home**: Substituir o placeholder do BottomSheet pelo `ClassBottomSheet`, e renderizar turmas da store na lista da Home (removendo `MOCK_CLASSES`), filtradas pela escola atualmente selecionada no `SchoolSelector`.
- **Refatoração do `SchoolFormView`**: Adotar os novos componentes `FormInput` e `ChipRadioGroup` em substituição ao código inline.

## Capabilities

### New Capabilities
- `class-registration`: Fluxo completo de cadastro de turma em 2 etapas via BottomSheet, com persistência local em micro store Zustand e exibição na lista da Home.
- `chip-radio-component`: Componente reutilizável de radio em formato chip arredondado com estados visual/checked customizados.
- `form-input-component`: Componente reutilizável de input de formulário com label e underline styling.

### Modified Capabilities
- `home-page`: A lista de turmas passa a consumir dados da store ao invés de mock inline. O BottomSheet de "Nova turma" passa a renderizar o fluxo real de cadastro.
- `school-management`: Refatoração do formulário para adotar `FormInput` e `ChipRadioGroup` compartilhados.

## Impact

- **Código afetado**: `HomeFeature.tsx` (integração do novo BottomSheet + consumo da store filtrada por escola), `SchoolFormView.tsx` (refatoração para usar componentes compartilhados). A turma é salva com `schoolId` da escola ativa e a Home filtra turmas pela escola selecionada.
- **Novos arquivos**: Feature slice `class/` (types, components, hooks), `class.store.ts`, componentes compartilhados `FormInput` e `ChipRadioGroup` em `src/components/`.
- **Dependências**: Nenhuma nova dependência externa. Usa Zustand, Gluestack UI e NativeWind já instalados.
- **APIs**: Nenhuma integração de API neste momento (mock/local). Arquitetura preparada para futura integração via Port/Adapter.
