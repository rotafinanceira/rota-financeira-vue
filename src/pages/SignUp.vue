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
            @click="handleSubmit"
            class="styled-button"
          />
          <div class="sign-in-view">
            <span>Já possui conta?</span>
            <q-btn flat @click="navigateToSignIn" class="sign-in-button">Entrar</q-btn>
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
const confirmEmail = ref('');
const errors = ref({});
const isLoading = ref(false);

const router = useRouter();

const handleSubmit = () => {
  router.push('/password-step');
};

const navigateToSignIn = () => {
  router.push('/'); // Redirecionamento para a tela de login ao clicar em "Entrar"
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
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
  gap: 0px;
  margin-bottom: 16px;
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
  margin-top: 8px;
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
