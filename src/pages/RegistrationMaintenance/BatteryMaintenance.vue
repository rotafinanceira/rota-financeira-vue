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
            <div class="definitions-wrapper">
            <q-input
              id="mileage"
              outlined
              v-model="mileage"
              label="Ex: 86.540"
            ></q-input>
            <span>Km</span>
          </div>
          </div>
          <div class="input-wrapper">
            <label for="brand">Marca</label>
            <q-select
              id="brand"
              outlined
              v-model="batteryBrand"
              :options="brandOptions"
              label="Insira a marca da bateria"
            >
            <img :src="batteryIcon" alt="Battery Icon" class="icons" />
          </q-select>
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

<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SelectVehicle from '@/components/SelectVehicle.vue';
import ModalGenerico from '@/components/ModalGenerico.vue';
import ModalPositive from '@/components/ModalSucess.vue';
import helpIcon from '@/assets/helpIcon.svg';
import batteryIcon from '@/assets/batteryIcon.svg';

const showDatePicker = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const date = ref<string>('');
const mileage = ref<string>('');
const batteryBrand = ref<string>('');
const selectedAmperage = ref<string | null>(null);
const carId = ref<number | null>(null);
const modalContent = ref<string>('');
const modalDescription = ref<string[] | string>('');
const isOpen = ref<boolean>(false);

const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('');
const successDescription = ref<string>('');

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

const showHelpModal = (): void => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = [
    'Troque a bateria a cada 3 a 5 anos.',
    'Se o motor estiver demorando para ligar, a bateria pode estar fraca.',
    'Luzes do painel ou faróis mais fracos podem indicar desgaste da bateria.',
    'Odor de enxofre ou ovo podre pode indicar vazamento da bateria.'
  ];
};

const onDateSelect = (value: string): void => {
  date.value = value;
  showDatePicker.value = false;
};

const setCarId = (selectedCarId: number): void => {
  carId.value = selectedCarId;
};

const handleSubmit = (): void => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Cadastro concluído!';
    successDescription.value = 'Informaremos você sobre a próxima troca.';
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
  margin-bottom: 24px;
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
  font-weight: bold;
  font-size: 18px;
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
</style>
