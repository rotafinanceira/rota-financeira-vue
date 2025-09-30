<script setup lang="ts">
import { ref } from 'vue';
import CSelect from '@/shared/components/CSelect.vue';

const country = ref('');
</script>

<template>
  <div class="lab app-wrapper">
    <CSelect
      v-model="country"
      label="País"
      name="country"
      placeholder="Selecione um país"
      :options="[
        { label: 'Brasil', value: 'br' },
        { label: 'Argentina', value: 'ar' },
        { label: 'Chile', value: 'cl' },
      ]"
    />
    <p>Selecionado: {{ country }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.lab {
  display: grid;
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
