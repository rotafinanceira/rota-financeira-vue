<template>
  <q-dialog v-model="showDialog" persistent class="transparent-dialog">
    <div class="transparent-wrapper">
      <div class="dialog-container">
        <h2>{{ props.title }}</h2>

        <button class="close-button" @click="closeDialog">
          <img :src="XCircleIcon" alt="Fechar" />
        </button>

        <slot />
      </div>

      <CButton
        :label="buttonLabel"
        variant="primary"
        :isLoading="isLoading"
        @click="handleAction"
      />
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import CButton from '@/shared/components/CButton.vue';
import { XCircleIcon } from '../assets/icons';

const showDialog = defineModel<boolean>({ default: false });

const props = withDefaults(
  defineProps<{
    title?: string;
    buttonLabel?: string;
    isLoading?: boolean;
  }>(),
  {
    buttonLabel: 'Salvar',
    buttonVariant: 'primary',
    isLoading: false,
  }
);

const emit = defineEmits(['confirm', 'update:modelValue']);

const closeDialog = () => {
  showDialog.value = false;
  emit('update:modelValue', false);
};

const handleAction = () => {
  emit('confirm');
};
</script>

<style scoped>
.transparent-dialog :deep(.q-dialog__backdrop) {
  background: transparent !important;
}

.transparent-wrapper {
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 100vh;
  position: relative;
}
.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
  border: none;
}

h2 {
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
}

:deep(:where(p)) {
  color: #485159;
  font-size: 14px;
}

.dialog-container {
  width: 320px;
  background: white;
  border-radius: 8px;
  padding: 24px;
  position: relative;
  border: 1px solid #e0e5e7;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
}
</style>
