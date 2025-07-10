<template>
  <q-dialog v-model="model">
    <div class="dialog-container">
      <!-- Botão de fechar opcional -->
      <img
        :src="XCircleIcon"
        v-if="showClose"
        class="close-button"
        @click="emit('update:modelValue', false)"
      />

      <!-- Conteúdo injetado pelo pai -->
      <div class="dialog-content">
        <slot />
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue';
import { XCircleIcon } from '../assets/icons';

const props = defineProps({
  modelValue: Boolean,
  showClose: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<style scoped>
.dialog-container {
  width: 320px;
  background: white;
  border-radius: 8px;
  padding: 32px 24px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 32px;
}
.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}
</style>
