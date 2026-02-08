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
    <button class="card__button" @click="handleSave" :disabled="loading">
      <q-spinner v-if="loading" color="white" size="1.5em" />
      <span v-else>Salvar</span>
    </button>
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
const loading = ref(false);

const formattedRecommendedAmount = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(recommendedDailyAmount.value);
});

async function handleSave() {
  if (loading.value) return;

  const val = String(amount.value); 
  const numericAmount = parseFloat(val.replace(',', '.'));

  if (!isNaN(numericAmount) && numericAmount > 0) {
    loading.value = true;
    try {
      const carStore = useCarStore();
      
      // Ensure car is loaded
      if (!financialStore.licensePlate) {
           if (!carStore.car) {
               await carStore.getCars();
               // Explicitly set the first car if none selected
               if (carStore.cars.length > 0 && !carStore.car) {
                   carStore.car = carStore.cars[0];
               }
           }
      }

      await financialStore.deposit(numericAmount);
      router.back();
    } catch (e) {
      console.error(e);
      // Handle error (show toast manually if Quasar notify not available or just log for now)
    } finally {
      loading.value = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
