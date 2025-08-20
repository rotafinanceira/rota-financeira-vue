<template>
  <div class="welcome-page">
    <div class="logo">
      <img :src="logo" alt="Logo" />
      <span class="logo__text"
        ><span class="logo__text-strong">Rota</span>Financeira</span
      >
    </div>
    <div class="intro">
      <h1 class="intro__title">Seu veículo na palma da sua mão!</h1>
      <p class="intro__description">
        Simplificamos as manutenções e o controle financeiro do seu veículo para
        você ter mais praticidade e menos preocupações!
      </p>
    </div>
    <div class="buttons">
      <CButton variant="primary" @click="$router.push({ name: 'signup' })">
        Criar Conta
      </CButton>

      <CButton
        class="buttons__white"
        variant="secondary"
        @click="continueWithGoogle"
      >
        <img :src="googleIcon" alt="Google Icon" class="google-icon" />Continuar
        com o Google</CButton
      >

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
import logo from '@/shared/assets/logos/logo.svg';
import googleIcon from '@/shared/assets/googleIcon.svg';
import CButton from '@/shared/components/CButton.vue';

const continueWithGoogle = () => {
  // Implement Google sign-in logic here
};
</script>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10rem;
  background-image: url('@/shared/assets/images/welcomeScreen.png');
  background-size: cover;
  background-position: center;
  min-height: 100svh;
  padding: 24px 20px 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;

  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &__text {
    display: flex;
    align-items: center;
    color: #336733;
    font-size: 1.25rem;
    font-style: italic;
    font-weight: 500;
    line-height: 100%;
    flex-shrink: 0;
  }

  &__text-strong {
    font-weight: 700;
  }
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title {
    color: white;
    font-weight: 700;
    font-style: bold;
    font-size: 1.75rem;
    line-height: 120%;
    letter-spacing: -0.02em;
  }

  &__description {
    color: white;
    font-style: normal;
    font-size: 0.875rem;
    line-height: 150%;
  }
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__white {
    background-color: white !important;
  }
}

.login {
  text-align: center;

  &__text {
    color: white;
    font-size: 1rem;
    font-style: normal;
    line-height: 150%;
  }

  &__link {
    color: #48a72c;
  }
}
</style>
