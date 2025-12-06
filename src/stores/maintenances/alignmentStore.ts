import { defineStore } from 'pinia';
import { createMaintenanceBase } from './baseMaintenanceStore';
import {
  AlignmentMaintenance,
  AlignmentPayload,
} from '@/shared/types/alignment-maintenance';

export const useAlignmentStore = defineStore('alignment', () => {
  const base = createMaintenanceBase<AlignmentMaintenance, AlignmentPayload>({
    type: 'alignment',
  });

  function resetStore() {
    base.resetBaseState();
  }

  return {
    ...base,
    resetStore,
  };
});
