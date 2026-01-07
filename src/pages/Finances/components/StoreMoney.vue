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
          R$ {{ financeStore.summary.recommendedDailyValue }},00
        </span>
      </div>

      <input
        v-model.number="value"
        class="card__input"
        placeholder="Ex: 20"
        type="number"
      />
    </div>

    <button class="card__button" @click="save">Salvar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoneyCircleIcon } from '@/shared/assets/icons';
import { useFinanceStore } from '@/stores/finances/financeStore';

const financeStore = useFinanceStore();
const value = ref<number | null>(null);

function save() {
  if (!value.value) return;
  financeStore.storeMoney(value.value);
}
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
