<template>
  <div class="maintenance">
    <div class="app-wrapper maintenance__wrapper">
      <header class="maintenance__header">
        <div class="flex">
          <img :src="CarWrenchIcon" alt="" />
          <h1 class="maintenance__title">Manutenções</h1>
        </div>
        <button
          class="maintenance__settings"
          type="button"
          @click="openSettings"
        >
          <img :src="FilterControlsIcon" alt="filter icon" />
        </button>
      </header>

      <MaintenanceCard
        v-for="item in maintenanceItems"
        v-bind="item"
        :key="item.title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, onMounted } from 'vue';
import { CarWrenchIcon, FilterControlsIcon } from '@/shared/assets/icons';
import { useMaintenanceStore } from '@/stores/maintenance';
import { storeToRefs } from 'pinia';
import { useCarStore } from '@/stores/carStore';
import { MaintenanceIcons } from '@/shared/types/maintenance';

import MaintenanceCard from './components/MaintenanceCard.vue';
import { MaintenanceStatus } from './types';

const carStore = useCarStore();
const maintenanceStore = useMaintenanceStore();
const { maintenances } = storeToRefs(maintenanceStore);

const iconMap: Record<string, keyof MaintenanceIcons> = {
  'Oil Change': 'oil',
  'Wheel Alignment': 'wheel',
  'Battery Change': 'battery',
  'Air Filter Change': 'airFilter',
  'Fuel Filter Change': 'fuelFilter',
};

const routeMap: Record<string, string> = {
  'Oil Change': 'maintenance-oil',
  'Wheel Alignment': 'maintenance-alignment-balancing',
  'Battery Change': 'maintenance-battery',
  'Air Filter Change': 'maintenance-air-filter',
  'Fuel Filter Change': 'maintenance-fuel-filter',
};

onMounted(async () => {
  await carStore.getCars();
  if (carStore.firstLicensePlate) {
    await maintenanceStore.getMaintenances(carStore.firstLicensePlate);
  }
});

watch(
  () => carStore.firstLicensePlate,
  async (plate) => {
    if (plate) {
      await maintenanceStore.getMaintenances(plate);
    }
  }
);

const maintenanceItems = computed(() => {
  return maintenances.value.map((m) => {
    const status: MaintenanceStatus =
      m.data?.status &&
      ['Unregistered', 'PENDING', 'EXPIRED', 'COMPLETED'].includes(
        m.data.status
      )
        ? m.data.status
        : 'Unregistered';

    return {
      title: m.type || 'Manutenção',
      icon: iconMap[m.type] || 'wheel',
      maintenanceData: {
        status,
        pendingSteps: m.data?.pendingSteps || 0,
      },
      routeName: routeMap[m.type] || '',
    };
  });
});

const openSettings = () => {
  console.log('open filters');
};
</script>

<style lang="scss" scoped>
.maintenance {
  min-height: calc(100svh - 130px);

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }

  &__settings {
    height: 20px;
    background: none;
    border: none;
    padding: 0;
  }
}

.flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
