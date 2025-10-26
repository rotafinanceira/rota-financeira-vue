import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/boot/axios';
import { useCarStore } from './carStore';
import { AxiosError } from 'axios';
import type { FuelFilterMaintenance } from '@/shared/types/fuel-filter-maintenance';

const baseApi = import.meta.env.VITE_ROTA_API;

export const useFuelFilterStore = defineStore('fuel-filter', () => {
  const date = ref('');
  const mileage = ref('');
  const filterModel = ref('');
  const brand = ref('');
  const carId = ref<number | null>(null);
  const isLoading = ref(false);
  const maintenances = ref<FuelFilterMaintenance[]>([]);
  const selectedMaintenance = ref<FuelFilterMaintenance | null>(null);
  const nextMaintenanceKm = ref<number | null>(null);
  const isOverdue = ref(false);

  const isEditing = computed(() => !!selectedMaintenance.value);
  const getEditingId = computed(() => selectedMaintenance.value?.id);

  function resetStore() {
    date.value = '';
    mileage.value = '';
    filterModel.value = '';
    brand.value = '';
    carId.value = null;
    isLoading.value = false;
    maintenances.value = [];
    selectedMaintenance.value = null;
    nextMaintenanceKm.value = null;
    isOverdue.value = false;
  }

  function setSelectedMaintenance(maintenance: FuelFilterMaintenance | null) {
    selectedMaintenance.value = maintenance;
  }

  async function getFuelFilterMaintenances(licensePlate: string) {
    isLoading.value = true;
    try {
      const url = `${baseApi}/v1/maintenance/fuel-filter/${licensePlate}`;
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

  async function saveFuelFilterMaintenance(
    payload: {
      lastMaintenanceDate: string;
      lastMaintenanceKm: number;
      filterType: string;
      valor: number;
      filterBrand: string;
    },
    maintenanceId?: string
  ) {
    isLoading.value = true;
    try {
      const carStore = useCarStore();
      const licensePlate =
        carStore.car?.license_plate || carStore.firstLicensePlate;
      console.log(payload);

      if (!licensePlate) throw new Error('Nenhum carro selecionado.');

      if (selectedMaintenance.value && maintenanceId) {
        const url = `${baseApi}/v1/maintenance/fuel-filter/update/${maintenanceId}`;
        const { data } = await api().patch(url, payload);
        return data;
      } else {
        /*    const lastMaintenance = maintenances.value.at(-1);

        if (lastMaintenance) {
          const patchUrl = `${baseApi}/v1/maintenance/fuel-filter/${licensePlate}`;
          await api()
            .patch(patchUrl, { status: 'COMPLETED' })
            .catch(console.warn);
        } */

        const postUrl = `${baseApi}/v1/maintenance/fuel-filter/${licensePlate}`;
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
    filterModel,
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
    getFuelFilterMaintenances,
    saveFuelFilterMaintenance,
  };
});
