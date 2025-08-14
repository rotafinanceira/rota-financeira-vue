<script setup lang="ts">
import { bottomSheetProps } from '@/shared/types/bottom-sheet';
import CBottomSheet from './CBottomSheet.vue';

const props = defineProps<
  bottomSheetProps & {
    type: 'filter' | 'action';
  }
>();
</script>

<template>
  <CBottomSheet v-bind="{ ...props }">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      deleniti.
    </p>
    <p>
      Esse dolores eos ipsa quos doloribus sapiente labore magnam dignissimos.
    </p>
  </CBottomSheet>
</template>

<style scoped lang="scss"></style>
