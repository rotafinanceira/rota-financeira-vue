<template>
  <q-page padding>
    <div class="container">
      <div class="header-bar">
        <div @click="navigateBack" class="return-button">
          <q-img :src="backArrow" />
        </div>
        <div class="logo">
          <img :src="logo" alt="Logo" />
          <div class="logo-text">
            <span class="bold-text">Rota</span>Financeira
          </div>
        </div>
      </div>
      <SignUpTitleStepper :step="3" />
      <div class="container-content">
        <form class="form" @submit.prevent="createAccount">
          <div class="inputs-wrapper">
            <SignUpNameInput v-model="fullName" label="Nome Completo" />
            <span v-if="nameError" class="error-message">{{ nameError }}</span>

            <SignUpBirthdateInput
              v-model="birthdate"
              label="Data de nascimento"
            />
            <span v-if="birthdateError" class="error-message">{{
              birthdateError
            }}</span>

            <SignUpPhoneInput v-model="phone" label="Telefone" />
            <span v-if="phoneError" class="error-message">{{
              phoneError
            }}</span>
          </div>
          <div>
            <q-checkbox
              v-model="acceptTerms"
              label="Li e concordo com as regras do Termo de Uso e Privacidade"
              color="#4E4EDD"
            />
            <span v-if="formSubmitted && !acceptTerms" class="error-message"
              >Você deve aceitar os termos</span
            >
          </div>
        </form>
      </div>
      <ButtonComponent
        label="Finalizar"
        :isLoading="isLoading"
        @click="createAccount"
      />
      <SignInUpFooter
        message="Já tem uma conta?"
        buttonText="Entrar"
        :path="'/'"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/store/registerStore';
import logo from '@/assets/logoRF.svg';
import backArrow from '@/assets/backarrow.svg';
import SignInUpFooter from '@/components/SignInUpFooter.vue';
import SignUpTitleStepper from '@/components/SignUpTitleStepper.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import SignUpNameInput from '@/components/SignUpNameInput.vue';
import SignUpBirthdateInput from '@/components/SignUpBirthdateInput.vue';
import SignUpPhoneInput from '@/components/SignUpPhoneInput.vue';

const store = useRegisterStore();
const router = useRouter();

const isLoading = ref(false);
const fullName = ref(store.name + (store.lastName ? ` ${store.lastName}` : ''));
const birthdate = ref(
  `${store.day}/${store.month}/${store.year}`.replace(/^\/\//, '')
);
const phone = ref(store.phone || '');
const nameError = ref('');
const birthdateError = ref('');
const phoneError = ref('');
const acceptTerms = ref(false);
const formSubmitted = ref(false); // Novo estado para controlar a validação após a submissão

const navigateBack = () => {
  router.push('/');
};

const validateName = () => {
  if (!fullName.value.trim()) {
    nameError.value = 'O nome completo é obrigatório';
    return false;
  }
  if (fullName.value.trim().split(' ').length < 2) {
    nameError.value = 'Digite pelo menos um sobrenome';
    return false;
  }
  nameError.value = '';
  return true;
};

const validateBirthdate = () => {
  if (!birthdate.value) {
    birthdateError.value = 'Data de nascimento é obrigatória';
    return false;
  }
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(birthdate.value)) {
    birthdateError.value = 'Formato inválido. Use dd/mm/aaaa';
    return false;
  }
  const [day, month, year] = birthdate.value.split('/');
  store.setDay(day);
  store.setMonth(month);
  store.setYear(year);
  birthdateError.value = '';
  return true;
};

const validatePhone = () => {
  if (!phone.value) {
    phoneError.value = 'O telefone é obrigatório';
    return false;
  }
  const cleanedPhone = phone.value.replace(/\D/g, '');
  if (cleanedPhone.length !== 11) {
    phoneError.value = 'O telefone deve conter 11 dígitos';
    return false;
  }
  phoneError.value = '';
  return true;
};

const validateAllInfo = () => {
  return (
    validateName() &&
    validateBirthdate() &&
    validatePhone() &&
    acceptTerms.value
  );
};

const createAccount = async () => {
  formSubmitted.value = true;

  if (validateAllInfo()) {
    store.setName(fullName.value.split(' ')[0]);
    store.setLastName(fullName.value.split(' ').slice(1).join(' '));
    // store.setPhone(phone.value);

    store.resetStore();
    router.push('/');
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-top: 24px;
}

.header-bar {
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 6px 20px;
  position: relative; /* Ensure relative positioning for alignment */
}

.return-button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px; /* Align with the logo */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Center vertically */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 85px; /* Adjusted to add 65px space from return-button */
}

.logo-text {
  display: flex;
  align-items: center; /* Center vertically */
  width: 128.344px;
  height: 13.558px;
  flex-shrink: 0;
  color: var(--Cores-Primria-800, #245017);
  font-family: Inter;
  font-size: 18.346px;
  font-style: italic;
  font-weight: 400;
  line-height: 13.76px; /* 75% */
  letter-spacing: -0.202px;
}

.bold-text {
  font-weight: 700;
}

.logo img {
  width: 19.734px;
  height: 18px;
  flex-shrink: 0;
  fill: var(--Cores-Primria-200, #8ce95f);
}

.container-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.inputs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
