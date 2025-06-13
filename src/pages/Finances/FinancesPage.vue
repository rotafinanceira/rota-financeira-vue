<template>
  <AppHeader />
  <div class="finances">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="Ícone de Finanças" />
      <h1>Finanças</h1>
    </div>

    <div class="finances__card">
      <div class="card__container">
        <h2 class="card__title">
          Quanto guardar por dia?
          <img :src="InterrogationCircleIcon" alt="Ícone de Interrogação" />
        </h2>
        <div class="card__info">
          <span class="card__text">Valor Recomendado</span>
          <span class="card__value">R$ 20,00</span>
        </div>
      </div>
      <button class="card__button" @click="navigateTo('/finances/store-money')">
        Guardar dinheiro
      </button>
    </div>

    <div class="finances__card">
      <div class="card__container">
        <h2 class="card__title">Reserva de manutenção</h2>
        <div class="card__info">
          <span class="card__value-medium">R$ 200,00</span>
          <a class="card__link" href="#">Editar valor</a>
        </div>
        <div class="card__info">
          <span class="card__text light">Progresso da última semana: </span>
          <div>
            <span class="card__arrow">↑</span>
            <span class="card__text light">100,00</span>
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
        <div class="card__circles">
          <div
            v-for="(status, index) in checkinStatus"
            :key="index"
            class="circle"
            :class="status ? 'positive' : 'negative'"
          >
            <span class="circle__text">
              {{ status ? '✔' : '✖' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/shared/components/AppHeader.vue';
import {
  MoneyCircleIcon,
  InterrogationCircleIcon,
} from '@/shared/assets/icons';
import { useRouter } from 'vue-router';

const router = useRouter();
const checkinStatus = [true, false, true, false, false];

function navigateTo(path: string) {
  router.push(path);
}
</script>

<style scoped lang="scss">
@import './_finances';
</style>
