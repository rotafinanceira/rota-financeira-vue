<template>
  <div class="edit">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="Ícone de Finanças" />
      <h1>Editar Valor</h1>
    </div>
    <div class="edit__card">
      <h2 class="card__title">
        Qual será o novo valor da sua reserva de manutenção?
      </h2>
      <div class="card__info">
        <span class="card__text">Valor atual</span>
        <span class="card__value">{{ formattedBalance }}</span>
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
const { maintenanceBalance } = storeToRefs(financialStore);
const router = useRouter();

const amount = ref<string>('');

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(maintenanceBalance.value);
});

async function handleSave() {
  const val = String(amount.value); 
  const numericAmount = parseFloat(val.replace(',', '.'));
  
  if (!isNaN(numericAmount) && numericAmount >= 0) {
    try {
        // Ensure car is loaded
        if (!financialStore.licensePlate) {
             const carStore = useCarStore();
             if (!carStore.car) {
                 await carStore.getCars();
                 if (carStore.cars.length > 0 && !carStore.car) {
                     carStore.car = carStore.cars[0];
                 }
             }
        }
      await financialStore.setBalance(numericAmount);
      router.back();
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
