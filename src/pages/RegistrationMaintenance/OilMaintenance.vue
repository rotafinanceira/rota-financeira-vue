<template>
  <q-page>
    <HeaderBar
      title="Troca de Óleo"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle @vehicle-selected="setCarId" />
        <div class="card">
          <div class="title-wrapper">
            <div class="header-content">
              <span class="title">Manutenção*</span>
              <div @click="showHelpModal">
                <img :src="helpIcon" alt="Help Icon" />
              </div>
            </div>

            <span class="subtitle"
              >Preencha com as informações sobre a última troca de óleo.</span
            >
          </div>
          <div class="input-wrapper">
            <label for="last-oil-change">Última troca*</label>
            <q-input
              id="last-oil-change"
              outlined
              v-model="date"
              mask="##/##/####"
              label="Seleciona ou digita a data"
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
            <label for="mileage">Quilometragem da troca*</label>
            <div class="definitions-wrapper">
              <q-input
                id="mileage"
                outlined
                v-model="mileage"
                label="Ex: 86.540"
                type="number"
              ></q-input>
              <span>Km</span>
            </div>
          </div>
          <div class="input-wrapper">
            <label for="oil-type">Tipo*</label>
            <q-select
              id="oil-type"
              outlined
              v-model="oilType"
              :options="oilOptions"
              label="Escolha o tipo de óleo"
            ></q-select>
          </div>
          <div class="input-wrapper">
            <label for="liters">Litros utilizados*</label>
            <div class="definitions-wrapper">
              <q-input
                id="liters"
                outlined
                v-model="liters"
                label="Ex: 8"
                type="number"
              >
                <img :src="fuelIcon" alt="Fuel Icon" class="icons" />
              </q-input>
            </div>
          </div>
          <div class="input-wrapper">
            <label for="oil-brand">Marca</label>
            <q-input
              id="oil-brand"
              outlined
              v-model="oilBrand"
              label="Ex: Castrol"
            >
              <img :src="brandIcon" alt="Brand Icon" class="icons" />
            </q-input>
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
import fuelIcon from '@/assets/fuelIcon.svg';
import brandIcon from '@/assets/brandIcon.svg';

interface OilOptionsProps {
  label: string;
  value: string;
}

const showDatePicker = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const date = ref<string>('');
const mileage = ref<string>('');
const oilType = ref<string>('');
const liters = ref<string>('');
const oilBrand = ref<string>('');
const carId = ref<number | null>(null);
const modalContent = ref<string>('');
const modalDescription = ref<string[]>([]);
const isOpen = ref<boolean>(false);

const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('');
const successDescription = ref<string>('');

const oilOptions = ref<OilOptionsProps[]>([
  { label: 'Sintético', value: 'sintetico' },
  { label: 'Semi-Sintético', value: 'semi-sintetico' },
  { label: 'Mineral', value: 'mineral' },
  { label: 'Outro', value: 'outro' },
]);

const showHelpModal = (): void => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = [
    'O tempo recomendado para troca de óleo é de 6 a 12 meses.',
    'Troque de óleo a cada 10 mil quilômetros aproximadamente.',
    'O uso severo do veículo pode encurtar o intervalo de troca de óleo.',
    'Utilize o tipo de óleo e quantidade correta do modelo do seu veículo.',
    'Jamais misture óleos de viscosidades diferentes.',
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
    oilType.value = '';
    liters.value = '';
    oilBrand.value = '';
  }, 1000);
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
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #33373c;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
}

.q-input__inner {
  cursor: pointer;
}

.title {
  color: #0c0d0f;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
}
.subtitle {
  font-size: 14px;
  color: #5b6871;
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  line-height: 150%;
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

.text-wrapper .title {
  font-size: 18px;
  font-weight: bold;
}

.help-icon {
  cursor: pointer;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
