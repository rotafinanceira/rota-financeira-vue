<template>
  <q-dialog v-model="showDialog" position="bottom" no-backdrop-dismiss>
    <div class="bottom-sheet" @click.stop>
      <div v-if="props.draggable" class="bottom-sheet__dragbar" />

      <button
        v-if="props.showClose"
        variant="primary"
        class="bottom-sheet__close"
        @click="showDialog = false"
      >
        <img :src="XCircleIcon" alt="Fechar" />
      </button>

      <div class="bottom-sheet__content">
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
  position: relative;

  &__dragbar {
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    width: 64px;
    height: 4px;
    background-color: #e0e5e7;
    border-radius: 2px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 24px;
  }

  &__close {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    border: none;
  }
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
