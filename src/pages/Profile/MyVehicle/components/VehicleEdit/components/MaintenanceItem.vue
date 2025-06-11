<script setup lang="ts">
import maintenanceIcons from '@/assets/maintenance';
import { MaintenanceItemProps } from '../types';



defineProps<MaintenanceItemProps>();
</script>

<template>
  <!-- FIXME: A depender da ação que ocorrerá, há de se decidir se deve ser um button ou um link -->
  <div class="maintenance__item">
    <div class="item__wrapper">
      <img :src="maintenanceIcons[icon]" alt="" class="item__icon" />
    </div>
    <p class="item__text">{{ title }}</p>
  </div>
</template>

<style scoped lang="scss">
.maintenance__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
}

.item {
  &__icon {
    --size: 20px;

    width: var(--size);
    height: var(--size);
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3125rem;
    border-radius: 8px;
    background-color: #eff3f5;
  }

  &__text {
    font-size: 0.875rem;
    font-weight: 500;
    color: #2b5e16;
  }

  &__flex {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>
