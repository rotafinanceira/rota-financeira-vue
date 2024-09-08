<template>
  <q-page>
    <HeaderBar
      title="Troca de Bateria"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle />

        <div class="card">
          <div class="text-wrapper">
            <span class="title">Cadastro de Bateria</span>
            <span class="subtitle">Insira os dados da sua última troca de bateria</span>
          </div>
          <div class="input-wrapper">
            <label for="last-oil-change">Última troca</label>
            <q-input
              id="last-oil-change"
              outlined
              v-model="date"
              mask="##/##/####"
              placeholder="Seleciona ou digita a data"
              @input="validateDate"
              @focus="showDatePicker = true"
            >
              <template v-slot:append>
                <q-icon name="event" @click="showDatePicker = !showDatePicker" />
              </template>
            </q-input>
            <q-menu v-model="showDatePicker" fit>
              <q-date v-model="date" mask="DD/MM/YYYY" @input="onDateSelect" />
            </q-menu>
          </div>

          <div class="input-wrapper">
            <label for="mileage">Quilometragem da última troca</label>
            <q-input
              id="mileage"
              outlined
              label="Ex: 86.540 km"
            ></q-input>
          </div>
          <div class="input-wrapper">
            <label for="brand">Marca da bateria</label>
            <q-select
              id="brand"
              outlined
              label="Insira a marca do filtro instalado"
            ></q-select>
          </div>
          <div class="input-wrapper">
            <label for="amperage">Amperagem da bateria</label>
            <div class="amperage-buttons">
              <q-radio
                v-for="option in amperageOptions"
                :key="option.value"
                :label="option.label"
                :val="option.value"
                v-model="selectedAmperage"
                color="primary"
                size="lg"
                dense
                :style="{ marginRight: '8px' }"
              />
            </div>
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
const selectedAmperage = ref(null);

const amperageOptions = [
  { label: '60Ah', value: '60Ah' },
  { label: '80Ah', value: '80Ah' },
  { label: '120Ah', value: '120Ah' }
];

function onDateSelect(value) {
  date.value = value;
  showDatePicker.value = false;
}

function validateDate() {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date.value)) {
    console.log('Data inválida!');
  }
}

function handleSubmit() {
  // Lógica para envio do formulário
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

.text-wrapper {
  margin-bottom: 16px;
}

.text-wrapper .title {
  font-size: 18px;
  font-weight: bold;
  display: block;
}

.text-wrapper .subtitle {
  font-size: 14px;
  display: block;
  color: #666;
}

.amperage-buttons {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
