<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ArrowIcon } from '@/shared/assets/icons';
import CButton from '@/shared/components/CButton.vue';
import mecanicoImage from '../shared/assets/illustrations/mechanic-not-found.png';
</script>

<template>
  <div class="error-page app-wrapper">
    <RouterLink :to="{ name: 'home' }" class="return-button">
      <q-img :src="ArrowIcon" />
    </RouterLink>

    <img :src="mecanicoImage" />
    <div class="text">
      <h2>Erro 404</h2>
      <p>Não conseguimos encontrar a página que você está procurando</p>
    </div>
    <CButton variant="primary" size="large" :to="{ name: 'home' }">
      Início
    </CButton>
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
  padding: 0 30px;
  h2 {
    font-weight: 700;
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
    line-height: 120%;
  }

  p {
    line-height: 150%;
    color: #485159;
  }
}

.return-button {
  width: 26px;
  height: 26px;
  transform: rotate(-90deg);
}
</style>
