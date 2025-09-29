<script setup lang="ts">
import { OilLiquidIcon, EditIcon } from '@/shared/assets/icons';
import CButton from '@/shared/components/CButton.vue';
import CTag from '@/shared/components/CTag.vue';
import wrenchImage from '../../../../shared/assets/illustrations/wrench.png';
import CDivider from '@/shared/components/CDivider.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

interface OilMaintenance {
  id: number;
  date: string;
  km: number;
  price: number;
  service: string;
  oilType: string;
  oilBrand?: string;
}

const maintenances: OilMaintenance[] = [
  {
    id: 1,
    date: '27/05/2022',
    km: 100.076,
    price: 50.0,
    service: 'Troca de óleo',
    oilType: 'mineral',
  },
  {
    id: 2,
    date: '01/12/2020',
    km: 200.076,
    price: 250.0,
    service: 'Filtro de óleo',
    oilType: 'mineral',
  },
];

const editMaintenance = (maintenance: OilMaintenance) => {
  router.push({
    name: 'maintenance-oil-form',
    query: {
      date: maintenance.date,
      km: maintenance.km,
      price: maintenance.price,
      service: maintenance.service,
      oilType: maintenance.oilType,
    },
  });
};
</script>

<template>
  <div class="oil app-wrapper">
    <div class="oil__header">
      <img :src="OilLiquidIcon" alt="" />
      <h1>Troca de óleo</h1>
    </div>

    <div class="oil__card">
      <div class="card__container">
        <img :src="wrenchImage" />
        <h2 class="card__title">Manutenção não cadastrada!</h2>
        <span class="card__text">
          Você ainda não cadastrou nenhuma troca de óleo.
        </span>
      </div>
    </div>

    <CButton
      variant="primary"
      @click="$router.push({ name: 'maintenance-oil-form' })"
    >
      Cadastrar manutenção
    </CButton>

    <div v-if="maintenances.length > 0" class="maintenances">
      <div class="maintenances__header">
        <img :src="OilLiquidIcon" alt="" />
        <h1>Revisões anteriores</h1>
      </div>

      <div v-for="m in maintenances" :key="m.id" class="maintenance-card">
        <div class="maintenance-card__container">
          <div class="maintenance-card__header">
            <div class="maintenance-card__header-container">
              <img :src="OilLiquidIcon" alt="" />
              <div class="vertical"></div>
              <h1>{{ m.service }}</h1>
            </div>
            <button></button>
            <img
              :src="EditIcon"
              alt="Editar"
              style="cursor: pointer"
              @click="editMaintenance(m)"
            />
          </div>

          <CDivider class="divider" />

          <div class="tags">
            <CTag :id="1" :title="m.date" variant="default" />
            <CTag :id="2" :title="m.km.toString()" variant="default" />
            <CTag :id="3" :title="m.price.toString()" variant="default" />
            <CTag :id="4" :title="m.service" variant="default" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

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
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e0e5e7;
  }
}

.card {
  gap: 16px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .card__text {
      text-align: center;
      font-size: 0.875rem;
      font-weight: 400;
      color: #485159;

      &.light {
        font-size: 0.75rem;
      }
    }
  }

  &__description {
    color: #485159;
    font-weight: 400;
    font-size: 0.875rem;
  }

  &__button {
    display: flex;
    width: 100%;
    height: 48px;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #307714;
    background: #307714;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    line-height: 120%;
    cursor: pointer;
    margin-top: 1rem;
  }
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: start;
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
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e5e7;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__header {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: space-between;

    &-title {
      display: flex;
      gap: 8px;
      align-items: center;

      h1 {
        font-weight: 700;
        font-size: 1.25rem;
      }
    }

    &-container {
      display: flex;
      gap: 8px;
      align-items: center;
    }
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
