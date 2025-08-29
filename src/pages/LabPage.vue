<script setup lang="ts">
import { ref } from 'vue';
import CButton from '@/shared/components/CButton.vue';
import CBottomSheetText from '@/shared/components/bottomsheets/CBottomSheetText.vue';
import CBottomSheetList from '@/shared/components/bottomsheets/CBottomSheetList.vue';

const showSheet1 = ref(false);
const showSheet2 = ref(false);

const filterOptions = ["Manutenções vencidas", "Próximas manutenções", "Preencher etapas"];
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="showSheet1 = true">bottom-sheet1</CButton>
    <CButton @click="showSheet2 = true">bottom-sheet2</CButton>
  </div>

  <CBottomSheetText v-model="showSheet1" :show-close="true">
    <div>
      <img src="/src/shared//assets/illustrations/broken-car.svg" />
    </div>
    <div class="group">
      <h2>Teste de título do overlay contendo 2 linhas (ideal)</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna
      </p>
    </div>

    <CButton @click="showSheet1 = false">Cadastrar veículo</CButton>
  </CBottomSheetText>

  <CBottomSheetList type="action" :draggable="true" :options="filterOptions" v-model="showSheet2" />
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.lab {
  display: grid;
  justify-content: center;
  align-content: center;
  gap: 1rem;
  min-height: $screen;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
