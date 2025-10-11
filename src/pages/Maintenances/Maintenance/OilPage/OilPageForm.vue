<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';
import { useOilStore } from '@/stores/oilStore';
import { useCarStore } from '@/stores/carStore';
import { AxiosError } from 'axios';

interface OilOptionsProps {
  label: string;
  value: string;
}

interface ServiceOptionsProps {
  label: string;
  value: boolean;
}

const router = useRouter();

const oilStore = useOilStore();
const carStore = useCarStore();

const isLoading = ref(false);
const showDatePicker = ref(false);

const date = ref('');
const mileage = ref('');
const oilType = ref('');
const serviceType = ref(false);
const liters = ref('');
const oilBrand = ref('');
const maintenanceValue = ref('');

const modalContent = ref('Quando devo fazer a troca?');
const modalDescription = ref<string[]>([
  'O tempo recomendado para troca de óleo é de 6 a 12 meses.',
  'Troque de óleo a cada 10 mil quilômetros aproximadamente.',
  'O uso severo do veículo pode encurtar o intervalo de troca de óleo.',
  'Utilize o tipo de óleo e quantidade correta do modelo do seu veículo.',
  'Jamais misture óleos de viscosidades diferentes.',
]);
const isOpen = ref(false);
const isPositiveOpen = ref(false);
const successTitle = ref<string>('Cadastro concluído!');
const successDescription = ref<string>(
  'Informaremos você sobre a próxima manutenção.'
);

const oilOptions = ref<OilOptionsProps[]>([
  { label: 'Sintético', value: 'sintetic' },
  { label: 'Semi-Sintético', value: 'semi-sintetic' },
  { label: 'Mineral', value: 'mineral' },
  { label: 'Outro', value: 'outro' },
]);

const serviceOptions = ref<ServiceOptionsProps[]>([
  { label: 'Troca de óleo', value: false },
  { label: 'Troca de óleo e filtro de óleo', value: true },
]);

onMounted(async () => {
  await carStore.getCars();

  const selected = oilStore.selectedMaintenance;

  if (selected) {
    date.value = new Date(selected.lastMaintenanceDate).toLocaleDateString(
      'pt-BR'
    );
    mileage.value = selected.lastMaintenanceKm.toString();
    maintenanceValue.value = selected.valor.toString();
    oilType.value = selected.oilType;
    oilBrand.value = selected.oilBrand ?? '';
    liters.value = selected.oilQuantityLt.toString();
    serviceType.value = !!selected.filterChanged;
  }
});

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

const onDateSelect = (value: string) => {
  date.value = value;
  showDatePicker.value = false;
};

const handleSubmit = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const [day, month, year] = date.value.split('/');
    const isoDate = `${year}-${month}-${day}`;

    const payload = {
      lastMaintenanceDate: isoDate,
      lastMaintenanceKm: Number(mileage.value),
      oilType: oilType.value,
      oilQuantityLt: Number(liters.value) || 1,
      oilBrand: oilBrand.value,
      valor: Number(maintenanceValue.value),
      oficina: oilBrand.value,
      filterChanged: serviceType.value,
    };

    await oilStore.saveOilMaintenance(payload, oilStore.getEditingId());
    oilStore.setSelectedMaintenance(null);

    isPositiveOpen.value = true;
  } catch (err) {
    const error = err as AxiosError;

    if (error.response) {
      console.error('Erro na API:', error.response.status, error.response.data);
    } else {
      console.error('Erro desconhecido:', error.message);
    }
  } finally {
    isLoading.value = false;
  }
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
              <span class="title">Manutenção</span>
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
            <q-input
              id="mileage"
              outlined
              v-model="mileage"
              label="Km na data de serviço"
              type="number"
            />
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
            />
            <q-menu v-model="showDatePicker" fit>
              <q-date v-model="date" mask="DD/MM/YYYY" @input="onDateSelect" />
            </q-menu>
          </div>

          <div class="input-wrapper">
            <label for="maintenance-value">Valor da manutenção*</label>
            <q-input
              id="maintenance-value"
              outlined
              v-model="maintenanceValue"
              label="Digite o valor da manutenção"
              type="number"
            />
          </div>

          <div class="input-wrapper">
            <label for="service-type">Serviços*</label>
            <q-select
              id="service-type"
              outlined
              v-model="serviceType"
              :options="serviceOptions"
              emit-value
              map-options
              label="Escolha o tipo de serviço"
            />
          </div>

          <div class="input-wrapper">
            <label for="oil-type">Tipo de óleo*</label>
            <q-select
              id="oil-type"
              outlined
              v-model="oilType"
              :options="oilOptions"
              emit-value
              map-options
              label="Escolha o tipo de óleo"
            />
          </div>

          <div class="input-wrapper">
            <label for="oil-brand">Oficina</label>
            <q-input
              id="oil-brand"
              outlined
              v-model="oilBrand"
              label="Digite o nome da oficina"
            />
          </div>

          <div class="input-wrapper">
            <label for="liters">Quantidade de óleo (litros)</label>
            <q-input
              id="liters"
              outlined
              v-model="liters"
              label="Ex: 2"
              type="number"
            />
          </div>
        </div>
      </div>

      <CButton @click="handleSubmit" :isLoading="isLoading"> Salvar </CButton>
    </div>

    <CModal v-model="isOpen" variant="info">
      <h2>{{ modalContent }}</h2>
      <ul class="info-list">
        <li v-for="(item, index) in modalDescription" :key="index">
          {{ item }}
        </li>
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
.text-wrapper {
  margin-bottom: 32px;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.subtitle {
  font-size: 14px;
  color: #5b6871;
  margin-top: 8px;
}
.info-list li {
  margin-bottom: 12px;
}
</style>
