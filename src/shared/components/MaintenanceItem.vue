<script setup lang="ts">
import {
  AirFilterIcon,
  ArrowIcon,
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
  <div class="flex">
    <div class="maintenance__item">
      <img :src="maintenanceIcons[icon]" alt="" class="item__icon" />
      <img :src="LineVertical" alt="" />
      <div class="item__content">
        <p class="item__title">{{ title }}</p>
        <p v-if="description" class="item__description">{{ description }}</p>
      </div>
    </div>
    <img v-if="hasArrow" class="item__arrow" :src="ArrowIcon" alt="">
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

  &__title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #0c0d0f;
  }

  &__flex {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__description {
    color: #485159;
    font-size: .75rem;
  }

  &__arrow {
    --size: 20px;
    width: var(--size);
    height: var(--size);
    transform: rotate(90deg);
  }
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
