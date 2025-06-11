<template>
  <section class="vehicle">
    <VehicleInfo v-if="!isEditing" :vehicle="vehicle" @on-editing="onEditing" />
    <VehicleEdit v-else />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VehicleInfo from './components/VehicleInfo.vue';
import { Vehicle } from './types';
import VehicleEdit from './components/VehicleEdit/VehicleEdit.vue';

// TODO: Add to pinia store
const vehicle = ref<Vehicle>({
  model: 'Toyota Corolla',
  plate: 'ABC-1234',
  year: 2020,
  color: 'Cinza',
  photo:
    'https://images.unsplash.com/photo-1531420853064-43de9aa4366b?q=80&w=512',
});

const isEditing = ref<boolean>(false);
const onEditing = () => {
  isEditing.value = !isEditing.value;
};
</script>

<style scoped lang="scss">
@import './_vehicles';
</style>
