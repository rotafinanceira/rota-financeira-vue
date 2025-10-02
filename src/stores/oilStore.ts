/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { api } from '@/boot/axios';
import { useCarStore } from './carStore';

const baseApi = import.meta.env.VITE_ROTA_API;

interface OilState {
  date: string;
  mileage: string;
  oilType: string;
  liters: string;
  oilBrand: string;
  carId: number | null;
  isLoading: boolean;
}

export const useOilStore = defineStore('oil', {
  state: (): OilState => ({
    date: '',
    mileage: '',
    oilType: '',
    liters: '',
    oilBrand: '',
    carId: null,
    isLoading: false,
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
      } catch (error: any) {
        throw (
          error.response?.data?.message || error.message || 'Erro desconhecido'
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
});
