<template>
  <section class="vehicle__wrapper app-wrapper">
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

    <RouterLink class="vehicle__button" :to="{ name: 'user-vehicle-edit' }">
      Editar veículo
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CarWrenchIcon } from '@/shared/assets/icons';
import { RouterLink } from 'vue-router';
import { useCarStore } from '@/stores/carStore';

const carStore = useCarStore();

onMounted(async () => {
  if (carStore.cars.length === 0) {
    await carStore.getCars();
  }
});

const vehicle = computed(() => {
  const currentCar = carStore.car || carStore.cars[0] || {};
  return {
    model: currentCar.model || 'Sem modelo',
    plate: currentCar.license_plate || '---',
    year: currentCar.year || '---',
    color: currentCar.color || '---',
    photo:
      'https://images.unsplash.com/photo-1531420853064-43de9aa4366b?q=80&w=512',
  };
});

const maintenanceCount = ref(0); // TODO: fetch actual count if needed
const maintenanceText = computed(() =>
  maintenanceCount.value === 1
    ? 'manutenção cadastrada'
    : 'manutenções cadastradas'
);
</script>

<style scoped lang="scss">
@import './_vehicle';
</style>
