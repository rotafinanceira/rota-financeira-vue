<template>
  <q-btn
    :label="label"
    :loading="loading"
    :disable="disabled || loading"
    :class="['custom-button', sizeClass, variantClass]"
    unelevated
    @click="emit('click', $event)"
  >
    <slot />
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type Size = 'large' | 'default' | 'small';

const props = withDefaults(
  defineProps<{
    label?: string;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    label: '',
    variant: 'primary',
    size: 'default',
    disabled: false,
    loading: false,
  }
);

const emit = defineEmits(['click']);

const sizeClass = computed(() => `btn--${props.size}`);
const variantClass = computed(() => `btn--${props.variant}`);
</script>

<style scoped>
.custom-button {
  font-weight: 600;
  border-radius: 8px;
  text-transform: none;
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
