<template>
  <q-page>
    <HeaderBar
      title="Filtro de Combustiível"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle />
        <div class="card">
          <div class="text-wrapper">
            <div class="header-content">
              <span class="title">Manutenção</span>
              <div class="help-icon" @click="showHelpModal">
                <img :src="helpIcon" alt="Ícone de ajuda" />
              </div>
            </div>
            <span class="subtitle">Preencha com as informações sobre a última troca do filtro de combustível.</span>
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
            <label for="mileage">Quilometragem da troca*</label>
            <q-input
              id="mileage"
              outlined
              v-model="mileage"
              label="Ex: 86.540 km"
            />
          </div>

          <div class="input-wrapper">
            <label for="brand">Marca*</label>
            <q-input
              id="brand"
              outlined
              v-model="brand"
              label="Ex: Authomix"
            />
          </div>

          <div class="input-wrapper">
            <label for="model">Modelo*</label>
            <q-input
              id="model"
              outlined
              v-model="model"
              label="Ex: Main-Filter"
            />
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
    <ModalPositive
      :title="successTitle"
      :open="isPositiveOpen"
      :description="successDescription"
      @close="isPositiveOpen = false"
      :text-button="'Fechar'"
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
const mileage = ref('');
const model = ref('');
const brand = ref('');
const invalidDate = ref(false);
const modalContent = ref('Ajuda');
const modalDescription = ref('Este formulário é usado para registrar as informações sobre a troca de combustíveis do veículo. Preencha todos os campos obrigatórios.');
const isOpen = ref(false);
const successTitle = ref('');
const successDescription = ref('');
const isPositiveOpen = ref(false);

import ModalPositive from '@/components/ModalSucess.vue';


function onDateSelect(value) {
  date.value = value;
  showDatePicker.value = false;
  validateDate();
}

function validateDate() {
  invalidDate.value = !/^\d{2}\/\d{2}\/\d{4}$/.test(date.value);
}

function handleSubmit() {
  // Validar campos obrigatórios
  // if (!date.value || !mileage.value || !brand.value || !model.value) {
  //   modalContent.value = 'Erro';
  //   modalDescription.value = 'Por favor, preencha todos os campos obrigatórios.';
  //   isOpen.value = true;
  //   return;
  // }

  // Simular envio de dados
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Cadastro concluído!';
    successDescription.value = 'Informaremos sobre a próxima troca de bateria.';
    isPositiveOpen.value = true;

    // Limpar o formulário
    date.value = '';
    mileage.value = '';
    brand.value = '';
    model.value = '';
  }, 2000); // Simulando um delay de 2 segundos
}

const showHelpModal = () => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = `
    <ul>
      <li>Troque o filtro de combustível quando apresentar sinais de mal estado.</li>
      <li>Siga a frequência indicada no manual do fabricante do veículo.</li>
      <li>Não limpe o filtro de combustível; substitua-o por um novo.</li>
      <li>Atualmente, a maioria dos manuais recomenda a troca a cada 10.000 km (antigamente, era a cada 30.000 km).</li>
    </ul>
  `;
};
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

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-wrapper .title {
  font-size: 18px;
  font-weight: bold;
}

.help-icon {
  cursor: pointer;
}

.text-wrapper .subtitle {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.error-message {
  color: red;
  margin-top: 16px;
}
</style>
