<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';
import CInput from '@/shared/components/CInput.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';
import { useOilStore } from '@/stores/oilStore';
import { useCarStore } from '@/stores/carStore';
import CSelect from '@/shared/components/CSelect.vue';
import { vMaska } from 'maska/vue';
import type { MaskInputOptions } from 'maska';

const dateMask: MaskInputOptions = {
  mask: '##/##/####',
  tokens: {
    '#': { pattern: /\d/ },
  },
};

interface OilOptionsProps {
  label: string;
  value: string;
}

const router = useRouter();
const oilStore = useOilStore();
const carStore = useCarStore();

const isLoading = ref(false);

const date = ref('');
const mileage = ref('');
const oilType = ref('');
const serviceType = ref('');
const oficina = ref('');
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
const successTitle = ref('Cadastro concluído!');
const successDescription = ref('Informaremos você sobre a próxima manutenção.');
const isErrorOpen = ref(false);
const errorTitle = ref('Erro ao salvar!');
const errorDescription = ref('Ocorreu um erro inesperado. Tente novamente.');

const oilOptions = ref<OilOptionsProps[]>([
  { label: 'Sintético', value: 'SYNTHETIC' },
  { label: 'Semi-Sintético', value: 'SEMI_SYNTHETIC' },
  { label: 'Mineral', value: 'MINERAL' },
]);

const serviceOptions = ref<OilOptionsProps[]>([
  { label: 'Troca de óleo', value: 'oil_change' },
  { label: 'Troca de óleo e filtro de óleo', value: 'both' },
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
    oficina.value = selected.oficina ?? '';
    serviceType.value = selected.serviceType ?? '';
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

const handleSubmit = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const [day, month, year] = date.value.split('/');
    const isoDate = `${year}-${month}-${day}`;

    const payload = {
      lastMaintenanceDate: isoDate,
      lastMaintenanceKm: Number(mileage.value),
      oilType: oilType.value,
      oilBrand: oilBrand.value,
      valor: Number(maintenanceValue.value),
      oficina: oficina.value,
      serviceType: serviceType.value,
    };

    if (!carStore.firstLicensePlate)
      throw new Error('Nenhum carro selecionado.');
    await oilStore.saveOilMaintenance(payload, oilStore.getEditingId());

    oilStore.setSelectedMaintenance(null);
    isPositiveOpen.value = true;
  } catch (err) {
    const error = err as { message: string };
    errorTitle.value = 'Erro ao salvar manutenção';
    errorDescription.value = error.message || 'Ocorreu um erro inesperado.';
    isErrorOpen.value = true;
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
          <CInput
            v-model="mileage"
            label="Km na data de serviço*"
            type="number"
            name="mileage"
            placeholder="Ex: 50000"
            variant="generic"
          />
        </div>

        <div class="input-wrapper">
          <CInput
            v-model="date"
            label="Data da troca*"
            name="last-oil-change"
            placeholder="DD/MM/AAAA"
            variant="generic"
            v-maska="dateMask"
          />
        </div>

        <div class="input-wrapper">
          <CInput
            v-model="maintenanceValue"
            label="Valor da manutenção*"
            name="maintenance-value"
            type="number"
            placeholder="Ex: 150"
            variant="generic"
          />
        </div>

        <div class="input-wrapper">
          <CSelect
            v-model="serviceType"
            name="service-type"
            label="Serviços*"
            :options="serviceOptions"
            placeholder="Escolha o tipo de serviço"
            :key="'service-select'"
          />
        </div>

        <div class="input-wrapper">
          <CSelect
            v-model="oilType"
            name="oil-type"
            label="Tipo de óleo*"
            :options="oilOptions"
            placeholder="Escolha o tipo de óleo"
            :key="'oil-select'"
          />
        </div>

        <div class="input-wrapper">
          <CInput
            v-model="oficina"
            label="Oficina"
            name="oil-brand"
            placeholder="Digite o nome da oficina"
            variant="generic"
          />
        </div>

        <div class="input-wrapper">
          <CInput
            v-model="oilBrand"
            label="Quantidade de óleo (litros)"
            name="liters"
            type="number"
            placeholder="Ex: 2"
            variant="generic"
          />
        </div>
      </div>
    </div>

    <CButton @click="handleSubmit" :isLoading="isLoading">Salvar</CButton>

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
    <CModal
      v-model="isErrorOpen"
      icon="error"
      variant="default"
      @update:modelValue="
        (val) => {
          if (!val) isErrorOpen = false;
        }
      "
    >
      <div class="group">
        <h2>{{ errorTitle }}</h2>
        <p>{{ errorDescription }}</p>
      </div>
    </CModal>
  </div>
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
