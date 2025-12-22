<script setup lang="ts">
import { WrenchMediumIcon } from '@/shared/assets/illustrations';
</script>

<template>
  <div class="loading-page app-wrapper">
    <div class="wrapper"><img :src="WrenchMediumIcon" /></div>

    <div class="text">
      <h2>Aguarde um momento...</h2>
      <p>As informações estão sendo carregadas</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.loading-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: $screen;
  align-items: center;
  justify-content: center;
}

.wrapper {
  width: 240px;
  height: 240px;
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
</style>
