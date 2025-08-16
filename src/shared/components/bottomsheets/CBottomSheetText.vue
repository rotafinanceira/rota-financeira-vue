<script setup lang="ts">
import { BottomSheetProps } from '@/shared/types/bottom-sheet';
import BaseBottomSheet from './BaseBottomSheet.vue';

const props = defineProps<BottomSheetProps>();
</script>

<template>
  <BaseBottomSheet v-bind="{ ...props }">
    <div class="bottom-sheet__wrapper">
      <slot />
    </div>
  </BaseBottomSheet>
</template>

<style scoped lang="scss">
.bottom-sheet__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;

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
    text-align: center;
  }
}
</style>
