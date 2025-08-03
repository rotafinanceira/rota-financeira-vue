<template>
  <q-dialog v-model="showDialog" position="bottom" no-backdrop-dismiss>
    <div
      class="bottom-sheet"
      @click.stop
      ref="sheetRef"
      :style="`transform: translateY(${translateY}px); transition: ${
        isDragging ? 'none' : 'transform 0.2s ease'
      };`"
    >
      <div
        v-if="props.draggable"
        class="bottom-sheet__dragbar"
        @mousedown="startDrag"
        @touchstart="startDrag"
      />

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
import { defineProps, ref, watch } from 'vue';
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

const sheetRef = ref<HTMLElement | null>(null);
const startY = ref(0);
const translateY = ref(0);
const isDragging = ref(false);

function getClientY(e: MouseEvent | TouchEvent): number {
  return e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
}

function startDrag(e: MouseEvent | TouchEvent) {
  if (!props.draggable) return;

  isDragging.value = true;
  translateY.value = 0;
  startY.value = getClientY(e);

  ['mousemove', 'touchmove'].forEach((evt) =>
    window.addEventListener(evt, onDrag as EventListener, { passive: false })
  );
  ['mouseup', 'touchend'].forEach((evt) =>
    window.addEventListener(evt, endDrag as EventListener)
  );
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return;
  translateY.value = Math.max(0, getClientY(e) - startY.value);
}

function endDrag() {
  if (!isDragging.value) return;

  isDragging.value = false;
  if (translateY.value > 150) {
    showDialog.value = false;
  } else {
    translateY.value = 0;
  }

  ['mousemove', 'touchmove'].forEach((evt) =>
    window.removeEventListener(evt, onDrag as EventListener)
  );
  ['mouseup', 'touchend'].forEach((evt) =>
    window.removeEventListener(evt, endDrag as EventListener)
  );
}

watch(showDialog, (newVal) => {
  if (newVal) {
    translateY.value = 0;
  }
});
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
    align-items: center;
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
  align-items: center;
  gap: 1rem;
}

:deep(.image-wrapper) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
