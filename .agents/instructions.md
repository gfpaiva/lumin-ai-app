# Instruções — Lumin.AI

## Projeto
App React Native (Expo) chamado Lumin.AI, projetado para auxiliar professores no planejamento escolar do ano letivo de acordo com a BNCC (Base Nacional Comum Curricular).
A IA não é conversacional (chatbot); ela atua no background gerando planos de aula ajustáveis via controles de UI.

## Contexto de Arquitetura
Este projeto segue rigorosamente **Port/Adapter (Hexagonal) + MVVM com Custom Hooks + Features Slices + Feature API Services**.
Antes de implementar qualquer funcionalidade, **LEIA** os índices relevantes abaixo:

### Índice de Regras (Leia sob demanda)

1. **Arquitetura e Domínio:** `.agents/rules/01-architecture-domain.md`
   *(Leia para entender como organizar pastas, criar Feature API Services `src/features/[feature]/api/`, criar models e separar UI de lógica)*

2. **UI e UX (Gluestack + NativeWind):** `.agents/rules/02-ui-ux.md`
   *(Leia antes de criar qualquer componente visual, telas ou mexer em estilização)*

3. **Estado, Fluxo de Serviços e Simulação AI:** `.agents/rules/03-state-ai-simulation.md`
   *(Leia quando for implementar lógica de reordenação, estados globais, fluxo View -> ViewModel -> Service -> HttpPort ou chamadas de API)*

4. **Testes, Qualidade e Estilo de Código:** `.agents/rules/04-testing-code-style.md`
   *(Leia antes de finalizar código para referenciar como devem ser escritos (coding style no geral), criar testes Jest ou rodar comandos pnpm)*

## Regras Críticas (Sempre Ativas)
1. **TypeScript Estrito:** NUNCA use `any`, `// @ts-ignore` ou `// eslint-disable` sem forte justificativa.
2. **Sem Placeholders:** Quando gerar ou editar código, retorne o código completo. Não use comentários como `// ... resto do código`.
3. **Navegação Expo Router:** Apenas a pasta `src/app/` deve lidar com roteamento (file-based). Nenhuma lógica de negócio lá.
4. **Isolamento de API nas Features:** Todas as requisições HTTP DEVEM ser encapsuladas na camada `api/` da respectiva feature (`[feature].service.port.ts` e `[feature].service.ts`), sendo injetadas nos ViewModels via parâmetro default. É PROIBIDO instanciar ou chamar `FetchAdapter` / `httpAdapter` diretamente dentro de ViewModels.
5. **Package Manager:** Use ESTRITAMENTE o **pnpm** para instalar pacotes ou rodar scripts. NUNCA `npm` ou `yarn`.
