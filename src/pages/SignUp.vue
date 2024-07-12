<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="container-content">
        <p class="signup-title">Criar conta</p>
        <div class="form">
          <div class="inputs-wrapper">
            <InputEmail v-model="email" :errors="errors" label="E-mail*" />
            <InputEmail
              v-model="confirmEmail"
              :errors="errors"
              label="Confirmar e-mail*"
            />
          </div>
          <q-btn
            :label="'Avançar'"
            :loading="isLoading"
            :disable="isLoading || !isValid"
            @click="handleSubmit"
            class="styled-button"
          />
          <div class="sign-in-view">
            <span>Já possui conta?</span>
            <q-btn flat @click="navigateToSignIn" class="sign-in-button"
              >Entrar</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import logo from './../assets/logolight.svg';
import InputEmail from '../components/InputEmail.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
// const confirmEmail = ref('');
const errors = ref({});

const validateForm = () => {
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

const handleSubmit = async () => {
  // Watchers para validar o formulário quando os campos são alterados
  watch([email, password], () => {
    validateForm();
  });
  validateForm();
  if (!isValid.value) return;

  try {
    isLoading.value = true;
    // await loginStore.handleLogin({ email: email.value, password: password.value });
    router.push({ name: 'Success' }); // Redirecionamento após login bem-sucedido
  } catch (error) {
    const statusCode = error.response?.status;
    if (statusCode === 403) {
      isOpen.value = true;
      modalContent.value =
        'E-mail e/ou senha incorretos, verifique os dados informados.';
    } else if (statusCode === 404) {
      isOpen.value = true;
      modalContent.value = 'E-mail não cadastrado.\nFaça o cadastro no app.';
    }
  } finally {
    isLoading.value = false;
  }
};

const router = useRouter();

const navigateToSignIn = () => {
  router.push('/'); // Redirecionamento para a tela de cadastro
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 96px;
  padding: 0 20px;
  margin-top: 24px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
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
  gap: 0px; /* Alteração de acordo com o novo preview */
  margin-bottom: 16px; /* Alteração de acordo com o novo preview */
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
  margin-top: 8px; /* Alterado para novo preview */
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
