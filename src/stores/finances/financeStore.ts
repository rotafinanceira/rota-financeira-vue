/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { FinanceSummary, Checkin } from '@/shared/types/finance';

export const useFinanceStore = defineStore('finance', () => {
  const summary = ref<FinanceSummary>({
    recommendedDailyValue: 20,
    maintenanceReserve: 200,
    lastWeekProgress: 100,
  });

  const checkins = ref<Checkin[]>([
    { date: '2026-01-01', completed: true },
    { date: '2026-01-02', completed: true },
    { date: '2026-01-03', completed: false },
    { date: '2026-01-04', completed: false },
    { date: '2026-01-05', completed: true },
  ]);

  const isLoading = ref(false);
  const error = ref<any | null>(null);

  const checkinStatus = computed<(boolean | null)[]>(() => {
    const DAYS_IN_WEEK = 7;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    const dayOfWeek = startOfWeek.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const checkinMap = new Map(
      checkins.value.map((c) => [c.date, c.completed])
    );

    return Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);
      day.setHours(0, 0, 0, 0);

      const dateKey = day.toISOString().slice(0, 10);

      const isToday = day.getTime() === today.getTime();

      if (day > today) {
        return null;
      }

      if (isToday) {
        return checkinMap.has(dateKey) ? checkinMap.get(dateKey)! : null;
      }

      if (checkinMap.has(dateKey)) {
        return checkinMap.get(dateKey)!;
      }

      return false;
    });
  });

  const totalSaved = computed(() => summary.value.maintenanceReserve);

  async function updateMaintenanceReserve(value: number) {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      summary.value.maintenanceReserve = value;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function storeMoney(value: number) {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      summary.value.maintenanceReserve += value;

      checkins.value.push({
        date: new Date().toISOString().slice(0, 10),
        completed: true,
      });
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    summary,
    checkins,
    isLoading,
    error,

    checkinStatus,
    totalSaved,

    updateMaintenanceReserve,
    storeMoney,
  };
});
