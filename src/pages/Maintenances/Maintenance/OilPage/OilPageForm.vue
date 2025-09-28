<script setup lang="ts">
import { ref } from 'vue';
import CModal from '@/shared/components/CModal.vue';

import helpIcon from '@/shared/assets/helpIcon.svg';

import { useRouter } from 'vue-router';
import CButton from '@/shared/components/CButton.vue';

const router = useRouter();

interface OilOptionsProps {
  label: string;
  value: string;
}

interface ServiceOptionsProps {
  label: string;
  value: string;
}

const showDatePicker = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const date = ref<string>('');
const mileage = ref<string>('');
const oilType = ref<string>('');
const serviceType = ref<string>('');
const liters = ref<string>('');
const oilBrand = ref<string>('');
const maintenanceValue = ref<string>('');
const modalContent = ref<string>('Quando devo fazer a troca?');
const modalDescription = ref<string[]>([
  'O tempo recomendado para troca de óleo é de 6 a 12 meses.',
  'Troque de óleo a cada 10 mil quilômetros aproximadamente.',
  'O uso severo do veículo pode encurtar o intervalo de troca de óleo.',
  'Utilize o tipo de óleo e quantidade correta do modelo do seu veículo.',
  'Jamais misture óleos de viscosidades diferentes.',
]);
const isOpen = ref<boolean>(false);
const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('Parabéns!');
const successDescription = ref<string>(
  'Você cadastrou a troca de óleo do seu veículo. Iremos lhe informar sobre a próxima manutenção.'
);

const oilOptions = ref<OilOptionsProps[]>([
  { label: 'Sintético', value: 'sintetic' },
  { label: 'Semi-Sintético', value: 'semi-sintetic' },
  { label: 'Mineral', value: 'mineral' },
  { label: 'Outro', value: 'outro' },
]);

const serviceOptions = ref<ServiceOptionsProps[]>([
  { label: 'Troca de óleo', value: 'oil-filter' },
  { label: 'Filtro de óleo', value: 'oil-filter' },
  { label: 'Troca de óleo e filtro de óleo', value: 'oil-change-filter' },
  { label: 'Outro', value: 'other' },
]);

const showHelpModal = (): void => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = [
    'Troque o óleo conforme a recomendação do fabricante: geralmente a cada 10.000 km ou 12 meses para óleo sintético, 5.000 km ou 6 meses para óleos mineral ou semissintético, o que ocorrer primeiro.',
    'Verifique o nível e a cor do óleo. Se estiver escuro ou com resíduos, troque.',
    'Troque sempre o filtro junto com o óleo.',
    'Mesmo rodando pouco, o óleo envelhece. Troque por tempo.',
    'Uso severo (trânsito, poeira, ladeiras, reboque) pode exigir troca antecipada.',
  ];
};

const onDateSelect = (value: string): void => {
  date.value = value;
  showDatePicker.value = false;
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
    maintenanceValue.value = '';
  }, 1000);
};

const closeSuccess = () => {
  isPositiveOpen.value = false;
  router.push({ name: 'maintenance-oil' });
};
</script>

<template>
  <q-page>
    <div class="main-content">
      <div class="card-wrapper">
        <div class="card">
          <div class="text-wrapper">
            <div class="header-content">
              <span class="title">Manutenção </span>
              <div @click="showHelpModal">
                <img :src="helpIcon" alt="Help Icon" />
              </div>
            </div>
            <span class="subtitle">
              Preencha as informações da manutenção de Troca de Óleo.
            </span>
          </div>
          <div class="input-wrapper">
            <label for="mileage">Quilometragem*</label>
            <div class="definitions-wrapper">
              <q-input
                id="mileage"
                outlined
                v-model="mileage"
                label="Km na data de serviço"
                type="number"
              ></q-input>
            </div>
          </div>
          <div class="input-wrapper">
            <label for="last-oil-change">Data da troca*</label>
            <q-input
              id="last-oil-change"
              outlined
              v-model="date"
              mask="##/##/####"
              label="Digite a data da última troca"
              @focus="showDatePicker = true"
            >
              <template v-slot:append> </template>
            </q-input>
            <q-menu v-model="showDatePicker" fit>
              <q-date v-model="date" mask="DD/MM/YYYY" @input="onDateSelect" />
            </q-menu>
          </div>
          <div class="input-wrapper">
            <label for="maintenance-value">Valor da manutenção*</label>
            <div class="definitions-wrapper">
              <q-input
                id="maintenance-value"
                outlined
                v-model="maintenanceValue"
                label="Digite o valor da manutenção"
                type="number"
              >
              </q-input>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="service-type">Serviços*</label>
            <q-select
              id="service-type"
              outlined
              v-model="serviceType"
              :options="serviceOptions"
              label="Escolha o tipo de serviço"
            ></q-select>
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
            <label for="oil-brand">Oficina</label>
            <q-input
              id="workshop-name"
              outlined
              v-model="oilBrand"
              label="Digite o nome da oficina"
            >
            </q-input>
          </div>
        </div>
      </div>
      <CButton @click="handleSubmit" :isLoading="isLoading"> Salvar </CButton>
      >
    </div>
    <CModal v-model="isOpen" variant="info">
      <h2>{{ modalContent }}</h2>
      <ul class="info-list">
        <li v-for="(item, index) in modalDescription" :key="index">
          {{ item }}
        </li>
        <br />
      </ul>
    </CModal>

    <CModal
      v-model="isPositiveOpen"
      icon="success"
      variant="default"
      @update:modelValue="
        (val) => {
          if (!val) closeSuccess();
        }
      "
    >
      <div class="group">
        <h2>{{ successTitle }}</h2>
        <p>{{ successDescription }}</p>
      </div>
    </CModal>
  </q-page>
</template>

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
  color: #5b6871;

  margin-top: 8px;
}

.error-message {
  color: red;
  margin-top: 16px;
}

.info-list li {
  margin-bottom: 12px;
}
</style>
