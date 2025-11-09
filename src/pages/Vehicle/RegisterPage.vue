<template>
  <div>
    <div class="main-content">
      <div class="card-wrapper">
        <div class="card">
          <div class="text-wrapper">
            <span class="title">Novo Cadastro</span>

            <span class="subtitle">
              Complete os campos abaixo com as informações necessárias para
              realizar o cadastro do seu veículo.
            </span>
          </div>

          <div class="input-wrapper">
            <CInput
              v-model="chassi"
              label="Chassi"
              name="chassi"
              placeholder="Ex: 9BG. RD08X0. 4G.117974 "
              variant="generic"
            />
          </div>

          <div class="input-wrapper">
            <CInput
              v-model="brand"
              label="Marca"
              name="brand"
              placeholder="Digite a marca"
              variant="generic"
            />
          </div>

          <div class="input-wrapper">
            <CInput
              v-model="model"
              label="Modelo"
              name="model"
              placeholder="Ex: Corolla"
              variant="generic"
            />
          </div>

          <div class="input-wrapper">
            <CInput
              v-model="licensePlate"
              name="licensePlate"
              label="Placa do carro"
              placeholder="Ex: ABC-1234 ou ABC1D23"
              variant="plate"
              required
            />
          </div>

          <div class="input-wrapper">
            <CInput
              v-model="manufacturingDate"
              label="Ano de fabricação"
              name="manufacturing-date"
              placeholder="Ex: 2020"
              variant="generic"
            />
          </div>

          <div class="input-wrapper">
            <CInput
              v-model="color"
              label="Cor"
              name="color"
              placeholder="Ex: Cinza"
              variant="generic"
            />
          </div>

          <div class="input-wrapper">
            <CInput
              v-model="currentMileage"
              label="Quilometragem atual"
              name="current-mileage"
              variant="unit"
              placeholder="Ex: 123.456"
              required
            />
          </div>

          <div class="input-wrapper">
            <CSelect
              v-model="fuelType"
              name="fuel-type"
              label="Tipo de combustível"
              :options="fuelTypeOptions"
              placeholder="Escolha o tipo de combustível"
              @toggle="(val) => (isSelectOpen = val)"
            />
          </div>
        </div>
      </div>

      <CButton @click="handleSubmit" :isLoading="isLoading">Salvar</CButton>

      <div :style="{ paddingBottom: isSelectOpen ? '100px' : '0' }"></div>
    </div>
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

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import CInput from '@/shared/components/CInput.vue';
import CSelect from '@/shared/components/CSelect.vue';
import CModal from '@/shared/components/CModal.vue';
import CButton from '@/shared/components/CButton.vue';

interface Option {
  label: string;
  value: string;
}

const fuelTypeOptions: Option[] = [
  { label: 'Diesel', value: 'Diesel' },
  { label: 'Etanol', value: 'Etanol' },
  { label: 'Elétrico', value: 'Elétrico' },
  { label: 'Gasolina', value: 'Gasolina' },
];

const router = useRouter();
const isLoading = ref<boolean>(false);
const date = ref<string>('');
const color = ref<string>('');
const manufacturingDate = ref<string>('');
const currentMileage = ref<string>('');
const fuelType = ref<string>('');
const chassi = ref<string>('');
const brand = ref<string>('');
const model = ref<string>('');
const licensePlate = ref<string>('');
const isPositiveOpen = ref(false);
const isErrorOpen = ref(false);
const isSelectOpen = ref(false);

const successTitle = ref('Parabéns!');
const successDescription = ref(
  'Você cadastrou a troca de óleo do seu veículo. Iremos lhe informar sobre a próxima manutenção.'
);

const errorTitle = ref('Algo deu errado!');
const errorDescription = ref(
  'Suas alterações não foram salvas. Tente novamente mais tarde.'
);

const handleSubmit = (): void => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    isPositiveOpen.value = true;

    date.value = '';
    color.value = '';
    manufacturingDate.value = '';
    currentMileage.value = '';
  }, 1000);
};

function closeSuccess() {
  isPositiveOpen.value = false;
  router.push({ name: 'home' });
}
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
  margin-bottom: 20px;
}
.text-wrapper {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.subtitle {
  font-size: 14px;
  color: #5b6871;
}
.info-list li {
  margin-bottom: 12px;
}
</style>
