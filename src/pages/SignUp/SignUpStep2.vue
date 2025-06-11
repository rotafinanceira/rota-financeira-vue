<template>
  <q-page padding>
    <HeaderBarWithInfo title="Cadastro - Passo 2" subtitle="" path="/" />
    <div class="container">
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
import SignInUpFooter from '@/shared/components/SignInUpFooter.vue';
import SignUpTitleStepper from '@/shared/components/SignUpTitleStepper.vue';
import ButtonComponent from '@/shared/components/ButtonComponent.vue';
import SignUpPasswordInput from '@/shared/components/SignUpPasswordInput.vue';
import PasswordChecker from '@/shared/components/PasswordChecker.vue';
import HeaderBarWithInfo from '@/shared/components/HeaderBarWithInfo.vue';

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

.header-bar {
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 6px 20px;
  position: relative;
}

.return-button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 85px;
}

.logo-text {
  display: flex;
  align-items: center;
  width: 128.344px;
  height: 13.558px;
  flex-shrink: 0;
  color: var(--Cores-Primria-800, #245017);
  font-family: Inter;
  font-size: 18.346px;
  font-style: italic;
  font-weight: 400;
  line-height: 13.76px;
  letter-spacing: -0.202px;
}

.bold-text {
  font-weight: 700;
}

.logo img {
  width: 19.734px;
  height: 18px;
  flex-shrink: 0;
  fill: var(--Cores-Primria-200, #8ce95f);
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

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
