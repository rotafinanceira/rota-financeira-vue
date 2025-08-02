<template>
  <button
    :class="['custom-button', variantClass]"
    type="button"
    v-bind="$attrs"
  >
    <slot /><img v-if="props.icon !== 'none'" :src="props.icon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'dark' | 'light' | 'error' | 'alert';

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    icon?: string;
  }>(),
  {
    variant: 'dark',
    icon: '',
  }
);

const variantClass = computed(() => `btn--${props.variant}`);
</script>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  border-radius: 100px;
  white-space: nowrap;
  padding: 4px 8px;
  gap: 8px;
  font-size: 0.75rem;
  color: #0c0d0f;
}

/* Variantes */
.btn--dark {
  background-color: #e0e5e7;
}

.btn--light {
  background-color: transparent; /*ou white*/
  border: 2px solid #e0e5e7;
}

.btn--error {
  background-color: #ed4647;
  color: white;
}

.btn--alert {
  background-color: #f4ae35;
}
</style>
