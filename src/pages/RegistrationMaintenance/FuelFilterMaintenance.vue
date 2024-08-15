<template>
  <q-page>
    <HeaderBar
      title="Filtro de Combustiível"
      subtitle="Filtro de Combustiível"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <div class="card">
          <div class="text-wrapper">
            <span class="title">Selecione o veículo</span>
            <span class="subtitle">Escolha o carro para o qual deseja cadastrar a manutenção</span>
          </div>
          <div class="input-wrapper">
            <label for="select-vehicle">Selecione seu carro*</label>
            <q-select
              id="select-vehicle"
              label="Placa do seu veículo"
              outlined
            ></q-select>
          </div>
        </div>

        <!-- Segundo card: Manutenção -->
        <div class="card">
          <div class="text-wrapper">
            <span class="title">Última troca</span>
          </div>
          <div class="input-wrapper">
            <label for="last-oil-change">Data*</label>
            <q-input
              id="last-oil-change"
              outlined
              v-model="date"
              mask="##/##/####"
              placeholder="Ex: 12/06/2024"
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
            <label for="mileage">Quilometragem*</label>
            <q-input
              id="mileage"
              outlined
              label="Ex: 86.540 km"
            ></q-input>
          </div>
          <div class="input-wrapper">
            <label for="brand">Marca</label>
            <q-select
              id="brand"
              outlined
              label="Ex: Authomix"
            ></q-select>
          </div>
          <div class="input-wrapper">
            <label for="model">Modelo*</label> <!-- Mudança do id para model -->
              <q-input
              id="model"
              outlined
              label="Ex: Main-Filter"
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

const date = ref('');
const showDatePicker = ref(false);
const isLoading = ref(false);


function onDateSelect(value) {
  date.value = value;
  showDatePicker.value = false;
}

function validateDate() {
  // Pode adicionar uma validação adicional aqui, se necessário
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
