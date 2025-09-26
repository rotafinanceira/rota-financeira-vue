<script setup lang="ts">
import { OilLiquidIcon, EditIcon } from '@/shared/assets/icons';
import CButton from '@/shared/components/CButton.vue';
import CTag from '@/shared/components/CTag.vue';
import wrenchImage from '../../../../shared/assets/illustrations/wrench.png';
import CDivider from '@/shared/components/CDivider.vue';

const maintenances = [
  {
    id: 1,
    date: 'Terça, 1 mai. 2025',
    km: '100.076 km',
    price: 'R$ 50,00',
    type: 'Troca de óleo',
  },
  {
    id: 2,
    date: 'Segunda, 10 jun. 2025',
    km: '105.300 km',
    price: 'R$ 250,00',
    type: 'Filtro de óleo',
  },
];
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
              <h1>Revisões anteriores</h1>
            </div>
            <img :src="EditIcon" alt="" />
          </div>

          <CDivider class="divider" />

          <div class="tags">
            <CTag :id="1" :title="m.date" variant="default" />
            <CTag :id="2" :title="m.km" variant="default" />
            <CTag :id="3" :title="m.price" variant="default" />
            <CTag :id="4" :title="m.type" variant="default" />
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
