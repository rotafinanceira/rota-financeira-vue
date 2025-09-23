<script setup lang="ts">
import CButton from '@/shared/components/CButton.vue';
import { XCircleIcon } from '@/shared/assets/icons';
import { ref } from 'vue';
import CInput from '@/shared/components/CInput.vue';

const allInput = ref('');
</script>

<template>
  <div class="lab app-wrapper">
    <CInput
      label="nome"
      name="teste"
      v-model="allInput"
      variant="text"
      :icon="XCircleIcon"
    />

    <CButton>Clique aqui</CButton>
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
