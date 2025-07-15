<script setup lang="ts">
import CButton from '@/shared/components/CButton.vue';

const action = () => {
  console.log('Laboratório');
};
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="action">Clique aqui</CButton>
  </div>
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.lab {
  display: grid;
  place-items: center;
  min-height: $screen;
}
</style>
