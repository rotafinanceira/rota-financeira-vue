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
        <span class="card__value">R$ 200,00</span>
      </div>
      <input class="card__input" placeholder="Ex: 20" />
    </div>
    <button class="card__button">Salvar</button>
  </div>
</template>

<script setup lang="ts">
import { MoneyCircleIcon } from '@/shared/assets/icons';
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
