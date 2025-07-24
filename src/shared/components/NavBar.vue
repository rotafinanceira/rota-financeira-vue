<template>
  <q-footer>
    <q-tabs v-model="navbarTab" align="justify" class="navbar" switch-indicator>
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        @click="navigateTo(tab.routeName)"
        class="navbar__tab"
      >
        <div class="tab__container">
          <div
            class="navbar__notifications"
            v-if="tab.notification && tab.notification > 0"
            floating
          >
            <span> +{{ tab.notification }} </span>
          </div>
          <img
            :src="navbarTab === tab.name ? tab.icon.enabled : tab.icon.disabled"
            alt=""
          />
          <p
            :class="['tab__text', { 'tab__is-active': navbarTab === tab.name }]"
          >
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
import { navbar } from '@/shared/assets/navbar';
import { Tab } from '../types/navbar';

const navbarTab = ref('home');
const router = useRouter();
const route = useRoute();

const tabs: Tab[] = [
  { name: 'home', routeName: 'home', icon: navbar.home, label: 'Início' },
  {
    name: 'maintenance',
    routeName: 'maintenances',
    icon: navbar.maintenance,
    label: 'Manutenções',
    notification: 3,
  },
  {
    name: 'history',
    routeName: 'history',
    icon: navbar.history,
    label: 'Histórico',
    notification: 0,
  },
  {
    name: 'finances',
    routeName: 'finances',
    icon: navbar.finances,
    label: 'Finanças',
  },
];

const getActiveTab = (tabs: Tab[], routeName: string) => {
  const currentActiveTab = tabs.find((tab) =>
    routeName.includes(tab.routeName)
  )?.name;

  return currentActiveTab;
};

watch(
  () => route.path,
  (newPath) => {
    navbarTab.value = getActiveTab(tabs, newPath) || 'home';
  },
  { immediate: true }
);

function navigateTo(routeName: string) {
  router.push({ name: routeName }).then(() => {
    navbarTab.value = getActiveTab(tabs, routeName) || 'home';
  });
}
</script>

<style scoped lang="scss">
.q-footer {
  background-color: #ffffff;
  width: 100%;
  height: 72px;
  border-top: 1px solid #e0e5e7;
}

.navbar {
  height: 100%;
  color: #307714;

  &__tab {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0;
    flex: 1;
  }

  &__notifications {
    --size: 16px;
    display: grid;
    place-items: center;
    position: absolute;

    width: var(--size);
    height: var(--size);

    color: white;
    background-color: #db3d46;

    font-size: 0.5rem;

    border-radius: 99px;
    inset: -2.5px 11px auto auto;

    > :first-of-type {
      position: absolute;
      left: 2.5px;
    }
  }
}

.tab {
  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  &__text {
    font-weight: 500;
    font-size: 12px;
    color: #9ba7ad;
    text-transform: none;

    transition: color 300ms ease;
  }

  &__is-active {
    color: #307714;
  }
}
</style>
