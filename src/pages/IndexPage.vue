<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="title">Olá, faça o seu login em nosso App.</div>
      <!-- ModalGenerico :content="modalContent" /-->
      <div class="form">
        <div class="input-wrapper">
          <label class="input-label" for="email">E-mail</label>
          <q-input
            v-model="email"
            id="email"
            placeholder="exemplo@email.com"
            :error="!!errors.email"
            :error-message="errors.email"
            outlined
            class="styled-input"
            no-border
            hide-clear-button
          />
        </div>
        <div class="input-wrapper">
          <label class="input-label" for="password">Senha</label>
          <q-input
            v-model="password"
            id="password"
            placeholder="********"
            :type="showPassword ? 'text' : 'password'"
            :error="!!errors.password"
            :error-message="errors.password"
            class="styled-input"
            outlined
            no-border
            hide-clear-button
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="toggle-visibility cursor-pointer"
                @click="togglePasswordVisibility"
              />
            </template>
          </q-input>
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
import logo from './../assets/logolight.svg';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const modalContent = ref('');
const isOpen = ref(false);
const errors = ref({});
const isValid = ref(true);
const showPassword = ref(false);

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
    // await loginStore.handleLogin({ email: email.value, password: password.value });
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
  showPassword.value = !showPassword.value;
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
  /* Estilo padrão do Quasar para inputs */
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

/* .styled-button[disabled] {
  background-color: rgba(224, 229, 231, 1);
  color: rgba(118, 130, 139, 1);
} */

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

/* .toggle-visibility {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
} */
</style>
