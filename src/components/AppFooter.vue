<template>
  <q-footer elevated>
    <q-tabs
      v-model="footerTab"
      align="justify"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab
        name="home"
        @click="navigateTo('/')"
      >
        <template v-slot:default>
          <img :src="homeIcon" alt="Início Icon" style="width: 24px; height: 24px;" />
          <div>Início</div>
        </template>
      </q-tab>
      <q-tab
        name="maintenance"
        @click="navigateTo('/oil-maintenance')"
      >
        <template v-slot:default>
          <img :src="manuIcon" alt="Manutenções Icon" style="width: 24px; height: 24px;" />
          <div>Manutenções</div>
        </template>
      </q-tab>
      <q-tab
        name="history"
        @click="navigateTo('/maintenance-history')"
      >
        <template v-slot:default>
          <img :src="histIcon" alt="Histórico Icon" style="width: 24px; height: 24px;" />
          <div>Histórico</div>
        </template>
      </q-tab>
      <q-tab
        name="profile"
        @click="navigateTo('/profile')"
      >
        <template v-slot:default>
          <img :src="perfIcon" alt="Perfis Icon" style="width: 24px; height: 24px;" />
          <div>Perfis</div>
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
import histIcon from '@/assets/hist.svg';
import perfIcon from '@/assets/perf.svg';

const footerTab = ref('home');
const router = useRouter();
const route = useRoute();

watch(route, (newRoute) => {
  switch (newRoute.path) {
    case '/':
      footerTab.value = 'home';
      break;
    case '/oil-maintenance':
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
}, { immediate: true });

function navigateTo(path) {
  router.push(path);
}
</script>

<style scoped>
.q-footer {
  background-color: #ffffff;
  color: #000000;
}

.q-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
