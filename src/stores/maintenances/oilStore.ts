import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createMaintenanceBase } from './baseMaintenanceStore';
import type {
  OilMaintenance,
  OilPayload,
  OilServiceType,
  OilType,
} from '@/shared/types/oil-maintenance';

export const useOilStore = defineStore('oil', () => {
  const base = createMaintenanceBase<OilMaintenance, OilPayload>({
    type: 'oil',
  });

  const oilType = ref<OilType | ''>('');
  const serviceType = ref<OilServiceType | ''>('');

  function resetStore() {
    base.resetBaseState();
    oilType.value = '';
    serviceType.value = '';
  }

  return {
    ...base,
    oilType,
    serviceType,
    resetStore,
  };
});
