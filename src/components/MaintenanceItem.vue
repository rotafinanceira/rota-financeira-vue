<script setup lang="ts">
import { arrowRight } from '@/assets';
import maintenanceIcons from '@/assets/maintenance';

export type MaintenanceItemProps = {
  icon: keyof typeof maintenanceIcons;
  title: string;
  variant?: 'card' | 'simple';
};

withDefaults(defineProps<MaintenanceItemProps>(), {
  variant: 'simple',
});
</script>

<template>
  <!-- FIXME: A depender da ação que ocorrerá, há de se decidir se deve ser um button ou um link -->
  <div
    :class="[
      'maintenances__item',
      {
        'is-card': variant === 'card',
      },
    ]"
  >
    <div class="item__flex">
      <div class="item__wrapper">
        <img :src="maintenanceIcons[icon]" alt="" class="item__icon" />
      </div>
      <p class="item__text">{{ title }}</p>
    </div>
    <img :src="arrowRight" alt="" class="item__arrow" />
  </div>
</template>

<style scoped lang="scss">
.maintenances__item {
  display: flex;
  justify-content: space-between;
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

  &__arrow {
    margin-right: 6px;
  }
}

.is-card {
  background-color: #fff;
  padding: 0.625rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.145);

  .item__text {
    color: #33373c;
    font-family: 'Inter';
  }
}
</style>
