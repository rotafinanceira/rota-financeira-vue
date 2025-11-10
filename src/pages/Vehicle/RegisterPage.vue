<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import { useCarStore } from '@/stores/carStore';

import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';
import CInput from '@/shared/components/CInput.vue';
import CSelect from '@/shared/components/CSelect.vue';

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
const carStore = useCarStore();

const chassi = ref('');
const brand = ref('');
const model = ref('');
const licensePlate = ref('');
const manufacturingDate = ref('');
const color = ref('');
const currentMileage = ref('');
const fuelType = ref('');

const isSelectOpen = ref(false);
const isLoading = ref(false);
const isPositiveOpen = ref(false);
const isErrorOpen = ref(false);

const successTitle = ref('Parabéns!');
const successDescription = ref(
  'Seu veículo foi cadastrado com sucesso! Agora você pode começar a registrar suas manutenções.'
);

const errorTitle = ref('Algo deu errado!');
const errorDescription = ref(
  'Não foi possível salvar o cadastro. Tente novamente mais tarde.'
);

async function handleSubmit() {
  isLoading.value = true;

  try {
    /*
    const payload = {
      chassi: chassi.value.trim(),
      brand: brand.value.trim(),
      model: model.value.trim(),
      license_plate: licensePlate.value.trim().toUpperCase(),
      year: Number(manufacturingDate.value),
      color: color.value.trim(),
      current_mileage: Number(currentMileage.value),
      fuel_type: fuelType.value,
    };
    */

    const payload = {
      model: model.value.trim(),
      year: Number(manufacturingDate.value),
      license_plate: licensePlate.value.trim().toUpperCase(),
      current_mileage: Number(currentMileage.value),
    };

    console.log(payload);

    await carStore.registerCar(payload);

    isPositiveOpen.value = true;

    chassi.value = '';
    brand.value = '';
    model.value = '';
    licensePlate.value = '';
    manufacturingDate.value = '';
    color.value = '';
    currentMileage.value = '';
    fuelType.value = '';
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    console.error('Erro ao registrar veículo:', error);
    isErrorOpen.value = true;
  } finally {
    isLoading.value = false;
  }
}

function closeSuccess() {
  isPositiveOpen.value = false;
  router.push({ name: 'home' });
}
</script>

<template>
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
            placeholder="Ex: 9BG. RD08X0. 4G.117974"
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
            label="Placa do carro"
            name="licensePlate"
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

    <!-- Modal de sucesso -->
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

    <!-- Modal de erro -->
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
