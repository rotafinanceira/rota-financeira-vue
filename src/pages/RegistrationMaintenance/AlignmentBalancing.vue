<template>
  <q-page>
    <HeaderBar title="Manutenções" :path="'/'" />
    <div class="title-wrapper">
      <img :src="alignmentIcon" alt="Ícone" class="title-icon" />
      <span class="title-text">Alinhamento e Balanceamento</span>
    </div>
    <div class="main-content">
      <div class="card-wrapper">
        <!-- <SelectVehicle @vehicle-selected="setCarId" /> -->

        <div class="card">
          <div class="text-wrapper">
            <div class="header-content">
              <span class="title">Cadastro</span>
              <div class="help-icon" @click="showHelpModal">
                <img :src="helpIcon" alt="Ícone de ajuda" />
              </div>
            </div>
            <span class="subtitle">
              Preencha as informações da manutenção do balanceamento e
              alinhamento do seu carro.
            </span>
          </div>

          <!-- Quilometragem da última manutenção -->
          <div class="input-wrapper">
            <label for="last-maintenance-mileage"
              >Quilometragem da troca*</label
            >
            <div class="definitions-wrapper">
              <q-input
                id="last-maintenance-mileage"
                outlined
                v-model="lastMaintenanceMileage"
                label="Km da última manutenção"
              ></q-input>
              <span>Km</span>
            </div>
          </div>

          <!-- Valor de Serviço -->
          <div class="input-wrapper">
            <label for="service-value">Valor de Serviço*</label>
            <div class="definitions-wrapper">
              <q-input
                id="service-value"
                outlined
                v-model="serviceValue"
                label="Insira o valor do serviço"
              >
                <template v-slot:append>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>
          </div>

          <!-- Serviço -->
          <div class="input-wrapper">
            <label for="service-type">Serviço*</label>
            <div class="definitions-wrapper">
              <q-select
                id="service-type"
                outlined
                v-model="serviceType"
                :options="serviceOptions"
                label="Selecione o tipo de serviço"
              ></q-select>
            </div>
          </div>

          <!-- Localização -->
          <div class="input-wrapper">
            <label for="location">Rodas*</label>
            <div class="definitions-wrapper">
              <q-select
                id="location"
                outlined
                v-model="location"
                :options="locationOptions"
                label="Por favor selecione..."
              ></q-select>
            </div>
          </div>

          <!-- Data do Serviço -->
          <div class="input-wrapper">
            <label for="last-tire-change">Data do Serviço*</label>
            <div class="definitions-wrapper">
              <q-input
                id="last-tire-change"
                outlined
                v-model="formattedDate"
                mask="##/##/####"
                placeholder="__ / __ / ____"
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
                  v-model="date"
                  mask="YYYY-MM-DD"
                  @update:model-value="onDateSelect"
                />
              </q-menu>
            </div>
          </div>

          <!-- Oficina -->
          <div class="input-wrapper">
            <label for="workshop">Oficina*</label>
            <div class="definitions-wrapper">
              <q-input
                id="workshop"
                outlined
                v-model="workshop"
                label="Insira o nome da oficina"
              ></q-input>
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
import { ref, computed } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
// import SelectVehicle from '@/components/SelectVehiclePlate.vue';
import ModalGenerico from '@/components/ModalGenerico.vue';
import ModalPositive from '@/components/ModalSucess.vue';
import helpIcon from '@/assets/helpIcon.svg';
import alignmentIcon from '@/assets/Alinham.svg';
import { date as quasarDate } from 'quasar';

const showDatePicker = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const date = ref<string>('');
const formattedDate = computed(() =>
  date.value ? quasarDate.formatDate(date.value, 'DD/MM/YYYY') : ''
);
const mileage = ref<string>('');
const tireDiameter = ref<string>('');
const tireRotation = ref<string>('');
// const carId = ref<number | null>(null);
const modalContent = ref<string>('');
const modalDescription = ref<string[] | string>('');
const isOpen = ref<boolean>(false);
const lastMaintenanceMileage = ref<string>('');
const serviceValue = ref<string>('');

const serviceType = ref<string>('');
const serviceOptions = ref<string[]>([
  'Alinhamento',
  'Balanceamento',
  'Alinhamento e Balanceamento',
]);

const location = ref<string>('');
const locationOptions = ref<string[]>(['Dianteira', 'Traseira', 'Todas']);

const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('');
const successDescription = ref<string>('');

const showHelpModal = (): void => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a manutenção?';
  modalDescription.value = [
    'A recomendação é fazer esse tipo de manutenção a cada 10.000km rodados.',
    'Fique atento a vibrações no volante, desgaste irregular dos pneus e puxões do veículo para um lado.',
    'Troque seus pneus se tiverem mais de 5 anos, mesmo que pareçam bons. O material envelhece e pode não ser seguro.',
    'Troque após rodar entre 40.000 e 60.000 km. Pneus muito usados perdem eficiência.',
  ];
};

const onDateSelect = (value: string): void => {
  date.value = value;
  showDatePicker.value = false;
};

// const setCarId = (selectedCarId: number): void => {
//   carId.value = selectedCarId;
// };

const handleSubmit = (): void => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Cadastro concluído!';
    successDescription.value = 'Informaremos você sobre a próxima manutenção.';
    isPositiveOpen.value = true;

    date.value = '';
    mileage.value = '';
    tireDiameter.value = '';
    tireRotation.value = '';
  }, 1000);
};

const workshop = ref<string>('');
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

.definitions-wrapper q-icon {
  position: absolute;
  right: 12px;
  top: 18px;
  font-size: 18px;
  color: #9ba7ad;
}

.subtitle {
  color: var(--Cores-Cinza-500, #5b6871);
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}

.title-wrapper {
  display: flex;
  width: 100%;
  height: 20px;
  padding-top: 24px;
  padding-left: 20px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background-color: var(--Cores-Cinza-100, #eff3f5);
  color: var(--Cores-Cinza-800, #33373c);
  font-family: var(--Tipo-Familia-Headline, Raleway);
  font-size: var(--Tipo-Tamanho-Xl, 20px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.4px;
  box-sizing: border-box;
}

.title-icon {
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.title-text {
  color: var(--Cores-Cinza-800, #33373c);
  font-family: var(--Tipo-Familia-Headline, Raleway);
  font-size: var(--Tipo-Tamanho-Xl, 20px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.4px;
}
</style>
