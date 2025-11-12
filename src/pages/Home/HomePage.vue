<template>
  <div class="home">
    <div class="home__header">
      <div class="card">
        <div class="card__header">
          <span class="card__header-title">Como está seu odômetro hoje?</span>
          <div @click="showHelpModal">
            <img :src="helpIcon" alt="Help Icon" />
          </div>
        </div>

        <div class="card__info">
          <p class="current-km">{{ currentMileage ?? '000.000' }}</p>
          <span class="km-text">KM</span>
        </div>

        <div>
          <span class="last-km">
            Última quilometragem <br />
            registrada: {{ lastMileage ?? '000.000' }} Km
          </span>
        </div>

        <div class="odometer__icon">
          <img :src="odometer" alt="Odometer Icon" />
        </div>
      </div>

      <CButton
        variant="primary"
        label="Inserir quilometragem do dia"
        :isLoading="isSendingMileage"
        @click="openMileageModal"
      />
    </div>

    <div v-if="!hasCarRegistered" class="home__content">
      <div class="alertCard">
        <img :src="CarIcon" />
        <h2 class="alertCard__title">Veículo não cadastrado</h2>
        <span class="alertCard__text">
          Cadastre seu veículo para acompanhar manutenções e gastos.
        </span>
      </div>
      <CButton variant="primary" :to="{ name: 'user-vehicle-register' }">
        Cadastrar veículo
      </CButton>
    </div>

    <div
      v-else-if="hasCarRegistered && maintenanceSummary.hasMaintenances"
      class="maintenance-summary"
    >
      <SummaryCard
        v-if="maintenanceSummary.expired.length > 0"
        :value="maintenanceSummary.expiredCount"
        :maintenances="
          maintenanceStore.mapToCardMaintenances(maintenanceSummary.expired)
        "
        variant="expired"
      />

      <SummaryCard
        v-if="maintenanceSummary.pending.length > 0"
        title=""
        :value="maintenanceSummary.pendingCount"
        :maintenances="
          maintenanceStore.mapToCardMaintenances(maintenanceSummary.pending)
        "
        variant="pending"
      />
    </div>

    <div v-else class="home__content">
      <div class="alertCard">
        <img :src="CarIcon" />
        <h2 class="alertCard__title">Manutenções não cadastradas</h2>
        <span class="alertCard__text">
          Mantenha um registro das manutenções que você já fez para saber quando
          é a hora de agendar as próximas revisões.
        </span>
      </div>
      <CButton variant="primary" :to="{ name: 'maintenances' }">
        Cadastrar manutenções
      </CButton>
    </div>
  </div>

  <CModal v-model="isOpen" variant="info">
    <h2>Como funciona o odômetro?</h2>

    <p>
      O odômetro é onde você registra a <strong>quilometragem atual</strong> do
      seu veículo <strong>diariamente.</strong> Esses dados são essenciais para
      que o app calcule quando cada manutenção precisa ser feita ou se alguma já
      está vencida.
    </p>
    <ul>
      <li>
        Preencha no final do dia com o valor que aparece no painel do seu carro.
      </li>
    </ul>

    <p>
      Quanto mais <strong>regular</strong> for esse registro, mais
      <strong>precisas</strong> serão as previsões de manutenção.
    </p>
  </CModal>

  <CModalWithButton
    v-model="isMileageModalOpen"
    title="Como está seu odômetro hoje?"
    buttonLabel="Salvar"
    @confirm="onSubmit"
    :disabled="!!errors.mileage"
  >
    <CInput
      v-model="mileage"
      name="mileage"
      variant="unit"
      placeholder="km na data de serviço"
      required
    />
  </CModalWithButton>

  <CModal
    v-model="isSuccessModalOpen"
    variant="default"
    showClose
    icon="success"
  >
    <div class="group">
      <h2>Quilometragem atualizada!</h2>
      <p>A nova quilometragem do seu odômetro foi salva com sucesso.</p>
    </div>
  </CModal>
</template>

<script setup lang="ts">
import helpIcon from '@/shared/assets/helpIcon.svg';
import odometer from '@/shared/assets/illustrations/odometer.svg';
import { ref, computed, onMounted } from 'vue';
import { useCarStore } from '@/stores/carStore';
import CModal from '@/shared/components/CModal.vue';
import CInput from '@/shared/components/CInput.vue';
import * as yup from 'yup';
import CModalWithButton from './components/CModalWithButton.vue';
import { CarIcon } from '@/shared/assets/illustrations';
import { useMaintenanceStore } from '@/stores/maintenance';
import { MaintenanceStatus } from '../Maintenances/types';
import CButton from '@/shared/components/CButton.vue';
import { useForm, useField } from 'vee-validate';
import SummaryCard from './components/SummaryCard.vue';

const lastMileage = ref<number | null>(null);

const validationSchema = computed(() =>
  yup.object({
    mileage: yup
      .number()
      .typeError('Digite um número válido')
      .required('Campo obrigatório')
      .moreThan(lastMileage.value ?? 0, 'Informe um valor maior que o atual'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const parseLocalizedNumber = (value: string) => {
  if (!value) return NaN;
  console.log(value);
  return Number(value.replace(/\./g, '').replace(',', '.'));
};

const { value: mileage } = useField<number>('mileage');

const isMileageModalOpen = ref(false);
const isOpen = ref(false);
const isSuccessModalOpen = ref(false);
const isSendingMileage = ref(false);

const carStore = useCarStore();
const maintenanceStore = useMaintenanceStore();

const maintenanceSummary = ref({
  hasMaintenances: false,
  expired: [] as MaintenanceStatus[],
  pending: [] as MaintenanceStatus[],
  expiredCount: 0,
  pendingCount: 0,
});

const onSubmit = handleSubmit(async (values) => {
  const mileageNumber = parseLocalizedNumber(values.mileage);
  try {
    lastMileage.value = currentMileage.value ?? mileageNumber;

    if (carStore.firstLicensePlate) {
      await carStore.updateCarMileage(
        carStore.firstLicensePlate,
        mileageNumber
      );
      await carStore.getCars();
    }

    isMileageModalOpen.value = false;
    isSuccessModalOpen.value = true;
  } catch (err) {
    console.error('Erro ao atualizar quilometragem:', err);
  } finally {
    isSendingMileage.value = false;
  }
});

const hasCarRegistered = computed(() => carStore.cars.length > 0);

const currentMileage = computed(() => {
  const mileage = carStore.cars[0]?.current_mileage ?? null;
  return mileage == null ? null : mileage.toLocaleString('pt-BR');
});

onMounted(async () => {
  await carStore.getCars();

  const mileageNumber = carStore.cars[0]?.current_mileage;

  if (mileageNumber != null) {
    lastMileage.value = mileageNumber.toLocaleString('pt-BR');
  }

  if (carStore.firstLicensePlate) {
    const summary = await maintenanceStore.getMaintenanceSummary(
      carStore.firstLicensePlate
    );
    maintenanceSummary.value = {
      hasMaintenances: !!summary.hasMaintenances,
      expired: summary.expired ?? [],
      pending: summary.pending ?? [],
      expiredCount: summary.expiredCount ?? 0,
      pendingCount: summary.pendingCount ?? 0,
    };
  }
});

const openMileageModal = () => {
  mileage.value = lastMileage.value ?? 0;
  isMileageModalOpen.value = true;
};

const showHelpModal = (): void => {
  isOpen.value = true;
};
</script>

<style scoped>
@import './HomePage.scss';
</style>
