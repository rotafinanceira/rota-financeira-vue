<template>
  <div class="edit-card">
    <div class="edit-info">
      <h2 class="vehicle__header">Informações do Veículo</h2>
      <div class="vehicle__edit-pages">
        <RouterLink
          v-for="editPage in vehicleEditRoutes"
          :to="editPage.path"
          :key="editPage.path"
          class="vehicle__edit-page"
        >
          <span>{{ editPage.title }}</span>
          <img src="@/assets/arrowR.svg" alt="Arrow Right" />
        </RouterLink>
      </div>
    </div>
    <!-- TODO: Ainda falta revisar e formatar essa parte do código pra baixo -->
    <div class="edit-account">
      <div class="flex-between vehicle__header">
        <h2 class="vehicle__header">{{ maintenanceText }}</h2>
        <p>{{ maintenanceCount }}<span class="total">/10</span></p>
      </div>
      <div class="manutencoes-list">
        <div
          v-for="maintenance in maintenances"
          :key="maintenance.id"
          class="manutencao-item"
        >
          <p>{{ maintenance.description }}</p>
        </div>
      </div>
    </div>
    <h2 class="vehicle__header">Notificações</h2>
    <div class="notificacao-revisao">
      <div class="notificacoes">
        <label class="switch-label">
          <span>Habilitar notificações sobre revisão do meu veículo</span>
          <CustomToggle v-model="maintenanceNotificationsEnabled" />
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
import { type vehicleEditRoutes, type Maintenance } from '../../types';
import CustomToggle from '@/components/CustomToggle.vue';

const maintenanceNotificationsEnabled = ref(true);
const maintenances = ref<Maintenance[]>([
  { id: 1, description: 'Troca de óleo', date: '2023-09-01', cost: 150 },
  {
    id: 2,
    description: 'Alinhamento e balanceamento',
    date: '2023-08-15',
    cost: 200,
  },
  {
    id: 3,
    description: 'Substituição de pastilhas de freio',
    date: '2023-07-20',
    cost: 300,
  },
]);

const maintenanceCount = ref(5);
const maintenanceText = computed(() =>
  maintenanceCount.value === 1
    ? 'Manutenção Cadastrada'
    : 'Manutenções Cadastradas'
);

const vehicleEditRoutes: vehicleEditRoutes[] = [
  {
    path: '/vehicle/edit-model',
    title: 'Modelo',
  },
  {
    path: '/vehicle/edit-brand',
    title: 'Marca',
  },
  {
    path: '/vehicle/edit-year',
    title: 'Ano',
  },
  {
    path: '/vehicle/edit-plate',
    title: 'Placa',
  },
  {
    path: '/vehicle/edit-color',
    title: 'Cor',
  },
];
</script>

<style scoped lang="scss"></style>
