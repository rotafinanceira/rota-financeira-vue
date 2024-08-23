<template>
  <q-page>
    <HeaderBar
      title="Troca de Óleo"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <!-- Primeiro card: Seleção de veículo -->
        <SelectVehicle />

        <!-- Segundo card: Manutenção -->
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
            <q-input id="mileage" outlined label="Ex: 86.540"></q-input>
          </div>
          <div class="input-wrapper">
            <label for="brand">Tipo*</label>
            <q-select
              id="brand"
              outlined
              label="Insira a marca do filtro instalado"
            ></q-select>
          </div>
          <div class="input-wrapper">
            <label for="liters">Litros utilizados*</label>
            <q-select
              id="liters"
              outlined
              label="Insira o modelo do filtro instalado"
            ></q-select>
          </div>
          <div class="input-wrapper">
            <label for="oil-brand">Marca</label>
            <q-select id="oil-brand" outlined label="Ex: Castrol"></q-select>
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

const date = ref('');
const showDatePicker = ref(false);
const isLoading = ref(false);

function onDateSelect(value) {
  date.value = value;
  showDatePicker.value = false;
}

function handleSubmit() {
  // Lógica para envio do formulário
}
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
