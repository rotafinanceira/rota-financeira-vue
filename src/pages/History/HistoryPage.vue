<template>
  <div class="app-wrapper">
    <header class="history__header">
      <div class="flex">
        <img :src="PageIcon" alt="" />
        <h1 class="history__title">Histórico</h1>
      </div>
      <button class="history__settings">
        <img :src="FilterControlsIcon" alt="" />
      </button>
    </header>
    <main class="history__main">
      <div v-if="isLoading" class="spinner-center">
        <q-spinner color="primary" size="40px" />
      </div>
  <section class="history__no-maintenances" v-else-if="!isLoading && isThereNoMaintenances">
        <img :src="BrokenCar" alt="" />
        <p class="">Você ainda não possui manutenções cadastradas!</p>
      </section>
      <HistoryCard
        v-else
        v-for="history in maintenanceHistory"
        v-bind="history"
        :key="history.id"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { FilterControlsIcon, PageIcon } from '@/shared/assets/icons';
import HistoryCard from './components/HistoryCard.vue';
import { HistoryCardProps } from './types';
import { BrokenCar } from '@/shared/assets/illustrations';

import { onMounted, ref, watch } from 'vue';
import { QSpinner } from 'quasar';
import { useMaintenanceStore } from '@/stores/maintenance';
import { useCarStore } from '@/stores/carStore';

const types = ['oil', 'battery', 'air-filter'];
const maintenanceStore = useMaintenanceStore();
const carStore = useCarStore();
const maintenanceHistory = ref<HistoryCardProps[]>([]);
const isLoading = ref(false);

type MaintenanceApiItem = {
  type: 'Oil Change' | 'Battery Change';
  data: {
    id: string;
    lastMaintenanceDate?: string;
    lastMaintenanceKm?: number;
    valor?: string;
    oilBrand?: string;
    batteryBrand?: string;
    oilType?: string;
    status?: string;
  };
};

function mapApiToHistoryCard(apiItem: MaintenanceApiItem): HistoryCardProps {
  // Expanded icon mapping
  let icon: HistoryCardProps['maintenances'][number]['icon'] = 'oil';
  switch (apiItem.type) {
    case 'Oil Change':
      icon = 'oil';
      break;
    case 'Air Filter Change':
      icon = 'airFilter';
      break;
    case 'Wheel Change':
      icon = 'wheel';
      break;
    case 'Battery Change':
      icon = 'battery';
      break;
    case 'Oil Filter Change':
      icon = 'oilFilter';
      break;
    case 'Fuel Filter Change':
      icon = 'fuelFilter';
      break;
    default:
      icon = 'oil';
  }

  let month = '';
  let date = '-';
  if (apiItem.data.lastMaintenanceDate) {
    const d = new Date(apiItem.data.lastMaintenanceDate);
    month = d.toLocaleString('pt-BR', { month: 'long' });
    date = d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' });
  }

  return {
    id: apiItem.data.id,
    month,
    date,
    km: apiItem.data.lastMaintenanceKm?.toString() || '-',
    maintenances: [
      {
        icon,
        title: apiItem.type,
        description: apiItem.data.valor || '-',
      },
    ],
  };
}

onMounted(async () => {
  await carStore.getCars();
});

watch(
  () => carStore.firstLicensePlate,
  async (plate) => {
    if (plate) {
      isLoading.value = true;
      await maintenanceStore.getMaintenanceHistory(plate, types);
      maintenanceHistory.value = (maintenanceStore.history as unknown[]).map(item => mapApiToHistoryCard(item as MaintenanceApiItem)) as HistoryCardProps[];
      isLoading.value = false;
    }
  },
  { immediate: true }
);

const isThereNoMaintenances = ref(false);
watch(maintenanceHistory, (val) => {
  isThereNoMaintenances.value = Array.isArray(val) && val.length === 0;
});
</script>

<style scoped lang="scss">
.history {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }

  &__settings {
    display: block;
    height: 20px;
    background: none;
    border: none;
    padding: 0;
  }

  &__main {
    display: grid;
    align-items: center;
    gap: 1.5rem;
    min-height: calc(100svh - 219px);
  }

  &__no-maintenances {
    display: grid;
    place-items: center;
    gap: 1.5rem;

    p {
      font-size: 1.125rem;
      font-weight: 500;
      text-align: center;
      max-width: 15rem;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
  .spinner-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }
</style>
