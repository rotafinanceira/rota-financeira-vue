<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { QSpinner } from 'quasar';

import { useCarStore } from '@/stores/carStore';
import { useOilStore } from '@/stores/oilStore';

import CDivider from '@/shared/components/CDivider.vue';
import CTag from '@/shared/components/CTag.vue';
import CButton from '@/shared/components/CButton.vue';

import {
  OilLiquidIcon,
  EditIcon,
  MoneyCircleIcon,
  CalendarIcon,
} from '@/shared/assets/icons';

import {
  CarIcon,
  WrenchIcon,
  BrokenCarIcon,
} from '@/shared/assets/illustrations';

import {
  MappedMaintenance,
  OilServiceType,
} from '@/shared/types/oil-maintenance';

const router = useRouter();
const oilStore = useOilStore();
const carStore = useCarStore();

const { maintenances, isOverdue, isLoading, nextMaintenanceKm } =
  storeToRefs(oilStore);

const hasMaintenances = computed(() => maintenances.value.length > 0);
const isEmpty = computed(() => !hasMaintenances.value);

onMounted(async () => {
  await carStore.getCars();
  oilStore.resetStore();
});

watch(
  () => carStore.firstLicensePlate,
  async (plate) => {
    if (plate) {
      await oilStore.getOilMaintenances(plate);
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
    service:
      m.serviceType === ('oil-changed' as OilServiceType)
        ? 'Troca de filtro e óleo'
        : 'Troca de óleo',
    oilType: m.oilType || '-',
  }))
);

function editMaintenance(m: MappedMaintenance): void {
  const maintenance = maintenances.value.find((item) => item.id === m.id);
  if (!maintenance) return;

  oilStore.setSelectedMaintenance(maintenance);
  router.push({
    name: 'maintenance-oil-form',
    params: { maintenanceId: m.id },
  });
}
</script>

<template>
  <div class="oil app-wrapper">
    <div class="oil__header">
      <img :src="OilLiquidIcon" alt="" />
      <h1>Troca de óleo</h1>
    </div>

    <div v-if="isLoading" class="spinner-center">
      <q-spinner color="primary" size="40px" />
    </div>

    <section class="oil__status" v-else>
      <div v-if="isOverdue" class="oil__card">
        <div class="card__container">
          <img :src="BrokenCarIcon" />
          <h2 class="card__title">Manutenção vencida!</h2>
          <span class="card__text">
            É hora de realizar a revisão de óleo automotivo do seu veículo.
          </span>
        </div>
      </div>

      <div v-else-if="isEmpty" class="oil__card">
        <div class="card__container">
          <img :src="WrenchIcon" />
          <h2 class="card__title">Nenhuma manutenção cadastrada!</h2>
          <span class="card__text">
            Você ainda não cadastrou nenhuma troca de óleo.
          </span>
        </div>
      </div>

      <div v-else class="oil__card">
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

    <CButton variant="primary" :to="{ name: 'maintenance-oil-form' }">
      Cadastrar manutenção
    </CButton>

    <section v-if="hasMaintenances" class="maintenances">
      <div class="maintenances__header">
        <img :src="OilLiquidIcon" alt="" />
        <h1>Revisões anteriores</h1>
      </div>

      <div v-for="m in mappedMaintenances" :key="m.id" class="maintenance-card">
        <div class="maintenance-card__container">
          <div class="maintenance-card__header">
            <div class="maintenance-card__header-container">
              <img :src="OilLiquidIcon" alt="" />
              <div class="vertical"></div>
              <h1>{{ m.service }}</h1>
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
              :icon="OilLiquidIcon"
              :id="4"
              :title="m.service"
              variant="default"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.oil {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    gap: 8px;
    align-items: center;

    h1 {
      font-weight: 700;
      font-size: 1.25rem;
    }
  }

  &__card {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #e0e5e7;
  }
}

.card {
  text-align: center;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 16px;
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

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.maintenances {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    gap: 8px;
    align-items: center;

    h1 {
      font-weight: 700;
      font-size: 1.25rem;
    }
  }
}

.maintenance-card {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e5e7;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  &__header-container {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}

.vertical {
  width: 1px;
  height: 35px;
  border-right: 1px dashed #485159;
}

.divider {
  margin: 10px;
}
</style>
