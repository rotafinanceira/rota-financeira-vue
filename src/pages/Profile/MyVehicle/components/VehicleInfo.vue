<template>
  <div class="vehicle__wrapper">
    <div>
      <h2 class="vehicle__header">Informações do Veículo</h2>
      <div class="vehicle__info">
        <img class="vehicle__image" :src="vehicle.photo" alt="" />
        <div class="vehicle__tag">{{ vehicle.plate }}</div>
        <p class="vehicle__title">{{ vehicle.model }}</p>
        <div class="vehicle__info-data">
          <p>Modelo {{ vehicle.year }}</p>
          <p>{{ vehicle.color }}</p>
        </div>
      </div>
      <h2 class="vehicle__header">Manutenções</h2>
      <div class="maintenances">
        <div class="maintenances__icon__wrapper">
          <img :src="CarWrenchIcon" alt="" />
        </div>
        <p class="maintenances__text">
          {{ maintenanceCount }} {{ maintenanceText }}
        </p>
      </div>
    </div>

    <button class="vehicle__button" @click="$emit('onEditing')">
      Editar veículo
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Vehicle } from '../types';
import { CarWrenchIcon } from '@/shared/assets/icons';

const { vehicle } = defineProps<{
  vehicle: Vehicle;
}>();

defineEmits(['onEditing']);

const maintenanceCount = ref(5);
const maintenanceText = computed(() =>
  maintenanceCount.value === 1
    ? 'manutenção cadastrada'
    : 'manutenções cadastradas'
);
</script>

<style scoped lang="scss">
@import '../_vehicles';
</style>
