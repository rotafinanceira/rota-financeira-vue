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
            <InputEmail v-model="email" :errors="errors" label="E-mail" />
            <InputPassword v-model="password" :errors="errors" />
          </div>
          <ButtonComponent
            label="Entrar"
            :isLoading="isLoading"
            @click="onClick"
          />
          <SignInUpFooter
            message="Não possui cadastro?"
            buttonText="Cadastrar"
            @click="navigateToSignUpStep1"
          />
        </div>
      </div>
    </div>
    <ModalGenerico
      :title="modalContent"
      :open="isOpen"
      :description="modalDescription"
      :text-button="'Fechar'"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputPassword from '../components/InputPassword.vue';
import InputEmail from '../components/InputEmail.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import ModalGenerico from 'src/components/ModalGenerico.vue';
import SignInUpFooter from 'src/components/SignInUpFooter.vue';
import logo from './../assets/logolight.svg';
import { httpClient } from '../infra/http/httpClient';

const isLoading = ref(false);
const modalContent = ref('');
const modalDescription = ref('');
const isOpen = ref(false);
const isValid = ref(true);

const email = ref('');
const password = ref('');
const errors = ref({});

const router = useRouter();

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

const onClick = async () => {
  validateForm();

  if (!isValid.value) return;

  try {
    isLoading.value = true;
    const response = await httpClient.post('/login', {
      email: email.value,
      password: password.value,
    });
    if (response.status === 200) {
      router.push({ path: '/success' }); // Redirecionamento após login bem-sucedido
    }
  } catch (error) {
    const statusCode = error.response?.status;
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
  } finally {
    isLoading.value = false;
  }
};

const navigateToSignUpStep1 = () => {
  router.push({ path: '/register-1' });
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
  gap: 0px; /* Alteração de acordo com o novo preview */
  margin-bottom: 16px; /* Alteração de acordo com o novo preview */
}
</style>
