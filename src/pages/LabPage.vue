<script setup lang="ts">
import CRadio from '@/shared/components/CRadio.vue';
import { ref } from 'vue';

const selectedOption = ref('option1');
</script>

<template>
  <div class="lab app-wrapper">
    <CRadio
      id="teste"
      label="opção 1"
      value="option1"
      group="teste"
      v-model="selectedOption"
    />
    <CRadio
      id="teste"
      label="opção 2"
      value="option2"
      group="teste"
      v-model="selectedOption"
    />
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
