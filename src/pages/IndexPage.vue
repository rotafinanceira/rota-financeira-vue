<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="title">Olá, faça o seu login em nosso App.</div>
      <q-dialog v-model="isOpen">
        <q-card>
          <q-card-section class="q-pt-none">
            <div class="text-h6">{{ modalContent }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="form">
        <div class="input-wrapper">
          <label class="input-label" for="email">E-mail</label>
          <q-input
            v-model="email"
            id="email"
            placeholder="exemplo@email.com"
            :error="!!errors.email"
            :error-message="errors.email"
            clearable
            dense
            class="styled-input"
            no-border
          />
        </div>
        <div class="input-wrapper">
          <label class="input-label" for="password">Senha</label>
          <q-input
            v-model="password"
            id="password"
            placeholder="********"
            :type="'password'"
            :error="!!errors.password"
            :error-message="errors.password"
            clearable
            dense
            class="styled-input"
            no-border
          />
          <q-icon
            name="visibility"
            class="toggle-visibility"
            @click="togglePasswordVisibility"
          />
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
          <q-btn flat @click="navigateToRegister" class="sign-up-button">Cadastrar</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from './../assets/logolight.svg'

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const modalContent = ref('');
const isOpen = ref(false);
const errors = ref({});
const isValid = ref(true);

const router = useRouter();

const validateForm = () => {
  errors.value = {};
  isValid.value = true;

  if (!email.value) {
    errors.value.email = 'Campo obrigatório';
    isValid.value = false;
  } else if (email.value.length < 3 || email.value.length > 50 || !/\S+@\S+\.\S+/.test(email.value)) {
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
  validateForm();

  if (!isValid.value) return;

  try {
    isLoading.value = true;
    // Supondo que loginStore.handleLogin seja uma função que realiza a autenticação
    await loginStore.handleLogin({ email: email.value, password: password.value });
    router.push({ name: 'Success' });
  } catch (error) {
    const statusCode = error.response?.status;
    if (statusCode === 403) {
      isOpen.value = true;
      modalContent.value = 'E-mail e/ou senha incorretos, verifique os dados informados.';
    } else if (statusCode === 404) {
      isOpen.value = true;
      modalContent.value = 'E-mail não cadastrado.\nFaça o cadastro no app.';
    }
  } finally {
    isLoading.value = false;
  }
};

const navigateToRegister = () => {
  router.push({ name: 'Register' });
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding: 0 20px;
  margin-top: 25px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.title {
  font-weight: 700;
  font-size: 32px;
  font-family: Inter;
  text-align: center;
  padding: 0px 10px;
  color: #314b39;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.logo {
  width: 200px;
  height: auto;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-label {
  font-size: 16px;
  font-weight: 600;
  color: rgba(91, 104, 113, 1);
  margin-bottom: 5px;
}

.styled-input {
  flex: 1;
  border: 1px solid gray;
  padding: 10px 40px 10px 20px;
  margin-top: 5px;
  border-radius: 4px;
}

.styled-input input {
  border: none !important;
  outline: none !important;
}

.styled-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #8ce95f;
  color: rgba(49, 75, 57, 1);
}

.styled-button[disabled] {
  background-color: rgba(224, 229, 231, 1);
  color: rgba(118, 130, 139, 1);
}

.sign-up-view {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: #737578;
  justify-content: center;
  margin-bottom: 20px;
}

.sign-up-button {
  color: #8ce95f;
}

.toggle-visibility {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
