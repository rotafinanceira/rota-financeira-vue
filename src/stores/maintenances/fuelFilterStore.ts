import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
  FuelFilterMaintenance,
  FuelFilterPayload,
} from '@/shared/types/fuel-filter-maintenance';
import { createMaintenanceBase } from './baseMaintenanceStore';

export const useFuelFilterStore = defineStore('fuel-filter', () => {
  const base = createMaintenanceBase<FuelFilterMaintenance, FuelFilterPayload>({
    type: 'fuel-filter',
  });

  const oficina = ref<string>('');

  function resetStore() {
    base.resetBaseState();
    oficina.value = '';
  }

  return {
    ...base,
    oficina,
    resetStore,
  };
});
