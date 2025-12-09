<script setup lang="ts">
import { computed } from 'vue';

import {
  CarIcon,
  WrenchIcon,
  BrokenCarIcon,
} from '@/shared/assets/illustrations';
import CTag from '@/shared/components/CTag.vue';

import CDivider from '@/shared/components/CDivider.vue';

type Variant = 'overdue' | 'empty' | 'ok';

const props = defineProps<{
  variant: Variant;
  nextKm?: number | null;
  maintenanceName: string;
  expiredDate?: string;
}>();

const info = computed(() => {
  switch (props.variant) {
    case 'overdue':
      return {
        icon: BrokenCarIcon,
        title: 'Manutenção vencida!',
        text: `É hora de realizar a manutenção de  ${props.maintenanceName} do seu veículo.`,
      };

    case 'empty':
      return {
        icon: WrenchIcon,
        title: 'Nenhuma manutenção cadastrada!',
        text: `Você ainda não cadastrou nenhuma manutenção de ${props.maintenanceName}`,
      };

    case 'ok':
      return {
        icon: CarIcon,
        title: 'Você está em dia!',
      };

    default:
      return {
        icon: '',
        title: '',
        text: '',
      };
  }
});
</script>

<template>
  <div class="page__card">
    <div class="card">
      <div class="card__header">
        <img :src="info.icon" />
        <div class="card__text">
          <h2 class="card__title">{{ info.title }}</h2>
          <span class="card__desc">
            {{ info.text }}
          </span>
        </div>
      </div>
      <CDivider />
      <div class="item">
        <span class="item__title">
          {{ props.maintenanceName }}
        </span>
        <div class="vertical"></div>
        <CTag
          :key="0"
          :title="props.expiredDate ?? 'Venceu em 3 de set.'"
          variant="error"
        />
      </div>

      <div class="item">
        <span class="item__title">
          {{ props.maintenanceName }}
        </span>
        <div class="vertical"></div>
        <span class="item__text"
          >Próxima revisão em {{ props.nextKm ?? 0 }} km.</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;

  &__header {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-weight: 600;
    font-size: 1rem;
  }

  &__desc {
    font-size: 0.75rem;
    color: #485159;
  }
}

.item {
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  text-align: left;
  &__title {
    font-weight: 500;
  }

  &__text {
    font-size: 0.75rem;
  }
}

.vertical {
  width: 1px;
  height: 35px;
  border-right: 1px dashed #485159;
}
</style>
