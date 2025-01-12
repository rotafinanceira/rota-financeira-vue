<template>
  <div class="maintenance-page">
    <AppHeader />
    <p>Selecione uma manutenção:</p>
    <div class="maintenance-dropdown">
      <q-select
        filled
        v-model="selectedMaintenance"
        :options="maintenanceOptions"
        label="Selecione uma manutenção"
      ></q-select>
      <q-btn
        label="Ir para Manutenções"
        color="primary"
        @click="navigateToMaintenance"
        :disable="!selectedMaintenance"
      ></q-btn>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

interface MaintenanceOption {
  label: string;
  value: string;
}

const selectedMaintenance = ref<MaintenanceOption | null>(null);
const maintenanceOptions = ref<MaintenanceOption[]>([
  { label: 'Manutenção de Óleo', value: '/oil-maintenance' },
  { label: 'Manutenção de Bateria', value: '/battery-maintenance' },
  {
    label: 'Manutenção de Filtro de Combustível',
    value: '/fuel-filter-maintenance',
  },
  { label: 'Alinhamento e Balanceamento', value: '/alignment-balancing' },
  {
    label: 'Manutenção de Filtro de Ar-Condicionado',
    value: '/air-conditioner-filter-maintenance',
  },
]);

const router = useRouter();

const navigateToMaintenance = () => {
  console.log('Selecionado:', selectedMaintenance.value); // Para depuração
  if (selectedMaintenance.value) {
    router.push(selectedMaintenance.value.value); // Passando o valor da rota
  }
};
</script>

<style scoped>
.maintenance-page {
  padding: 1rem;
  text-align: center;
}

.maintenance-dropdown {
  margin-top: 32px;
}
</style>
