<script setup lang="ts">
import { BottomSheetProps } from '@/shared/types/bottom-sheet';
import BaseBottomSheet from './BaseBottomSheet.vue';

const props = defineProps<
  BottomSheetProps & {
    type: 'filter' | 'action';
    options: string[];
  }
>();
</script>

<template>
  <BaseBottomSheet v-bind="{ ...props }">

  </BaseBottomSheet>
</template>

<style scoped lang="scss"></style>
