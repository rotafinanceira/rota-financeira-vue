<template>
  <div class="input-wrapper">
    <label
      :class="['input-label', { 'input-label-error': !!errors.email }]"
      for="email"
      >{{ label }}</label
    >
    <q-input
      v-model="internalEmail"
      id="email"
      placeholder="exemplo@gmail.com"
      :error="!!errors.email"
      outlined
      class="styled-input"
      no-border
      hide-bottom-space
      @blur="alreadyRegistered"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  errors: Object,
  label: String,
  isRegisterStepOne: Boolean || undefined,
});

const emits = defineEmits(['update:modelValue']);
const internalEmail = ref(props.modelValue);

watch(internalEmail, (newValue) => {
  emits('update:modelValue', newValue);
});

const alreadyRegistered = async () => {
  if (props.isRegisterStepOne) {
    // try {
    //   const response = await httpClient.post('/login', {
    //     email: email.value,
    //     password: password.value,
    //   });
    //   if (response.status === 200) {
    //     router.push({ path: '/success' });
    //   }
    // } catch (error) {
    //   const statusCode = error.response?.status;
    //   if (statusCode === 403) {
    //     isOpen.value = true;
    //     modalContent.value = 'E-mail e/ou senha incorretos';
    //     modalDescription.value = 'Verifique os dados informados';
    //   } else if (statusCode === 404) {
    //     isOpen.value = true;
    //     modalContent.value = 'E-mail não cadastrado';
    //     modalDescription.value = 'Faça o cadastro no App';
    //   } else {
    //     isOpen.value = true;
    //     modalContent.value = 'Ocorreu um erro ao tentar fazer login';
    //     modalDescription.value = 'Tente novamente mais tarde';
    //   }
    // } finally {
    // }
  }
};
</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
  color: #76828b;
}

.input-label {
  font-size: 16px;
  font-weight: 500;
  color: #33373c;
}

.input-label-error {
  color: #b00020;
}

.styled-input :deep(.q-field__native) {
  padding-left: 10px;
  font-weight: 400;
  font-size: 16px;
}
</style>
