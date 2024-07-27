<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <StepperComponent :step="2" />
      <div class="signup-title">Criar conta</div>
      <div class="container-content">
        <div class="form">
          <div class="names-inputs-wrapper">
            <div class="input-wrapper">
              <label
                :class="['input-label', { 'input-label-error': !!nameError }]"
                for="input-name"
              >
                Nome*
              </label>
              <q-input
                v-model="name"
                id="input-name"
                placeholder="Insira seu primeiro nome"
                outlined
                :error="nameError !== ''"
                :error-message="nameError"
                class="input-field"
                hide-bottom-space
              />
            </div>

            <div class="input-wrapper">
              <label
                :class="[
                  'input-label',
                  { 'input-label-error': !!lastNameError },
                ]"
                for="input-last-name"
              >
                Sobrenome*
              </label>
              <q-input
                v-model="lastName"
                id="input-last-name"
                placeholder="Insira seu sobrenome"
                outlined
                :error="lastNameError !== ''"
                :error-message="lastNameError"
                class="input-field"
                hide-bottom-space
              />
            </div>
          </div>
          <div class="birth-date-wrapper">
            <data class="birthdate-title">Data de nascimento</data>

            <div class="day-month-inputs-wrapper">
              <div class="input-wrapper w-50">
                <label
                  :class="['input-label', { 'input-label-error': !!dayError }]"
                  for="input-day"
                >
                  Dia*
                </label>
                <q-input
                  v-model="day"
                  id="input-day"
                  placeholder="DD"
                  outlined
                  type="number"
                  maxlength="2"
                  :error="dayError !== ''"
                  :error-message="dayError"
                  class="input-field"
                  hide-bottom-space
                />
              </div>

              <div class="input-wrapper w-50">
                <label
                  :class="[
                    'input-label',
                    { 'input-label-error': !!monthError },
                  ]"
                  for="input-month"
                >
                  Mês*
                </label>
                <q-select
                  v-model="month"
                  id="input-month"
                  placeholder="MM"
                  :options="months"
                  outlined
                  :error="monthError !== ''"
                  :error-message="monthError"
                  class="input-field"
                  hide-bottom-space
                />
              </div>
            </div>

            <div class="input-wrapper">
              <label
                :class="['input-label', { 'input-label-error': !!yearError }]"
                for="input-year"
              >
                Ano*
              </label>
              <q-input
                v-model="year"
                id="input-year"
                placeholder="AAAA"
                outlined
                type="number"
                maxlength="4"
                :error="yearError !== ''"
                :error-message="yearError"
                class="input-field"
                hide-bottom-space
              />
            </div>
          </div>
          <div class="actions">
            <q-btn
              class="styled-button"
              label="Avançar"
              @click="goToNextStep"
            />
          </div>
        </div>
      </div>
      <SignInUpFooter
        message="Já possui conta?"
        buttonText="Entrar"
        :path="'/'"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import logo from '@/assets/logolight.svg';
import { useRegisterStore } from '@/store/registerStore'; // Importar o store
import StepperComponent from '@/components/StepperComponent.vue';
import SignInUpFooter from '@/components/SignInUpFooter.vue';
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
  } else if (isNaN(yearValue) || yearValue < 1800) {
    yearError.value = 'Ano inválido';
  } else {
    yearError.value = '';
  }
};

const validateAllInfo = () => {
  validateName();
  validatelastName();
  validateDay();
  validateMonth();
  validateYear();
};

const formValid = computed(() => {
  return (
    !nameError.value &&
    !lastNameError.value &&
    !dayError.value &&
    !monthError.value &&
    !yearError.value
  );
});

const goToNextStep = () => {
  validateAllInfo();
  if (formValid.value) {
    store.setName(name.value); // Atualizar o store
    store.setlastName(lastName.value); // Atualizar o store
    store.setDay(day.value); // Atualizar o store
    store.setMonth(month.value); // Atualizar o store
    store.setYear(year.value); // Atualizar o store
    navigateToNextStep();
  }
};

const navigateToNextStep = () => {
  router.push('/register-3');
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-top: 24px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.logo {
  width: 230px;
}

.signup-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.02em;
  margin: 32px 0 24px 0;
}

.birthdate-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
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

.names-inputs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.input-wrapper.w-50 {
  width: 50%;
}

.day-month-inputs-wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.input-label {
  font-size: 16px;
  font-weight: 500;
  color: #33373c;
}

.input-label-error {
  color: #b00020;
}

.birth-date-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
}

.styled-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #8ce95f;
  color: #314b39;
  font-weight: 700;
  font-family: 'Inter';
  text-transform: capitalize;
  font-size: 18px;
}

/* Comentado temporariamente - aguardar decisão de design */
/* .back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 2px solid #8ce95f;
  color: #314b39;
  font-weight: 700;
  font-family: 'Inter';
  text-transform: capitalize;
  font-size: 18px;
}

.back-button:hover {
  background-color: #f0f0f0;
} */

.sign-in-button {
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #4140c2;
  font-weight: 700;
  padding-left: 4px;
}

.input-field.q-input--error {
  border-color: red;
}

.input-field.q-input--error .q-field__control {
  border-color: red;
}

.input-field.q-input--error .q-field__control::before {
  border-color: red;
}
</style>
