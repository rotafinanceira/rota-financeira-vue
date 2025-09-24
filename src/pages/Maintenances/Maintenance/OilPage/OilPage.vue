<script setup lang="ts">
import { CheckIcon, XIcon, OilLiquidIcon } from '@/shared/assets/icons';
import CButton from '@/shared/components/CButton.vue';
import wrenchImage from '../../../../shared/assets/illustrations/wrench.png';

const test = false;

const checkinStatus = [true, true, false, false, true, true, false];
</script>

<template>
  <div class="oil app-wrapper">
    <div class="oil__header">
      <img :src="OilLiquidIcon" alt="" />
      <h1>Troca de óleo</h1>
    </div>

    <div>
      <div class="oil__card">
        <div class="card__container">
          <img :src="wrenchImage" />
          <h2 class="card__title">Manutenção não cadastrada!</h2>

          <span class="card__text"
            >Você ainda não cadastrou nenhuma troca de óleo.</span
          >
        </div>
      </div>
    </div>

    <CButton
      variant="primary"
      @click="$router.push({ name: 'maintenance-oil-form' })"
    >
      Cadastrar manutenção
    </CButton>

    <div v-if="test" class="oil__card card">
      <div class="card__container">
        <h2 class="card__title">Check-in</h2>
        <p class="card__description">
          Deposite um valor na sua reserva de manutenção para completar seu
          check-in de hoje!
        </p>
        <div>
          <hr />
        </div>
        <div class="card__circles">
          <div
            v-for="(status, index) in checkinStatus"
            :key="index"
            class="circle"
            :class="status ? 'positive' : 'negative'"
          >
            <img
              :src="status ? CheckIcon : XIcon"
              alt=""
              class="circle__icon"
            />
          </div>
        </div>
      </div>
    </div>
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
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e0e5e7;
  }
}

.card__input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid #e0e5e7;
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

    .card__arrow {
      color: #307714;
      padding-right: 0.2rem;
      font-size: 0.75rem;
    }

    .card__value {
      font-weight: 600;
      font-size: 0.875rem;
      color: #307714;

      &-medium {
        color: #485159;
        font-weight: 600;
        font-size: 1rem;
      }
    }

    .card__link {
      font-size: 0.75rem;
      font-weight: 500;
      color: #307714;
      text-decoration: none;
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

.card__circles {
  display: flex;
  justify-content: space-between;
}

.circle__icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
}

.circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.positive {
    background-color: #48a72c;
  }

  &.negative {
    background-color: #ed4647;
  }
}

.edit {
  margin: 24px 20px;
  display: flex;
  flex-direction: column;
  &__card {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e0e5e7;
    padding: 16px;
    gap: 16px;
    margin-top: 24px;
    margin-bottom: 16px;
  }
}

hr {
  width: 100%;
  border: none;
  border-top: 1px solid #e0e5e7;
  margin: 0;
}

.separator {
  margin-bottom: 8px;
}
</style>
