<template>
  <q-page>
    <HeaderBar
      title="Filtro de Combustiível"
      subtitle="Filtro de Combustiível"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle />
        <div class="card">
          <div class="text-wrapper">
            <span class="title">Última troca</span>
            <div @click="openHelpModal">
              <img :src="helpIcon" alt="Ícone de ajuda" />
            </div>
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
              v-model="mileage"
              label="Ex: 86.540 km"
            ></q-input>
          </div>

          <div class="input-wrapper">
            <label for="brand">Marca</label>
            <q-input
              id="brand"
              outlined
              v-model="brand"
              label="Ex: Authomix"
            ></q-input>
          </div>

          <div class="input-wrapper">
            <label for="model">Modelo*</label>
            <q-input
              id="model"
              outlined
              v-model="model"
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
      <div v-if="invalidDate" class="error-message">
        Data inválida! Por favor, insira uma data no formato correto (DD/MM/YYYY).
      </div>
    </div>
    <ModalGenerico
      :title="modalContent"
      :open="isOpen"
      :description="modalDescription"
      :text-button="'Fechar'"
      @close="isOpen = false"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SelectVehicle from '@/components/SelectVehicle.vue';
import helpIcon from '@/assets/helpIcon.svg';
import ModalGenerico from '@/components/ModalGenerico.vue';

const date = ref('');
const showDatePicker = ref(false);
const isLoading = ref(false);
const mileage = ref(''); // Quilometragem
const model = ref('');   // Modelo
const brand = ref('');   // Marca
const invalidDate = ref(false);
const modalContent = ref('Ajuda');
const modalDescription = ref('Este formulário é usado para registrar as informações sobre a troca de combustíveis do veículo. Preencha todos os campos obrigatórios.');
const isOpen = ref(false);

function onDateSelect(value) {
  date.value = value;
  showDatePicker.value = false;
  validateDate(); // Validate the date when it's selected
}

function validateDate() {
  invalidDate.value = !/^\d{2}\/\d{2}\/\d{4}$/.test(date.value);
}

function handleSubmit() {
  // Lógica para envio do formulário
}

function openHelpModal() {
  isOpen.value = true; // Abre o modal genérico
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
  display: flex;
  justify-content: space-between;
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
