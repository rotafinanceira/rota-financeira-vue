<template>
  <q-page>
    <HeaderBar
      title="Troca de Óleo"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <SelectVehicle />
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

<script>
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SelectVehicle from '@/components/SelectVehicle.vue';
import { httpClient } from '@/infra/http/httpClient';

export default {
  name: 'OilChangePage',
  components: {
    ButtonComponent,
    HeaderBar,
    SelectVehicle,
  },
  data() {
    return {
      date: '',
      showDatePicker: false,
      isLoading: false,
      mileage: '',
      oilType: '',
      liters: '',
      oilBrand: '',
      oilOptions: [
        { label: 'Sintético', value: 'sintetico' },
        { label: 'Semi-Sintético', value: 'semi-sintetico' },
        { label: 'Mineral', value: 'mineral' },
        { label: 'Outro', value: 'outro' },
      ],
    };
  },
  methods: {
    onDateSelect(value) {
      this.date = value;
      this.showDatePicker = false;
    },
    handleSubmit() {
      console.log('Botão Finalizar clicado.');
      console.log('Data Selecionada:', this.date);
      console.log('Quilometragem:', this.mileage);
      console.log('Tipo de Óleo:', this.oilType);
      console.log('Litros Utilizados:', this.liters);
      console.log('Marca do Óleo:', this.oilBrand);

      // Validação dos campos obrigatórios
      if (!this.date || !this.mileage || !this.oilType || !this.liters) {
        console.error('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Conversão dos campos para os formatos esperados pelo backend
      const payload = {
        date: this.date, // Certifique-se de que o formato está correto
        mileage: parseFloat(this.mileage), // Convertido para número
        oilType: this.oilType,
        liters: parseFloat(this.liters), // Convertido para número
        oilBrand: this.oilBrand,
        car_id: this.carId, // Adicione o car_id se necessário
      };

      // Ativa o estado de carregamento
      this.isLoading = true;

      // Envia os dados ao backend
      httpClient
        .post('/manutencao/troca-oleo', payload) // Atualize a rota conforme sua API
        .then((response) => {
          console.log('Dados enviados com sucesso:', response.data);
          // Adicione a lógica de sucesso, como navegação ou exibição de mensagens
        })
        .catch((error) => {
          console.error('Erro ao enviar os dados:', error);
          // Adicione lógica de tratamento de erros
        })
        .finally(() => {
          // Desativa o estado de carregamento
          this.isLoading = false;
        });
    },
  },
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
