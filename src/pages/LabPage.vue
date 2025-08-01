<script setup lang="ts">
import { ref } from 'vue';
import CButton from '@/shared/components/CButton.vue';
import CBottomSheet from '@/shared/components/CBottomSheet.vue';

const showSheet1 = ref(false);
const showSheet2 = ref(false);
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="showSheet1 = true">bottom-sheet1</CButton>
    <CButton @click="showSheet2 = true">bottom-sheet2</CButton>
  </div>

  <CBottomSheet v-model="showSheet1" :draggable="true">
    <div class="group">
      <h2>Teste de título do overlay contendo 2 linhas (ideal)</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna
      </p>
    </div>

    <CButton @click="showSheet1 = false">Cadastrar veículo</CButton>
  </CBottomSheet>

  <CBottomSheet v-model="showSheet2" :show-close="true">
    <div class="group">
      <h2>Teste de título do overlay contendo 2 linhas (ideal)</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna
      </p>
    </div>

    <CButton @click="showSheet2 = false">Cadastrar veículo</CButton>
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
