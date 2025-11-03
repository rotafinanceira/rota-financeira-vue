<template>
  <div class="app-wrapper">
    <header class="history__header">
      <div class="flex">
        <img :src="PageIcon" alt="" />
        <h1 class="history__title">Histórico</h1>
      </div>
      <button class="history__settings" @click="isBottomSheetOpen = true">
        <img :src="FilterControlsIcon" alt="" />
      </button>
    </header>

    <div class="history__tags" v-if="appliedFilters.length">
      <CTag
        v-for="filter in appliedFilters"
        :key="filter"
        :title="filter"
        removable
        variant="default"
        @remove="removeFilter(filter)"
      />
    </div>

    <main class="history__main">
      <div v-if="isLoading" class="spinner-center">
        <q-spinner color="primary" size="40px" />
      </div>

      <section
        class="history__no-maintenances"
        v-else-if="!isLoading && isThereNoMaintenances"
      >
        <img :src="BrokenCar" alt="" />
        <p>Você ainda não possui manutenções cadastradas!</p>
      </section>

      <HistoryCard
        v-for="history in filteredHistory"
        v-bind="history"
        :key="history.id"
      />
    </main>

    <CBottomSheetList
      type="filter"
      :draggable="true"
      :options="filterOptions"
      v-model="isBottomSheetOpen"
      @filter="onFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from 'vue';
import { useMaintenanceStore } from '@/stores/maintenance';
import { useCarStore } from '@/stores/carStore';
import HistoryCard from './components/HistoryCard.vue';
import CTag from '@/shared/components/CTag.vue';
import CBottomSheetList from '@/shared/components/bottomsheets/CBottomSheetList.vue';
import { BrokenCar } from '@/shared/assets/illustrations';
import { FilterControlsIcon, PageIcon } from '@/shared/assets/icons';
import type { HistoryCardProps } from './types';
import type { ListOption } from '@/shared/types/bottom-sheet';
import { MaintenanceHistoryItem } from '@/shared/types/maintenance';

const maintenanceStore = useMaintenanceStore();
const carStore = useCarStore();

const maintenanceHistory = ref<HistoryCardProps[]>([]);
const isLoading = ref(false);

const isBottomSheetOpen = ref(false);
const appliedFilters = ref<string[]>([]);

const filterOptions = ref<ListOption[]>([
  { label: 'Troca de óleo', selected: false },
  { label: 'Troca de bateria', selected: false },
  { label: 'Troca de filtro de ar', selected: false },
  { label: 'Troca de roda', selected: false },
  { label: 'Filtro de combustível', selected: false },
]);

function onFilter(selectedLabels: string[]) {
  appliedFilters.value = selectedLabels;
  isBottomSheetOpen.value = false;
}

function removeFilter(label: string) {
  appliedFilters.value = appliedFilters.value.filter((f) => f !== label);
  const option = filterOptions.value.find((opt) => opt.label === label);
  if (option) option.selected = false;
}

function mapApiToHistoryCard(
  apiItem: MaintenanceHistoryItem
): HistoryCardProps {
  const formattedValue = apiItem.data.valor
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(apiItem.data.valor))
    : '-';

  let icon: HistoryCardProps['maintenances'][number]['icon'] = 'oil';
  switch (apiItem.type) {
    case 'Oil Change':
      icon = 'oil';
      break;
    case 'Air Filter Change':
      icon = 'airFilter';
      break;
    case 'Battery Change':
      icon = 'battery';
      break;
    case 'Wheel Change':
      icon = 'wheel';
      break;
    case 'Fuel Filter Change':
      icon = 'fuelFilter';
      break;
  }

  const dateObj = apiItem.data.lastMaintenanceDate
    ? new Date(apiItem.data.lastMaintenanceDate)
    : null;
  const month = dateObj?.toLocaleString('pt-BR', { month: 'long' }) || '';
  const date =
    dateObj?.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) || '-';

  return {
    id: apiItem.data.id,
    month,
    date,
    km: apiItem.data.lastMaintenanceKm?.toString() || '-',
    maintenances: [{ icon, title: apiItem.type, description: formattedValue }],
  };
}

const filterMap: Record<string, string[]> = {
  'Troca de óleo': ['oil'],
  'Troca de bateria': ['battery'],
  'Troca de filtro de ar': ['air-filter'],
  'Troca de roda': ['wheel'],
  'Filtro de combustível': ['fuel-filter'],
};

function mapFilterLabelsToApiTypes(labels: string[]): string[] {
  return labels.flatMap((label) => filterMap[label] || []);
}

const filteredHistory = computed(() => maintenanceHistory.value);

watchEffect(async () => {
  const plate = carStore.firstLicensePlate;
  if (!plate) return;

  isLoading.value = true;

  const typesForApi = appliedFilters.value.length
    ? mapFilterLabelsToApiTypes(appliedFilters.value)
    : undefined;

  await maintenanceStore.getMaintenanceHistoryFiltered({
    licensePlate: plate,
    maintenanceTypes: typesForApi,
  });

  const grouped = new Map<string, HistoryCardProps>();
  for (const item of maintenanceStore.history) {
    const card = mapApiToHistoryCard(item);
    if (!card.month) continue;

    const existing = grouped.get(card.month);
    if (existing) existing.maintenances.push(...card.maintenances);
    else grouped.set(card.month, { ...card });
  }

  maintenanceHistory.value = Array.from(grouped.values());
  isLoading.value = false;
});

const isThereNoMaintenances = computed(
  () => maintenanceHistory.value.length === 0
);

onMounted(async () => {
  await carStore.getCars();
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
    margin: 0;
  }

  &__settings {
    background: none;
    border: none;
    padding: 0;
    height: 20px;
  }

  &__main {
    display: grid;
    gap: 1.5rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 1rem;
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
