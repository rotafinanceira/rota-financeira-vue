<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="container-content">
        <p class="signup-title">Criar conta</p>
        <InputEmail v-model="email" :errors="errors" label="E-mail*" />
        <InputEmail
          v-model="confirmEmail"
          :errors="errors"
          label="Confirmar e-mail*"
        />
        <div class="btns-wrapper">
          <q-btn flat @click="() => {}" class="back-btn">Voltar</q-btn>
          <q-btn disabled @click="handleSubmit" class="next-btn">Avançar</q-btn>
        </div>
        <div class="signin">
          <p>Já possui conta?</p>
          <span>Entrar</span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import logo from './../assets/logolight.svg';
import InputEmail from '../components/InputEmail.vue';
import { ref } from 'vue';

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
  /* margin-bottom: 100px; */
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

.btns-wrapper {
  display: flex;
  width: 100%;
}

.back-btn {
  width: 30%;
  padding: 16px 0;
  margin-right: 16px;
  text-transform: capitalize;
  size: 16px;
  font-weight: 700px;
  line-height: 19px;
}

.next-btn {
  width: calc(70% - 16px);
  padding: 16px 0;
  text-transform: capitalize;
  size: 16px;
  font-weight: 700px;
  line-height: 19px;
  background-color: #8ce95f;
}

.next-btn:disabled {
  background-color: #e0e5e7;
  color: #76828b;
}

.signin {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.singin p,
.signin span {
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.signin p {
  margin: 0;
  margin-right: 4px;
  color: #737578;
}

.signin span {
  color: #3b9b15;
}
</style>
