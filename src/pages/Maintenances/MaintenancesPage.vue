<template>
  <div class="maintenance">
    <div class="app-wrapper maintenance__wrapper">
      <div
        v-if="showExpiredCard && expiredMaintenances.length"
        class="expired-card"
        role="alert"
      >
        <div class="expired-card__container">
          <img :src="BrokenCarIcon" />
          <h2 class="expired-card__title">Manutenção vencida!</h2>
          <span class="expired-card__text">
            É hora de realizar a revisão de bateria do seu veículo.
          </span>
        </div>

        <button
          class="expired-card__close"
          type="button"
          @click="showExpiredCard = false"
        >
          <img :src="XCircleIcon" alt="Fechar" />
        </button>
      </div>

      <header class="maintenance__header">
        <div class="flex">
          <img :src="CarWrenchIcon" alt="" />
          <h1 class="maintenance__title">Manutenções</h1>
        </div>
        <button
          class="maintenance__settings"
          type="button"
          @click="isBottomSheetOpen = true"
        >
          <img :src="FilterControlsIcon" alt="filter icon" />
        </button>
      </header>

      <div class="maintenance__tags" v-if="appliedFilters.length">
        <CTag
          v-for="filter in appliedFilters"
          :key="filter"
          :title="filter"
          removable
          variant="default"
          @remove="removeFilter"
        />
      </div>

      <MaintenanceCard
        v-for="item in maintenanceItems"
        v-bind="item"
        :key="item.title"
      />
    </div>
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
import { ref, watch, computed, onMounted } from 'vue';
import { CarWrenchIcon, FilterControlsIcon } from '@/shared/assets/icons';
import { useMaintenanceStore } from '@/stores/maintenance';
import { storeToRefs } from 'pinia';
import { useCarStore } from '@/stores/carStore';
import { MaintenanceIcons } from '@/shared/types/maintenance';
import CBottomSheetList from '@/shared/components/bottomsheets/CBottomSheetList.vue';

import MaintenanceCard from './components/MaintenanceCard.vue';
import { MaintenanceState } from './types';
import { ListOption } from '@/shared/types/bottom-sheet';
import CTag from '@/shared/components/CTag.vue';
import { BrokenCarIcon } from '@/shared/assets/illustrations';
import { XCircleIcon } from '@/shared/assets/icons';

import { useRoute } from 'vue-router';

const route = useRoute();

const filterOptions = ref<ListOption[]>([
  { label: 'Manutenções vencidas', selected: false },
  { label: 'Próximas manutenções', selected: false },
  { label: 'Preencher etapas', selected: false },
  { label: 'Manutenções sem cadastro', selected: false },
]);

const isBottomSheetOpen = ref(false);
const showExpiredCard = ref(false);

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

const appliedFilters = ref<string[]>([]);

onMounted(async () => {
  await carStore.getCars();
  if (carStore.firstLicensePlate) {
    await maintenanceStore.getMaintenances(carStore.firstLicensePlate);
  }

  if (expiredMaintenances.value.length) {
    showExpiredCard.value = true;
  }

  if (route.query.filter === 'expired') {
    appliedFilters.value = ['Manutenções vencidas'];
    const option = filterOptions.value.find(
      (o) => o.label === 'Manutenções vencidas'
    );
    if (option) option.selected = true;
  } else if (route.query.filter === 'pending') {
    appliedFilters.value = ['Próximas manutenções'];
    const option = filterOptions.value.find(
      (o) => o.label === 'Próximas manutenções'
    );
    if (option) option.selected = true;
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

const filteredMaintenances = computed(() => {
  if (appliedFilters.value.length === 0) return maintenances.value;

  return maintenances.value.filter((m) => {
    const tags = Array.isArray(m.tags) ? m.tags : [];

    const matchExpired =
      appliedFilters.value.includes('Manutenções vencidas') &&
      tags.includes('EXPIRED');
    const matchPending =
      appliedFilters.value.includes('Próximas manutenções') &&
      tags.includes('PENDING');
    const matchToFill =
      appliedFilters.value.includes('Preencher etapas') &&
      tags.includes('TO_FILL');
    const matchUnregistered =
      appliedFilters.value.includes('Manutenções sem cadastro') &&
      m.data?.status === 'Unregistered';

    return matchExpired || matchPending || matchToFill || matchUnregistered;
  });
});

const maintenanceItems = computed(() => {
  return filteredMaintenances.value.map((m) => {
    const status: MaintenanceState =
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
      tags: m.tags || [],
    };
  });
});

const expiredMaintenances = computed(() =>
  maintenances.value.filter(
    (m) => Array.isArray(m.tags) && m.tags.includes('EXPIRED')
  )
);

const onFilter = (selectedLabels: string[]) => {
  appliedFilters.value = selectedLabels;
  isBottomSheetOpen.value = false;
};

const removeFilter = (label: string) => {
  const index = appliedFilters.value.findIndex((f) => f === label);
  if (index === -1) return;

  appliedFilters.value.splice(index, 1);

  const option = filterOptions.value.find((opt) => opt.label === label);
  if (option) option.selected = false;
};

watch(isBottomSheetOpen, (open) => {
  if (!open) {
    const selectedLabels = filterOptions.value
      .filter((opt) => opt.selected)
      .map((opt) => opt.label);
    appliedFilters.value = selectedLabels;
  }
});
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

.maintenance__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
}

.expired-card {
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e5e7;
  position: relative;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 16px;
  }

  &__title {
    font-weight: 600;
    font-size: 1rem;
  }

  &__text {
    font-size: 0.875rem;
    color: #485159;
  }

  &__close {
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    border: none;
  }
}
</style>
