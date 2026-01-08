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
        <span class="card__value">
          {{ formatInput(financeStore.summary.recommendedDailyValue) }}
        </span>
      </div>

      <CInput
        v-model="newValue"
        name="maintenanceValue"
        variant="money"
        placeholder="Ex: 20"
        required
      />
    </div>

    <button class="card__button" @click="save">Salvar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoneyCircleIcon } from '@/shared/assets/icons';
import { useFinanceStore } from '@/stores/finances/financeStore';
import CInput from '@/shared/components/CInput.vue';
import {
  formatInput,
  parseInputToNumber,
} from '@/shared/helper/inputFormatHelper';

const financeStore = useFinanceStore();
const newValue = ref<string>('');

function save() {
  const numericValue = parseInputToNumber(newValue.value);
  financeStore.storeMoney(numericValue);
  newValue.value = '';
}
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
