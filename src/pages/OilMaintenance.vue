<template>
  <q-page>
    <HeaderBar
      title="Troca de Óleo"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">Teste</div>
  </q-page>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
</script>

<style scoped>
.main-content {
  background-color: gray;
}
</style>
