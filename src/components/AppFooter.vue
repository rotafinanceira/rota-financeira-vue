<template>
  <q-footer>
    <q-tabs
      v-model="footerTab"
      align="justify"
      active-color="green"
      indicator-color="green"
      class="custom-tabs"
      switch-indicator
    >
      <q-tab name="home" @click="navigateTo('/home')">
        <template v-slot:default>
          <img
            :src="homeIcon"
            alt="Início Icon"
            style="width: 24px; height: 24px"
          />
          <div class="tab-text">Início</div>
        </template>
      </q-tab>
      <q-tab name="maintenance" @click="navigateTo('/maintenance')">
        <template v-slot:default>
          <img
            :src="manuIcon"
            alt="Manutenções Icon"
            style="width: 24px; height: 24px"
          />
          <div class="tab-text">Manutenções</div>
        </template>
      </q-tab>
      <q-tab name="history" @click="navigateTo('/maintenance-history')">
        <template v-slot:default>
          <img
            :src="histIcon"
            alt="Histórico Icon"
            style="width: 24px; height: 24px"
          />
          <div class="tab-text">Histórico</div>
        </template>
      </q-tab>
      <q-tab name="profile" @click="navigateTo('/profile')">
        <template v-slot:default>
          <img
            :src="perfIcon"
            alt="Perfis Icon"
            style="width: 24px; height: 24px"
          />
          <div class="tab-text">Perfis</div>
        </template>
      </q-tab>
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import homeIcon from '@/assets/home.svg';
import manuIcon from '@/assets/manu.svg';
import histIcon from '@/assets/his.svg';
import perfIcon from '@/assets/perf.svg';

const footerTab = ref('home');
const router = useRouter();
const route = useRoute();

watch(
  route,
  (newRoute) => {
    switch (newRoute.path) {
      case '/home':
        footerTab.value = 'home';
        break;
      case '/maintenance':
        footerTab.value = 'maintenance';
        break;
      case '/maintenance-history':
        footerTab.value = 'history';
        break;
      case '/profile':
        footerTab.value = 'profile';
        break;
      default:
        footerTab.value = 'home';
    }
  },
  { immediate: true }
);

function navigateTo(path) {
  router.push(path);
}
</script>

<style scoped>
.q-footer {
  background-color: #ffffff;
  color: #000000;
  width: 100%;
  height: 72px;
  border: 1px solid #E0E5E7;
  box-shadow: none; /* Remove shadow */
}

.q-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-tabs .q-tabs__indicator {
  top: 0;
  bottom: auto;
  background-color: green;
}

/* Ensure text is not transformed to uppercase */
.tab-text {
  text-transform: none;
}
</style>
