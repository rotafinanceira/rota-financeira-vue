<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowIcon } from '@/shared/assets/icons';
import CButton from '@/shared/components/CButton.vue';
import mecanicoImage from '../shared/assets/illustrations/mecanico-duvida.png';

const router = useRouter();

const navigateBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="error-page app-wrapper">
    <div @click="navigateBack" class="return-button">
      <q-img :src="ArrowIcon" />
    </div>

    <img :src="mecanicoImage" />
    <div class="text">
      <h2>Erro 404</h2>
      <p>Não conseguimos encontrar a página que você está procurando</p>
    </div>
    <CButton variant="primary" :to="{ name: 'home' }"> Início </CButton>
  </div>
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.error-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: $screen;
}

.text {
  text-align: center;
  h2 {
    font-weight: 700;
    font-size: 1.25;
    padding-bottom: 0.5rem;
    line-height: 120%;
  }

  p {
    line-height: 150%;
  }
}

.return-button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transform: rotate(-90deg);
}
</style>
