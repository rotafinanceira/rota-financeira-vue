<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { QSpinner } from 'quasar';

import { useCarStore } from '@/stores/carStore';
import { useAlignmentStore } from '@/stores/maintenances/alignmentStore';

import CDivider from '@/shared/components/CDivider.vue';
import CTag from '@/shared/components/CTag.vue';
import CButton from '@/shared/components/CButton.vue';

import {
  EditIcon,
  MoneyCircleIcon,
  CalendarIcon,
  AlignmentIcon,
} from '@/shared/assets/icons';

import MustiStatusCard from '../../components/MustiStatusCard.vue';

import { MappedMaintenance } from '@/shared/types/fuel-filter-maintenance';

const router = useRouter();
const alignmentStore = useAlignmentStore();
const carStore = useCarStore();

const { maintenances, isOverdue, isLoading, nextMaintenanceKm } =
  storeToRefs(alignmentStore);

const hasMaintenances = computed(() => maintenances.value.length > 0);
const isEmpty = computed(() => !hasMaintenances.value);

onMounted(async () => {
  alignmentStore.resetStore();
  await carStore.getCars();
});

watch(
  () => carStore.firstLicensePlate,
  async (plate) => {
    if (plate) {
      await alignmentStore.getMaintenances(plate);
    }
  },
  { immediate: true }
);

const mappedMaintenances = computed<MappedMaintenance[]>(() =>
  [...maintenances.value].reverse().map((m) => ({
    id: m.id,
    date: m.lastAlignmentBalanceDate
      ? new Date(m.lastAlignmentBalanceDate)
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

  alignmentStore.setSelectedMaintenance(maintenance);
  router.push({
    name: 'maintenance-alignment-balancing-edit',
    params: { maintenanceId: m.id },
  });
}
</script>

<template>
  <div class="page app-wrapper">
    <div class="page__header">
      <img :src="AlignmentIcon" alt="" />
      <h1>Alinhamento e balanceamento</h1>
    </div>

    <div v-if="isLoading" class="spinner-center">
      <q-spinner color="primary" size="40px" />
    </div>

    <section class="page__status" v-else>
      <MustiStatusCard
        v-if="isOverdue"
        variant="overdue"
        maintenanceName="Alinhamento e balanceamento"
      />

      <MustiStatusCard
        v-else-if="isEmpty"
        variant="empty"
        maintenanceName="Alinhamento e balanceamento"
      />

      <MustiStatusCard
        v-else
        variant="ok"
        :nextKm="nextMaintenanceKm"
        maintenanceName="Alinhamento e balanceamento"
      />
    </section>

    <CButton
      variant="primary"
      :to="{ name: 'maintenance-alignment-balancing-create' }"
    >
      Cadastrar manutenção
    </CButton>

    <section v-if="hasMaintenances" class="maintenances">
      <div class="maintenances__header">
        <img :src="AlignmentIcon" alt="" />
        <h1>Revisões anteriores</h1>
      </div>

      <div v-for="m in mappedMaintenances" :key="m.id" class="maintenance-card">
        <div class="maintenance-card__container">
          <div class="maintenance-card__header">
            <div class="maintenance-card__header-container">
              <img :src="AlignmentIcon" alt="" />
              <div class="vertical"></div>
              <h1>Alinhamento e balanceamento</h1>
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
