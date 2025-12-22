<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { QSpinner } from 'quasar';

import { useCarStore } from '@/stores/carStore';
import { useFuelFilterStore } from '@/stores/maintenances/fuelFilterStore';

import CDivider from '@/shared/components/CDivider.vue';
import CTag from '@/shared/components/CTag.vue';
import CButton from '@/shared/components/CButton.vue';

import {
  EditIcon,
  MoneyCircleIcon,
  CalendarIcon,
  FuelFilterIcon,
} from '@/shared/assets/icons';

import { MappedMaintenance } from '@/shared/types/fuel-filter-maintenance';
import StatusCard from '../../components/StatusCard.vue';

const router = useRouter();
const fuelFilterStore = useFuelFilterStore();
const carStore = useCarStore();

const { maintenances, isOverdue, isLoading, nextMaintenanceKm } =
  storeToRefs(fuelFilterStore);

const hasMaintenances = computed(() => maintenances.value.length > 0);
const isEmpty = computed(() => !hasMaintenances.value);

const statusVariant = computed<'overdue' | 'empty' | 'ok'>(() => {
  if (isOverdue.value) return 'overdue';
  if (isEmpty.value) return 'empty';
  return 'ok';
});

const statusProps = computed(() => ({
  variant: statusVariant.value,
  maintenanceName: 'Filtro de combustível',
  nextKm: statusVariant.value === 'ok' ? nextMaintenanceKm.value : null,
}));

onMounted(async () => {
  fuelFilterStore.resetStore();
  await carStore.getCars();
});

watch(
  () => carStore.firstLicensePlate,
  async (plate) => {
    if (plate) {
      await fuelFilterStore.getMaintenances(plate);
    }
  },
  { immediate: true }
);

const mappedMaintenances = computed<MappedMaintenance[]>(() =>
  [...maintenances.value].reverse().map((m) => ({
    id: m.id,
    date: m.lastMaintenanceDate
      ? new Date(m.lastMaintenanceDate)
          .toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          .replace(/^./, (str) => str.toUpperCase())
      : '-',
    km: m.lastMaintenanceKm
      ? `${Number(m.lastMaintenanceKm).toLocaleString('pt-BR')} km`
      : '-',
    price: m.valor
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(m.valor))
      : '-',

    oficina: m.oficina || '-',
  }))
);

function editMaintenance(m: MappedMaintenance): void {
  const maintenance = maintenances.value.find((item) => item.id === m.id);
  if (!maintenance) return;

  fuelFilterStore.setSelectedMaintenance(maintenance);
  router.push({
    name: 'maintenance-fuel-filter-edit',
    params: { maintenanceId: m.id },
  });
}
</script>

<template>
  <div class="page app-wrapper">
    <div class="page__header">
      <img :src="FuelFilterIcon" alt="" />
      <h1>Filtro de combustível</h1>
    </div>

    <div v-if="isLoading" class="spinner-center">
      <q-spinner color="primary" size="40px" />
    </div>

    <section class="page__status" v-else>
      <StatusCard v-bind="statusProps" />
    </section>

    <CButton variant="primary" :to="{ name: 'maintenance-fuel-filter-create' }">
      Cadastrar manutenção
    </CButton>

    <section v-if="hasMaintenances" class="maintenances">
      <div class="maintenances__header">
        <img :src="FuelFilterIcon" alt="" />
        <h1>Revisões anteriores</h1>
      </div>

      <div v-for="m in mappedMaintenances" :key="m.id" class="maintenance-card">
        <div class="maintenance-card__container">
          <div class="maintenance-card__header">
            <div class="maintenance-card__header-container">
              <img :src="FuelFilterIcon" alt="" />
              <div class="vertical"></div>
              <h1>Filtro de combustível</h1>
            </div>
            <img
              :src="EditIcon"
              alt="Editar"
              style="cursor: pointer"
              @click="editMaintenance(m)"
            />
          </div>

          <CDivider class="divider" />

          <div class="tags">
            <CTag
              :icon="CalendarIcon"
              :id="1"
              :title="m.date"
              variant="default"
            />
            <CTag :id="2" :title="m.km.toString()" variant="default" />
            <CTag
              :icon="MoneyCircleIcon"
              :id="3"
              :title="m.price.toString()"
              variant="default"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '/src/css/maintenancePage.scss';
</style>
