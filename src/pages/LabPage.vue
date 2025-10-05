<script setup lang="ts">
import { ref, watch } from 'vue';
import CButton from '@/shared/components/CButton.vue';
import CBottomSheetText from '@/shared/components/bottomsheets/CBottomSheetText.vue';
import CBottomSheetList from '@/shared/components/bottomsheets/CBottomSheetList.vue';
import { ListOption } from '@/shared/types/bottom-sheet';

const showSheet1 = ref(false);
const showSheet2 = ref(false);

const filterOptions = ref<ListOption[]>([
  { label: 'Manutenções vencidas', selected: false },
  { label: 'Próximas manutenções', selected: false },
  { label: 'Preencher etapas', selected: false },
  { label: 'Manutenções sem cadastro', selected: false },
]);

const onFilter = (selectedLabels: string[]) => {
  console.log('Filtros selecionados:', selectedLabels);
  showSheet2.value = false;
};

watch(
  filterOptions,
  () => {
    console.log(filterOptions.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="showSheet1 = true">Text Bottom Sheet</CButton>
    <CButton @click="showSheet2 = true">List Bottom Sheet</CButton>
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

  <CBottomSheetList
    type="filter"
    :draggable="true"
    :options="filterOptions"
    v-model="showSheet2"
    @filter="onFilter"
  />
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.lab {
  display: grid;
  align-content: center;
  gap: 1rem;
  min-height: $screen;
}
</style>
