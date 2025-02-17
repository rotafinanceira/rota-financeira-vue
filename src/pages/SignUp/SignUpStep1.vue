<template>
  <q-page padding>
    <div class="container">
      <HeaderBarWithInfo title="Cadastro - Passo 1" subtitle="" path="/" />
      <SignUpTitleStepper :step="1" />
      <div class="container-content">
        <div class="form">
          <div class="inputs-wrapper">
            <div>
              <InputEmail
                v-model="email"
                :errors="errors"
                label="E-mail"
                :is-register-step-one="true"
              />
              <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>
            <div>
              <InputEmail
                v-model="confirmEmail"
                :errors="errors"
                label="Confirmar e-mail"
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
            message="Já tem uma conta?"
            buttonText="Entrar"
            :path="'/'"
          />
        </div>
      </div>
    </div>
    <ModalGenericoAlert
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
import InputEmail from '@/components/InputEmail.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import SignInUpFooter from '@/components/SignInUpFooter.vue';
import ModalGenericoAlert from '@/components/ModalGenericoAlert.vue';
import SignUpTitleStepper from '@/components/SignUpTitleStepper.vue';
import HeaderBarWithInfo from '@/components/HeaderBarWithInfo.vue';
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

const navigateBack = () => {
  router.push('/');
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
  router.push('/register-2');
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
