<script setup lang="ts">
import { arrowRight } from '@/assets';
import maintenanceIcons from '@/assets/maintenance';
import { RouterLink } from 'vue-router';
import { MaintenanceCardProps } from '../types';
import StatusTag from './StatusTag.vue';

defineProps<MaintenanceCardProps>();
</script>

<template>
  <RouterLink to="#" class="maintenance__item">
    <div class="item__flex">
      <div class="item__flex">
        <div class="item__wrapper">
          <img :src="maintenanceIcons[icon]" alt="" class="item__icon" />
        </div>
        <p class="item__text">{{ title }}</p>
      </div>
      <img :src="arrowRight" alt="" class="item__arrow" />
    </div>
    <template v-if="maintenanceData?.status">
      <hr />
      <div class="badges">
        <StatusTag v-bind="maintenanceData" />
      </div>
    </template>
  </RouterLink>
</template>

<style scoped lang="scss">
.maintenance__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  background-color: #fff;
  padding: 0.625rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.145);

  text-decoration: none;
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
    color: #33373c;
    font-size: 0.875rem;
    font-weight: 500;
  }

  &__flex {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.25rem;
  }

  &__arrow {
    margin-right: 6px;
  }
}

hr {
  width: 100%;
  border: none;
  border-top: 1px solid #e0e5e7;
  margin: 0;
}

.badges {
  display: flex;
  gap: 0.625rem;
}
</style>
