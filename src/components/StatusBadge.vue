<script setup lang="ts">
import { MaintenanceStatus } from '@/pages/Maintenance/types';

// FIXME: Valores não devem ser opcionais ao integrar o backend
export type MaintenanceData = {
    date?: Date | null;
    status?: MaintenanceStatus;
    pendingSteps?: number;
  };

defineProps<MaintenanceData & {
  pending?: boolean;
  expired?: boolean;
}>();
</script>

<template>
  <div :class="['badge', {
    'is-pending': status === 'pending',
    'is-expired': status === 'expired'
  }]">
    <!-- Neutral -->
    <p class="badge__text" v-if="status === 'unregistered'">Sem pendências</p>
    <p class="badge__text" v-if="status === 'pending'">Preencher 3 etapas</p>
    <p class="badge__text" v-if="status === 'expired'">Vencido há 3 meses</p>
  </div>
</template>

<style scoped lang="scss">
.badge {
  font-family: "Inter";
  color: #5B6871;
  background-color: #EFF3F5;
  padding: .25rem .5rem;
  border-radius: .5rem;

  &__text {
    color: inherit;
    font-size: .75rem;
    font-weight: 500;
  }

  &.is-pending {
    color: #753D0A;
    background-color: #FEF5D6;
  }

  &.is-expired {
    color: #931A36;
    background-color: #FFE9DC;
  }
}
</style>
