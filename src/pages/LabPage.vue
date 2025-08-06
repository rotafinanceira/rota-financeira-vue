<script setup lang="ts">
import CCheckBox from '@/shared/components/CCheckBox.vue';
import { ref } from 'vue';

const isChecked = ref(false);
</script>

<template>
  <div class="lab app-wrapper">
    <div class="container">
      <CCheckBox v-model="isChecked" />
    </div>

    <p>Checked: {{ isChecked }}</p>
  </div>
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
