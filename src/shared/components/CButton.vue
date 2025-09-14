<script setup lang="ts">
import { QBtn } from 'quasar';
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type Size = 'large' | 'default' | 'small';

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    to?: RouteLocationRaw;
  }>(),
  {
    variant: 'primary',
    size: 'default',
    disabled: false,
  }
);

const sizeClass = computed(() => `btn--${props.size}`);
const variantClass = computed(() => `btn--${props.variant}`);
</script>

<template>
  <q-btn
    class="custom-button"
    :class="[sizeClass, variantClass]"
    :disable="props.disabled"
    :to="props.to"
    type="button"
    no-caps
  >
    <slot />
  </q-btn>
</template>

<style scoped>
.custom-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  white-space: nowrap;
  padding: 12px 24px;
  gap: 12px;
  border: none;
}

.custom-button:disabled {
  background-color: #e0e5e7;
  color: #485159;
  cursor: not-allowed;
}

/* Tamanhos */
.btn--large {
  font-size: 1.125rem;
  height: 3.5rem;
}

.btn--default {
  font-size: 1rem;
  height: 3rem;
}

.btn--small {
  font-size: 0.875rem;
  height: 2.5rem;
}

/* Variantes */
.btn--primary {
  background-color: #307714;
  color: white;
}

.btn--secondary {
  background-color: transparent;
  color: #307714;
  border: 2px solid #307714;
}

.btn--tertiary {
  background-color: #485159;
  color: white;
}

.btn--danger {
  background-color: #ed4647;
  color: white;
}
</style>
