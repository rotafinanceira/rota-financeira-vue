import { defineStore } from 'pinia';
import type {
  FuelFilterMaintenance,
  FuelFilterPayload,
} from '@/shared/types/fuel-filter-maintenance';
import { createMaintenanceBase } from './baseMaintenanceStore';

export const useFuelFilterStore = defineStore('fuel-filter', () => {
  const base = createMaintenanceBase<FuelFilterMaintenance, FuelFilterPayload>({
    type: 'fuel-filter',
  });

  function resetStore() {
    base.resetBaseState();
  }

  return {
    ...base,
    resetStore,
  };
});
