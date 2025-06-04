<template>
  <q-header elevated>
    <q-toolbar class="custom-toolbar">
      <q-btn flat round @click="navigateToHome">
        <img :src="logoRota" style="width: 40px; margin-right: 8px" />
      </q-btn>

      <div class="column-header">
        <div class="jeep-compass-text">Jeep Compass</div>
        <div class="ola-pezzano-text">Olá, Pezzano!</div>
      </div>

      <q-space />

      <q-btn
        flat
        round
        :to="{ path: 'notification' }"
      >
        <div class="notification-wrapper">
          <img :src="Noti" style="width: 24px; height: 24px" />
          <img :src="elipse" class="notification-badge" />
        </div>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import logoRota from '@/assets/logoRota.svg';
import Noti from '@/assets/Noti.svg';
import elipse from '@/assets/elipse46.svg';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToHome = () => {
  router.push('/home');
};
</script>

<style scoped>
.q-header {
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
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

.jeep-compass-text {
  color: var(--Cores-Cinza-400, #76828b);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Xs, 12px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}

.ola-pezzano-text {
  color: var(--Cores-Cinza-900, #0c0d0f);
  font-size: var(--Tipo-Tamanho-Xl, 20px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.4px;
}

.notification-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.notification-badge {
  position: absolute;
  left: 13px;
  bottom: 11px;
  width: 12px;
  height: 11x;
  flex-shrink: 0;
  fill: var(--Cores-Error-500, #da2829);
  stroke-width: 1.846px;
  stroke: var(--Cores-Cinza-Branco, #fff);
}

.text-h6 {
  margin-bottom: 4px;
}

.q-toolbar div {
  text-transform: none;
}
</style>
