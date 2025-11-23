/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed } from 'vue';
import { api } from '@/boot/axios';
import { AxiosError } from 'axios';
import { useCarStore } from '../carStore';

const baseApi = import.meta.env.VITE_ROTA_API;

export function createMaintenanceBase<TMaintenance, TPayload>(options: {
  type: string;
}) {
  const date = ref<string>('');
  const mileage = ref<string>('');
  const isLoading = ref<boolean>(false);

  const maintenances = ref<TMaintenance[]>([]);
  const selectedMaintenance = ref<TMaintenance | null>(null);

  const nextMaintenanceKm = ref<number | null>(null);
  const isOverdue = ref<boolean>(false);

  const isEditing = computed(() => !!selectedMaintenance.value);
  const getEditingId = computed(() => selectedMaintenance.value?.id);

  function resetBaseState() {
    date.value = '';
    mileage.value = '';
    isLoading.value = false;
    maintenances.value = [];
    selectedMaintenance.value = null;
    nextMaintenanceKm.value = null;
    isOverdue.value = false;
  }

  function setSelectedMaintenance(m: TMaintenance | null) {
    selectedMaintenance.value = m;
  }

  async function getMaintenances(licensePlate: string) {
    isLoading.value = true;
    try {
      const url = `${baseApi}/v1/maintenance/${options.type}/${licensePlate}`;
      const { data } = await api().get(url);

      maintenances.value = Array.isArray(data) ? (data as TMaintenance[]) : [];

      const last = maintenances.value.at(-1);

      nextMaintenanceKm.value =
        Number((last as any)?.nextMaintenanceMileage) -
          Number((last as any)?.lastMaintenanceKm) || null;

      isOverdue.value = (last as any)?.status === 'EXPIRED';

      return maintenances.value;
    } catch (err) {
      const error = err as AxiosError;
      console.error(error.response ?? error);
    } finally {
      isLoading.value = false;
    }
  }

  async function saveMaintenance(payload: TPayload, maintenanceId?: string) {
    isLoading.value = true;
    try {
      const carStore = useCarStore();
      const licensePlate =
        carStore.car?.license_plate || carStore.firstLicensePlate;

      if (!licensePlate) throw new Error('Nenhum carro selecionado.');

      if (selectedMaintenance.value && maintenanceId) {
        const url = `${baseApi}/v1/maintenance/${options.type}/update/${maintenanceId}`;
        const { data } = await api().patch(url, payload);
        return data as TMaintenance;
      } else {
        const last = maintenances.value.at(-1);

        if (last) {
          const patchUrl = `${baseApi}/v1/maintenance/${options.type}/${licensePlate}`;
          await api().patch(patchUrl, { status: 'COMPLETED' }).catch();
        }

        const postUrl = `${baseApi}/v1/maintenance/${options.type}/${licensePlate}`;
        const { data } = await api().post(postUrl, payload);
        return data as TMaintenance;
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    date,
    mileage,
    isLoading,
    maintenances,
    selectedMaintenance,
    nextMaintenanceKm,
    isOverdue,
    isEditing,
    getEditingId,

    resetBaseState,
    setSelectedMaintenance,
    getMaintenances,
    saveMaintenance,
  };
}
