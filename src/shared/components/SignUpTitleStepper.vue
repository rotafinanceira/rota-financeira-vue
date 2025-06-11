<template>
  <div class="container">
    <div class="title">
      <span class="title-text">Criar Conta</span>
    </div>
    <div class="subtitle">
      <span class="subtitle-text" v-if="step === 1"> Passo 1 de 3 </span>
      <span class="subtitle-text" v-if="step === 2"> Passo 2 de 3 </span>
      <span class="subtitle-text" v-if="step === 3"> Passo 3 de 3 </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  step: Number,
});
</script>

<style scoped>
.container {
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.title-text {
  font-weight: bold;
  font-size: 20px;
  color: #314b39;
  font-family: 'Raleway', sans-serif;
}

.subtitle-text {
  font-weight: 500;
  font-size: 12px;
  color: #9db8a1;
  font-family: 'Inter', sans-serif;
}
</style>
