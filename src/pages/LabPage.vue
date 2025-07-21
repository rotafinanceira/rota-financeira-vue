<script setup lang="ts">
import CToggle from '@/shared/components/CToggle.vue';
import { ref } from 'vue';

const isChecked = ref(false);
</script>

<template>
  <div class="lab app-wrapper">
    <CToggle v-model="isChecked" @click="isChecked = !isChecked" />
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
</style>
