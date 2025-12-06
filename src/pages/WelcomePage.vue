<template>
  <div class="welcome-page">
    <img :src="LogoOneLine" alt="Rota Financeira" />

    <div class="intro">
      <h1 class="intro__title">Seu veículo na palma da sua mão!</h1>
      <p class="intro__description">
        Simplificamos as manutenções e o controle financeiro do seu veículo para
        você ter mais praticidade e menos preocupações!
      </p>
    </div>
    <div class="buttons">
      <CButton variant="primary" :to="{ name: 'signup' }">
        Criar uma Conta
      </CButton>

      <CButton
        class="buttons__white"
        variant="secondary"
        @click="continueWithGoogle"
      >
        <img :src="googleIcon" alt="Google Icon" class="google-icon" />
        Continuar com o Google
      </CButton>

      <div class="login">
        <span class="login__text"
          >Já tem uma conta?
          <RouterLink :to="{ name: 'signin' }" class="login__link">
            Entrar</RouterLink
          >
        </span>
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { LogoOneLine } from '@/shared/assets/logos';
import googleIcon from '@/shared/assets/googleIcon.svg';
import CButton from '@/shared/components/CButton.vue';
import { useRegisterStore } from '@/stores/registerStore';

const registerStore = useRegisterStore();

const continueWithGoogle = () => {
  registerStore.googleLogin();
};
</script>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: url('@/shared/assets/images/welcomeScreen.png');
  background-size: cover;
  background-position: center;
  min-height: 100svh;
  padding: 24px 20px 64px;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    color: white;
    font-weight: 700;
    font-size: 1.75rem;
    line-height: 120%;
    letter-spacing: -0.02em;
    max-width: 14ch;
  }

  &__description {
    color: white;
    font-size: 0.875rem;
    line-height: 150%;
    max-width: 45ch;
  }
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__white {
    background-color: white;
  }
}

.login {
  text-align: center;

  &__text {
    color: white;
    font-size: 1rem;
    line-height: 150%;
  }

  &__link {
    color: #48a72c;
  }
}
</style>
