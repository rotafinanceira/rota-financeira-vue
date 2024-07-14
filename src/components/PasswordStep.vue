<template>
  <div class="container">
    <div class="logo-container">
      <q-img :src="logo" class="logo" />
    </div>
    <div class="container-content">
      <div class="title">Defina sua senha</div>
      <form class="form">
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
        <PasswordChecker :password="password" />
        <q-checkbox
          v-model="acceptTerms"
          label="Aceito os termos e condições"
          color="red"
        />
        <q-btn
          class="styled-button"
          label="Cadastrar"
          @click.prevent="validateStep"
          :disabled="!acceptTerms"
        />
      </form>
    </div>
    <div class="sign-up-view">
      Já possui uma conta?
      <span class="sign-up-button">Faça login</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PasswordChecker from './PasswordChecker.vue';
import logo from '../assets/logolight.svg';
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);

const validateStep = () => {
  // Implementar lógica de validação aqui
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

.sign-up-view {
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
}

.password-criteria {
  margin-top: 16px;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 4px;
}

.password-criteria p {
  font-weight: bold;
}

.password-criteria div {
  margin-top: 8px;
}

.password-criteria span {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.q-checkbox {
  margin-top: 16px;
}
</style>
