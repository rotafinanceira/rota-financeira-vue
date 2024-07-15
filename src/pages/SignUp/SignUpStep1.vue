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
          <ButtonComponent
            label="Avançar"
            :isLoading="isLoading"
            @click="onClick"
          />
          <SignInUpFooter
            message="Já possui conta?"
            buttonText="Entrar"
            :onClick="navigateToSignIn"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../../assets/logolight.svg';
import InputEmail from '../../components/InputEmail.vue';
import ButtonComponent from '../../components/ButtonComponent.vue';
import SignInUpFooter from '../../components/SignInUpFooter.vue';

const email = ref('');
const confirmEmail = ref('');
const errors = ref({});
const isLoading = ref(false);

const router = useRouter();

const onClick = () => {
  router.push('/register-2');
};

const navigateToSignIn = () => {
  router.push('/');
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
</style>
