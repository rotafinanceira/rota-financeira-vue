/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/boot/axios';

const baseApi = import.meta.env.VITE_ROTA_API;

export const useMaintenanceStore = defineStore('maintenance', () => {
  const history = ref<Record<string, any>[]>([]);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  async function getMaintenanceHistory(licensePlate: string, types?: string[]) {
    isLoading.value = true;
    error.value = null;

    try {
      const query = types?.length
        ? `?types=${encodeURIComponent(types.join(','))}`
        : '';
      const url = `${baseApi}/v1/maintenance/history/${licensePlate}${query}`;

      const { data } = await api().get(url);
      history.value = Array.isArray(data) ? data : [];
      return data;
    } catch (e: any) {
      error.value =
        e.response?.data?.message || e.message || 'Erro desconhecido';
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    history,
    error,
    isLoading,
    getMaintenanceHistory,
  };
});
