<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { QSpinner } from 'quasar';

import { useCarStore } from '@/stores/carStore';
import { useBatteryStore } from '@/stores/batteryStore';

import CDivider from '@/shared/components/CDivider.vue';
import CTag from '@/shared/components/CTag.vue';
import CButton from '@/shared/components/CButton.vue';

import {
  BatteryIcon,
  EditIcon,
  MoneyCircleIcon,
  CalendarIcon,
} from '@/shared/assets/icons';

import {
  CarIcon,
  WrenchIcon,
  BrokenCarIcon,
} from '@/shared/assets/illustrations';

import { MappedMaintenance } from '@/shared/types/battery-maintenance';

const router = useRouter();
const batteryStore = useBatteryStore();
const carStore = useCarStore();

const { maintenances, isOverdue, isLoading, nextMaintenanceKm } =
  storeToRefs(batteryStore);

const hasMaintenances = computed(() => maintenances.value.length > 0);
const isEmpty = computed(() => !hasMaintenances.value);

onMounted(async () => {
  await carStore.getCars();
  batteryStore.resetStore();
});

watch(
  () => carStore.firstLicensePlate,
  async (plate) => {
    if (plate) {
      await batteryStore.getBatteryMaintenances(plate);
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

    capacity: m.capacity || '-',

    brand: m.brand || '-',
  }))
);

function editMaintenance(m: MappedMaintenance): void {
  const maintenance = maintenances.value.find((item) => item.id === m.id);
  if (!maintenance) return;

  batteryStore.setSelectedMaintenance(maintenance);
  router.push({
    name: 'maintenance-battery-form',
    params: { maintenanceId: m.id },
  });
}
</script>

<template>
  <div class="page app-wrapper">
    <div class="page__header">
      <img :src="BatteryIcon" alt="" />
      <h1>Bateria</h1>
    </div>

    <div v-if="isLoading" class="spinner-center">
      <q-spinner color="primary" size="40px" />
    </div>

    <section class="page__status" v-else>
      <div v-if="isOverdue" class="page__card">
        <div class="card__container">
          <img :src="BrokenCarIcon" />
          <h2 class="card__title">Manutenção vencida!</h2>
          <span class="card__text">
            É hora de realizar a revisão de bateria do seu veículo.
          </span>
        </div>
      </div>

      <div v-else-if="isEmpty" class="page__card">
        <div class="card__container">
          <img :src="WrenchIcon" />
          <h2 class="card__title">Nenhuma manutenção cadastrada!</h2>
          <span class="card__text">
            Você ainda não cadastrou nenhuma troca de bateria.
          </span>
        </div>
      </div>

      <div v-else class="page__card">
        <div class="card__container">
          <img :src="CarIcon" />
          <h2 class="card__title">Você está em dia!</h2>
          <span class="card__text">
            Sua próxima revisão será em
            {{ nextMaintenanceKm ?? '0' }} km.
          </span>
        </div>
      </div>
    </section>

    <CButton variant="primary" :to="{ name: 'maintenance-battery-form' }">
      Cadastrar manutenção
    </CButton>

    <section v-if="hasMaintenances" class="maintenances">
      <div class="maintenances__header">
        <img :src="BatteryIcon" alt="" />
        <h1>Revisões anteriores</h1>
      </div>

      <div v-for="m in mappedMaintenances" :key="m.id" class="maintenance-card">
        <div class="maintenance-card__container">
          <div class="maintenance-card__header">
            <div class="maintenance-card__header-container">
              <img :src="BatteryIcon" alt="" />
              <div class="vertical"></div>
              <h1>Bateria</h1>
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
            <CTag
              :icon="BatteryIcon"
              :id="4"
              :title="m.capacity"
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
