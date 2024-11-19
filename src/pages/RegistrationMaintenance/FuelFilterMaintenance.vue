<template>
  <q-page>
    <HeaderBar
      title="Filtro de Combustível"
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
            <span class="subtitle">Preencha as informações da manutenção de Filtro de Combustível.</span>
          </div>

          <div class="input-wrapper">
            <label for="value">Valor</label>
            <q-input
              id="value"
              outlined
              v-model="value"
              placeholder="Digite o valor da manutenção"
            >
              <template v-slot:append>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </div>

          <div class="input-wrapper">
            <label for="last-oil-change">Data da troca</label>
            <q-input
              id="last-oil-change"
              outlined
              v-model="date"
              mask="##/##/####"
              placeholder="Digite a data da última troca"
              @input="validateDate"
              @focus="showDatePicker = true"
            >
              <template v-slot:append>
                <q-icon name="event_note" @click="showDatePicker = !showDatePicker" />
              </template>
            </q-input>
            <q-menu v-model="showDatePicker" fit>
              <q-date v-model="date" mask="DD/MM/YYYY" @input="onDateSelect" />
            </q-menu>
          </div>

          <div class="input-wrapper">
            <label for="mileage">Quilometragem da troca</label>
            <div class="definitions-wrapper">
              <q-input
                id="mileage"
                outlined
                v-model="mileage"
                placeholder="Digite a quilometragem da última troca"
              ></q-input>
              <span>Km</span>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="model">Modelo</label>
            <q-input
              id="model"
              outlined
              v-model="model"
              placeholder="Digite o modelo utilizado"
            >
              <img :src="filterIcon" alt="Filter Icon" class="icons" />
            </q-input>
          </div>

          <div class="input-wrapper">
            <label for="brand">Marca</label>
            <q-input
              id="brand"
              outlined
              v-model="brand"
              placeholder="Digite a marca utilizada"
            >
              <img :src="RMarcaFiltroIcon" alt="Marca Icon" class="icons" />
            </q-input>
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

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SelectVehicle from '@/components/SelectVehicle.vue';
import helpIcon from '@/assets/helpIcon.svg';
import ModalGenerico from '@/components/ModalGenerico.vue';
import filterIcon from '@/assets/filterIcon.svg';
import RMarcaFiltroIcon from '@/assets/RMarcaFiltroIcon.svg';
import ModalPositive from '@/components/ModalSucess.vue';

const date = ref<string>('');
const showDatePicker = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const mileage = ref<string>('');
const model = ref<string>('');
const brand = ref<string>('');
const value = ref<string>('');
const invalidDate = ref<boolean>(false);
const modalContent = ref<string>('Ajuda');
const modalDescription = ref<Array<string> | string>('Este formulário é usado para registrar as informações sobre a troca de combustíveis do veículo. Preencha todos os campos obrigatórios.');
const isOpen = ref<boolean>(false);
const successTitle = ref<string>('');
const successDescription = ref<string>('');
const isPositiveOpen = ref<boolean>(false);

function onDateSelect(value: string) {
  date.value = value;
  showDatePicker.value = false;
  validateDate();
}

function validateDate() {
  invalidDate.value = !/^\d{2}\/\d{2}\/\d{4}$/.test(date.value);
}

function handleSubmit() {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Cadastro concluído!';
    successDescription.value = 'Informaremos sobre a próxima troca de filtro de óleo.';
    isPositiveOpen.value = true;

    // Limpar o formulário
    date.value = '';
    mileage.value = '';
    brand.value = '';
    model.value = '';
    value.value = '';
  }, 2000);
}

const showHelpModal = () => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = [
    'Troque o filtro de combustível quando apresentar sinais de mal estado.',
    'Siga a frequência indicada no manual do fabricante do veículo.',
    'Não limpe o filtro de combustível; substitua-o por um novo.',
    'Atualmente, a maioria dos manuais recomenda a troca a cada 10.000 km (antigamente, era a cada 30.000 km).'
  ];
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
.icons {
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
  top: 35%;
  position: absolute;
  right: 0;
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
  margin-bottom: 20px;
}
.definitions-wrapper {
  position: relative;
}

.definitions-wrapper span {
  position: absolute;
  right: 12px;
  top: 18px;
  font-size: 14px;
  color: #9ba7ad;
}
.q-input__inner {
  cursor: pointer;
}

.text-wrapper {
  margin-bottom: 32px;
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
  color: #5B6871;
}

.error-message {
  color: red;
  margin-top: 16px;
}
</style>
