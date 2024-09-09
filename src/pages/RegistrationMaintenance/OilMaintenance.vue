<template>
  <q-page>
    <HeaderBar
      title="Troca de Óleo"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle @vehicle-selected="setCarId" />
        <div class="card">
          <div>
            <span>Manutenção*</span>
          </div>
          <div class="input-wrapper">
            <label for="last-oil-change">Última troca</label>
            <q-input
              id="last-oil-change"
              outlined
              v-model="date"
              mask="##/##/####"
              placeholder="Seleciona ou digita a data"
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
              <q-date v-model="date" mask="DD/MM/YYYY" @input="onDateSelect" />
            </q-menu>
          </div>

          <div class="input-wrapper">
            <label for="mileage">Quilometragem*</label>
            <q-input
              id="mileage"
              outlined
              v-model="mileage"
              label="Ex: 86.540"
              type="number"
            ></q-input>
          </div>
          <div class="input-wrapper">
            <label for="oil-type">Tipo de Óleo*</label>
            <q-select
              id="oil-type"
              outlined
              v-model="oilType"
              :options="oilOptions"
              label="Selecione o tipo de óleo"
            ></q-select>
          </div>
          <div class="input-wrapper">
            <label for="liters">Litros utilizados*</label>
            <q-input
              id="liters"
              outlined
              v-model="liters"
              label="Insira a quantidade de litros"
              type="number"
            ></q-input>
          </div>
          <div class="input-wrapper">
            <label for="oil-brand">Marca</label>
            <q-input
              id="oil-brand"
              outlined
              v-model="oilBrand"
              label="Ex: Castrol"
            ></q-input>
          </div>
        </div>
      </div>
      <ButtonComponent
        label="Finalizar"
        :isLoading="isLoading"
        @click="handleSubmit"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SelectVehicle from '@/components/SelectVehicle.vue';
import { httpClient } from '@/infra/http/httpClient';

// Estado reativo e referências
const showDatePicker = ref(false);
const isLoading = ref(false);
const date = ref('');
const mileage = ref('');
const oilType = ref('');
const liters = ref('');
const oilBrand = ref('');
const carId = ref(null);

const oilOptions = [
  { label: 'Sintético', value: 'sintetico' },
  { label: 'Semi-Sintético', value: 'semi-sintetico' },
  { label: 'Mineral', value: 'mineral' },
  { label: 'Outro', value: 'outro' },
];

// Funções
const onDateSelect = (value) => {
  date.value = value;
  showDatePicker.value = false;
};

const setCarId = (selectedCarId) => {
  carId.value = selectedCarId;
};

const handleSubmit = () => {
  isLoading.value = true;

  // Definindo o payload com os campos conforme o Swagger
  const payload = {
    car_id: carId.value, // ID do carro
    last_maintenance_date: date.value, // Data da última manutenção
    oil_brand: oilBrand.value, // Marca do óleo
    last_maintenance_km: parseInt(mileage.value, 10), // Quilometragem da última manutenção (convertendo para número)
    oil_type: oilType.value, // Tipo de óleo
    oil_quantity_lt: parseFloat(liters.value), // Quantidade de óleo em litros (convertendo para número)
  };

  // Enviando a requisição com o payload correto
  httpClient
    .post('/maintenance/oil', payload)
    .then((response) => {
      console.log('Dados enviados com sucesso:', response.data);

      // Redirecionar para outra página
      this.$router.push('/');

      // Limpar os campos após o envio
      date.value = '';
      mileage.value = '';
      oilType.value = '';
      liters.value = '';
      oilBrand.value = '';
    })
    .catch((error) => {
      console.error('Erro ao enviar os dados:', error);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>


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
  margin-bottom: 16px;
}

.q-input__inner {
  cursor: pointer;
}
</style>
