<script setup lang="ts">
import { FilterControlsIcon, PageIcon } from '@/shared/assets/icons';
import HistoryCard from './components/HistoryCard.vue';
import { HistoryCardProps } from './types';
import { BrokenCar } from '@/shared/assets/illustrations';

const maintenanceHistory: HistoryCardProps[] = [
  {
    id: '1',
    month: 'Setembro',
    date: 'Quarta, 25 set. 2024',
    km: '10.570',
    maintenances: [
      {
        icon: 'fuelFilter',
        title: 'Troca de filtro de combustível',
        description: 'R$ 400,00',
      },
      {
        icon: 'wheel',
        title: 'Alinhamento e Balanceamento',
        description: 'R$ 250,00',
      },
    ],
  },
  {
    id: '2',
    month: 'Agosto',
    date: 'Segunda, 21 ago. 2024',
    km: '9.510',
    maintenances: [
      {
        icon: 'fluidLevel',
        title: 'Troca de água',
        description: 'R$ 400,00',
      },
    ],
  },
  {
    id: '3',
    month: 'Julho',
    date: 'Quinta, 15 jul. 2024',
    km: '10.150',
    maintenances: [
      {
        icon: 'fuelFilter',
        title: 'Troca de filtro de combustível',
        description: 'R$ 400,00',
      },
      {
        icon: 'wheel',
        title: 'Alinhamento e Balanceamento',
        description: 'R$ 400,00',
      },
    ],
  },
  {
    id: '4',
    month: 'Junho',
    date: 'Terça, 10 jun. 2024',
    km: '9.150',
    maintenances: [
      {
        icon: 'oil',
        title: 'Troca de óleo',
        description: 'R$ 300,00',
      },
    ],
  },
];

const isThereNoMaintenances = maintenanceHistory
  ? maintenanceHistory.length === 0
    ? true
    : false
  : true;
</script>

<template>
  <div class="app-wrapper">
    <header class="history__header">
      <div class="flex">
        <img :src="PageIcon" alt="" />
        <h2 class="history__title">Histórico</h2>
      </div>
      <button class="history__settings">
        <img :src="FilterControlsIcon" alt="" />
      </button>
    </header>
    <main class="history__main">
      <section class="history__no-maintenances" v-if="isThereNoMaintenances">
        <img :src="BrokenCar" alt="" />
        <p class="">Você ainda não possui manutenções cadastradas!</p>
      </section>
      <HistoryCard
        v-else
        v-for="history in maintenanceHistory"
        v-bind="history"
        :key="history.id"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
.history {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }

  &__settings {
    display: block;
    height: 20px;
    background: none;
    border: none;
    padding: 0;
  }

  &__main {
    display: grid;
    align-items: center;
    gap: 1.5rem;
    min-height: calc(100svh - 219px);
  }

  &__no-maintenances {
    display: grid;
    place-items: center;
    gap: 1.5rem;

    p {
      font-size: 1.125rem;
      font-weight: 500;
      text-align: center;
      max-width: 15rem;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
