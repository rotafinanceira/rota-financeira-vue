<template>
  <div class="container">
    <div class="logo-container">
      <q-img :src="logo" class="logo" />
    </div>
    <StepperComponent :step="3" />
    <div class="container-content">
      <div class="signup-title">Criar conta</div>
      <form class="form" @submit.prevent="validateStep">
        <div class="inputs-wrapper">
          <div class="input-wrapper">
            <label class="input-label" for="input-password">Senha*</label>
            <q-input
              v-model="password"
              id="input-password"
              placeholder="**********"
              :type="showPassword ? 'text' : 'password'"
              outlined
              class="password-input"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility' : 'visibility_off'"
                  @click="togglePasswordVisibility"
                />
              </template>
            </q-input>
          </div>

          <div class="input-wrapper">
            <label class="input-label" for="input-confirm-password"
              >Confirmar senha*</label
            >
            <q-input
              v-model="confirmPassword"
              id="input-confirm-password"
              placeholder="**********"
              :type="showConfirmPassword ? 'text' : 'password'"
              outlined
              class="confirm-password-input"
            >
              <template v-slot:append>
                <q-icon
                  :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
                  @click="toggleConfirmPasswordVisibility"
                />
              </template>
            </q-input>
          </div>
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
            Mínimo de 8 dígitos
          </div>
          <div>
            <img :src="checkIcon" v-if="passwordsMatch" class="icon" />
            <img :src="errorIcon" v-else class="icon" />
            As senhas correspondem
          </div>
        </div>
        <q-checkbox
          v-model="acceptTerms"
          label="Li e concordo com as regras do Termo de Uso e Privacidade"
          color="#4E4EDD"
        />
        <div class="button-group">
          <q-btn
            class="styled-button"
            label="Cadastrar"
            type="submit"
            :disabled="!acceptTerms || !isPasswordValid || !passwordsMatch"
          />
        </div>
      </form>
    </div>
    <SignInUpFooter
      message="Já possui conta?"
      buttonText="Entrar"
      :path="'/'"
    />
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
import SignInUpFooter from '@/components/SignInUpFooter.vue';

const store = useRegisterStore();
const router = useRouter();

const password = ref(store.password);
const confirmPassword = ref(store.confirmPassword);
const acceptTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

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

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

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
  margin-bottom: 40px;
}

.logo {
  width: 230px;
}

.container-content {
  display: flex;
  flex-direction: column;
}

.signup-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.02em;
  margin: 32px 0 24px 0;
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
  gap: 20px;
  margin-bottom: 32px;
}

.input-label {
  font-size: 16px;
  font-weight: 500;
  color: #33373c;
}

.password-checker {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-top: 1px solid #e0e5e7;
  margin-bottom: 18px;
}

.password-checker p {
  font-weight: bold;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  margin: 0;
}

.password-checker div {
  display: flex;
  align-items: center;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.styled-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #8ce95f;
  color: #314b39;
  font-weight: 700;
  text-transform: capitalize;
  font-size: 18px;
  margin-top: 38px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

/* Comentado temporariamente - aguardar decisão de design */
/* .back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 2px solid #8ce95f;
  color: #314b39;
  font-weight: 700;
  text-transform: capitalize;
  font-size: 18px;
}

.back-button:hover {
  background-color: #f0f0f0;
} */
</style>
