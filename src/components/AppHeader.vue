<template>
  <q-header elevated>
    <q-toolbar class="custom-toolbar">
      <q-img :src="logoRota" style="width: 40px; margin-right: 8px;" />

      <div class="column-header">
        <!-- Updated Jeep Compass style -->
        <div class="jeep-compass-text">Jeep Compass</div>
        <!-- Updated Olá, Pezzano style -->
        <div class="ola-pezzano-text">Olá, Pezzano!</div>
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

.custom-toolbar {
  display: flex;
  width: auto;
  padding: 8px 24px 8px 20px;
  justify-content: space-between;
  align-items: center;
}

.column-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Style for Jeep Compass text */
.jeep-compass-text {
  color: var(--Cores-Cinza-400, #76828B);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Xs, 12px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 14.4px */
}

/* Updated style for Olá, Pezzano text to use Headline/H6 Bold */
.ola-pezzano-text {
  color: var(--Cores-Cinza-900, #0C0D0F);
  font-family: var(--Tipo-Familia-Headline, Raleway);
  font-size: var(--Tipo-Tamanho-Xl, 20px);
  font-style: normal;
  font-weight: 700; /* Headline/H6 Bold */
  line-height: 120%; /* 24px */
  letter-spacing: -0.4px;
}

.text-h6 {
  margin-bottom: 4px;
}
</style>
