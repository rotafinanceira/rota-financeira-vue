<template>
  <AppHeader />
  <div class="maintenance">
    <div class="maintenance__wrapper">
      <header class="maintenance__header">
        <div class="flex">
          <img :src="gearWrench" alt="" />
          <h1 class="maintenance__title">Manutenções</h1>
        </div>
        <button
          class="maintenance__settings"
          type="button"
          :onclick="openSettings"
        >
          <img :src="settings" alt="settings button" />
        </button>
      </header>
      <MaintenanceItemCard
        v-for="item in maintenanceItems"
        v-bind="item"
        :key="item.title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { gearWrench, settings } from '@/assets';
import AppHeader from '@/components/AppHeader.vue';
import MaintenanceItemCard, {
  MaintenanceItemCardProps,
} from '@/components/MaintenanceItemCard.vue';

// import oilImage from '@/assets/agua.svg';
// import manuIcon2 from '@/assets/manu2.svg';
// import expiredIcon from '@/assets/manVen.svg';
// import nextIcon from '@/assets/proxMan.svg';
// import fillStepsIcon from '@/assets/preenEtap.svg';
// import completedIcon from '@/assets/concluido.svg';
// import batteryImage from '@/assets/agua.svg';
// import filterImage from '@/assets/agua.svg';
// import alignmentImage from '@/assets/Alinham.svg';
// import airConditionerImage from '@/assets/agua.svg';

const maintenanceItems: MaintenanceItemCardProps[] = [
  {
    title: 'Alinhamento e balanceamento',
    icon: 'wheel',
    maintenanceData: {
      status: 'pending',
    },
  },
  {
    title: 'Bateria',
    icon: 'battery',
  },
  {
    title: 'Filtro de ar-condicionado',
    icon: 'airFilter',
    maintenanceData: {
      status: 'expired',
    },
  },
  {
    title: 'Filtro de combustível',
    icon: 'fuelFilter',
    maintenanceData: {
      status: 'registered'
    }
  },
  {
    title: 'Nível de fluidos',
    icon: 'fluidLevel',
  },
  {
    title: 'Motor',
    icon: 'engine',
  },
  {
    title: 'Troca de óleo',
    icon: 'oil',
  },
  {
    title: 'Verificação de pneu',
    icon: 'wheel',
  },
];

const openSettings = () => {
  console.log('open settings');
};

const maintenancesData = [
  {
    type: 'Oil Change',
    data: {
      date: '2023-11-20T00:00:00.000Z',
      status: 'expired',
    },
    pendingRegistration: 2,
  },
  {
    type: 'Wheel Alignment',
    data: {
      date: '2024-10-29T22:13:35.723Z',
      status: 'pending',
    },
    pendingRegistration: 2,
  },
  {
    type: 'Battery Change',
    data: {
      date: '2025-05-31T13:07:50.791Z',
      status: 'unregistered',
    },
    pendingRegistration: 0,
  },
  {
    type: 'Air Filter Change',
    data: {
      date: '2025-05-31T13:07:50.791Z',
      status: 'unregistered',
    },
    pendingRegistration: 0,
  },
  {
    type: 'Oil Filter Change',
    data: {
      date: '2023-11-20T00:00:00.000Z',
      status: 'pending',
    },
    pendingRegistration: 1,
  },
];

console.log(maintenancesData);
</script>

<style lang="scss" scoped>
.maintenance {
  min-height: calc(100svh - 130px);
  background-color: #eff3f5;
  padding-bottom: 1rem;

  &__wrapper {
    width: calc(100% - 2.5rem);
    margin-inline: auto;
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    font-family: 'Inter';
    line-height: normal;
    margin: 0;
  }

  &__settings {
    height: 20px;
    background: none;
    border: none;
    padding: 0;
  }
}

.flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
