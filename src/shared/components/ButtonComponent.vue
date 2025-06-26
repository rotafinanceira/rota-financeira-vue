<template>
  <button
    :class="['custom-button', sizeClass, colorClass]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'default',
    validator: (val) =>
      ['default', 'secondary', 'outline', 'danger'].includes(val),
  },
  size: {
    type: String,
    default: 'default',
    validator: (val) => ['large', 'medium', 'small'].includes(val),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (!props.isDisabled) {
    emit('click');
  }
};

const sizeClass = computed(() => `btn-size-${props.size}`);
const colorClass = computed(() => `btn-color-${props.color}`);
</script>

<style scoped>
.custom-button {
  display: inline-flex;
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
  border: 1px solid #e0e5e7;
  color: #485159;
}

/* Tamanhos */
.btn-size-large {
  font-size: 1.125rem;
  height: 3.5rem;
}

.btn-size-medium {
  font-size: 1rem;
  height: 3rem;
}

.btn-size-small {
  font-size: 0.938rem;
  height: 2.5rem;
}

/* Cores */
.btn-color-primary {
  background-color: #307714;
  color: white;
  border: 1px solid #307714;
}

.btn-color-secondary {
  background-color: #ffffff;
  color: #307714;
  border: 2px solid #307714;
}

.btn-color-tertiary {
  background-color: #485159;
  color: white;
  border: 1px solid #485159;
}

.btn-color-atention {
  background-color: #ed4647;
  color: white;
  border: 1px solid #ed4647;
}

.btn-color-inactive {
}
</style>
