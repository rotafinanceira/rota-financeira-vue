<template>
  <q-page>
    <HeaderBar
      title="Troca de Óleo"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle />
        <div class="card">
          <div>
            <span>Manutenção*</span>
          </div>
          <div class="input-wrapper">
            <label for="last-oil-change">Última troca</label>
            <q-input
              id="last-oil-change"
              outlined
              v-model="date"
              mask="##/##/####"
              placeholder="Seleciona ou digita a data"
              @focus="showDatePicker = true"
            >
              <template v-slot:append>
                <q-icon
                  name="event"
                  @click="showDatePicker = !showDatePicker"
                />
              </template>
            </q-input>
            <q-menu v-model="showDatePicker" fit>
              <q-date v-model="date" mask="DD/MM/YYYY" @input="onDateSelect" />
            </q-menu>
          </div>

          <div class="input-wrapper">
            <label for="mileage">Quilometragem*</label>
            <q-input
              id="mileage"
              outlined
              v-model="mileage"
              label="Ex: 86.540"
            ></q-input>
          </div>
          <div class="input-wrapper">
            <label for="oil-type">Tipo de Óleo*</label>
            <q-select
              id="oil-type"
              outlined
              v-model="oilType"
              :options="oilOptions"
              label="Selecione o tipo de óleo"
            ></q-select>
          </div>
          <div class="input-wrapper">
            <label for="liters">Litros utilizados*</label>
            <q-input
              id="liters"
              outlined
              v-model="liters"
              label="Insira o modelo do filtro instalado"
            ></q-input>
          </div>
          <div class="input-wrapper">
            <label for="oil-brand">Marca</label>
            <q-input
              id="oil-brand"
              outlined
              v-model="oilBrand"
              label="Ex: Castrol"
            ></q-input>
          </div>
        </div>
      </div>
      <ButtonComponent
        label="Finalizar"
        :isLoading="isLoading"
        @click="handleSubmit"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SelectVehicle from '@/components/SelectVehicle.vue';

const date = ref('');
const showDatePicker = ref(false);
const isLoading = ref(false);
const mileage = ref('');
const oilType = ref('');
const liters = ref('');
const oilBrand = ref('');

// Lista de opções para o tipo de óleo
const oilOptions = [
  { label: 'Sintético', value: 'sintetico' },
  { label: 'Semi-Sintético', value: 'semi-sintetico' },
  { label: 'Mineral', value: 'mineral' },
  { label: 'Outro', value: 'outro' },
];

function onDateSelect(value) {
  date.value = value;
  showDatePicker.value = false;
}

function handleSubmit() {
  // Lógica para envio do formulário
  console.log('Tipo de Óleo:', oilType.value);
}
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  background-color: #eff3f5;
  height: auto;
  padding: 24px 20px;
  gap: 32px;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
}

.input-wrapper {
  margin-bottom: 16px;
}

.q-input__inner {
  cursor: pointer;
}
</style>
