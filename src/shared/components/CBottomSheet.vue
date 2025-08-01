<template>
  <q-dialog v-model="showDialog" position="bottom" no-backdrop-dismiss>
    <div class="bottom-sheet dialog-container" @click.stop>
      <!-- Barra de arrastar condicional -->
      <div v-if="props.draggable" class="dialog-dragbar" />

      <button
        v-if="props.showClose"
        variant="primary"
        class="close-button"
        @click="showDialog = false"
      >
        <img :src="XCircleIcon" alt="Fechar" />
      </button>

      <div class="dialog-content">
        <slot />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import XCircleIcon from '../assets/icons/x-circle.svg';

const props = withDefaults(
  defineProps<{
    draggable?: boolean;
    showClose?: boolean;
  }>(),
  {
    draggable: false,
    showClose: false,
  }
);

const showDialog = defineModel<boolean>({ default: false });
</script>

<style scoped lang="scss">
.bottom-sheet {
  max-height: 90vh;
  border-radius: 16px 16px 0 0;
  background-color: white;
  padding: 24px 20px;

  .container--close {
    display: flex;
    justify-content: flex-end;
  }
}

.dialog-dragbar {
  position: relative;
  margin: 0 auto;
  width: 64px;
  height: 4px;
  background-color: #e0e5e7;
  border-radius: 2px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 24px;
}

.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
  border: none;
}

:deep(h2) {
  font-weight: 600;
  font-size: 1.125rem;
}

:deep(p) {
  color: #485159;
}

:deep(.group) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(.image-wrapper) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
