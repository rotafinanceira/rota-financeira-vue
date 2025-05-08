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
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        @click="navigateTo(tab.path)"
      >
        <div class="tab-container">
          <img :src="tab.icon" alt="" class="tab-icon" />
          <div :class="['tab-text', { 'active-tab': footerTab === tab.name }]">
            {{ tab.label }}
          </div>
        </div>
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

const router = useRouter();
const route = useRoute();

const tabs = [
  { name: 'home', path: '/home', icon: homeIcon, label: 'Início' },
  {
    name: 'maintenance',
    path: '/maintenance',
    icon: manuIcon,
    label: 'Manutenções',
  },
  {
    name: 'history',
    path: '/maintenance-history',
    icon: histIcon,
    label: 'Relatórios',
  },
  { name: 'profile', path: '/profile', icon: perfIcon, label: 'Perfil' },
];

const footerTab = ref('home');

watch(
  () => route.path,
  (newPath) => {
    footerTab.value = tabs.find((tab) => newPath.includes(tab.path))?.name || 'home';
  },
  { immediate: true }
);

function navigateTo(path) {
  router.push(path).then(() => {
    footerTab.value = tabs.find((tab) => tab.path === path)?.name || 'home';
  });
}
</script>

<style scoped>
.q-footer {
  background-color: #ffffff;
  width: 100%;
  height: 72px;
  border-top: 1px solid #e0e5e7;
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

.tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: 17px;
}

.tab-icon {
  width: 20px;
  height: 20px;
}

.tab-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #9ba7ad;
  text-transform: none;
}

.active-tab {
  color: #307714;
}
</style>
