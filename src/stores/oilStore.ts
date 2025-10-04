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

        let url = `${baseApi}/v1/maintenance/oil/${licensePlate}`;
        let method: 'post' | 'patch' = 'post';
        if (maintenanceId) {
          url += `/${maintenanceId}`;
          method = 'patch';
        }

        const { data } = await api()[method](url, payload);

        return data;
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
