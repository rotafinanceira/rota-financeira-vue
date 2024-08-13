<template>
  <q-page>
    <HeaderBar
      title="Troca de Óleo"
      subtitle="Cadastro de Manutenção"
      :path="'/'"
    />
    <div class="main-content">
      <div class="card-wrapper">
        <div class="card">
          <div class="">
            <span>Selecione o veículo</span>
            <span
              >Escolha o carro para o qual deseja cadastrar a manutenção</span
            >
          </div>
          <div class="input-wrapper">
            <label class="" for="select-vehicle">Selecione seu carro*</label>
            <q-select
              id="select-vehicle"
              label="Placa do seu veículo"
            ></q-select>
          </div>
        </div>
        <div class="card"></div>
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
import ButtonComponent from '@/components/ButtonComponent.vue';
import HeaderBar from '@/components/HeaderBar.vue';
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

.styled-button {
  width: 100%;
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
</style>
