<template>
  <div class="finances app-wrapper">
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
            <span class="card__value">{{ formattedRecommendedAmount }}</span>
          </div>
        </div>
      </div>
      <RouterLink class="card__button" :to="{ name: 'finances-store-money' }">
        Guardar dinheiro
      </RouterLink>
    </div>

    <div class="finances__card">
      <div class="card__container">
        <h2 class="card__title">Reserva de manutenção</h2>
        <div class="card__info">
          <span class="card__value-medium">{{ formattedBalance }}</span>
          <RouterLink class="card__link" :to="{ name: 'finances-edit-value' }"
            >Editar valor</RouterLink
          >
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
            :class="{
                'positive': status === 'done',
                'negative': status === 'missed',
                'neutral': status === 'pending'
            }"
          >
            <img
              v-if="status !== 'pending'"
              :src="status === 'done' ? CheckIcon : XIcon"
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
import { onMounted, computed } from 'vue';
import { useFinancialStore } from '@/stores/financialStore';
import { storeToRefs } from 'pinia';
import { useCarStore } from '@/stores/carStore';

const financialStore = useFinancialStore();
const { recommendedDailyAmount, maintenanceBalance } = storeToRefs(financialStore);
const carStore = useCarStore();

const formattedRecommendedAmount = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(recommendedDailyAmount.value);
});

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(maintenanceBalance.value);
});

const checkinStatus = computed(() => {
  const history = financialStore.checkInHistory || [];
  const statusArray = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate last 7 days (today + 6 days back)
  for (let i = 0; i < 7; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - i);
    
    // Check if any history entry matches this date
    const hasCheckIn = history.some((entry: any) => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0,0,0,0);
        return entryDate.getTime() === targetDate.getTime();
    });

    if (hasCheckIn) {
        statusArray.push('done');
    } else {
        // If it's today and not done, it's pending. Otherwise missed.
        if (i === 0) {
            statusArray.push('pending');
        } else {
            statusArray.push('missed');
        }
    }
  }
  return statusArray.reverse();
});

onMounted(async () => {
    // Wait for car to be loaded if not already
    if (carStore.car?.license_plate) {
        await Promise.all([
            financialStore.fetchRecommendedDailyAmount(),
            financialStore.fetchBalance(),
            financialStore.fetchCheckInHistory()
        ]);
    }
});
</script>

<style scoped lang="scss">
@import './_finances';
</style>
