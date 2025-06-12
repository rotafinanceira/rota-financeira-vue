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
              Preencha as informações da manutenção do Filtro de
              Ar-Condicionado.
            </span>
          </div>

          <div class="input-wrapper">
            <label for="maintenance-value">Valor da manutenção*</label>
            <q-input
              id="maintenance-value"
              outlined
              v-model="maintenanceValue"
              placeholder="Digite o valor da manutenção"
            >
              <template v-slot:append>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </div>

          <div class="input-wrapper">
            <label for="last-filter-change">Data da troca*</label>
            <div class="definitions-wrapper">
              <q-input
                id="last-filter-change"
                outlined
                v-model="lastFilterChangeDate"
                mask="##/##/####"
                placeholder="Digite a data da última troca"
                @focus="showDatePicker = true"
              >
                <template v-slot:append>
                  <q-icon
                    name="event_note"
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

          <div class="input-wrapper">
            <label for="last-filter-cleaning">Data da limpeza*</label>
            <div class="definitions-wrapper">
              <q-input
                id="last-filter-cleaning"
                outlined
                v-model="lastFilterCleaningDate"
                mask="##/##/####"
                placeholder="Digite a data da última limpeza"
                @focus="showDatePickerCleaning = true"
              >
                <template v-slot:append>
                  <q-icon
                    name="event_note"
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
import ButtonComponent from '@/shared/components/ButtonComponent.vue';
import HeaderBar from '@/shared/components/HeaderBar.vue';
import SelectVehicle from '@/shared/components/SelectVehiclePlate.vue';
import ModalGenerico from '@/shared/components/ModalGenerico.vue';
import ModalPositive from '@/shared/components/ModalSucess.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';

const showDatePicker = ref<boolean>(false);
const showDatePickerCleaning = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const lastFilterChangeDate = ref<string>('');
const lastFilterCleaningDate = ref<string>('');
const maintenanceValue = ref<string>('');
const carId = ref<number | null>(null);
const modalContent = ref<string>('');
const modalDescription = ref<string[] | string>('');
const isOpen = ref<boolean>(false);

const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('Cadastro concluído!');
const successDescription = ref<string>(
  'Informaremos você sobre a próxima manutenção.'
);

const showHelpModal = (): void => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a manutenção?';
  modalDescription.value = [
    'Troque o filtro a cada 12-18 meses para evitar acúmulo de poeira e contaminantes.',
    'Em áreas poluídas, troque a cada 15.000-30.000 quilômetros.',
    'Fique atento a redução no fluxo de ar, odores estranhos ou mofo no interior do veículo.',
    'Consulte o manual do proprietário para orientações específicas do fabricante sobre a troca do filtro.',
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
    isPositiveOpen.value = true;

    lastFilterChangeDate.value = '';
    lastFilterCleaningDate.value = '';
    maintenanceValue.value = '';
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
  gap: 32px;
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

.input-wrapper label {
  font-weight: 500;
  font-size: 16px;
}

.subtitle {
  color: #5b6871;
}

.definitions-wrapper {
  position: relative;
  margin-top: 4px;
}

.text-wrapper {
  margin-bottom: 32px;
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
