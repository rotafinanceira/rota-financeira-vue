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
      <MaintenanceCard
        v-if="maintenanceSummary.expired.length > 0"
        :value="maintenanceSummary.expiredCount"
        :maintenances="mapToCardMaintenances(maintenanceSummary.expired)"
        variant="expired"
      />

      <MaintenanceCard
        v-if="maintenanceSummary.pending.length > 0"
        title=""
        :value="maintenanceSummary.pendingCount"
        :maintenances="mapToCardMaintenances(maintenanceSummary.pending)"
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
    :isLoading="isSendingMileage"
    :disabled="!!mileageErrorMessage || !modalMileageInput"
    @confirm="confirmMileageFromModal"
  >
    <p>Preencha com o valor que aparece no painel do seu carro.</p>
    <CInput
      v-model="modalMileageInput"
      name="mileage"
      variant="unit"
      placeholder="km na data de serviço"
      required
      @blur="validateMileageOnBlur"
    />
    <p v-if="mileageErrorMessage" class="error-message">
      {{ mileageErrorMessage }}
    </p>
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
import CModalWithButton from './components/CModalWithButton.vue';
import CButton from '@/shared/components/CButton.vue';
import { CarIcon } from '@/shared/assets/illustrations';
import { useMaintenanceStore } from '@/stores/maintenance';
import { MaintenanceStatus } from '../Maintenances/types';
import { MaintenanceIcons } from '@/shared/types/maintenance';
import MaintenanceCard from './components/MaintenanceCard.vue';

const isOpen = ref(false);
const isMileageModalOpen = ref(false);
const isSuccessModalOpen = ref(false);
const modalMileageInput = ref('');
const isSendingMileage = ref(false);
const mileageErrorMessage = ref('');

const carStore = useCarStore();
const maintenanceStore = useMaintenanceStore();

const maintenanceSummary = ref({
  hasMaintenances: false,
  expired: [] as MaintenanceStatus[],
  pending: [] as MaintenanceStatus[],
  expiredCount: 0,
  pendingCount: 0,
});

const hasCarRegistered = computed(() => carStore.cars.length > 0);

const currentMileage = computed(() => {
  const mileage = carStore.cars[0]?.current_mileage ?? null;
  return mileage == null ? null : mileage.toLocaleString('pt-BR');
});

const lastMileage = ref<number | null>(null);

onMounted(async () => {
  await carStore.getCars();

  if (currentMileage.value != null) {
    lastMileage.value = Number(currentMileage.value);
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
  const current = currentMileage.value
    ? String(currentMileage.value)
    : lastMileage.value
    ? String(lastMileage.value)
    : '';
  modalMileageInput.value = current
    ? Number(current).toLocaleString('pt-BR')
    : '';
  isMileageModalOpen.value = true;
};

const validateMileageOnBlur = () => {
  const raw = modalMileageInput.value.replace(/\D/g, '');
  const newMileage = Number(raw);
  const current = carStore.cars[0]?.current_mileage ?? 0;

  if (newMileage < current) {
    mileageErrorMessage.value =
      'Informe um valor de quilometragem maior que o atual.';
    return;
  }

  mileageErrorMessage.value = '';
};

function mapToCardMaintenances(list: MaintenanceStatus[]) {
  const detectIcon = (type?: string) => {
    const t = (type ?? '').toString().toLowerCase();
    if (!t) return 'oil';
    if (t.includes('oil') || t.includes('óleo') || t.includes('troca de óleo'))
      return 'oil';
    if (t.includes('air') || t.includes('filtro de ar')) return 'airFilter';
    if (t.includes('battery') || t.includes('bateria')) return 'battery';
    if (t.includes('wheel') || t.includes('roda')) return 'wheel';
    if (t.includes('fuel') || t.includes('combustível')) return 'fuelFilter';
    return 'oil';
  };

  return list.slice(0, 2).map((m) => {
    const icon = detectIcon(m.type);
    const status = m.data?.status?.toUpperCase();
    let description = '';

    if (status === 'EXPIRED') {
      description = 'Vencida';
    } else if (status === 'PENDING') {
      description = 'Pendente';
    }

    return {
      icon: icon as keyof MaintenanceIcons,
      title: m.type,
      description,
    };
  });
}

const confirmMileageFromModal = async () => {
  const raw = modalMileageInput.value.replace(/\D/g, '');
  const newMileage = Number(raw);
  const current = carStore.cars[0]?.current_mileage ?? 0;

  if (newMileage < current) {
    mileageErrorMessage.value =
      'Informe um valor de quilometragem maior que o atual.';
    return;
  }

  mileageErrorMessage.value = '';
  isSendingMileage.value = true;

  try {
    lastMileage.value = currentMileage.value ?? newMileage;

    if (carStore.firstLicensePlate) {
      await carStore.updateCarMileage(carStore.firstLicensePlate, newMileage);
      await carStore.getCars();
    }

    isMileageModalOpen.value = false;
    isSuccessModalOpen.value = true;
  } catch (err) {
    console.error('Erro ao atualizar quilometragem:', err);
  } finally {
    isSendingMileage.value = false;
  }
};

const showHelpModal = (): void => {
  isOpen.value = true;
};
</script>

<style scoped>
@import './HomePage.scss';
</style>
