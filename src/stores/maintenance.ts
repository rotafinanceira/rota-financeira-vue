/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/boot/axios';
import { AxiosError } from 'axios';
import { MaintenanceStatus } from '@/pages/Maintenances/types';

const baseApi = import.meta.env.VITE_ROTA_API;

export const useMaintenanceStore = defineStore('maintenance', () => {
  const history = ref<MaintenanceStatus[]>([]);
  const maintenances = ref<MaintenanceStatus[]>([]);
  const isLoading = ref(false);

  async function getMaintenances(licensePlate: string) {
    console.log('test');
    isLoading.value = true;
    try {
      const url = `${baseApi}/v1/maintenance/${licensePlate}/latest`;
      const { data } = await api().get(url);
      console.log('API response:', data);

      maintenances.value = Array.isArray(data) ? data : [data];

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

  async function getMaintenanceHistory(licensePlate: string, types?: string[]) {
    isLoading.value = true;
    try {
      const query = types?.length
        ? `?types=${encodeURIComponent(types.join(','))}`
        : '';
      const url = `${baseApi}/v1/maintenance/history/${licensePlate}${query}`;
      const { data } = await api().get(url);
      history.value = Array.isArray(data) ? data : [];
      return history.value;
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

  return {
    history,
    maintenances,
    isLoading,
    getMaintenances,
    getMaintenanceHistory,
  };
});
