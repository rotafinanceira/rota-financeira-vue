<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { vMaska } from 'maska/vue';
import type { MaskInputOptions } from 'maska';
import { AxiosError } from 'axios';

import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';
import CInput from '@/shared/components/CInput.vue';
import CSelect from '@/shared/components/CSelect.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';
import CFormatedInput from '@/shared/components/CFormatedInput.vue';

import { useOilStore } from '@/stores/oilStore';
import { useCarStore } from '@/stores/carStore';
import { OilServiceType, OilType } from '@/shared/types/oil-maintenance';
import {
  formatInput,
  parseInputToNumber,
} from '@/shared/helper/inputFormatHelper';

const oilStore = useOilStore();
const carStore = useCarStore();
const router = useRouter();
const route = useRoute();

const maintenanceId = route.params.maintenanceId as string | undefined;

const date = ref('');
const mileage = ref('');
const oilType = ref('');
const serviceType = ref('');
const oficina = ref('');
const isLoading = ref(false);

const maintenanceValue = ref('R$ 0,00');

const dateMask: MaskInputOptions = {
  mask: '##/##/####',
  tokens: { '#': { pattern: /\d/ } },
};

interface OilOptionsProps {
  label: string;
  value: string;
}
const oilOptions: OilOptionsProps[] = [
  { label: 'Sintético', value: 'SYNTHETIC' },
  { label: 'Semi-Sintético', value: 'SEMI_SYNTHETIC' },
  { label: 'Mineral', value: 'MINERAL' },
];
const serviceOptions: OilOptionsProps[] = [
  { label: 'Troca de óleo', value: 'oil_change' },
  { label: 'Troca de óleo e filtro de óleo', value: 'both' },
];

const isOpen = ref(false);
const modalContent = ref('Quando devo fazer a troca?');
const modalDescription = ref<string[]>([]);
const isPositiveOpen = ref(false);
const successTitle = ref('Parabéns!');
const successDescription = ref(
  'Você cadastrou a troca de óleo do seu veículo. Iremos lhe informar sobre a próxima manutenção.'
);
const isErrorOpen = ref(false);
const errorTitle = ref('Algo deu errado!');
const errorDescription = ref(
  'Suas alterações não foram salvas. Tente novamente mais tarde.'
);

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

const closeSuccess = (): void => {
  isPositiveOpen.value = false;
  router.push({ name: 'maintenance-oil' });
};

interface OilMaintenancePayload {
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  oilType: OilType;
  valor: number;
  oficina: string;
  serviceType: OilServiceType;
}

const handleSubmit = async (): Promise<void> => {
  if (!carStore.firstLicensePlate) {
    errorTitle.value = 'Erro ao salvar manutenção';
    errorDescription.value = 'Nenhum carro selecionado.';
    isErrorOpen.value = true;
    return;
  }

  isLoading.value = true;
  try {
    const [day, month, year] = date.value.split('/');
    const isoDate = `${year}-${month}-${day}`;

    const payload: OilMaintenancePayload = {
      lastMaintenanceDate: isoDate,
      lastMaintenanceKm: parseInputToNumber(mileage.value),
      oilType: oilType.value as OilType,
      valor: parseInputToNumber(maintenanceValue.value),
      oficina: oficina.value,
      serviceType: serviceType.value as OilServiceType,
    };

    if (maintenanceId) {
      successTitle.value = 'Edição concluída!';
      successDescription.value = 'As alterações foram salvas com sucesso.';
    }

    await oilStore.saveOilMaintenance(payload, oilStore.getEditingId());
    oilStore.setSelectedMaintenance(null);
    isPositiveOpen.value = true;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    console.warn(error);
    isErrorOpen.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (!carStore.firstLicensePlate) {
    await carStore.getCars();
  }

  const plate = carStore.firstLicensePlate;
  if (!plate) return;

  if (!oilStore.maintenances || oilStore.maintenances.length === 0) {
    await oilStore.getOilMaintenances(plate);
  }

  if (maintenanceId) {
    const m = oilStore.maintenances.find((m) => m.id === maintenanceId);
    if (!m) return;

    oilStore.setSelectedMaintenance(m);

    date.value = m.lastMaintenanceDate
      ? new Date(m.lastMaintenanceDate).toLocaleDateString('pt-BR')
      : '';
    mileage.value = formatInput(m.lastMaintenanceKm ?? 0);
    maintenanceValue.value = formatInput(m.valor ?? 0);
    oficina.value = m.oficina ?? '';

    oilType.value =
      oilOptions.find(
        (o) => o.value.toLowerCase() === (m.oilType ?? '').toLowerCase()
      )?.value ?? '';
    serviceType.value =
      serviceOptions.find(
        (s) => s.value.toLowerCase() === (m.serviceType ?? '').toLowerCase()
      )?.value ?? '';
  }
});
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
          <CFormatedInput
            v-model="mileage"
            label="Km na data de serviço*"
            name="mileage"
            variant="unit"
            id="maintenance-value"
          />
        </div>

        <div class="input-wrapper">
          <CInput
            :value="date"
            v-model="date"
            label="Data da troca*"
            name="last-oil-change"
            placeholder="DD/MM/AAAA"
            variant="generic"
            v-maska="dateMask"
          />
        </div>

        <div class="input-wrapper">
          <CFormatedInput
            v-model="maintenanceValue"
            label="Valor da manutenção*"
            name="maintenanceValue"
            variant="money"
            id="maintenance-value"
          />
        </div>

        <div class="input-wrapper">
          <CSelect
            v-model="serviceType"
            name="service-type"
            label="Serviços*"
            :options="serviceOptions"
            placeholder="Escolha o tipo de serviço"
          />
        </div>

        <div class="input-wrapper">
          <CSelect
            v-model="oilType"
            name="oil-type"
            label="Tipo de óleo*"
            :options="oilOptions"
            placeholder="Escolha o tipo de óleo"
          />
        </div>

        <div class="input-wrapper">
          <CInput
            :value="oficina"
            v-model="oficina"
            label="Oficina"
            name="oil-brand"
            placeholder="Digite o nome da oficina"
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
