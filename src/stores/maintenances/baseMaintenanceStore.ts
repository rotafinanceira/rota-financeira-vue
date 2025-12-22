/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed } from 'vue';
import { api } from '@/boot/axios';
import { AxiosError } from 'axios';
import { useCarStore } from '../carStore';

const baseApi = import.meta.env.VITE_ROTA_API;

export function createMaintenanceBase<TMaintenance, TPayload>(options: {
  type: string;
}) {
  const carStore = useCarStore();
  const date = ref<string>('');
  const mileage = ref<string>('');
  const isLoading = ref<boolean>(false);
  const oficina = ref<string>('');

  const maintenances = ref<TMaintenance[]>([]);
  const selectedMaintenance = ref<TMaintenance | null>(null);

  const isOverdue = computed<boolean>(() => {
    console.log(lastMaintenance.value);
    if (!lastMaintenance.value) return false;

    if ((lastMaintenance.value as any)?.status === 'EXPIRED') {
      return true;
    }

    console.log(nextMaintenanceKm.value);

    return false;
  });

  const isEditing = computed(() => !!selectedMaintenance.value);
  const getEditingId = computed(() => selectedMaintenance.value?.id);

  function resetBaseState() {
    date.value = '';
    mileage.value = '';
    isLoading.value = false;
    oficina.value = '';
    maintenances.value = [];
    selectedMaintenance.value = null;
  }

  function setSelectedMaintenance(m: TMaintenance | null) {
    selectedMaintenance.value = m;
  }

  const nextPlannedKm = computed<number | null>(() => {
    return lastMaintenance.value?.nextMaintenanceMileage
      ? Number(lastMaintenance.value.nextMaintenanceMileage)
      : null;
  });

  const currentCarMileage = computed<number | null>(() => {
    return carStore.car?.current_mileage ?? null;
  });

  const nextMaintenanceKm = computed<number | null>(() => {
    if (nextPlannedKm.value === null || currentCarMileage.value === null) {
      return null;
    }

    return nextPlannedKm.value - currentCarMileage.value;
  });

  const lastMaintenance = computed<any | null>(() => {
    if (!maintenances.value.length) return null;

    return [...maintenances.value].sort(
      (a: any, b: any) =>
        new Date(b.lastMaintenanceDate).getTime() -
        new Date(a.lastMaintenanceDate).getTime()
    )[0];
  });

  async function getMaintenances(licensePlate: string) {
    isLoading.value = true;
    try {
      const url = `${baseApi}/v1/maintenance/${options.type}/${licensePlate}`;
      const { data } = await api().get(url);

      maintenances.value = Array.isArray(data) ? (data as TMaintenance[]) : [];

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

      if (!licensePlate) {
        throw new Error('Nenhum carro selecionado.');
      }

      if (maintenanceId) {
        const url = `${baseApi}/v1/maintenance/${options.type}/update/${maintenanceId}`;
        await api().patch(url, payload);
      } else {
        const last = maintenances.value.at(-1);

        if (last) {
          const patchUrl = `${baseApi}/v1/maintenance/${options.type}/${licensePlate}`;
          await api().patch(patchUrl, { status: 'COMPLETED' });
        }

        const postUrl = `${baseApi}/v1/maintenance/${options.type}/${licensePlate}`;
        await api().post(postUrl, payload);
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
