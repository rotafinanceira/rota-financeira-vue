<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <StepperComponent :step="2" />
      <div class="signup-title">Informações Pessoais</div>
      <div class="container-content">
        <div class="form">
          <div class="inputs-wrapper">
            <q-input
              v-model="name"
              label="Nome*"
              outlined
              :error="nameError !== ''"
              :error-message="nameError"
              @input="validateName"
              class="input-field"
            />
            <q-input
              v-model="lastName"
              label="Sobrenome*"
              outlined
              :error="lastNameError !== ''"
              :error-message="lastNameError"
              @input="validatelastName"
              class="input-field"
            />
          </div>
          <div class="birth-date-wrapper">
            <q-input
              v-model="day"
              label="Dia*"
              outlined
              type="number"
              maxlength="2"
              :error="dayError !== ''"
              :error-message="dayError"
              @input="validateDay"
              class="input-field"
            />
            <q-select
              v-model="month"
              label="Mês*"
              :options="months"
              outlined
              :error="monthError !== ''"
              :error-message="monthError"
              @input="validateMonth"
              class="input-field"
            />
            <q-input
              v-model="year"
              label="Ano*"
              outlined
              type="number"
              maxlength="4"
              :error="yearError !== ''"
              :error-message="yearError"
              @input="validateYear"
              class="input-field"
            />
          </div>
          <div class="actions">
            <q-btn class="back-button" label="Voltar" />
            <q-btn
              class="styled-button"
              label="Avançar"
              :disable="!formValid"
              @click="goToPasswordStep"
            />
          </div>
        </div>
      </div>
      <div class="view">
        Já tem uma conta? <a href="/login" class="sign-in-button">Entrar</a>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import logo from '../../assets/logolight.svg';
import { useRegisterStore } from '../../store/registerStore'; // Importar o store

import StepperComponent from '../../components/StepperComponent.vue';
import { useRouter } from 'vue-router';

const store = useRegisterStore(); // Usar o store
const router = useRouter();
const name = ref(store.name); // Inicializar com o valor do store
const lastName = ref(store.lastName); // Inicializar com o valor do store
const day = ref(store.day); // Inicializar com o valor do store
const month = ref(store.month); // Inicializar com o valor do store
const year = ref(store.year); // Inicializar com o valor do store

const nameError = ref('');
const lastNameError = ref('');
const dayError = ref('');
const monthError = ref('');
const yearError = ref('');

const months = [
  { label: 'Janeiro', value: 1 },
  { label: 'Fevereiro', value: 2 },
  { label: 'Março', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Maio', value: 5 },
  { label: 'Junho', value: 6 },
  { label: 'Julho', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Setembro', value: 9 },
  { label: 'Outubro', value: 10 },
  { label: 'Novembro', value: 11 },
  { label: 'Dezembro', value: 12 },
];

const validateName = () => {
  if (!name.value) {
    nameError.value = 'Nome é obrigatório';
  } else if (/[^a-zA-Z\s]/.test(name.value)) {
    nameError.value = 'Nome não pode conter caracteres especiais ou números';
  } else {
    nameError.value = '';
  }
};

const validatelastName = () => {
  if (!lastName.value) {
    lastNameError.value = 'Sobrenome é obrigatório';
  } else if (/[^a-zA-Z\s]/.test(lastName.value)) {
    lastNameError.value =
      'Sobrenome não pode conter caracteres especiais ou números';
  } else {
    lastNameError.value = '';
  }
};

const validateDay = () => {
  const dayValue = parseInt(day.value, 10);
  if (!day.value) {
    dayError.value = 'Dia é obrigatório';
  } else if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
    dayError.value = 'Dia inválido';
  } else {
    dayError.value = '';
  }
};

const validateMonth = () => {
  if (!month.value) {
    monthError.value = 'Mês é obrigatório';
  } else {
    monthError.value = '';
  }
};

const validateYear = () => {
  const yearValue = parseInt(year.value, 10);
  if (!year.value) {
    yearError.value = 'Ano é obrigatório';
  } else if (isNaN(yearValue)) {
    yearError.value = 'Ano inválido';
  } else {
    yearError.value = '';
  }
};

const validateBirthDate = () => {
  validateDay();
  validateMonth();
  validateYear();
};

const formValid = computed(() => {
  validateName();
  validatelastName();
  validateBirthDate();
  return (
    !nameError.value &&
    !lastNameError.value &&
    !dayError.value &&
    !monthError.value &&
    !yearError.value
  );
});

const goToPasswordStep = () => {
  if (formValid.value) {
    store.setName(name.value); // Atualizar o store
    store.setlastName(lastName.value); // Atualizar o store
    store.setDay(day.value); // Atualizar o store
    store.setMonth(month.value); // Atualizar o store
    store.setYear(year.value); // Atualizar o store
    router.push('/register-3');
  }
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

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #ffffff; /* Fundo branco */
  border: 2px solid #8ce95f; /* Borda verde */
  color: #314b39;
  font-weight: 700;
  font-family: 'Inter';
  text-transform: capitalize;
  font-size: 18px;
}

.back-button:hover {
  background-color: #f0f0f0; /* Fundo levemente cinza ao passar o mouse */
}

.view {
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

.input-field {
  border: 1px solid #ccc;
}

.input-field.q-input--error {
  border-color: red;
}
</style>
