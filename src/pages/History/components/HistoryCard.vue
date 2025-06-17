<script setup lang="ts">
import BaseDivider from '@/shared/components/BaseDivider.vue';
import type { MaintenanceHistory } from '../types';
import MaintenanceItem from '@/shared/components/MaintenanceItem.vue';


defineProps<MaintenanceHistory>();
</script>

<template>
  <div class="card">
    <h3 class="card__title">{{  month }}</h3>
    <div class="card__info">
      <time class="card__date" datetime="2025-04-14">{{ date }}</time>
      <span class="card__km">{{ km }}km</span>
    </div>
    <BaseDivider class="divider" />
    <MaintenanceItem icon="fluidLevel" title="Troca de filtro de combustível" />
  </div>
</template>



<style scoped lang="scss">
.card {
  background: #fff;
  padding: 1rem;
  border: 1px solid #E0E5E7;
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
    font-size: .75rem;
    color: #485159;
    font-weight: 500;
  }

  &__km {
    color: #307714;
    font-weight: 500;
    font-size: .75rem;
  }

}

.divider {
  margin-top: 8px;
}
</style>
