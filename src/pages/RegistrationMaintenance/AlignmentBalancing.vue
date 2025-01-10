<template>
  <q-page>
    <HeaderBar
      title="Alinhamento e Balanceamento"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle @vehicle-selected="setCarId" />

        <div class="card">
          <div class="text-wrapper">
            <div class="header-content">
              <span class="title">Manutenção</span>
              <div class="help-icon" @click="showHelpModal">
                <img :src="helpIcon" alt="Ícone de ajuda" />
              </div>
            </div>
            <span class="subtitle"
              >Preencha as informações da manutenção do balanceamento e
              alinhamento do seu carro.</span
            >
          </div>

          <!-- Quilometragem da última manutenção -->
          <div class="input-wrapper">
            <label for="last-maintenance-mileage">Última manutenção*</label>
            <div class="definitions-wrapper">
              <q-input
                id="last-maintenance-mileage"
                outlined
                v-model="lastMaintenanceMileage"
                label="Insira a quilometragem"
              ></q-input>
              <span>Km</span>
            </div>
          </div>

          <!-- Insira o aro do seu pneu -->
          <div class="input-wrapper">
            <label for="tire-diameter">Aro do pneu*</label>
            <div class="definitions-wrapper">
              <q-input
                id="tire-diameter"
                outlined
                v-model="tireDiameter"
                label="Insira o aro do seu pneu"
              ></q-input>
              <span>
                <div class="rim-icon">
                  <img :src="rimIcon" alt="Ícone do Aro do Pneu" />
                </div>
              </span>
            </div>
          </div>

          <!-- Data da última troca de pneus -->
          <div class="input-wrapper">
            <label for="last-tire-change">Data da última troca de pneus*</label>
            <div class="definitions-wrapper">
              <q-input
                id="last-tire-change"
                outlined
                v-model="date"
                mask="##/##/####"
                placeholder="Insira a data da última troca"
                @focus="showDatePicker = true"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    @click="showDatePicker = !showDatePicker"
                  />
                </template>
              </q-input>
              <q-menu v-model="showDatePicker" fit>
                <q-date
                  v-model="date"
                  mask="Insira a data da última troca"
                  @input="onDateSelect"
                />
              </q-menu>
            </div>
          </div>

          <!-- Quilometragem da troca de pneus -->
          <div class="input-wrapper">
            <label for="mileage">Quilometragem da troca de pneus*</label>
            <div class="definitions-wrapper">
              <q-input
                id="mileage"
                outlined
                v-model="mileage"
                label="Insira a quilometragem"
              ></q-input>
              <span>Km</span>
            </div>
          </div>

          <!-- Quilometragem do rodízio de pneus -->
          <div class="input-wrapper">
            <label for="tire-rotation">Rodízio de pneus*</label>
            <div class="definitions-wrapper">
              <q-input
                id="tire-rotation"
                outlined
                v-model="tireRotation"
                label="Insira a quilometragem"
              ></q-input>
              <span>Km</span>
            </div>
          </div>
        </div>
      </div>
      <ButtonComponent
        label="Finalizar"
        :isLoading="isLoading"
        @click="handleSubmit"
      />
    </div>
    <ModalGenerico
      :title="modalContent"
      :open="isOpen"
      :description="modalDescription"
      :text-button="'Fechar'"
      @close="isOpen = false"
    />
    <ModalPositive
      :title="successTitle"
      :open="isPositiveOpen"
      :description="successDescription"
      @close="isPositiveOpen = false"
      :text-button="'Fechar'"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SelectVehicle from '@/components/SelectVehiclePlate.vue';
import ModalGenerico from '@/components/ModalGenerico.vue';
import ModalPositive from '@/components/ModalSucess.vue';
import helpIcon from '@/assets/helpIcon.svg';
import rimIcon from '@/assets/rimIcon.svg';

const showDatePicker = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const date = ref<string>('');
const mileage = ref<string>('');
const tireDiameter = ref<string>('');
const tireRotation = ref<string>('');
const carId = ref<number | null>(null);
const modalContent = ref<string>('');
const modalDescription = ref<string[] | string>('');
const isOpen = ref<boolean>(false);
const lastMaintenanceMileage = ref<string>('');

const isPositiveOpen = ref<boolean>(false);
const successTitle = ref<string>('');
const successDescription = ref<string>('');

const showHelpModal = (): void => {
  isOpen.value = true;
  modalContent.value = 'Quando devo fazer a manutenção?';
  modalDescription.value = [
    'A recomendação é fazer esse tipo de manutenção a cada 10.000km rodados.',
    'Fique atento a vibrações no volante, desgaste irregular dos pneus e puxões do veículo para um lado.',
    'Troque seus pneus se tiverem mais de 5 anos, mesmo que pareçam bons. O material envelhece e pode não ser seguro.',
    'Troque após rodar entre 40.000 e 60.000 km. Pneus muito usados perdem eficiência.',
  ];
};

const onDateSelect = (value: string): void => {
  date.value = value;
  showDatePicker.value = false;
};

const setCarId = (selectedCarId: number): void => {
  carId.value = selectedCarId;
};

const handleSubmit = (): void => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successTitle.value = 'Cadastro concluído!';
    successDescription.value = 'Informaremos você sobre a próxima manutenção.';
    isPositiveOpen.value = true;

    date.value = '';
    mileage.value = '';
    tireDiameter.value = '';
    tireRotation.value = '';
  }, 1000);
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  background-color: #eff3f5;
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
  margin-bottom: 16px;
}

.input-wrapper label {
  font-weight: 500;
  font-size: 16px;
}

.definitions-wrapper {
  position: relative;
  margin-top: 4px;
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
  margin-bottom: 24px;
  flex-direction: column;
  gap: 6px;
  display: flex;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.amperage-buttons {
  margin-top: 8px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.title {
  font-weight: bold;
  font-size: 18px;
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
</style>
