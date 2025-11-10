/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/boot/axios';
import { AxiosError } from 'axios';
import { MaintenanceStatus, MaintenanceTag } from '@/pages/Maintenances/types';

const baseApi = import.meta.env.VITE_ROTA_API;

export const useMaintenanceStore = defineStore('maintenance', () => {
  const history = ref<MaintenanceStatus[]>([]);
  const maintenances = ref<MaintenanceStatus[]>([]);
  const isLoading = ref(false);

  function resolveTags(m: MaintenanceStatus): MaintenanceTag[] {
    const tags: MaintenanceTag[] = [];
    const status = (m.data?.status ?? '').toString().toUpperCase();

    if (!status || status === 'UNREGISTERED') return [];

    if (status === 'EXPIRED') tags.push('EXPIRED');
    if (status === 'PENDING') tags.push('PENDING');

    const hasToFill =
      (m.data?.pendingSteps && m.data.pendingSteps > 0) ||
      (m.pendingRegistration && m.pendingRegistration > 0);

    if (hasToFill) tags.push('TO_FILL');

    if (tags.length === 0) tags.push('PENDING');

    return tags;
  }

  async function getMaintenances(licensePlate: string) {
    isLoading.value = true;
    try {
      const url = `${baseApi}/v1/maintenance/${licensePlate}/latest`;
      const { data } = await api().get(url);

      const items = Array.isArray(data) ? data : [data];

      maintenances.value = items.map((raw: any) => {
        const data = raw.data || {};

        const pendingSteps =
          typeof raw.pendingSteps === 'number'
            ? raw.pendingSteps
            : typeof raw['pending-registration'] === 'number'
            ? raw['pending-registration']
            : 0;

        const pendingRegistration =
          typeof raw['pending-registration'] === 'number'
            ? raw['pending-registration']
            : 0;

        const normalized: MaintenanceStatus = {
          ...raw,
          data: {
            ...data,
            pendingSteps,
            date: data.date ?? data.createdAt ?? data.updatedAt ?? undefined,
            status: data.status ?? 'Unregistered',
            nextDueDate: data.nextDueDate,
            completedAt: data.completedAt ?? null,
          },
          pendingRegistration,
          tag: 'PENDING',
        } as MaintenanceStatus;

        normalized.tags = resolveTags(normalized);
        return normalized;
      });

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

  async function getMaintenanceSummary(licensePlate: string) {
    await getMaintenances(licensePlate);

    const all = maintenances.value || [];

    const hasMaintenances = all.some(
      (m) => (m.data?.status ?? '').toString().toUpperCase() !== 'UNREGISTERED'
    );

    const expired = all.filter(
      (m) => (m.data?.status ?? '').toString().toUpperCase() === 'EXPIRED'
    );

    const pending = all.filter(
      (m) => (m.data?.status ?? '').toString().toUpperCase() === 'PENDING'
    );

    const summary = {
      hasMaintenances,
      expired: expired.slice(0, 2),
      pending: pending.slice(0, 2),
      expiredCount: expired.length,
      pendingCount: pending.length,
    };

    return summary;
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
    getMaintenanceSummary,
  };
});
