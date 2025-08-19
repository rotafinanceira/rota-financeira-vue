<script setup lang="ts">
import CRadio from '@/shared/components/CRadio.vue';

</script>

<template>
  <div class="lab app-wrapper">
    <CRadio id="teste" label="opção 1" group="teste" />
    <CRadio id="teste" label="opção 2" group="teste" />
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
