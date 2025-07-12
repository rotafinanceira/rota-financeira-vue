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
import { CarWrenchIcon, FilterControlsIcon } from '@/shared/assets/icons';

import MaintenanceCard from './components/MaintenanceCard.vue';
import { MaintenanceCardProps } from './types';

const maintenanceItems: MaintenanceCardProps[] = [
  {
    title: 'Alinhamento e balanceamento',
    icon: 'wheel',
    maintenanceData: {
      status: 'pending',
    },
    routeName: 'maintenance-alignment-balancing',
  },
  {
    title: 'Bateria',
    icon: 'battery',
    routeName: 'maintenance-battery',
  },
  {
    title: 'Filtro de ar-condicionado',
    icon: 'airFilter',
    maintenanceData: {
      status: 'expired',
    },
    routeName: 'maintenance-air-filter',
  },
  {
    title: 'Filtro de combustível',
    icon: 'fuelFilter',
    maintenanceData: {
      status: 'unregistered',
    },
    routeName: 'maintenance-fuel-filter',
  },
  {
    title: 'Nível de fluidos',
    icon: 'fluidLevel',
    routeName: '',
  },
  {
    title: 'Motor',
    icon: 'engine',
    routeName: '',
  },
  {
    title: 'Troca de óleo',
    icon: 'oil',
    routeName: 'maintenance-oil',
  },
  {
    title: 'Verificação de pneu',
    icon: 'wheel',
    routeName: '',
  },
];

const openSettings = () => {
  console.log('open filters');
};
</script>

<style lang="scss" scoped>
.maintenance {
  min-height: calc(100svh - 130px);
  padding-bottom: 1rem;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
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
