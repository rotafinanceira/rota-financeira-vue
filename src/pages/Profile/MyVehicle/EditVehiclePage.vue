<template>
  <div class="app-wrapper">
    <div>
      <h2 class="vehicle__header">Informações do Veículo</h2>
      <div class="vehicle__edit-pages">
        <RouterLink
          v-for="editPage in vehicleEditRoutes"
          :to="{ name: editPage.name }"
          :key="editPage.name"
          class="vehicle__edit-page"
        >
          <span>{{ editPage.title }}</span>
          <img :src="ArrowIcon" alt="" />
        </RouterLink>
      </div>
    </div>
    <div class="flex-between vehicle__header">
      <h2 class="vehicle__header">{{ maintenanceText }}</h2>
      <p>{{ maintenanceCount }}<span class="total">/10</span></p>
    </div>
    <div class="maintenances__list">
      <MaintenanceItem
        v-for="{ title, icon } in maintenances"
        :key="icon"
        :title="title"
        :icon="icon"
      />
    </div>

    <h2 class="vehicle__header">Notificações</h2>
    <div class="notificacao-revisao">
      <div class="notificacoes">
        <label class="switch-label" @click="toggleMaintenanceNotifications">
          <span>Habilitar notificações sobre revisão do meu veículo</span>
          <ToggleButton :modelValue="maintenanceNotificationsEnabled" />
        </label>
      </div>
    </div>
    <button class="vehicle__button register" to="/vehicle/add-maintenance">
      Cadastrar Manutenções
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { type vehicleEditRoutes } from './types';
import ToggleButton from '@/shared/components/ToggleButton.vue';
import { MaintenanceItemProps } from '@/shared/types/maintenance';
import MaintenanceItem from '@/shared/components/MaintenanceItem.vue';
import { ArrowIcon } from '@/shared/assets/icons';

const maintenanceNotificationsEnabled = ref(true);
const maintenances = ref<MaintenanceItemProps[]>([
  { title: 'Alinhamento e balanceamento', icon: 'wheel' },
  { title: 'Troca de bateria', icon: 'battery' },
  { title: 'Troca de óleo', icon: 'oil' },
]);

const maintenanceCount = ref(maintenances.value.length);
const maintenanceText = computed(() =>
  maintenanceCount.value === 1
    ? 'Manutenção Cadastrada'
    : 'Manutenções Cadastradas'
);

function toggleMaintenanceNotifications() {
  const newValue = !maintenanceNotificationsEnabled.value;
  maintenanceNotificationsEnabled.value = newValue;
}

const vehicleEditRoutes: vehicleEditRoutes[] = [
  {
    name: 'user-vehicle-edit-model',
    title: 'Modelo',
  },
  {
    name: 'user-vehicle-edit-brand',
    title: 'Marca',
  },
  {
    name: 'user-vehicle-edit-year',
    title: 'Ano',
  },
  {
    name: 'user-vehicle-edit-plate',
    title: 'Placa',
  },
  {
    name: 'user-vehicle-edit-color',
    title: 'Cor',
  },
];
</script>

<style scoped lang="scss">
@import './_vehicle';
</style>
