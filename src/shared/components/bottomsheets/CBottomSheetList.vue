<script setup lang="ts">
import { BottomSheetProps } from '@/shared/types/bottom-sheet';
import BaseBottomSheet from './BaseBottomSheet.vue';

const props = defineProps<
  BottomSheetProps & {
    type: 'filter' | 'action';
  }
>();
</script>

<template>
  <BaseBottomSheet v-bind="{ ...props }">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      deleniti.
    </p>
    <p>
      Esse dolores eos ipsa quos doloribus sapiente labore magnam dignissimos.
    </p>
  </BaseBottomSheet>
</template>

<style scoped lang="scss"></style>
