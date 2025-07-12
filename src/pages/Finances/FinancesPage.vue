<template>
  <div class="finances">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="" />
      <h1>Finanças</h1>
    </div>

    <div>
      <div class="finances__card">
        <div class="card__container">
          <h2 class="card__title">
            Quanto guardar por dia?
            <img :src="InterrogationCircleIcon" alt="" />
          </h2>
          <div class="card__info">
            <span class="card__text">Valor Recomendado</span>
            <span class="card__value">R$ 20,00</span>
          </div>
        </div>
      </div>
      <RouterLink
        class="card__button"
        :to="{ name: 'finances-store-money'}"
      >
        Guardar dinheiro
      </RouterLink>
    </div>

    <div class="finances__card">
      <div class="card__container">
        <h2 class="card__title">Reserva de manutenção</h2>
        <div class="card__info">
          <span class="card__value-medium">R$ 200,00</span>
          <RouterLink class="card__link" :to="{ name: 'finances-edit-value'}">Editar valor</RouterLink>
        </div>
        <div>
          <div>
            <hr class="separator" />
            <div class="card__info">
              <span class="card__text light">Progresso da última semana: </span>
              <div>
                <span class="card__arrow">↑</span>
                <span class="card__text light">100,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="finances__card card">
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

<script setup lang="ts">
import {
  MoneyCircleIcon,
  InterrogationCircleIcon,
  CheckIcon,
  XIcon,
} from '@/shared/assets/icons';
import { RouterLink } from 'vue-router';
const checkinStatus = [true, true, false, false, true, true, false];
</script>

<style scoped lang="scss">
@import './_finances';
</style>
