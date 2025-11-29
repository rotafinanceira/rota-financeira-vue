/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/boot/axios';
import { AxiosError } from 'axios';
import { MaintenanceStatus, MaintenanceTag } from '@/pages/Maintenances/types';
import { MAINTENANCE_CONFIG } from '@/constants/maintenances';
import type { MaintenanceIcons } from '@/shared/types/maintenance';
import { ListOption } from '@/shared/types/bottom-sheet';

const baseApi = import.meta.env.VITE_ROTA_API;

function getConfig(type?: string) {
  return MAINTENANCE_CONFIG[type as keyof typeof MAINTENANCE_CONFIG];
}

export const useMaintenanceStore = defineStore('maintenance', () => {
  const history = ref<MaintenanceStatus[]>([]);
  const maintenances = ref<MaintenanceStatus[]>([]);
  const isLoading = ref(false);

  const appliedFilters = ref<string[]>([]);
  const filterOptions = ref<ListOption[]>([
    { label: 'Manutenções vencidas', selected: false },
    { label: 'Próximas manutenções', selected: false },
    { label: 'Preencher etapas', selected: false },
    { label: 'Manutenções sem cadastro', selected: false },
  ]);

  function setFilters(filters: string[]) {
    appliedFilters.value = filters;
    filterOptions.value.forEach((opt) => {
      opt.selected = filters.includes(opt.label);
    });
  }

  function clearFilters() {
    appliedFilters.value = [];
    filterOptions.value.forEach((opt) => (opt.selected = false));
  }

  function resolveTags(m: MaintenanceStatus): MaintenanceTag[] {
    const tags: MaintenanceTag[] = [];
    const status = (m.data?.status ?? '').toString().toUpperCase();

    if (!status || status === 'UNREGISTERED') return [];

    if (status === 'EXPIRED') tags.push('EXPIRED');

    const hasToFill =
      (m.data?.pendingSteps && m.data.pendingSteps > 0) ||
      (m.pendingRegistration && m.pendingRegistration > 0);

    if (hasToFill) tags.push('TO_FILL');

    if (status === 'PENDING') tags.push('PENDING');

    return tags;
  }

  async function getMaintenances(licensePlate: string) {
    isLoading.value = true;

    try {
      const url = `${baseApi}/v1/maintenance/${licensePlate}/latest`;
      const { data } = await api().get(url);

      const items = Array.isArray(data) ? data : [data];

      maintenances.value = items.map((raw: any) => {
        const mData = raw.data || {};

        const pendingSteps =
          typeof raw.pendingSteps === 'number'
            ? raw.pendingSteps
            : typeof raw['pending-registration'] === 'number'
            ? raw['pending-registration']
            : mData.pendingSteps ?? 0;

        const pendingRegistration =
          typeof raw['pending-registration'] === 'number'
            ? raw['pending-registration']
            : 0;

        const normalized: MaintenanceStatus = {
          ...raw,
          data: {
            ...mData,
            pendingSteps,
            date: mData.date ?? mData.createdAt ?? mData.updatedAt ?? undefined,
            status: mData.status ?? 'UNREGISTERED',
            nextDueDate: mData.nextDueDate,
            completedAt: mData.completedAt ?? null,
          },
          pendingRegistration,
          tags: [],
          tagInfo: [],
        };

        normalized.tags = resolveTags(normalized);
        normalized.tagInfo = resolveMaintenanceTags(normalized);

        return normalized;
      });

      return maintenances.value;
    } catch (err) {
      const error = err as AxiosError;
      console.error(
        'Erro ao buscar manutenções:',
        error.response?.status ?? '',
        error.response?.data ?? error.message
      );
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

    return {
      hasMaintenances,
      expired: expired.slice(0, 1),
      pending: pending.slice(0, 1),
      expiredCount: expired.length,
      pendingCount: pending.length,
    };
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
      console.error(
        'Erro ao buscar histórico:',
        error.response?.status ?? '',
        error.response?.data ?? error.message
      );
    } finally {
      isLoading.value = false;
    }
  }

  function addDuration(
    date: Date,
    duration?: { years?: number; months?: number }
  ) {
    const newDate = new Date(date);
    if (!duration) return newDate;

    if (duration.years)
      newDate.setFullYear(newDate.getFullYear() + duration.years);

    if (duration.months) newDate.setMonth(newDate.getMonth() + duration.months);

    return newDate;
  }

  function mapToCardMaintenances(list: MaintenanceStatus[]) {
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;

    const formatter = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return list.map((m) => {
      const cfg = getConfig(m.type);
      const icon = cfg?.icon ?? 'wheel';
      const validity = cfg?.duration;

      const maintenanceDate = m.data?.date ? new Date(m.data.date) : null;
      const status = (m.data?.status ?? '').toString().toUpperCase();

      let description = 'status desconhecido';

      if (!maintenanceDate) {
        description = 'data não informada';
      } else {
        const expireDate = addDuration(maintenanceDate, validity);
        const daysDiff = Math.ceil(
          (expireDate.getTime() - now.getTime()) / msPerDay
        );

        if (status === 'EXPIRED') {
          const formatted = formatter
            .format(expireDate)
            .replace('-feira', '')
            .replace(/\b\w/, (c) => c.toLowerCase())
            .trim();

          description = `Venceu ${formatted}`;
        } else if (status === 'PENDING' && daysDiff <= 5) {
          description = `Vence em ${daysDiff} dia${daysDiff !== 1 ? 's' : ''}`;
        } else {
          description = '';
        }
      }

      return {
        icon,
        title: cfg?.label ?? m.type,
        description,
      };
    }) as {
      icon: keyof MaintenanceIcons;
      title: string;
      description: string;
    }[];
  }

  function resolveMaintenanceTags(m: MaintenanceStatus) {
    const tags = m.tags ?? [];
    const tagInfos: {
      key: MaintenanceTag;
      text: string;
      variant: 'default' | 'alert' | 'error';
    }[] = [];

    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;

    const cfg = getConfig(m.type);
    const validity = cfg?.duration;

    const pendingSteps = m.data?.pendingSteps ?? 0;

    const expireDate = addDuration(new Date(m.data.date), validity);

    const diff = Math.ceil((expireDate.getTime() - now.getTime()) / msPerDay);

    tags.forEach((tag) => {
      if (tag === 'TO_FILL' && pendingSteps > 0) {
        tagInfos.push({
          key: 'TO_FILL',
          text: `Preencher ${pendingSteps} etapa${pendingSteps > 1 ? 's' : ''}`,
          variant: 'alert',
        });
      }

      if (tag === 'EXPIRED') {
        const formatter = new Intl.DateTimeFormat('pt-BR', {
          day: 'numeric',
          month: 'short',
        });

        tagInfos.push({
          key: 'EXPIRED',
          text: `Venceu ${formatter.format(expireDate)}`,
          variant: 'error',
        });
      }

      if (tag === 'PENDING') {
        if (diff > 0 && diff <= 5) {
          tagInfos.push({
            key: 'PENDING',
            text: `Vence em ${diff} dia${diff > 1 ? 's' : ''}`,
            variant: 'default',
          });
        }
      }

      if (tag === 'PENDING' && pendingSteps === 0) {
        if (diff > 5) {
          tagInfos.push({
            key: 'PENDING',
            text: 'Sem pendências',
            variant: 'default',
          });
        }
      }
    });

    return tagInfos;
  }

  return {
    history,
    maintenances,
    isLoading,

    getMaintenances,
    getMaintenanceHistory,
    getMaintenanceSummary,
    mapToCardMaintenances,

    appliedFilters,
    filterOptions,
    setFilters,
    clearFilters,
  };
});
