<script setup lang="ts">
import maintenance from '@/assets/maintenance';

export type MaintenanceItemProps = {
  icon: keyof typeof maintenance;
  title: string;
  variant?: 'card' | 'simple';
};

withDefaults(defineProps<MaintenanceItemProps>(), {
  variant: 'simple'
});
</script>

<template>
  <!-- FIXME: A depender da ação que ocorrerá, há de se decidir se deve ser um button ou a -->
  <div :class="['maintenances__item', {
    'is-card': variant === 'card'
  }]">
    <div class="item__wrapper">
      <img :src="maintenance[icon]" alt="" class="item__icon" />
    </div>
    <p class="item__text">{{ title }}</p>
  </div>
</template>

<style scoped lang="scss">
.maintenances__item {
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
}

.is-card {
  background-color: #fff;
  padding: .625rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.145);

  .item__text {
    color: #33373C;
    font-family: "Inter";
  }
}
</style>
