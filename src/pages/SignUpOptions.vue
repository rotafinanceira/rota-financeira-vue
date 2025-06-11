<template>
  <div class="signup-options-page">
    <div class="logo">
      <img :src="logo" alt="Logo" />
      <div class="logo-text"><span class="bold-text">Rota</span>Financeira</div>
    </div>
    <div class="intro-text">
      <div class="intro-title">Seu veículo na palma da sua mão!</div>
      <div class="intro-description">
        Simplificamos as manutenções e o controle financeiro do seu veículo para
        você ter mais praticidade e menos preocupações!
      </div>
    </div>
    <div class="buttons-wrapper">
      <button class="create-account-button" @click="navigateToSignUp">
        <span class="create-account-text">Criar Conta</span>
      </button>
      <button class="google-button" @click="continueWithGoogle">
        <img :src="googleIcon" alt="Google Icon" class="google-icon" />
        <span class="google-button-text">Continuar com o Google</span>
      </button>
      <div class="login-link" @click="navigateToSignIn">
        <span class="login-text">Já tem uma conta?</span>
        <span class="login-link-text"> Entrar</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import logo from '@/assets/logoRF.svg';
import googleIcon from '@/assets/googleIcon.svg';

const router = useRouter();

const navigateToSignIn = () => {
  router.push('/signin');
};

const navigateToSignUp = () => {
  router.push('/register-1');
};

const continueWithGoogle = () => {
  // Implement Google sign-in logic here
};
</script>

<style scoped>
.signup-options-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  background-image: url('@/assets/welcomeScreen.png');
  background-size: cover;
  background-position: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 26.51px;
  left: 105px;
}

.logo img {
  width: 19.734px;
  height: 18px;
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  align-items: center; /* Center vertically */
  color: var(--Cores-Primria-50, #f1fde8);
  font-size: 18.346px;
  font-style: italic;
  font-weight: 400;
  line-height: 13.76px;
  letter-spacing: -0.202px;
  width: 196.795px;
  height: 20.338px;
  flex-shrink: 0;
}

.bold-text {
  font-weight: bold;
}

.intro-text {
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  position: absolute;
  top: 212px;
}

.intro-title {
  color: var(--Cores-Primria-0, #fafdf8);

  font-size: var(--Tipo-Tamanho-3xl, 28px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.56px;
  margin-bottom: 16px;
}

.intro-description {
  width: calc(100% - 40px);
  height: 68px;
  color: var(--Cores-Primria-0, #fafdf8);

  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  text-align: left;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 320px;
  position: absolute;
  top: 529px;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  width: 320px;
  height: 48px;
}

.create-account-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  border: 1px solid var(--Cores-Primria-200, #8ce95f);
  background: var(--Cores-Primria-200, #8ce95f);
}

.create-account-text {
  color: var(--Cores-Secundria-700, #293e2f);

  font-size: var(--Tipo-Tamanho-Lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}

.google-button {
  display: flex;
  height: 48px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #c2c9cd;
  background: #f9fcfa;
  cursor: pointer;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.google-button-text {
  color: var(--Cores-Secundria-700, #293e2f);

  font-size: var(--Tipo-Tamanho-Lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
}

.login-link {
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 80px;
}

.login-text {
  color: var(--Cores-Primria-0, #fafdf8);
  text-align: left;

  font-size: var(--Tipo-Tamanho-Md, 16px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}

.login-link-text {
  color: var(--Cores-Primria-100, #bff4a2);

  font-size: var(--Tipo-Tamanho-Md, 16px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}
</style>
