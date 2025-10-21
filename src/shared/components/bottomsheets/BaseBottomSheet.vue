<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import XCircleIcon from '../../assets/icons/x-circle.svg';
import { TouchPanValue } from '../../types/touch-pan';
import { BottomSheetProps } from '@/shared/types/bottom-sheet';

const translateY = ref(0);
const isDragging = ref(false);

const props = withDefaults(defineProps<BottomSheetProps>(), {
  draggable: false,
  showClose: false,
});

const showDialog = defineModel<boolean>({ default: false });

function onPan(evt: Partial<TouchPanValue>) {
  if (!props.draggable) return;

  if (evt.isFirst) {
    isDragging.value = true;
  }

  if (evt.offset?.y !== undefined && !evt.isFinal) {
    translateY.value = Math.max(0, evt.offset.y);
  }

  if (evt.isFinal) {
    isDragging.value = false;

    if (evt.offset?.y && evt.offset.y > 100 && evt.direction === 'down') {
      showDialog.value = false;
    } else {
      translateY.value = 0;
    }
  }
}

watch(showDialog, (val) => {
  if (val) {
    translateY.value = 0;
  }
});
</script>

<template>
  <q-dialog v-model="showDialog" position="bottom" no-backdrop-dismiss>
    <div
      class="bottom-sheet"
      ref="sheetRef"
      @click.stop
      :style="{
        transform: `translateY(${translateY}px)`,
        transition: isDragging ? 'none' : 'transform 0.2s ease',
      }"
      v-touch-pan.prevent.mouse="onPan"
    >
      <div v-if="props.draggable" class="bottom-sheet__dragbar"></div>

      <button
        v-if="props.showClose"
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
    cursor: grab;
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
    background: transparent;
  }
}
</style>
