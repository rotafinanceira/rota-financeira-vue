<template>
  <div>
    <q-input
      filled
      v-model="email"
      label="E-mail"
      type="email"
      @focus="handleEmailFocus"
      @blur="handleBlur"
      :error="emailHasError"
    />
    <q-input
      filled
      v-model="confirmEmail"
      label="Confirmar E-mail"
      type="email"
      @focus="handleConfirmEmailFocus"
      @blur="handleBlur"
      :error="confirmEmailHasError"
    />
    <q-btn label="Avançar" @click="validateStep" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRegisterStore } from '../store/registerStore';

export default defineComponent({
  name: 'EmailStep',
  setup() {
    const store = useRegisterStore();
    const email = ref(store.email);
    const confirmEmail = ref(store.confirmEmail);

    const emailHasError = ref(false);
    const confirmEmailHasError = ref(false);
    const isEmailFocused = ref(false);
    const isConfirmEmailFocused = ref(false);

    const handleBlur = () => {
      isEmailFocused.value = false;
      isConfirmEmailFocused.value = false;
    };

    const handleEmailFocus = () => {
      isEmailFocused.value = true;
      isConfirmEmailFocused.value = false;
    };

    const handleConfirmEmailFocus = () => {
      isEmailFocused.value = false;
      isConfirmEmailFocused.value = true;
    };

    const validateStep = () => {
      emailHasError.value = !email.value || !validateEmail(email.value);
      confirmEmailHasError.value = email.value !== confirmEmail.value;

      if (!emailHasError.value && !confirmEmailHasError.value) {
        store.setCurrentStep(store.currentStep + 1);
      }
    };

    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    return {
      email,
      confirmEmail,
      emailHasError,
      confirmEmailHasError,
      isEmailFocused,
      isConfirmEmailFocused,
      handleBlur,
      handleEmailFocus,
      handleConfirmEmailFocus,
      validateStep,
    };
  },
});
</script>

<style scoped></style>
