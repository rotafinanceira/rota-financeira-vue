<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <SignUpTitleStepper :step="2" />
      <div class="container-content">
        <div class="form" @submit.prevent="validatePassword">
          <div class="inputs-wrapper">
            <SignUpPasswordInput v-model="password" label="Senha" />
            <SignUpPasswordInput
              v-model="confirmPassword"
              label="Confirmar senha"
            />
          </div>
          <PasswordChecker
            :password="password"
            :confirmPassword="confirmPassword"
          />
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
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '@/store/registerStore';
import logo from '@/assets/logolight.svg';
import SignInUpFooter from '@/components/SignInUpFooter.vue';
import SignUpTitleStepper from '@/components/SignUpTitleStepper.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import SignUpPasswordInput from '@/components/SignUpPasswordInput.vue';
import PasswordChecker from '@/components/PasswordChecker.vue';

const store = useRegisterStore();
const router = useRouter();

const isLoading = ref(false);
const password = ref(store.password);
const confirmPassword = ref(store.confirmPassword);

const validatePassword = () => {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não correspondem!');
    return false;
  }

  if (
    !/[a-z]/.test(password.value) ||
    !/[A-Z]/.test(password.value) ||
    !/[0-9]/.test(password.value) ||
    !/[!@#$%^&*()]/.test(password.value) ||
    password.value.length < 8
  ) {
    alert('A senha não atende a todos os critérios.');
    return false;
  }

  return true;
};

const handleSubmit = () => {
  if (validatePassword()) {
    store.setPassword(password.value);
    store.setConfirmPassword(confirmPassword.value);
    router.push('/register-3');
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-top: 24px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 64px;
}

.logo {
  width: 165px;
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
</style>
