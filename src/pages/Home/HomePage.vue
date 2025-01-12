<template>
  <div class="home-page">
    <AppHeader />
    <p>Conteúdo da página inicial...</p>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style scoped>
.home-page {
  padding: 1rem;
  text-align: center;
}
</style>
