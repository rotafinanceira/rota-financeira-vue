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
        <q-btn
          class="styled-button"
          label="Cadastrar"
          @click.prevent="validateStep"
          :disabled="!acceptTerms || !isPasswordValid || !passwordsMatch"
        />
      </form>
    </div>
    <div class="view">
      Já possui uma conta?
      <span class="sign-up-button">Faça login</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import logo from '../../assets/logolight.svg';
import checkIcon from '../../assets/check.svg';
import errorIcon from '../../assets/x.svg';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '../../store/registerStore'; // Importar o store

const store = useRegisterStore(); // Usar o store
const router = useRouter();

const password = ref(store.password); // Inicializar com o valor do store
const confirmPassword = ref(store.confirmPassword); // Inicializar com o valor do store
const acceptTerms = ref(false);

const hasLowerCase = computed(() => /[a-z]/.test(password.value));
const hasUpperCase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));
const hasSymbol = computed(() => /[!@#$%^&*()]/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 8);

const isPasswordValid = computed(() => {
  return hasLowerCase.value && hasUpperCase.value && hasNumber.value && hasSymbol.value && hasMinLength.value;
});

const passwordsMatch = computed(() => password.value === confirmPassword.value);

const validateStep = () => {
  if (!isPasswordValid.value) {
    alert('A senha não atende a todos os critérios.');
    return;
  }
  if (!passwordsMatch.value) {
    alert('As senhas não correspondem!');
    return;
  }
  store.setPassword(password.value); // Atualizar o store
  store.setConfirmPassword(confirmPassword.value); // Atualizar o store
  alert('Senha validada com sucesso!');
  router.push('/');
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
}
</style>
