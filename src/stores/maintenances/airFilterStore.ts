import { defineStore } from 'pinia';
import { createMaintenanceBase } from './baseMaintenanceStore';
import {
  AirFilterMaintenance,
  AirFilterPayload,
} from '@/shared/types/air-filter-maintenance';

export const useAirFilterStore = defineStore('air-filter', () => {
  const base = createMaintenanceBase<AirFilterMaintenance, AirFilterPayload>({
    type: 'air-filter',
  });

  function resetStore() {
    base.resetBaseState();
  }

  return {
    ...base,
    resetStore,
  };
});
