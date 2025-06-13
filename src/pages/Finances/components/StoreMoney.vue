<template>
  <AppHeader />
  <div class="store">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="Ícone de Finanças" />
      <h1>Guardar dinheiro</h1>
    </div>
    <div class="store__card">
      <h2 class="card__title">
        Qual valor deseja guardar na reserva de manutenção?
      </h2>
      <div class="card__info">
        <span class="card__text">Valor Recomendado</span>
        <span class="card__value">R$ 20,00</span>
      </div>
      <input class="card__input" placeholder="Ex: 20" />
    </div>
    <button class="card__button">Salvar</button>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/shared/components/AppHeader.vue';
import { MoneyCircleIcon } from '@/shared/assets/icons';
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
