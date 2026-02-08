# Vue.js Best Practices & Skills

This skill defines the coding standards for Vue.js development in this project.

## Core Rules

1.  **Composition API**: ALWAYS use the Composition API with `<script setup lang="ts">`.
    -   Do NOT use Options API.
    -   Do NOT use `defineComponent` unless absolutely necessary for complex type inference scenarios not covered by `<script setup>`.

2.  **TypeScript**:
    -   All components must be TypeScript.
    -   Props must be typed using `defineProps<Props>()` interface pattern.
    -   Emits must be typed using `defineEmits<Emits>()`.

3.  **Reactivity**:
    -   Use `ref` for primitive values and most objects.
    -   Use `computed` for derived state.
    -   Avoid `reactive` unless there is a specific reason for a reactive object that cannot be handled by `ref`.
    -   Always unwrap refs with `.value` in logic, but not in templates.

4.  **Component Structure**:
    -   Order:
        1.  Imports (Vue, components, stores, utils)
        2.  Props/Emits definitions
        3.  State (refs, computed)
        4.  Lifecycle hooks (`onMounted`, etc.)
        5.  Methods/Functions
    -   Keep components small and focused. Extract logic to composables (`useFeature`) if it grows.

5.  **State Management (Pinia)**:
    -   Use Setup Stores (`defineStore('id', () => { ... })`).
    -   Expose state and actions explicitly.
    -   Use `storeToRefs` when destructuring state in components.

6.  **Performance**:
    -   Use `v-show` for frequent toggling, `v-if` for conditional rendering that rarely changes.
    -   Use `shallowRef` for large immutable data structures.
    -   Lazy load routes and heavy components.

7.  **Quasar Specifics**:
    -   Use Quasar components (`q-btn`, `q-input`, `q-card`) over native HTML elements where possible.
    -   Use Quasar utility classes (`q-pa-md`, `flex`, `row`, `items-center`) for layout, but defer to BEM SCSS for component-specific styling as per `AI_RULES.md`.
