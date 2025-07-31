<script setup lang="ts">
import { ref } from 'vue';
import CButton from '@/shared/components/CButton.vue';
import CBottomSheet from '@/shared/components/CBottomSheet.vue';

const showSheet = ref(false);
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="showSheet = true">bottom-sheet1</CButton>
  </div>

  <CBottomSheet v-model="showSheet" :draggable="true">
    <div class="group">
      <h2>Teste de título do overlay contendo 2 linhas (ideal)</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna
      </p>
    </div>

    <CButton @click="showSheet = false">Cadastrar veículo</CButton>
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
