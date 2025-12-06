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

import { useAirFilterStore } from '@/stores/maintenances/airFilterStore';
import { useCarStore } from '@/stores/carStore';
import {
  formatInput,
  parseInputToNumber,
} from '@/shared/helper/inputFormatHelper';
import { AirFilterPayload } from '@/shared/types/air-filter-maintenance';
import CSelect from '@/shared/components/CSelect.vue';

const airFilterStore = useAirFilterStore();
const carStore = useCarStore();
const router = useRouter();
const route = useRoute();

const { maintenances, isLoading } = storeToRefs(airFilterStore);

const maintenanceId = route.params.maintenanceId as string | undefined;

const date = ref('');
const mileage = ref('');
const oficina = ref('');
const maintenanceValue = ref('R$ 0,00');

const isOpen = ref(false);
const modalContent = ref('Quando devo fazer a troca?');
const modalDescription = ref<string[]>([]);
const isPositiveOpen = ref(false);
const isErrorOpen = ref(false);

interface Option {
  label: string;
  value: string;
}

const serviceOptions: Option[] = [
  { label: 'Limpeza de filtro', value: 'clean' },
  { label: 'Troca de filtro', value: 'change' },
];

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
    'Faça a manutenção do filtro de ar condicionado a cada 10.000 km ou 6 meses, o que ocorrer primeiro.',
    'Fique atento a redução do fluxo de ar, odores desagradáveis e ao aumento do consumo de combustível, eles podem indicar a necessidade de troca do filtro de ar condicionado.',
  ];
}

async function closeSuccess() {
  isPositiveOpen.value = false;
  await router.replace({ name: 'maintenances' });
  router.push({ name: 'maintenance-air-filter' });
}

async function handleSubmit() {
  if (!carStore.firstLicensePlate) {
    errorTitle.value = 'Erro ao salvar manutenção';
    errorDescription.value = 'Nenhum carro selecionado.';
    isErrorOpen.value = true;
    return;
  }
  const [day, month, year] = date.value.split('/');
  const isoDate = `${year}-${month}-${day}`;

  isLoading.value = true;

  try {
    const payload: AirFilterPayload = {
      lastMaintenanceKm: parseInputToNumber(mileage.value),
      valor: parseInputToNumber(maintenanceValue.value),
      oficina: oficina.value,
      lastCleanedDate: isoDate,
      lastChangedDate: isoDate,
    };

    if (maintenanceId) {
      successTitle.value = 'Edição concluída!';
      successDescription.value = 'As alterações foram salvas com sucesso.';
    }

    await airFilterStore.saveMaintenance(payload, airFilterStore.getEditingId);

    airFilterStore.setSelectedMaintenance(null);
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
    const resp = await airFilterStore.getMaintenances(plate);
    console.log(resp);
  }

  if (maintenanceId) {
    const m = maintenances.value.find((m) => m.id === maintenanceId);
    if (!m) return;

    airFilterStore.setSelectedMaintenance(m);

    date.value = m.lastChangedDate
      ? new Date(m.lastChangedDate).toLocaleDateString('pt-BR')
      : '';

    mileage.value = formatInput(m.lastMaintenanceKm ?? 0, 'unit');
    maintenanceValue.value = formatInput(m.valor ?? 0, 'money');
    oficina.value = m.oficina ?? '';
  }
});
</script>

<template>
  <div class="main-content">
    <div class="card-wrapper">
      <div class="card">
        <div class="header-content">
          <span class="title">Manutenção</span>
          <div @click="showHelpModal">
            <img :src="helpIcon" alt="Help Icon" />
          </div>
        </div>
        <span class="subtitle">
          Preencha as informações da manutenção de filtro de ar condicionado.
        </span>

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

          <CSelect
            name="service"
            label="Serviço"
            :options="serviceOptions"
            placeholder="Selecione uma opção"
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
      <p>
        Condições de uso, como trânsito intenso, estradas de terra ou climas
        muito úmidos, podem exigir revisões mais frequentes.
      </p>
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
