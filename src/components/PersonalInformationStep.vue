<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="signup-title">Informações Pessoais</div>
      <div class="container-content">
        <div class="form">
          <div class="inputs-wrapper">
            <q-input v-model="name" label="Nome*" outlined />
            <q-input v-model="surname" label="Sobrenome*" outlined />
          </div>
          <div class="birth-date-wrapper">
            <q-input v-model="day" label="Dia*" outlined type="number" maxlength="2" />
            <q-select v-model="month" label="Mês*" :options="months" outlined />
            <q-input v-model="year" label="Ano*" outlined type="number" maxlength="4" />
          </div>
          <div class="actions">
            <q-btn class="styled-button" label="Voltar" />
            <q-btn class="styled-button" label="Avançar" @click="goToPasswordStep" />
          </div>
        </div>
      </div>
      <div class="sign-in-view">
        Já tem uma conta? <a href="/login" class="sign-in-button">Entrar</a>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from './../assets/logolight.svg';

const router = useRouter();

const name = ref('');
const surname = ref('');
const day = ref('');
const month = ref(null); // Ou inicialize com um valor padrão para o mês
const year = ref('');

const months = [
  { label: 'Janeiro', value: 1 },
  { label: 'Fevereiro', value: 2 },
  // Adicione os outros meses conforme necessário
];

const goToPasswordStep = () => {
  router.push('/password-step');
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 96px;
  padding: 0 20px;
  margin-top: 24px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.logo {
  width: 230px;
}

.signup-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  text-align: center;
}

.container-content {
  display: flex;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.inputs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.birth-date-wrapper {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.styled-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #8ce95f;
  color: #314b39;
  font-weight: 700;
  font-family: 'Inter';
  text-transform: capitalize;
  font-size: 18px;
}

.sign-in-view {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: #737578;
  justify-content: center;
  margin-top: 8px;
}

.sign-in-button {
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #4140c2;
  font-weight: 700;
  padding-left: 4px;
}
</style>
