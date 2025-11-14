<script setup lang="ts">
import { ArrowIcon } from '@/shared/assets/icons';
import {
  AirFilterIcon,
  BatteryIcon,
  ChartIcon,
  EngineIcon,
  FuelFilterIcon,
  OilIcon,
  WheelIcon,
} from '@/shared/assets/icons';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { MaintenanceCardProps, MaintenanceTag } from '../types';
import { MaintenanceIcons } from '@/shared/types/maintenance';
import CDivider from '@/shared/components/CDivider.vue';
import CTag from '@/shared/components/CTag.vue';

const maintenanceIcons: MaintenanceIcons = {
  wheel: WheelIcon,
  oil: OilIcon,
  battery: BatteryIcon,
  engine: EngineIcon,
  fuelFilter: FuelFilterIcon,
  airFilter: AirFilterIcon,
  fluidLevel: ChartIcon,
};

const props = defineProps<MaintenanceCardProps>();

const tagVariantMap: Record<
  MaintenanceTag,
  { variant: 'default' | 'alert' | 'error' | 'outline'; text: string }
> = {
  EXPIRED: { variant: 'error', text: 'Vencida' },
  PENDING: { variant: 'default', text: 'Pendente' },
  UNREGISTERED: { variant: 'outline', text: 'Não registrada' },
  TO_FILL: { variant: 'alert', text: 'Preencher etapas' },
};

const displayTags = computed(() => {
  const tags = props.maintenanceData?.tags ?? [];
  const tagInfos = props.maintenanceData?.tagInfo ?? [];

  return tags.map((tag) => {
    const info = tagInfos.find((t) => t.key === tag);
    const variant = info?.variant ?? tagVariantMap[tag]?.variant ?? 'default';
    const text = info?.text ?? tagVariantMap[tag]?.text ?? tag;

    return { variant, text };
  });
});
</script>

<template>
  <RouterLink :to="{ name: routeName }" class="maintenance__item">
    <div class="item__flex">
      <div class="item__flex">
        <div class="item__wrapper">
          <img :src="maintenanceIcons[icon]" alt="" class="item__icon" />
        </div>
        <div class="vertical"></div>
        <p class="item__text">{{ title }}</p>
      </div>
      <img :src="ArrowIcon" alt="" class="item__arrow" />
    </div>

    <template v-if="displayTags.length">
      <CDivider />
      <div class="badges">
        <CTag
          v-for="(tag, index) in displayTags"
          :key="index"
          :title="tag.text"
          :variant="tag.variant"
        />
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
    transform: rotate(90deg);
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
