<script setup lang="ts">
import BaseDivider from '@/shared/components/BaseDivider.vue';
import type { HistoryCardProps } from '../types';
import MaintenanceItem from '@/shared/components/MaintenanceItem.vue';

defineProps<HistoryCardProps>();
</script>

<template>
  <div class="card">
    <h3 class="card__title">{{ month }}</h3>
    <div class="card__info">
      <time class="card__date" datetime="2025-04-14">{{ date }}</time>
      <span class="card__km">{{ km }}km</span>
    </div>
    <BaseDivider class="divider" />
    <div class="card__maintenances">
      <MaintenanceItem v-for="m in maintenances"
        v-bind="m"
        :key="m.icon"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background: #fff;
  padding: 1rem;
  border: 1px solid #e0e5e7;
  border-radius: 8px;

  &__title {
    font-weight: 600;
    margin-bottom: 1em;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__date {
    font-size: 0.75rem;
    color: #485159;
    font-weight: 500;
  }

  &__km {
    color: #307714;
    font-weight: 500;
    font-size: 0.75rem;
  }

  &__maintenances {
    display: grid;
    gap: 1rem;
  }
}

.divider {
  margin-block: 0.5rem 1rem;
}
</style>
