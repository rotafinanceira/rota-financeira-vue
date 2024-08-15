<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <StepperComponent :step="1" />
      <div class="container-content">
        <p class="signup-title">Criar conta</p>
        <div class="form">
          <div class="inputs-wrapper">
            <div>
              <InputEmail
                v-model="email"
                :errors="errors"
                label="E-mail*"
                :is-register-step-one="true"
              />
              <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>
            <div>
              <InputEmail
                v-model="confirmEmail"
                :errors="errors"
                label="Confirmar e-mail*"
              />
              <div class="error" v-if="errors.confirmEmail">
                {{ errors.confirmEmail }}
              </div>
            </div>
          </div>
          <ButtonComponent
            label="Avançar"
            :isLoading="isLoading"
            @click="handleSubmit"
          />
          <SignInUpFooter
            message="Já possui conta?"
            buttonText="Entrar"
            :path="'/'"
          />
        </div>
      </div>
    </div>
    <ModalGenerico
      :title="modalContent"
      :open="isOpen"
      :description="modalDescription"
      :textButton="'Tentar novamente'"
    />
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/assets/logolight.svg';
import InputEmail from '@/components/InputEmail.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import SignInUpFooter from '@/components/SignInUpFooter.vue';
import ModalGenerico from '@/components/ModalGenerico.vue';
import StepperComponent from '@/components/StepperComponent.vue';
import { useRegisterStore } from '@/store/registerStore';
import { httpClient } from '@/infra/http/httpClient';

const store = useRegisterStore();
const isLoading = ref(false);
const isValidatingForm = ref(false);

const modalContent = ref('');
const modalDescription = ref('');
const isOpen = ref(false);
const isValid = ref(true);

const email = ref(store.email);
const confirmEmail = ref(store.confirmEmail);
const errors = ref({});

const router = useRouter();

const validateForm = () => {
  isValidatingForm.value = true;
  errors.value = {};
  isValid.value = true;

  if (!email.value) {
    errors.value.email = 'Campo obrigatório';
    isValid.value = false;
  } else if (
    email.value.length < 3 ||
    email.value.length > 50 ||
    !/\S+@\S+\.\S+/.test(email.value)
  ) {
    errors.value.email = 'E-mail inválido';
    isValid.value = false;
  }

  if (!confirmEmail.value) {
    errors.value.confirmEmail = 'Campo obrigatório';
    isValid.value = false;
  } else if (email.value !== confirmEmail.value) {
    errors.value.confirmEmail = 'Os e-mails digitados não são correspondentes';
    isValid.value = false;
  }
};

watch([email, confirmEmail], () => {
  if (!isValidatingForm.value) return;
  validateForm();
});

const verifyEmail = async (email) => {
  try {
    const response = await httpClient.post('/user/verify', { email });
    return response;
  } catch (error) {
    throw error.response?.status;
  }
};

const handleApiError = (statusCode) => {
  if (statusCode === 404 || statusCode === 400) {
    if (isValid.value) {
      store.setEmail(email.value);
      store.setConfirmEmail(confirmEmail.value);
      router.push('/register-2');
    }
  } else {
    console.log(statusCode);
    isOpen.value = true;
    modalContent.value = 'Ocorreu um erro ao tentar cadastrar o e-mail';
    modalDescription.value = 'Tente novamente mais tarde';
  }
};

const handleSubmit = async () => {
  validateForm();

  try {
    const response = await verifyEmail(email.value);
    if (response.status === 200) {
      isOpen.value = true;
      modalContent.value = 'E-mail já cadastrado';
      modalDescription.value = 'Faça o login no App';
    }
  } catch (statusCode) {
    handleApiError(statusCode);
  } finally {
    isLoading.value = false;
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
  margin-bottom: 24px;
  margin-top: 80px;
  color: #314b39;
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
  gap: 20px;
  margin-bottom: 32px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
