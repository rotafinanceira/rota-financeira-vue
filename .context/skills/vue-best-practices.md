# Vue 3 Best Practices (Uni-Helper/Volar)

This skill focuses on type safety and developer experience with Vue 3 and TypeScript.

## Type Safety

1.  **Props**:
    ```typescript
    interface Props {
      msg: string
      count?: number
    }
    const props = withDefaults(defineProps<Props>(), {
      count: 0
    })
    ```

2.  **Emits**:
    ```typescript
    type Emits = {
      (e: 'update:modelValue', value: string): void
      (e: 'change', value: string): void
    }
    const emit = defineEmits<Emits>()
    ```

3.  **Ref Typing**:
    -   Explicitly type refs when inference is insufficient: `const list = ref<User[]>([])`.

4.  **Template Refs**:
    -   Type template refs: `const inputRef = ref<HTMLInputElement | null>(null)`.

## Code Organization

-   **Composables**: naming convention `useFunctionName`.
-   **Utils**: shared pure functions in `src/shared/utils` or `src/utils`.

## Ecosystem

-   **Pinia**: Preferred state management.
-   **Vue Router**: Standard routing.
-   **VueUse**: Use for common composables (e.g., `useWindowSize`, `useLocalStorage`).
