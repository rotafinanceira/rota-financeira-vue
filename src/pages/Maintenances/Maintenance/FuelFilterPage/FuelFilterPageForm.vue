<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Form } from 'vee-validate';

import { AxiosError } from 'axios';
import { storeToRefs } from 'pinia';

import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';
import CInput from '@/shared/components/CInput.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';

import { useFuelFilterStore } from '@/stores/fuelFilterStore';
import { useCarStore } from '@/stores/carStore';
import {
  formatInput,
  parseInputToNumber,
} from '@/shared/helper/inputFormatHelper';

const fuelFilterStore = useFuelFilterStore();
const carStore = useCarStore();
const router = useRouter();
const route = useRoute();

const { maintenances, isLoading } = storeToRefs(fuelFilterStore);

const maintenanceId = route.params.maintenanceId as string | undefined;

const date = ref('');
const mileage = ref('');
const filterModel = ref('');
const oficina = ref('');
const maintenanceValue = ref('R$ 0,00');

const isOpen = ref(false);
const modalContent = ref('Quando devo fazer a troca?');
const modalDescription = ref<string[]>([]);
const isPositiveOpen = ref(false);
const isErrorOpen = ref(false);

const successTitle = ref('Parabéns!');
const successDescription = ref(
  'Você cadastrou a manutenção do filtro de combustível do seu veículo. Iremos lhe informar sobre a próxima manutenção.'
);

const errorTitle = ref('Algo deu errado!');
const errorDescription = ref(
  'Suas alterações não foram salvas. Tente novamente mais tarde.'
);

function showHelpModal() {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = [
    'O filtro de combustível é um item de segurança para o seu motor, responsável por reter sujeira e impurezas antes que elas atinjam e danifiquem peças caras, como a bomba de combustível e os bicos injetores.',
    'A regra geral é substituí-lo a cada 10.000 km rodados, ou 12 meses, o que ocorrer primeiro. Seguindo sempre a orientação do fabricante.',
    'Fique atento aos sinais de problema, como perda de potência, dificuldade para ligar e aumento no consumo de combustível. Esses sintomas indicam que o filtro pode estar obstruído, comprometendo o desempenho e a eficiência do veículo. Ao perceber esses sinais, troque o filtro o quanto antes.',
  ];
}

function closeSuccess() {
  isPositiveOpen.value = false;
  router.push({ name: 'maintenance-fuel-filter' });
}

interface FuelFilterMaintenancePayload {
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  filterType: string;
  valor: number;
  oficina: string | null;
}

async function handleSubmit() {
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

    const payload: FuelFilterMaintenancePayload = {
      lastMaintenanceDate: isoDate,
      lastMaintenanceKm: parseInputToNumber(mileage.value),
      filterType: filterModel.value,
      valor: parseInputToNumber(maintenanceValue.value),
      oficina: oficina.value,
    };

    if (maintenanceId) {
      successTitle.value = 'Edição concluída!';
      successDescription.value = 'As alterações foram salvas com sucesso.';
    }

    await fuelFilterStore.saveFuelFilterMaintenance(
      payload,
      fuelFilterStore.getEditingId
    );

    fuelFilterStore.setSelectedMaintenance(null);
    isPositiveOpen.value = true;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    console.error('Erro ao salvar manutenção:', error);
    isErrorOpen.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  if (!carStore.firstLicensePlate) {
    await carStore.getCars();
  }

  const plate = carStore.firstLicensePlate;
  if (!plate) return;

  if (!maintenances.value || maintenances.value.length === 0) {
    const resp = await fuelFilterStore.getFuelFilterMaintenances(plate);
    console.log(resp);
  }

  if (maintenanceId) {
    const m = maintenances.value.find((m) => m.id === maintenanceId);
    if (!m) return;

    fuelFilterStore.setSelectedMaintenance(m);

    date.value = m.lastMaintenanceDate
      ? new Date(m.lastMaintenanceDate).toLocaleDateString('pt-BR')
      : '';

    mileage.value = formatInput(m.lastMaintenanceKm ?? 0);
    maintenanceValue.value = formatInput(m.valor ?? 0);
    oficina.value = m.oficina ?? '';
    filterModel.value = m.filterType.toString() ?? '';
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
            Preencha as informações da manutenção de filtro de combustível.
          </span>
        </div>
        <Form class="form" @submit="handleSubmit" v-slot="{ meta }">
          <CInput
            v-model="mileage"
            label="Quilometragem"
            name="mileage"
            variant="unit"
            placeholder="km na data de serviço"
            required
          />

          <CInput
            v-model="date"
            label="Data da troca"
            name="last-oil-change"
            variant="date"
            placeholder="__/__/____"
            required
          />

          <CInput
            v-model="maintenanceValue"
            label="Valor do serviço"
            name="maintenanceValue"
            variant="money"
            placeholder="Digite o valor"
            required
          />

          <CInput
            :value="filterModel"
            v-model="filterModel"
            label="Modelo"
            name="filter-model"
            placeholder="Digite o modelo utilizado"
            variant="generic"
          />

          <CInput
            :value="oficina"
            v-model="oficina"
            label="Oficina"
            name="oficina"
            placeholder="Digite o nome da oficina"
            variant="generic"
          />

          <CButton type="submit" :disabled="!meta.valid">Salvar</CButton>
        </Form>
      </div>
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

<style scoped lang="scss">
@use '/src/css/maintenanceForm.scss';
</style>
