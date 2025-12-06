import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createMaintenanceBase } from './baseMaintenanceStore';
import type { BatteryMaintenance } from '@/shared/types/battery-maintenance';
import type { BatteryPayload } from '@/shared/types/battery-maintenance';

export const useBatteryStore = defineStore('battery', () => {
  const base = createMaintenanceBase<BatteryMaintenance, BatteryPayload>({
    type: 'battery',
  });

  const capacity = ref<string>('');
  const brand = ref<string>('');

  function resetStore() {
    base.resetBaseState();
    capacity.value = '';
    brand.value = '';
  }

  return {
    ...base,
    capacity,
    brand,
    resetStore,
  };
});
