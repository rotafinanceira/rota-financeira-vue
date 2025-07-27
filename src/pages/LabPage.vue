<script setup lang="ts">
import { ref } from 'vue';
import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';

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
    <CButton @click="action1">Modal1</CButton>
    <CButton @click="action2">Modal2</CButton>
    <CModal
      v-model="openModal1"
      variant="default"
      icon="alert"
      :showClose="true"
    >
      <div class="group">
        <h2>Erro de carregamento</h2>
        <p>
          Ocorreu um erro ao carregar os Termos de Uso. Verifique sua conexão
          com a internet ou tente novamente mais tarde.
        </p>
      </div>
      <div class="group">
        <CButton> Action </CButton>
        <CButton variant="tertiary"> Cancel </CButton>
      </div>
    </CModal>

    <CModal v-model="openModal2" variant="info" :showClose="true">
      <h2>Quando devo fazer a troca?</h2>
      <p>
        Ocorreu um erro ao carregar os Termos de Uso. Verifique sua conexão com
        a internet ou tente novamente mais tarde.
      </p>
      <ul>
        <li>
          A recomendação é fazer a manutenção dos pneus a cada 5.000 km rodados
          ou a cada 6 meses, o que ocorrer primeiro⁠.
        </li>
        <li>
          Troque seus pneus se tiverem mais de 10 anos, mesmo que pareçam bons.
        </li>
        <li>Item 3 da lista</li>
      </ul>
    </CModal>
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
