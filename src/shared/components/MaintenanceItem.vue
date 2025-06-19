<script setup lang="ts">
import {
  AirFilterIcon,
  BatteryIcon,
  ChartIcon,
  EngineIcon,
  FuelFilterIcon,
  OilIcon,
  WheelIcon,
} from '@/shared/assets/icons';
import { MaintenanceItemProps } from '../types/maintenance';
import { MaintenanceIcons } from '@/shared/types/maintenance';
import { LineVertical } from '../assets/decorations';

const maintenanceIcons: MaintenanceIcons = {
  wheel: WheelIcon,
  oil: OilIcon,
  battery: BatteryIcon,
  engine: EngineIcon,
  fuelFilter: FuelFilterIcon,
  airFilter: AirFilterIcon,
  fluidLevel: ChartIcon,
};

defineProps<MaintenanceItemProps>();
</script>

<template>
  <!-- FIXME: A depender da ação que ocorrerá, há de se decidir se deve ser um button ou um link -->
  <div class="maintenance__item">
    <img :src="maintenanceIcons[icon]" alt="" class="item__icon" />
    <img :src="LineVertical" alt="">
    <div class="item__content">
      <p class="item__text">{{ title }}</p>
      <p v-if="description" class="item__description">{{ description }}</p>
    </div>
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
    color: #0C0D0F;
  }

  &__flex {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>
