<template>
  <div class="edit">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="Ícone de Finanças" />
      <h1>Guardar dinheiro</h1>
    </div>
    <div class="edit__card">
      <h2 class="card__title">
        Qual valor deseja guardar na reserva de manutenção?
      </h2>
      <div class="card__info">
        <span class="card__text">Valor Recomendado</span>
        <span class="card__value">{{ formattedRecommendedAmount }}</span>
      </div>
      <input class="card__input" placeholder="Ex: 20" v-model="amount" type="number" />
    </div>
    <button class="card__button" @click="handleSave">Salvar</button>
  </div>
</template>

<script setup lang="ts">
import { MoneyCircleIcon } from '@/shared/assets/icons';
import { ref, computed } from 'vue';
import { useFinancialStore } from '@/stores/financialStore';
import { useCarStore } from '@/stores/carStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const financialStore = useFinancialStore();
const { recommendedDailyAmount } = storeToRefs(financialStore);
const router = useRouter();

const amount = ref<string>('');

const formattedRecommendedAmount = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(recommendedDailyAmount.value);
});

async function handleSave() {
  console.log('[StoreMoney] Button clicked. Raw amount:', amount.value);
  // Ensure amount is string before replace, though ref<string> should be string.
  const val = String(amount.value); 
  const numericAmount = parseFloat(val.replace(',', '.'));
  console.log('[StoreMoney] Numeric amount:', numericAmount);

  if (!isNaN(numericAmount) && numericAmount > 0) {
    try {
      console.log('[StoreMoney] Checking licensePlate availability...');
      // Ensure car is loaded
      if (!financialStore.licensePlate) {
           console.log('[StoreMoney] License plate missing. Fetching cars...');
           const carStore = useCarStore();
           if (!carStore.car) {
               await carStore.getCars();
               console.log('[StoreMoney] Cars fetched:', carStore.cars);
               // Explicitly set the first car if none selected
               if (carStore.cars.length > 0 && !carStore.car) {
                   console.log('[StoreMoney] Setting first car as default:', carStore.cars[0]);
                   carStore.car = carStore.cars[0];
               } else {
                   console.warn('[StoreMoney] No cars found after fetch.');
               }
           }
      } else {
           console.log('[StoreMoney] License plate available:', financialStore.licensePlate);
      }

      console.log('[StoreMoney] Calling financialStore.deposit...');
      await financialStore.deposit(numericAmount);
      console.log('[StoreMoney] Deposit success. Navigating back.');
      router.back();
    } catch (e) {
      console.error('[StoreMoney] Error in deposit:', e);
      // Handle error (show toast manually if Quasar notify not available or just log for now)
    }
  } else {
    console.warn('[StoreMoney] Validation failed. isNaN:', isNaN(numericAmount), 'Amount:', numericAmount);
  }
}
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
