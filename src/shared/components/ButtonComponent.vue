<template>
  <button
    :class="['custom-button', sizeClass, variantClass]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type Size = 'large' | 'default' | 'small';

const props = defineProps<{
  variant?: Variant;
  size?: Size;
  isDisabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const variant = props.variant ?? 'primary';
const size = props.size ?? 'default';
const isDisabled = props.isDisabled ?? false;

const handleClick = () => {
  if (!isDisabled) {
    emit('click');
  }
};

const sizeClass = computed(() => `btn--${size}`);
const variantClass = computed(() => `btn--${variant}`);
</script>

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
}

.custom-button:disabled {
  background-color: #e0e5e7;
  color: #485159;
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
  font-size: 0.938rem;
  height: 2.5rem;
}

/* Variantes */
.btn--primary {
  background-color: #307714;
  color: white;
}

.btn--secondary {
  background-color: #ffffff;
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
