<script setup lang="ts">
import { computed } from 'vue';

import {
  CarIcon,
  WrenchIcon,
  BrokenCarIcon,
} from '@/shared/assets/illustrations';

type Variant = 'overdue' | 'empty' | 'ok';

const props = defineProps<{
  maintenanceName: string;
  variant: Variant;
  nextKm?: number | null;
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
        text: `Sua próxima manutenção será em ${props.nextKm ?? 0} km.`,
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
    <div class="card__container">
      <img :src="info.icon" />
      <h2 class="card__title">{{ info.title }}</h2>
      <span class="card__text">
        {{ info.text }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }

  &__title {
    font-weight: 600;
    font-size: 1rem;
  }

  &__text {
    font-size: 0.875rem;
    color: #485159;
  }
}
</style>
