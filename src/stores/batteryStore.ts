import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/boot/axios';
import { useCarStore } from './carStore';
import { AxiosError } from 'axios';
import type { BatteryMaintenance } from '@/shared/types/battery-maintenance';

const baseApi = import.meta.env.VITE_ROTA_API;

export const useBatteryStore = defineStore('battery', () => {
  const date = ref('');
  const mileage = ref('');
  const capacity = ref('');
  const brand = ref('');
  const carId = ref<number | null>(null);
  const isLoading = ref(false);
  const maintenances = ref<BatteryMaintenance[]>([]);
  const selectedMaintenance = ref<BatteryMaintenance | null>(null);
  const nextMaintenanceKm = ref<number | null>(null);
  const isOverdue = ref(false);

  const isEditing = computed(() => !!selectedMaintenance.value);
  const getEditingId = computed(() => selectedMaintenance.value?.id);

  function resetStore() {
    date.value = '';
    mileage.value = '';
    capacity.value = '';
    brand.value = '';
    carId.value = null;
    isLoading.value = false;
    maintenances.value = [];
    selectedMaintenance.value = null;
    nextMaintenanceKm.value = null;
    isOverdue.value = false;
  }

  function setSelectedMaintenance(maintenance: BatteryMaintenance | null) {
    selectedMaintenance.value = maintenance;
  }

  async function getBatteryMaintenances(licensePlate: string) {
    isLoading.value = true;
    try {
      const url = `${baseApi}/v1/maintenance/battery/${licensePlate}`;
      const { data } = await api().get(url);

      maintenances.value = Array.isArray(data) ? data : [];

      const last = maintenances.value.at(-1);
      nextMaintenanceKm.value =
        Number(last?.nextMaintenanceMileage) -
          Number(last?.lastMaintenanceKm) || null;
      isOverdue.value = last?.status === 'EXPIRED';

      return maintenances.value;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        console.error(
          'Erro na API:',
          error.response.status,
          error.response.data
        );
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function saveBatteryMaintenance(
    payload: {
      lastMaintenanceDate: string;
      lastMaintenanceKm: number;
      remainingCapacity: number;
      valor: number;
      batteryBrand: string;
    },
    maintenanceId?: string
  ) {
    isLoading.value = true;
    try {
      const carStore = useCarStore();
      const licensePlate =
        carStore.car?.license_plate || carStore.firstLicensePlate;
      if (!licensePlate) throw new Error('Nenhum carro selecionado.');

      if (selectedMaintenance.value && maintenanceId) {
        const url = `${baseApi}/v1/maintenance/battery/update/${maintenanceId}`;
        const { data } = await api().patch(url, payload);
        return data;
      } else {
        const lastMaintenance = maintenances.value.at(-1);

        if (lastMaintenance) {
          const patchUrl = `${baseApi}/v1/maintenance/battery/${licensePlate}`;
          await api()
            .patch(patchUrl, { status: 'COMPLETED' })
            .catch(console.warn);
        }

        const postUrl = `${baseApi}/v1/maintenance/battery/${licensePlate}`;
        const { data } = await api().post(postUrl, payload);
        return data;
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    date,
    mileage,
    capacity,
    brand,
    carId,
    isLoading,
    maintenances,
    selectedMaintenance,
    nextMaintenanceKm,
    isOverdue,

    isEditing,
    getEditingId,

    resetStore,
    setSelectedMaintenance,
    getBatteryMaintenances,
    saveBatteryMaintenance,
  };
});
