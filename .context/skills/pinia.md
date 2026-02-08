# Pinia Best Practices

This skill outlines the best practices for using Pinia state management in this project.

## Core Principles

1.  **Setup Stores**:
    -   ALWAYS use the Setup Store syntax (`defineStore('id', () => { ... })`).
    -   It allows full use of the Composition API (refs, computed, watchers, composables).

2.  **State Access**:
    -   Destructuring state or getters breaks reactivity.
    -   ALWAYS use `storeToRefs(store)` when destructuring.
    -   Actions can be destructured directly.

3.  **Organization**:
    -   Keep stores focused on a specific domain (e.g., `carStore`, `financialStore`).
    -   Avoid circular dependencies between stores.

## Implementation Details

### Defining a Store

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useExampleStore = defineStore('example', () => {
  // State
  const count = ref(0);
  const name = ref('Pinia');

  // Getters
  const doubleCount = computed(() => count.value * 2);

  // Actions
  function increment() {
    count.value++;
  }

  return {
    count,
    name,
    doubleCount,
    increment,
  };
});
```

### Using a Store

```typescript
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useExampleStore } from '@/stores/exampleStore';

const store = useExampleStore();

// State/Getters (Reactive)
const { count, doubleCount } = storeToRefs(store);

// Actions (Direct)
const { increment } = store;
</script>
```

## Testing
- Use `@pinia/testing` for mocking stores in component tests.
- Test store logic in isolation where possible.
