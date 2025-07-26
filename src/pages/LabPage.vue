<script setup lang="ts">
import { ref } from 'vue';
import CButton from '@/shared/components/CButton.vue';
import CBottomSheet from '@/shared/components/CBottomSheet.vue';

const showSheet = ref(false);
const showSheet2 = ref(false);
const showSheet3 = ref(false);
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="showSheet = true">bottom-sheet1</CButton>

    <CButton @click="showSheet2 = true">bottom-sheet2</CButton>

    <CButton @click="showSheet3 = true">bottom-sheet3</CButton>
  </div>

  <CBottomSheet v-model="showSheet" variant="default">
    <p>tests</p>
    <CButton @click="showSheet = false">Fechar</CButton>
  </CBottomSheet>

  <CBottomSheet v-model="showSheet2" variant="default">
    <p>tests</p>
    <CButton @click="showSheet3 = false">Fechar</CButton>
  </CBottomSheet>

  <CBottomSheet v-model="showSheet3" variant="default">
    <p>tests</p>
    <CButton @click="showSheet3 = false">Fechar</CButton>
  </CBottomSheet>
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.lab {
  display: grid;
  place-items: center;
  min-height: $screen;
}
</style>
