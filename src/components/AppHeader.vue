<template>
  <q-header elevated>
    <q-toolbar>
      <q-img :src="logoRota" style="width: 40px; margin-right: 8px;" />

      <div class="column-header">
        <div class="text-h6">Jeep Compass</div>
        <div class="q-mr-md">Olá, Pezzano!</div>
      </div>

      <q-space />

      <!-- Colocando o ícone Noti.svg dentro de q-btn -->
      <q-btn flat round>
        <q-img :src="Noti" style="width: 24px; height: 24px;" />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import logoRota from '@/assets/logoRota.svg';
import Noti from '@/assets/Noti.svg';
</script>

<style scoped>
.q-header {
  background-color: #ffffff;
  color: #000000;
}

.column-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text-h6 {
  margin-bottom: 4px;
}
</style>
