<script setup lang="ts">
import CButton from '@/shared/components/CButton.vue';
import CDivider from '@/shared/components/CDivider.vue';

const action1 = () => {
  console.log('Laboratório');
};
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="action1">Botão</CButton>
    <CDivider text="ou" />
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
</style>
