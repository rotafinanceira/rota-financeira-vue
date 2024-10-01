<template>
  <q-page>
    <HeaderBar
      title="Monitoriamento de Bateria"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle @vehicle-selected="setCarId" />

        <div class="card">
          <div class="text-wrapper">
            <div class="header-content">
              <span class="title">Manutenção</span>
              <div class="help-icon" @click="showHelpModal">
                <img :src="helpIcon" alt="Ícone de ajuda" />
              </div>
            </div>
            <span class="subtitle">Preencha com as informações sobre a última troca de bateria.</span>
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
              v-model="mileage"
              label="Ex: 86.540 km"
            ></q-input>
          </div>
          <div class="input-wrapper">
            <label for="brand">Marca</label>
            <q-select
              id="brand"
              outlined
              v-model="batteryBrand"
              :options="brandOptions"
              label="Insira a marca da bateria"
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
import ModalGenerico from '@/components/ModalGenerico.vue';
import ModalPositive from '@/components/ModalSucess.vue';
import helpIcon from '@/assets/helpIcon.svg';

const showDatePicker = ref(false);
const isLoading = ref(false);
const date = ref('');
const mileage = ref('');
const batteryBrand = ref('');
const selectedAmperage = ref(null);
const carId = ref(null);
const modalContent = ref('');
const modalDescription = ref('');
const isOpen = ref(false);

const isPositiveOpen = ref(false);
const successTitle = ref('');
const successDescription = ref('');

const brandOptions = [
  { label: 'Moura', value: 'Moura' },
  { label: 'Heliar', value: 'Heliar' },
  { label: 'ACDelco', value: 'ACDelco' },
  { label: 'Outro', value: 'Outro' }
];

const amperageOptions = [
  { label: '60 Ah', value: '60 Ah' },
  { label: '80 Ah', value: '80 Ah' },
  { label: '120 Ah', value: '120 Ah' }
];

const showHelpModal = () => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = [
    'Substitua a bateria se já tiver mais de 3 anos de uso;',
    'Troque a bateria se o carro apresentar dificuldade para ligar;',
    'Verifique a carga da bateria se as luzes internas estiverem fracas;',
    'Limpe os terminais ou troque a bateria em caso de corrosão visível.'
  ];
};


const onDateSelect = (value) => {
  date.value = value;
  showDatePicker.value = false;
};

const setCarId = (selectedCarId) => {
  carId.value = selectedCarId;
};

const handleSubmit = () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Cadastro de troca de bateria concluído!';
    successDescription.value = 'Informaremos sobre a próxima troca de bateria.';
    isPositiveOpen.value = true;

    date.value = '';
    mileage.value = '';
    batteryBrand.value = '';
    selectedAmperage.value = null;
  }, 1000);
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  background-color: #eff3f5;
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

.amperage-buttons {
  margin-top: 8px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.title {
  font-weight: bold; /* Torna o texto em negrito */
  font-size: 18px; /* Ajuste o tamanho da fonte, se necessário */
}

</style>
