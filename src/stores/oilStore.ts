import { defineStore } from 'pinia';
import { api } from '@/boot/axios';
import { useCarStore } from './carStore';
import { OilMaintenance, OilState } from '@/shared/types/oil-maintenance';
import { AxiosError } from 'axios';

const baseApi = import.meta.env.VITE_ROTA_API;

export const useOilStore = defineStore('oil', {
  state: (): OilState => ({
    date: '',
    mileage: '',
    oilType: '',
    liters: '',
    oilBrand: '',
    carId: null,
    isLoading: false,
    maintenances: [],
    selectedMaintenance: null,
    nextMaintenanceKm: null,
    isOverdue: false,
  }),

  actions: {
    setDate(date: string) {
      this.date = date;
    },
    setMileage(mileage: string) {
      this.mileage = mileage;
    },
    setOilType(oilType: string) {
      this.oilType = oilType;
    },
    setLiters(liters: string) {
      this.liters = liters;
    },
    setOilBrand(oilBrand: string) {
      this.oilBrand = oilBrand;
    },
    setCarId(carId: number | null) {
      this.carId = carId;
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    resetStore() {
      this.$reset();
    },

    setSelectedMaintenance(maintenance: OilMaintenance | null): void {
      this.selectedMaintenance = maintenance;
    },

    isEditing(): boolean {
      return !!this.selectedMaintenance;
    },

    getEditingId(): string | undefined {
      return this.selectedMaintenance?.id;
    },

    async getOilMaintenances(licensePlate: string) {
      this.isLoading = true;
      try {
        const url = `${baseApi}/v1/maintenance/oil/${licensePlate}`;
        const { data } = await api().get(url);

        this.maintenances = Array.isArray(data) ? data : [];

        const lastMaintenance = this.maintenances.at(-1);
        this.nextMaintenanceKm =
          Number(lastMaintenance?.nextMaintenanceMileage) -
            Number(lastMaintenance?.lastMaintenanceKm) || null;
        this.isOverdue = lastMaintenance?.status === 'EXPIRED';

        return this.maintenances;
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
        this.isLoading = false;
      }
    },

    async saveOilMaintenance(
      payload: {
        lastMaintenanceDate: string;
        lastMaintenanceKm: number;
        oilType: string;
        oilQuantityLt: number;
        oilBrand?: string;
        filterChanged?: boolean;
        valor: number;
        oficina?: string;
      },
      maintenanceId?: string
    ) {
      this.isLoading = true;
      try {
        const carStore = useCarStore();
        const licensePlate =
          carStore.car?.license_plate || carStore.firstLicensePlate;
        if (!licensePlate) throw new Error('Nenhum carro selecionado.');

        if (this.selectedMaintenance && maintenanceId) {
          const url = `${baseApi}/v1/maintenance/oil/${licensePlate}/${maintenanceId}`;
          const { data } = await api().put(url, payload);
          return data;
        } else {
          const lastMaintenance = this.maintenances.at(-1);

          if (lastMaintenance) {
            const patchUrl = `${baseApi}/v1/maintenance/oil/${licensePlate}`;
            try {
              await api().patch(patchUrl, {
                status: 'COMPLETED',
              });
            } catch (patchErr) {
              console.warn(
                'Falha ao marcar última manutenção como completa:',
                patchErr
              );
            }
          }

          const postUrl = `${baseApi}/v1/maintenance/oil/${licensePlate}`;
          const { data } = await api().post(postUrl, payload);

          return data;
        }
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
        this.isLoading = false;
      }
    },
  },
});
