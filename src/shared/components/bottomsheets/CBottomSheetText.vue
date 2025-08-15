<script setup lang="ts">
import { bottomSheetProps } from '@/shared/types/bottom-sheet';
import CBottomSheet from './CBottomSheet.vue';

const props = defineProps<bottomSheetProps>();
</script>

<template>
  <CBottomSheet v-bind="{ ...props }">
    <div class="bottom-sheet-wrapper">
      <slot />
    </div>
  </CBottomSheet>
</template>

<style scoped lang="scss">
.bottom-sheet-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}
.bottom-sheet-wrapper :deep(h2) {
  font-weight: 600;
  font-size: 1.125rem;
}

.bottom-sheet-wrapper :deep(p) {
  color: #485159;
}

.bottom-sheet-wrapper :deep(.group) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}
</style>
