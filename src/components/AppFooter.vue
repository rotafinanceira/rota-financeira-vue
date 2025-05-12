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
          <img :src="footerTab === tab.name ? tab.icon.enabled : tab.icon.disabled" alt="" class="tab-icon" />
          <p :class="['tab-text', { 'active-tab': footerTab === tab.name }]">
            {{ tab.label }}
          </p>
        </div>
      </q-tab>
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { navbar } from '@/assets/navbar';

const footerTab = ref('home');
const router = useRouter();
const route = useRoute();

const tabs = [
  { name: 'home', path: '/home', icon: navbar.home, label: 'Início' },
  {
    name: 'maintenance',
    path: '/maintenance',
    icon: navbar.maintenance,
    label: 'Manutenções',
  },
  {
    name: 'history',
    path: '/history',
    icon: navbar.history,
    label: 'Relatórios',
  },
  { name: 'profile', path: '/profile', icon: navbar.profile, label: 'Perfil' },
];

type Tab = (typeof tabs)[0];


const getActiveTab = (tabs: Tab[], path: string) => {
  const currentActiveTab = tabs.find((tab) => path.includes(tab.path))?.name;

  return currentActiveTab;
};

watch(
  () => route.path,
  (newPath) => {
    footerTab.value = getActiveTab(tabs, newPath) || 'home';
  },
  { immediate: true }
);

function navigateTo(path: string) {
  router.push(path).then(() => {
    footerTab.value = getActiveTab(tabs, path) || 'home';
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

  transition: color 300ms ease;
}

.active-tab {
  color: #307714;
}
</style>
