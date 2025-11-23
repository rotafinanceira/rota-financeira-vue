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
  const oficina = ref<string>('');

  function resetStore() {
    base.resetBaseState();
    oilType.value = '';
    serviceType.value = '';
    oficina.value = '';
  }

  return {
    ...base,
    oilType,
    serviceType,
    oficina,
    resetStore,
  };
});
