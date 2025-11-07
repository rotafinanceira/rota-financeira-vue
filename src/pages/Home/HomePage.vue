<template>
  <div class="home-page">
    <div class="card-wrapper">
      <div class="card">
        <div>
          <div class="header-content">
            <span class="title">Como está seu odômetro hoje?</span>
            <div @click="showHelpModal">
              <img :src="helpIcon" alt="Help Icon" />
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="info-text-wrapper">
            <div class="kilometer-title">
              <p class="km-number">
                {{ currentMileage ?? '-' }}
              </p>
              <span class="km-text">KM</span>
            </div>
            <div>
              <span class="kilometer-text"
                >Última quilometragem <br />
                registrada: {{ lastMileage ?? '-' }} Km</span
              >
            </div>
          </div>
          <div class="odometer-icon">
            <img :src="odometer" alt="Odometer Icon" />
          </div>
        </div>
      </div>
      <div>
        <ButtonComponent
          label="Inserir quilometragem do dia"
          :isLoading="isSendingMileage"
          @click="openMileageModal"
        />
      </div>
      <div class="card card-maintenance danger">
        <div class="card-content">
          <div class="section-header expired-header">
            <div class="section-icon-wrapper">
              <div class="section-icon">
                <img
                  :src="expiredIcon"
                  alt="Expired Icon"
                  class="section-image"
                />
              </div>
              <div class="expired-content">
                <div class="section-title">
                  <span>Manutenções vencidas</span>
                </div>
                <div class="maintenance-expired-count danger">
                  <span>+{{ expiredMaintenances.length }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="maintenance-content">
            <div class="arrow" @click="prevExpiredMaintenance">
              <img :src="ArrowIcon" alt="Back Arrow Image" class="back-arrow" />
            </div>
            <div class="maintenance-content-text">
              <div
                v-for="(item, index) in [
                  expiredMaintenances[currentExpiredIndex],
                ]"
                :key="`expired-${index}`"
                class="maintenance-details"
              >
                <div class="maintenance-image-wrapper">
                  <img
                    :src="item.image"
                    alt="Maintenance Image"
                    class="maintenance-image"
                  />
                </div>
                <div>
                  <div class="maintenance-name">{{ item.title }}</div>
                  <div class="maintenance-date">{{ item.date }}</div>
                </div>
              </div>
            </div>
            <div class="arrow" @click="nextExpiredMaintenance">
              <img :src="ArrowIcon" alt="Next Arrow Image" class="next-arrow" />
            </div>
          </div>
          <div class="see-all-content">
            <button class="see-all-button">Ver todas</button>
          </div>
        </div>
      </div>
      <div class="card card-maintenance success">
        <div class="card-content">
          <div class="section-header expired-header">
            <div class="section-icon-wrapper">
              <div class="section-icon">
                <img
                  :src="dateIcon"
                  alt="Calendar Icon"
                  class="section-image"
                />
              </div>
              <div class="expired-content">
                <div class="section-title">
                  <span>Próximas manutenções</span>
                </div>
                <div class="maintenance-expired-count success">
                  <span>+{{ nextMaintenances.length }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="maintenance-content">
            <div class="arrow" @click="prevNextMaintenance">
              <img :src="ArrowIcon" alt="Back Arrow Image" class="back-arrow" />
            </div>
            <div class="maintenance-content-text">
              <div
                v-for="(item, index) in [nextMaintenances[currentNextIndex]]"
                :key="`next-${index}`"
                class="maintenance-details"
              >
                <div class="maintenance-image-wrapper">
                  <img
                    :src="item.image"
                    alt="Maintenance Image"
                    class="maintenance-image"
                  />
                </div>
                <div>
                  <div class="maintenance-name">{{ item.title }}</div>
                  <div class="maintenance-date">{{ item.date }}</div>
                </div>
              </div>
            </div>
            <div class="arrow" @click="nextNextMaintenance">
              <img :src="ArrowIcon" alt="Next Arrow Image" class="next-arrow" />
            </div>
          </div>
          <div class="see-all-content">
            <button class="see-all-button">Ver todas</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CModal v-model="isOpen" variant="info">
    <h2>Como funciona o odômetro?</h2>

    <p>
      O odômetro é onde você registra a
      <strong>quilometragem atual</strong> do seu veículo
      <strong>diariamente.</strong> Esses dados são essenciais para que o app
      calcule quando cada manutenção precisa ser feita ou se alguma já está
      vencida.
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
    :disabled="!!errorMessage || !modalMileageInput"
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
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
import ButtonComponent from '@/shared/components/ButtonComponent.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';
import odometer from '@/shared/assets/illustrations/odometer.svg';
import expiredIcon from '@/shared/assets/manVen.svg';
import alignmentImage from '@/shared/assets/icons/battery.svg';
import { ArrowIcon } from '@/shared/assets/icons';
import batteryIcon from '@/shared/assets/icons/battery.svg';
import dateIcon from '@/shared/assets/icons/battery.svg';
import { ref, computed, onMounted } from 'vue';
import { useCarStore } from '@/stores/carStore';
import CModal from '@/shared/components/CModal.vue';
import CInput from '@/shared/components/CInput.vue';
import CModalWithButton from './components/CModalWithButton.vue';

const isOpen = ref(false);
const isMileageModalOpen = ref(false);
const isSuccessModalOpen = ref(false);
const modalMileageInput = ref('');
const isSendingMileage = ref(false);
const errorMessage = ref('');

const carStore = useCarStore();

onMounted(() => {
  carStore.getCars();
});

const currentMileage = computed(() => {
  const mileage = carStore.cars[0]?.current_mileage ?? null;
  if (mileage == null) return null;

  return mileage.toLocaleString('pt-BR');
});

const lastMileage = ref<number | null>(null);

onMounted(async () => {
  await carStore.getCars();

  if (currentMileage.value != null) {
    lastMileage.value = currentMileage.value;
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
    errorMessage.value = 'Informe um valor de quilometragem maior que o atual.';
    return;
  }

  errorMessage.value = '';
};

const confirmMileageFromModal = async () => {
  const raw = modalMileageInput.value.replace(/\D/g, '');

  const newMileage = Number(raw);
  const current = carStore.cars[0]?.current_mileage ?? 0;

  if (newMileage < current) {
    errorMessage.value = 'Informe um valor de quilometragem maior que o atual.';
    return;
  }

  errorMessage.value = '';

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

const expiredMaintenances = ref([
  {
    title: 'Alinhamento e balanceamento',
    date: 'Venceu dia 1 out. 2024',
    progress: '6/8',
    image: alignmentImage,
  },
  {
    title: 'Troca de óleo',
    date: 'Venceu dia 1 out. 2024',
    progress: '6/8',
    image: odometer,
  },
  {
    title: 'Troca de bateria',
    date: 'Venceu dia 1 out. 2024',
    progress: '6/8',
    image: batteryIcon,
  },
]);

const nextMaintenances = ref([
  {
    title: 'Alinhamento e balanceamento',
    date: 'Vence dia 12 out. 2025',
    progress: '6/8',
    image: alignmentImage,
  },
  {
    title: 'Troca de óleo',
    date: 'Vence dia 1 out. 2025',
    progress: '6/8',
    image: odometer,
  },
  {
    title: 'Troca de bateria',
    date: 'Vence dia 1 out. 2025',
    progress: '6/8',
    image: batteryIcon,
  },
]);

const currentExpiredIndex = ref(0);
const currentNextIndex = ref(0);

const prevExpiredMaintenance = () => {
  if (currentExpiredIndex.value > 0) {
    currentExpiredIndex.value--;
  } else {
    currentExpiredIndex.value = expiredMaintenances.value.length - 1;
  }
};

const nextExpiredMaintenance = () => {
  if (currentExpiredIndex.value < expiredMaintenances.value.length - 1) {
    currentExpiredIndex.value++;
  } else {
    currentExpiredIndex.value = 0;
  }
};

const prevNextMaintenance = () => {
  if (currentNextIndex.value > 0) {
    currentNextIndex.value--;
  } else {
    currentNextIndex.value = nextMaintenances.value.length - 1;
  }
};

const nextNextMaintenance = () => {
  if (currentNextIndex.value < nextMaintenances.value.length - 1) {
    currentNextIndex.value++;
  } else {
    currentNextIndex.value = 0;
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px 20px;
  gap: 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

p,
li {
  line-height: 150%;
}

.styled-button {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #8ce95f;
  color: #314b39;
  font-weight: 600;
  font-size: 18px;
  border: 0;
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

.card-maintenance {
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 1px 4px 0px #00000040;
}

.card-maintenance.danger {
  border-top: 4px solid red;
}

.card-maintenance.success {
  border-top: 4px solid #3d5e46;
}

.info-wrapper {
  display: flex;
  justify-content: space-between;
}

.info-text-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  gap: 4px;
}

.odometer-icon {
  margin-top: 4px;
  margin-right: -26px;
  margin-bottom: -22px;
}

.odometer-icon img {
  width: 185px;
  height: 110px;
}

.kilometer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  padding-top: 8px;
}

.km-number {
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  color: #485159;
  border: none;
  letter-spacing: -2px;
}

.km-text {
  color: #485159;
  font-weight: 700;
  font-size: 14px;
  margin-top: 1px;
}

.kilometer-text {
  font-size: 12px;
  font-weight: 400;
  color: #5b6871;
}

.kilometer-text-number {
  font-weight: 500;
  font-size: 14px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.expired-header .text-danger {
  color: #e53935;
}

.section-icon-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
}

.section-icon {
  margin-right: 0.5rem;
}

.section-icon img {
  display: flex;
  align-self: center;
}

.section-image {
  width: 20px;
  height: 20px;
}

.section-title {
  color: #440b0b;
  font-size: 16px;
  font-weight: 600;
}

.maintenance-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.maintenance-image-wrapper {
  border-radius: 8px;
  background: var(--Cores-Cinza-50, #eff3f5);
  margin-right: 0.75rem;
  display: flex;
  padding: 5px;
  align-items: center;
  gap: 10px;
  height: 30px;
  width: 30px;
}

.maintenance-image {
  width: 20px;
  height: 20px;
}

.maintenance-details {
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.maintenance-name {
  color: var(--Cores-Cinza-800, #33373c);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}

.maintenance-date {
  align-self: stretch;
  color: var(--Cores-Cinza-400, #76828b);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Xs, 12px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}

.back-arrow {
  --size: 20px;
  width: var(--size);
  height: var(--size);

  transform: rotate(-90deg);
}

.next-arrow {
  --size: 20px;
  width: var(--size);
  height: var(--size);

  transform: rotate(90deg);
}

.maintenance-expired-count {
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
}

.maintenance-expired-count.danger {
  background-color: red;
}

.maintenance-expired-count.success {
  background-color: #3d5e46;
}

.card-content {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.see-all-button {
  width: 100%;
  height: 40px;
  background-color: #eff3f5;
  border: 1px solid #e0e5e7;
  border-radius: 4px;
  font-weight: 600;
  color: #293e2f;
  font-size: 14px;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.maintenance-content-text {
  flex: 1;
  text-align: left;
  margin-left: 8px;
}

.expired-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
