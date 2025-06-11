<template>
  <div class="card">
    <div class="wrapper-title">
      <h3 class="title">Veículo</h3>
      <span class="subtitle"
        >Insira o modelo do veículo que deseja cadastrar.</span
      >
    </div>
    <div class="input-wrapper">
      <label for="select-vehicle" class="select-vehicle-label">Modelo*</label>
      <q-select
        id="select-vehicle"
        v-model="selectedVehicle"
        label="Cadastre seu carro"
        outlined
        :options="options"
        input-class="custom-padding"
      >
        <template v-slot:dropdown-icon>
          <img :src="ArrowIcon" alt="Down Arrow" />
        </template>
      </q-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowIcon } from '../assets/icons';

const options = ['Fusca', 'HB20', 'Polo', 'Ferrari', 'IX35'];
const selectedVehicle = ref('');
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrapper-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  color: #0c0d0f;
  line-height: 22px;
  font-weight: bold;
}

.subtitle {
  font-weight: 400;
  line-height: 21px;
  font-size: 14px;
  color: #5b6871;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.select-vehicle-label {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #33373c;
}

.custom-padding .q-field__native {
  padding: 12px 44px 12px 16px !important;
}
</style>
