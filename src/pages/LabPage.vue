<script setup lang="ts">
import { ref } from 'vue';
import CButton from '@/shared/components/CButton.vue';

import CDivider from '@/shared/components/CDivider.vue';

const openModal1 = ref(false);

const action1 = () => {
  openModal1.value = true;
  //console.log('Laboratório');
};

const openModal2 = ref(false);

const action2 = () => {
  openModal2.value = true;
  //console.log('Laboratório');
};
</script>

<template>
  <div class="lab app-wrapper">
    <CButton @click="action">Clique aqui</CButton>
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
