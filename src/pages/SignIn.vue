<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="container-content">
        <div class="title">Olá, entre com e-mail e senha</div>
        <div class="form">
          <div class="inputs-wrapper">
            <div>
              <InputEmail v-model="email" :errors="errors" label="E-mail" />
              <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <div>
              <InputPassword v-model="password" :errors="errors" />
              <div class="error" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>
          </div>
          <ButtonComponent
            label="Entrar"
            :isLoading="isLoading"
            @click="handleSubmit"
          />
          <div class="divider">
            <div class="line"></div>
            <span class="divider-text">ou</span>
            <div class="line"></div>
          </div>
          <button class="google-button" @click="continueWithGoogle">
            <img :src="googleIcon" alt="Google Icon" class="google-icon" />
            <span class="google-button-text">Entrar com o Google</span>
          </button>
        </div>
        <q-btn
          label="Ir para Home"
          color="primary"
          @click="navigateToHome"
        ></q-btn>
      </div>
    </div>
    <ModalGenericoAlert
      :title="modalContent"
      :open="isOpen"
      :description="modalDescription"
      :text-button="'Fechar'"
    />
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import InputPassword from '@/components/InputPassword.vue';
import InputEmail from '@/components/InputEmail.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ModalGenericoAlert from '@/components/ModalGenericoAlert.vue';
import logo from '@/assets/logolight.svg';
import googleIcon from '@/assets/googleIcon.svg';
import { httpClient } from '@/infra/http/httpClient';

const isLoading = ref(false);
const isValidatingForm = ref(false);

const modalContent = ref('');
const modalDescription = ref('');
const isOpen = ref(false);
const isValid = ref(true);

const email = ref('');
const password = ref('');
const errors = ref({});

const router = useRouter();

const resetModal = () => {
  modalContent.value = '';
  modalDescription.value = '';
  isOpen.value = false;
};

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

  if (!password.value) {
    errors.value.password = 'Campo obrigatório';
    isValid.value = false;
  } else if (password.value.length < 3 || password.value.length > 15) {
    errors.value.password = 'Senha inválida';
    isValid.value = false;
  }
};

watch([email, password], () => {
  if (!isValidatingForm.value) return;
  validateForm();
});

const handleSubmit = async () => {
  resetModal();
  validateForm();

  if (!isValid.value) return;

  try {
    isLoading.value = true;
    const response = await httpClient.post('/login', {
      email: email.value,
      password: password.value,
    });
    if (response.status === 200) {
      router.push({ path: '/success' });
    }
  } catch (error) {
    handleApiError(error.response?.status);
  } finally {
    isLoading.value = false;
  }
};

const handleApiError = (statusCode) => {
  if (statusCode === 403) {
    isOpen.value = true;
    modalContent.value = 'E-mail e/ou senha incorretos';
    modalDescription.value = 'Verifique os dados informados';
  } else if (statusCode === 404) {
    isOpen.value = true;
    modalContent.value = 'E-mail não cadastrado';
    modalDescription.value = 'Faça o cadastro no App';
  } else {
    isOpen.value = true;
    modalContent.value = 'Ocorreu um erro ao tentar fazer login';
    modalDescription.value = 'Tente novamente mais tarde';
  }
};

const navigateToHome = () => {
  router.push('/home');
};

const continueWithGoogle = () => {
  // Implement Google sign-in logic here
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 96px;
  padding: 0 20px;
  margin-top: 24px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 230px;
}

.container-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.title {
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  padding: 0px 10px;
  color: #314b39;
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
  color: #b00020;
  font-size: 14px;
  margin-top: 5px;
  line-height: 21px;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 40px 0;
}

.divider-text {
  color: #314b39;
  font-size: 14px;
}

.line {
  flex: 1 0 0;
  height: 0px;
  border-top: 1px solid var(--Cores-Secundria-200, #9DB8A1);
}

.google-button {
  display: flex;
  height: 48px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #c2c9cd;
  background: #f9fcfa;
  cursor: pointer;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.google-button-text {
  color: var(--primary-900, #245017);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 19.2px */
}
</style>
