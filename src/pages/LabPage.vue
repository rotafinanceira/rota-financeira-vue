<script setup lang="ts">
import CButton from '@/shared/components/CButton.vue';
import CInputText from '@/shared/components/CInputText.vue';
import { XCircleIcon } from '@/shared/assets/icons';
import { ref } from 'vue';
import CInputPassword from '@/shared/components/CInputPassword.vue';

const text1 = ref('');
const text2 = ref('asda');

</script>

<template>
  <div class="lab app-wrapper">
    <CInputText
      label="email"
      v-model="text1"
      :icon="XCircleIcon"
      :action="() => (text1 = '')"
    />
    <CInputText
      label="email2"
      v-model="text2"
      :icon="XCircleIcon"
      :action="() => (text2 = '')"
      disabled
    />

    <CInputPassword
      label="senha"
      supporting-text="Esqueceu a senha?"
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
