<template>
  <div class="container">
    <div class="logo-container">
      <q-img :src="logo" class="logo" />
    </div>
    <StepperComponent :step="3" />
    <div class="container-content">
      <div class="title">Defina sua senha</div>
      <form class="form" @submit.prevent="validateStep">
        <div class="inputs-wrapper">
          <q-input
            filled
            v-model="password"
            label="Senha"
            type="password"
            outlined
          />
          <q-input
            filled
            v-model="confirmPassword"
            label="Confirmar Senha"
            type="password"
            outlined
          />
        </div>
        <div class="password-checker">
          <p>A senha deve ter:</p>
          <div>
            <img :src="checkIcon" v-if="hasLowerCase" class="icon" />
            <img :src="errorIcon" v-else class="icon" />
            Mínimo de 1 letra minúscula
          </div>
          <div>
            <img :src="checkIcon" v-if="hasUpperCase" class="icon" />
            <img :src="errorIcon" v-else class="icon" />
            Mínimo de 1 letra maiúscula
          </div>
          <div>
            <img :src="checkIcon" v-if="hasSymbol" class="icon" />
            <img :src="errorIcon" v-else class="icon" />
            Mínimo de 1 caractere especial
          </div>
          <div>
            <img :src="checkIcon" v-if="hasNumber" class="icon" />
            <img :src="errorIcon" v-else class="icon" />
            Mínimo de 1 número
          </div>
          <div>
            <img :src="checkIcon" v-if="hasMinLength" class="icon" />
            <img :src="errorIcon" v-else class="icon" />
            Mínimo 8 caracteres
          </div>
          <div>
            <img :src="checkIcon" v-if="passwordsMatch" class="icon" />
            <img :src="errorIcon" v-else class="icon" />
            As senhas correspondem
          </div>
        </div>
        <q-checkbox
          v-model="acceptTerms"
          label="Aceito os termos e condições"
          color="red"
        />
        <div class="button-group">
          <q-btn class="back-button" label="Voltar" @click="goBack" />
          <q-btn
            class="styled-button"
            label="Cadastrar"
            type="submit"
            :disabled="!acceptTerms || !isPasswordValid || !passwordsMatch"
          />
        </div>
      </form>
    </div>
    <div class="view">
      Já possui uma conta?
      <span class="sign-up-button" @click="goToLogin">Faça login</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import logo from '@/assets/logolight.svg';
import checkIcon from '@/assets/check.svg';
import errorIcon from '@/assets/x.svg';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/store/registerStore';
import { httpClient } from '@/infra/http/httpClient';
import { AxiosError } from 'axios';
import StepperComponent from '@/components/StepperComponent.vue';

// Store e Router
const store = useRegisterStore();
const router = useRouter();

// Refs para senha e confirmação de senha
const password = ref(store.password);
const confirmPassword = ref(store.confirmPassword);
const acceptTerms = ref(false);

// Computed properties para validação da senha
const hasLowerCase = computed(() => /[a-z]/.test(password.value));
const hasUpperCase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));
const hasSymbol = computed(() => /[!@#$%^&*()]/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 8);

const isPasswordValid = computed(() => {
  return (
    hasLowerCase.value &&
    hasUpperCase.value &&
    hasNumber.value &&
    hasSymbol.value &&
    hasMinLength.value
  );
});

const passwordsMatch = computed(() => password.value === confirmPassword.value);

// Função de validação do formulário
const validateStep = async () => {
  if (!isPasswordValid.value) {
    alert('A senha não atende a todos os critérios.');
    return;
  }
  if (!passwordsMatch.value) {
    alert('As senhas não correspondem!');
    return;
  }

  store.setPassword(password.value);
  store.setConfirmPassword(confirmPassword.value);

  const day = Number(store.day);
  const month = Number(store.month);
  const year = Number(store.year);

  const formattedDate = `${day < 10 ? '0' : ''}${day}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;

  const payload = {
    name: store.name,
    lastName: store.lastName,
    email: store.email,
    password: store.password,
    birthday: formattedDate,
  };

  try {
    const response = await httpClient.post('/register', payload);

    if (response.status === 201) {
      alert('Cadastro realizado com sucesso!');
      router.push('/');
    } else {
      console.error('Erro ao realizar cadastro:', response.data);
      alert('Ocorreu um erro ao tentar realizar o cadastro. Tente novamente.');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Erro na requisição:', error.response?.data);
      alert('Ocorreu um erro ao tentar realizar o cadastro. Tente novamente.');
    } else if (error instanceof Error) {
      console.error('Erro na requisição:', error.message);
      alert('Ocorreu um erro ao tentar realizar o cadastro. Tente novamente.');
    } else {
      console.error('Erro desconhecido:', error);
      alert('Ocorreu um erro ao tentar realizar o cadastro. Tente novamente.');
    }
  }
};

// Navegar para a página de login
const goToLogin = () => {
  router.push('/');
};

// Navegar para a etapa anterior
const goBack = () => {
  router.go(-1); // Volta uma etapa na navegação
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  margin-top: 24px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.logo {
  width: 260px;
}

.container-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  gap: 0px;
  margin-bottom: 16px;
}

.password-checker {
  margin-top: 16px;
}

.password-checker p {
  font-weight: bold;
}

.password-checker div {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
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

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #ffffff; /* Fundo branco */
  border: 2px solid #8ce95f; /* Borda verde */
  color: #314b39;
  font-weight: 700;
  font-family: 'Inter';
  text-transform: capitalize;
  font-size: 18px;
}

.back-button:hover {
  background-color: #f0f0f0; /* Fundo levemente cinza ao passar o mouse */
}

.view {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: #737578;
  justify-content: center;
  margin-top: 8px;
}

.sign-up-button {
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #4140c2;
  font-weight: 700;
  padding-left: 4px;
  cursor: pointer;
}
</style>
