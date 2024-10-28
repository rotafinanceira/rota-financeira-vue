<template>
  <q-page>
    <HeaderBar
      title="Filtro de Ar-Condicionado"
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
            <span class="subtitle">
              Preencha as informações da manutenção do Filtro de Ar-Condicionado.
            </span>
          </div>

          <!-- Data da última troca do filtro de ar-condicionado -->
          <div class="input-wrapper">
            <label for="last-filter-change">Última troca*</label>
            <div class="definitions-wrapper">
              <q-input
                id="last-filter-change"
                outlined
                v-model="lastFilterChangeDate"
                mask="##/##/####"
                placeholder="Insira a data da última troca"
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
                <q-date
                  v-model="lastFilterChangeDate"
                  mask="DD/MM/YYYY"
                  @input="onDateSelect"
                />
              </q-menu>
            </div>
          </div>

          <!-- Data da última limpeza do filtro de ar-condicionado -->
          <div class="input-wrapper">
            <label for="last-filter-cleaning">Última limpeza*</label>
            <div class="definitions-wrapper">
              <q-input
                id="last-filter-cleaning"
                outlined
                v-model="lastFilterCleaningDate"
                mask="##/##/####"
                placeholder="Insira a data da última limpeza"
                @focus="showDatePickerCleaning = true"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    @click="showDatePickerCleaning = !showDatePickerCleaning"
                  />
                </template>
              </q-input>
              <q-menu v-model="showDatePickerCleaning" fit>
                <q-date
                  v-model="lastFilterCleaningDate"
                  mask="DD/MM/YYYY"
                  @input="onDateSelectCleaning"
                />
              </q-menu>
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

const showDatePicker = ref<boolean>(false);
const showDatePickerCleaning = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const lastFilterChangeDate = ref<string>('');
const lastFilterCleaningDate = ref<string>('');
const carId = ref<number | null>(null);
const modalContent = ref<string>('');
const modalDescription = ref<string[] | string>('');
const isOpen = ref<boolean>(false);

const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('');
const successDescription = ref<string>('');

const showHelpModal = (): void => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a manutenção?';
  modalDescription.value = [
    'Troque o filtro a cada 12-18 meses para evitar acúmulo de poeira e contaminantes.',
    'Em áreas poluídas, troque a cada 15.000-30.000 quilômetros.',
    'Fique atento a redução no fluxo de ar, odores estranhos ou mofo no interior do veículo.',
    'Consulte o manual do proprietário para orientações específicas do fabricante sobre a troca do filtro.'
  ];
};

const onDateSelect = (value: string): void => {
  lastFilterChangeDate.value = value;
  showDatePicker.value = false;
};

const onDateSelectCleaning = (value: string): void => {
  lastFilterCleaningDate.value = value;
  showDatePickerCleaning.value = false;
};

const setCarId = (selectedCarId: number): void => {
  carId.value = selectedCarId;
};

const handleSubmit = (): void => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Cadastro concluído!';
    successDescription.value = 'Informaremos você sobre a próxima manutenção.';
    isPositiveOpen.value = true;

    lastFilterChangeDate.value = '';
    lastFilterCleaningDate.value = '';
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
  margin-bottom: 24px;
  flex-direction: column;
  gap: 6px;
  display: flex;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-weight: bold;
  font-size: 18px;
}
</style>
