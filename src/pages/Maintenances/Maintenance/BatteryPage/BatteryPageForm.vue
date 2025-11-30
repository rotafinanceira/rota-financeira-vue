<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AxiosError } from 'axios';
import { storeToRefs } from 'pinia';
import { Form } from 'vee-validate';

import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';
import CInput from '@/shared/components/CInput.vue';
import CSelect from '@/shared/components/CSelect.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';

import { useBatteryStore } from '@/stores/maintenances/batteryStore';
import { useCarStore } from '@/stores/carStore';
import {
  formatInput,
  parseInputToNumber,
} from '@/shared/helper/inputFormatHelper';
import { BatteryPayload } from '@/shared/types/battery-maintenance';

const batteryStore = useBatteryStore();
const carStore = useCarStore();
const router = useRouter();
const route = useRoute();

const { maintenances, isLoading } = storeToRefs(batteryStore);

const maintenanceId = route.params.maintenanceId as string | undefined;

const date = ref('');
const mileage = ref('');
const amperage = ref('');
const voltage = ref('');
const brand = ref('');
const maintenanceValue = ref('R$ 0,00');
const oficina = ref('');

interface Option {
  label: string;
  value: string;
}

const amperageOptions: Option[] = [
  { label: '40 a 45Ah', value: '40 a 45Ah' },
  { label: '50 a 60Ah', value: '50 a 60Ah' },
  { label: '65 a 70Ah', value: '65 a 70Ah' },
];

const voltageOptions: Option[] = [
  { label: '12V', value: '12V' },
  { label: '24V', value: '24V' },
];

const brandOptions: Option[] = [
  { label: 'Moura', value: 'Moura' },
  { label: 'Heliar', value: 'Heliar' },
  { label: 'Bosch', value: 'Bosch' },
  { label: 'Bosch', value: 'Outros' },
];

const isOpen = ref(false);
const modalContent = ref('Quando devo fazer a troca?');
const modalDescription = ref<string[]>([]);
const isPositiveOpen = ref(false);
const isErrorOpen = ref(false);

const successTitle = ref('Parabéns!');
const successDescription = ref(
  'Parabéns! Você cadastrou a manutenção da Bateria do seu veículo. Iremos lhe informar sobre a próxima substituição.'
);

const errorTitle = ref('Algo deu errado!');
const errorDescription = ref(
  'Suas alterações não foram salvas. Tente novamente mais tarde.'
);

const isFormInvalid = computed(() => {
  return !mileage.value || !date.value || !maintenanceValue.value;
});

function showHelpModal() {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a troca?';
  modalDescription.value = [
    'A vida útil média da bateria é de 2 a 3 anos, podendo variar conforme o uso do veículo.',
    'Fique atento a sinais como dificuldade de dar partida, luz da bateria acesa no painel ou falhas em equipamentos elétricos.',
    'Evite utilizar som, ar-condicionado ou luzes do carro por muito tempo com o motor desligado, pois isso reduz a durabilidade da bateria.',
    'Sempre confira se os polos estão limpos e bem conectados; mau contato pode simular defeito. ',
    'Em caso de vazamentos, inchaço ou cheiro forte de enxofre, a troca deve ser imediata.',
    'Para veículos que ficam parados por longos períodos, recomenda-se ligar o motor pelo menos uma vez por semana para manter a carga.',
  ];
}

async function closeSuccess() {
  isPositiveOpen.value = false;
  await router.replace({ name: 'maintenances' });
  router.push({ name: 'maintenance-battery' });
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

    const payload: BatteryPayload = {
      lastMaintenanceDate: isoDate,
      lastMaintenanceKm: parseInputToNumber(mileage.value),
      voltage: voltage.value,
      amperage: amperage.value,
      valor: parseInputToNumber(maintenanceValue.value),
      batteryBrand: brand.value,
      oficina: oficina.value,
    };

    if (maintenanceId) {
      successTitle.value = 'Edição concluída!';
      successDescription.value = 'As alterações foram salvas com sucesso.';
    }

    await batteryStore.saveMaintenance(payload, batteryStore.getEditingId);

    batteryStore.setSelectedMaintenance(null);
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
    const resp = await batteryStore.getMaintenances(plate);
    console.log(resp);
  }

  if (maintenanceId) {
    const m = maintenances.value.find((m) => m.id === maintenanceId);
    if (!m) return;

    batteryStore.setSelectedMaintenance(m);

    date.value = m.lastMaintenanceDate
      ? new Date(m.lastMaintenanceDate).toLocaleDateString('pt-BR')
      : '';

    mileage.value = formatInput(m.lastMaintenanceKm ?? 0, 'unit');
    maintenanceValue.value = formatInput(m.valor ?? 0, 'money');
    brand.value = m.batteryBrand ?? '';
    amperage.value = m.amperage ?? '';
    voltage.value = m.voltage ?? '';
    oficina.value = m.oficina ?? '';
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
            :value="brand"
            v-model="brand"
            label="Marca"
            name="battery-brand"
            placeholder="Digite a marca utilizada"
            :options="brandOptions"
          />

          <CSelect
            v-model="amperage"
            name="amperage"
            label="Amperagem"
            :options="amperageOptions"
            placeholder="Selecione uma opção"
          />

          <CSelect
            v-model="voltage"
            name="voltage"
            label="Voltagem"
            :options="voltageOptions"
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

          <CButton type="submit" :disabled="!meta.valid || isFormInvalid"
            >Salvar</CButton
          >
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
