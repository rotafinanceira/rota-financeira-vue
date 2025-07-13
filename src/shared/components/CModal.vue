<template>
  <q-dialog v-model="showDialog">
    <div class="dialog-container">
      <button
        class="close-button"
        v-if="props.showClose"
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
import { XCircleIcon } from '../assets/icons';

const props = defineProps<{
  showClose?: boolean;
}>();

const showDialog = defineModel<boolean>({ default: false });
</script>

<style scoped>
.dialog-container {
  width: 320px;
  background: white;
  border-radius: 8px;
  padding: 32px 24px;
  position: relative;
  border: 1px solid #e0e5e7;
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
  cursor: pointer;
  border: none;
}
</style>
