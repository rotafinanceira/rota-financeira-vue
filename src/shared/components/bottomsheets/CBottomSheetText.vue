<script setup lang="ts">
import { BottomSheetProps } from '@/shared/types/bottom-sheet';
import CBottomSheet from './CBottomSheet.vue';

const props = defineProps<BottomSheetProps>();
</script>

<template>
  <CBottomSheet v-bind="{ ...props }">
    <div class="bottom-sheet__wrapper">
      <slot />
    </div>
  </CBottomSheet>
</template>

<style scoped lang="scss">
.bottom-sheet__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}
</style>
