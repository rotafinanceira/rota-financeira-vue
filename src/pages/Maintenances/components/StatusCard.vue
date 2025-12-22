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

type StatusItem = {
  title: string;
  text?: string;
  tag?: {
    title: string;
    variant: 'error' | 'default';
  };
};

const props = defineProps<{
  variant: Variant;
  maintenanceName: string;
  nextKm?: number | null;
  expiredDate?: string;
}>();

const headerInfo = computed(() => {
  switch (props.variant) {
    case 'overdue':
      return {
        icon: BrokenCarIcon,
        title: 'Manutenção vencida!',
        text: `É hora de realizar a manutenção de ${props.maintenanceName} do seu veículo.`,
      };

    case 'empty':
      return {
        icon: WrenchIcon,
        title: 'Nenhuma manutenção cadastrada!',
        text: `Você ainda não cadastrou nenhuma manutenção de ${props.maintenanceName}.`,
      };

    case 'ok':
      return {
        icon: CarIcon,
        title: 'Você está em dia!',
        text: null,
      };

    default:
      return {
        icon: '',
        title: '',
        text: null,
      };
  }
});

const items = computed<StatusItem[]>(() => {
  switch (props.variant) {
    case 'overdue':
      return [
        {
          title: props.maintenanceName,
          tag: {
            title: props.expiredDate ?? 'Manutenção vencida',
            variant: 'error',
          },
        },
      ];

    case 'ok':
      return [
        {
          title: props.maintenanceName,
          text:
            props.nextKm !== null && props.nextKm !== undefined
              ? `Próxima revisão em ${props.nextKm} km.`
              : 'Erro ao encontrar próxima manutenção.',
        },
      ];

    case 'empty':
      return [];

    default:
      return [];
  }
});
</script>

<template>
  <div class="page__card">
    <div class="card">
      <div class="card__header">
        <img :src="headerInfo.icon" />
        <div class="card__text">
          <h2 class="card__title">
            {{ headerInfo.title }}
          </h2>
          <span v-if="headerInfo.text" class="card__desc">
            {{ headerInfo.text }}
          </span>
        </div>
      </div>

      <CDivider />

      <div v-for="(item, index) in items" :key="index" class="item">
        <span class="item__title">
          {{ item.title }}
        </span>

        <div class="vertical"></div>

        <CTag
          v-if="item.tag"
          :title="item.tag.title"
          :variant="item.tag.variant"
        />

        <span v-else class="item__text">
          {{ item.text }}
        </span>
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
    justify-content: center;
    gap: 1rem;
    align-items: center;
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
