<template>
  <q-page>
    <HeaderBar title="Cadastro do veículo" :path="'/'" :show-info-car="false" />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle @vehicle-selected="setCarId" />

        <div class="card">
          <div class="text-wrapper">
            <div class="header-content">
              <span class="title">Características do Veículo</span>
            </div>
            <span class="subtitle"
              >Preencha com as informações do veículo que deseja
              cadastrar.</span
            >
          </div>

          <!-- Placa -->
          <div class="input-wrapper">
            <label for="licensePlate">Placa*</label>
            <div class="definitions-wrapper">
              <q-input
                id="licensePlate"
                outlined
                v-model="licensePlate"
                label="Digite a placa do seu veículo"
              ></q-input>
              <span>
                <div class="car-icon">
                  <img :src="carIcon" alt="Ícone do carro" />
                </div>
              </span>
            </div>
          </div>

          <!-- Ano de Fabricação -->
          <div class="input-wrapper">
            <label for="manufacturing-date">Ano de fabricação*</label>
            <div class="definitions-wrapper">
              <q-input
                id="manufacturing-date"
                outlined
                v-model="manufacturingDate"
                label="Ex: 2020"
              ></q-input>
              <span>
                <div class="date-icon">
                  <img :src="dateIcon" alt="Ícone da data" />
                </div>
              </span>
            </div>
          </div>

          <!-- Cor -->
          <div class="input-wrapper">
            <label for="color">Cor*</label>
            <div class="definitions-wrapper">
              <q-input
                id="color"
                outlined
                v-model="color"
                label="Ex: Cinza"
              ></q-input>
              <span>
                <div class="color-icon">
                  <img :src="colorIcon" alt="Ícone da cor do carro" />
                </div>
              </span>
            </div>
          </div>

          <!-- Quilometragem atual -->
          <div class="input-wrapper">
            <label for="current-mileage">Quilometragem atual*</label>
            <div class="definitions-wrapper">
              <q-input
                id="current-mileage"
                outlined
                v-model="currentMileage"
                label="Ex: 123.456"
              ></q-input>
              <span>Km</span>
            </div>
          </div>

          <div class="input-wrapper">
            <div>
              <label>Combustível*</label>
              <span class="subtitle"
                >Insira as características do seu veículo</span
              >
            </div>
            <div class="fuel-input">
              <div class="fuel-input-items-wrapper">
                <div
                  class="fuel-input-item"
                  :class="{ active: selectedFuel === 'Gasolina' }"
                  @click="handleClickFuelSelected('Gasolina')"
                >
                  Gasolina
                </div>
                <div
                  class="fuel-input-item"
                  :class="{ active: selectedFuel === 'Etanol' }"
                  @click="handleClickFuelSelected('Etanol')"
                >
                  Etanol
                </div>
              </div>
              <div class="fuel-input-items-wrapper">
                <div
                  class="fuel-input-item"
                  :class="{ active: selectedFuel === 'Elétrico' }"
                  @click="handleClickFuelSelected('Elétrico')"
                >
                  Elétrico
                </div>
                <div
                  class="fuel-input-item"
                  :class="{ active: selectedFuel === 'Diesel' }"
                  @click="handleClickFuelSelected('Diesel')"
                >
                  Diesel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ButtonComponent
        label="Salvar"
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
      @close="isPositiveOpen = false"
      :text-button="'Fechar'"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from '@/shared/components/ButtonComponent.vue';
import HeaderBar from '@/shared/components/HeaderBar.vue';
import SelectVehicle from '@/shared/components/SelectVehicleModel.vue';
import ModalGenerico from '@/shared/components/ModalGenerico.vue';
import ModalPositive from '@/shared/components/ModalSucess.vue';
import dateIcon from '@/assets/dateIcon.svg';
import carIcon from '@/assets/carIcon.svg';
import colorIcon from '@/assets/colorIcon.svg';

const isLoading = ref<boolean>(false);
const date = ref<string>('');
const color = ref<string>('');
const manufacturingDate = ref<string>('');
const currentMileage = ref<string>('');
const carId = ref<number | null>(null);
const modalContent = ref<string>('');
const modalDescription = ref<string[] | string>('');
const isOpen = ref<boolean>(false);
const licensePlate = ref<string>('');
const selectedFuel = ref<string | null>(null);
const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('');

const setCarId = (selectedCarId: number): void => {
  carId.value = selectedCarId;
};

const handleClickFuelSelected = (fuel: string): void => {
  selectedFuel.value = fuel;
};

const handleSubmit = (): void => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Veículo cadastrado!';
    isPositiveOpen.value = true;

    date.value = '';
    color.value = '';
    manufacturingDate.value = '';
    currentMileage.value = '';
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

.input-wrapper label {
  font-weight: 500;
  font-size: 16px;
}

.definitions-wrapper {
  position: relative;
  margin-top: 4px;
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
  margin-bottom: 20px;
  flex-direction: column;
  gap: 6px;
  display: flex;
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

.subtitle {
  font-weight: 400;
  line-height: 21px;
  font-size: 14px;
  color: #5b6871;
  display: block;
}

.fuel-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
}

.fuel-input-items-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.fuel-input-item {
  flex: 1;
  width: 50%;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #c2c9cd;
  padding: 8px 12px;
  font-weight: 600;
  font-size: 14px;
}

.active {
  background-color: #e2eafd;
  color: #32337d;
  border: 1px solid #e2eafd;
}
</style>
