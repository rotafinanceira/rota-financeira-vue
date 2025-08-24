<script setup lang="ts">

import CCheckbox from '@/shared/components/CCheckbox.vue';
import { ref } from 'vue';

const isChecked = ref(false);
</script>

<template>
  <div class="lab app-wrapper">
    <div class="container">
      <CCheckbox v-model="isChecked" label="Manutenções de teste" />
    </div>

    <p>Checked: {{ isChecked }}</p>
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
