<template>
  <AppHeader />
  <div class="maintenance">
    <div class="maintenance__wrapper">
      <header class="maintenance__header">
        <div class="flex">
          <img :src="gearWrench" alt="" />
          <h1 class="maintenance__title">Manutenções</h1>
        </div>
        <button
          class="maintenance__settings"
          type="button"
          :onclick="openSettings"
        >
          <img :src="settings" alt="settings button" />
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
import { gearWrench, settings } from '@/assets';
import AppHeader from '@/shared/components/AppHeader.vue';
import MaintenanceCard, {
  MaintenanceCardProps,
} from '@/shared/components/MaintenanceCard.vue';

const maintenanceItems: MaintenanceCardProps[] = [
  {
    title: 'Alinhamento e balanceamento',
    icon: 'wheel',
    maintenanceData: {
      status: 'pending',
    },
  },
  {
    title: 'Bateria',
    icon: 'battery',
  },
  {
    title: 'Filtro de ar-condicionado',
    icon: 'airFilter',
    maintenanceData: {
      status: 'expired',
    },
  },
  {
    title: 'Filtro de combustível',
    icon: 'fuelFilter',
    maintenanceData: {
      status: 'unregistered',
    },
  },
  {
    title: 'Nível de fluidos',
    icon: 'fluidLevel',
  },
  {
    title: 'Motor',
    icon: 'engine',
  },
  {
    title: 'Troca de óleo',
    icon: 'oil',
  },
  {
    title: 'Verificação de pneu',
    icon: 'wheel',
  },
];

const openSettings = () => {
  console.log('open settings');
};
</script>

<style lang="scss" scoped>
.maintenance {
  min-height: calc(100svh - 130px);
  background-color: #eff3f5;
  padding-bottom: 1rem;

  &__wrapper {
    width: calc(100% - 2.5rem);
    margin-inline: auto;
    padding-top: 1.5rem;
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
    font-family: 'Inter';
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
