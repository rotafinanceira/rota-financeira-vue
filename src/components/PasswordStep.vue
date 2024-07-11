<template>
  <div>
    <q-input
      filled
      v-model="password"
      label="Senha"
      type="password"
      :error="passwordHasError"
    />
    <q-input
      filled
      v-model="confirmPassword"
      label="Confirmar Senha"
      type="password"
      :error="confirmPasswordHasError"
    />
    <q-btn label="Avançar" @click="validateStep" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRegisterStore } from '../store/registerStore';

export default defineComponent({
  name: 'PasswordStep',
  setup() {
    const store = useRegisterStore();
    const password = ref(store.password);
    const confirmPassword = ref(store.confirmPassword);

    const passwordHasError = ref(false);
    const confirmPasswordHasError = ref(false);

    const validateStep = () => {
      passwordHasError.value = !password.value || password.value.length < 6;
      confirmPasswordHasError.value = password.value !== confirmPassword.value;

      if (!passwordHasError.value && !confirmPasswordHasError.value) {
        store.setCurrentStep(store.currentStep + 1);
      }
    };

    return {
      password,
      confirmPassword,
      passwordHasError,
      confirmPasswordHasError,
      validateStep,
    };
  },
});
</script>

<style scoped></style>
