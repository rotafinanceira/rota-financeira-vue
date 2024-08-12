<template>
  <q-page padding>
    <div class="container">
      <div class="topScreen">Topo</div>
      <div class="bottomScreen">Parte Inferior</div>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupa a altura total da tela */
}

.topScreen {
  background-color: lightblue;
  flex: 1; /* Ocupa 50% da altura da tela */
}

.bottomScreen {
  background-color: gray;
  flex: 1; /* Ocupa 50% da altura da tela */
}
</style>
