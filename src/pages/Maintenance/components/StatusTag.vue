<script setup lang="ts">
import { MaintenanceStatus } from '@/pages/Maintenance/types';

// FIXME: Valores não devem ser opcionais ao integrar o backend
export type MaintenanceData = {
  date?: Date | null;
  status?: MaintenanceStatus;
  pendingSteps?: number;
};

defineProps<
  MaintenanceData & {
    pending?: boolean;
    expired?: boolean;
  }
>();
</script>

<template>
  <div
    :class="[
      'badge',
      {
        'is-pending': status === 'pending',
        'is-expired': status === 'expired',
      },
    ]"
  >
    <!-- Neutral -->
    <p class="badge__text" v-if="status === 'unregistered'">Sem pendências</p>
    <p class="badge__text" v-if="status === 'pending'">Preencher 3 etapas</p>
    <p class="badge__text" v-if="status === 'expired'">Vencido há 3 meses</p>
  </div>
</template>

<style scoped lang="scss">
.badge {
  color: #5b6871;
  background-color: #eff3f5;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;

  &__text {
    color: inherit;
    font-size: 0.75rem;
    font-weight: 500;
  }

  &.is-pending {
    color: #753d0a;
    background-color: #fef5d6;
  }

  &.is-expired {
    color: #931a36;
    background-color: #ffe9dc;
  }
}
</style>
