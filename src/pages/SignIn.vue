<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="container-content">
        <div class="title">Olá, entre com e-mail e senha</div>
        <!-- ModalGenerico :content="modalContent" /-->
        <div class="form">
          <div class="inputs-wrapper">
            <InputEmail v-model="email" :errors="errors" />
            <InputPassword v-model="password" :errors="errors" />
          </div>
          <q-btn
            :label="'Entrar'"
            :loading="isLoading"
            :disable="isLoading || !isValid"
            @click="handleSubmit"
            class="styled-button"
          />
          <div class="sign-up-view">
            <span>Não possui cadastro?</span>
            <q-btn flat @click="navigateToRegister" class="sign-up-button"
              >Cadastrar</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import InputPassword from '../components/InputPassword.vue';
import InputEmail from '../components/InputEmail.vue';
import logo from './../assets/logolight.svg';

const isLoading = ref(false);
const modalContent = ref('');
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

const handleSubmit = async () => {
  // Watchers para validar o formulário quando os campos são alterados
  watch([email, password], () => {
    validateForm();
  });

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

const navigateToRegister = () => {
  router.push('register/'); // Redirecionamento para a tela de cadastro
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
  gap: 16px;
  margin-bottom: 32px;
}

.styled-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border-radius: 4px;
  background-color: #8ce95f;
  color: #314b39;
  font-weight: 700;
  font-family: 'Inter';
  text-transform: capitalize;
  font-size: 16px;
}

.sign-up-view {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: #737578;
  justify-content: center;
  margin-top: 16px;
}

.sign-up-button {
  color: #8ce95f;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #3b9b15;
  font-weight: 700;
  padding-left: 4px;
}
</style>
