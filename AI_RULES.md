# AI Rules & Guidelines

These rules are mandatory for any AI agent or developer working on the `rota-financeira-vue` project.

## 1. Workflow Protocol

All tasks must follow this strict 3-step process:

1.  **RESEARCH**: 
    - Analyze existing code before writing new code.
    - Check `src/shared/types` for existing definitions.
    - Read related stores and services to reuse logic.
2.  **PLAN**: 
    - Define the changes in `task.md` or `implementation_plan.md`.
    - Present the plan to the user if the task is complex.
3.  **IMPLEMENT**: 
    - Write code following the patterns defined below.
    - Verify changes (build/run).

## 2. Coding Standards

### Vue.js & Components
- **Syntax**: Always use `<script setup lang="ts">`.
- **Naming**: 
  - Component files: PascalCase (e.g., `FinancesPage.vue`).
  - Prop interfaces: defined locally or imported if shared.
- **Styling**:
  - Prefer **SCSS** with **BEM** naming convention (e.g., `.card__title`) for component-specific layout.
  - Use **Scoped** styles (`<style scoped lang="scss">`).
  - Use Quasar utility classes (e.g., `q-mb-md`, `text-center`) for spacing and typography helpers where appropriate, but maintain BEM for structural styling.

### State Management (Pinia)
- **Structure**: Prefer **Setup Stores** (`defineStore(id, () => { ... })`) for new stores (like `carStore.ts`).
- **Access**: Use `storeToRefs` for state/getters to maintain reactivity when destructuring.
- **Logic**: Stores should handle business logic and calls to Services. Components should not call API endpoints directly.

### API & Services
- **Pattern**: Use Class-based services with static methods.
- **Location**: All API calls must go through `src/services`.
- **Client**: Always import and use `api()` from `@/boot/axios` to ensure Auth headers are injected.
- **Typing**: Explicitly type API responses (e.g., `.get<Car[]>(...)`).

### TypeScript
- **Entities**: Use `interface` for data models (e.g., `Car`, `User`).
- **Props/Unions**: Use `type`.
- **Strictness**: Avoid `any`. Define proper types for all API payloads and responses.

## 3. Project-Specific Rules
- **Formatting**: Respect `.prettierrc`.
- **Imports**: Use the `@/` alias for `src/` imports.
- **Icons**: Import icons from `@/shared/assets/icons` instead of hardcoding paths or SVGs directly in templates.

## WORKFLOW OBRIGATÓRIO

Antes de escrever qualquer linha de código para uma nova feature, você deve:

- **RESEARCH**: Ler os arquivos relacionados à tarefa para entender o contexto.
- **PLAN**: Criar um plano passo-a-passo listando quais componentes Quasar e Stores serão afetados.
- **IMPLEMENT**: Apenas após o plano, gerar o código.

### 4. USO DE SKILLS (SKILLS.SH)
Antes da fase de **Research**, verifique o diretório `/.context/skills`:
1. Se a tarefa envolver um tema específico (ex: "Criar Testes"), procure se existe uma skill correspondente (ex: `unit-testing.md`).
2. Se existir, carregue as regras dessa skill como prioridade máxima para a execução da tarefa.
3. Se o utilizador fornecer uma URL ou conteúdo do **skills.sh**, a sua prioridade é:
   - Analisar o conteúdo.
   - Guardar o ficheiro em `/.context/skills/nome-da-skill.md`.
   - Adotar imediatamente esse novo comportamento.

## 4. Vue.js Specialist Skills

### Composition API & Reactivity
- **Use `script setup`**: Always prefer `<script setup lang="ts">` for concise and performant components.
- **Reactivity**: Use `ref` for primitives and `reactive` for objects. Avoid `toRef` on `reactive` objects unless destructuring.
- **Computed**: Use `computed` for derived state. Keep side effects out of computed properties.
- **Watchers**: Use `watch` or `watchEffect` for side effects. Be mindful of cleanup.

### Component Design
- **Single Responsibility**: Each component should do one thing well. Extract complex logic into Composables.
- **Props & Events**: Use typed props and `defineEmits` for type-safe communication.
- **Slots**: Leverage slots for flexible content distribution, especially in UI components.
- **Async Components**: Use `defineAsyncComponent` for lazy loading heavy components or routes.

### Performance
- **v-show vs v-if**: Use `v-show` for frequent toggles, `v-if` for conditional rendering.
- **Key Attribute**: Always use a unique `key` in `v-for` loops.
- **Memoization**: Use `v-memo` for large lists or static content updates.

### Quasar Specifics
- **Validation**: Use Quasar's internal validation rules array `lazy-rules` and `rules` prop for form inputs.
- **Plugins**: Utilize Quasar plugins (Notify, Dialog, Loading) via `useQuasar()`.
- **Layouts**: Respect the Quasar layout system (`q-layout`, `q-page-container`, `q-page`).
