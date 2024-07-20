<template>
  <div class="password-checker">
    <p>A senha deve ter:</p>
    <div>
      <img :src="hasLowerCase ? checkIcon : errorIcon" class="icon" />
      Mínimo de 1 letra minúscula
    </div>
    <div>
      <img :src="hasUpperCase ? checkIcon : errorIcon" class="icon" />
      Mínimo de 1 letra maiúscula
    </div>
    <div>
      <img :src="hasSymbol ? checkIcon : errorIcon" class="icon" />
      Mínimo de 1 caractere especial
    </div>
    <div>
      <img :src="hasNumber ? checkIcon : errorIcon" class="icon" />
      Mínimo de 1 número
    </div>
    <div>
      <img :src="hasMinLength ? checkIcon : errorIcon" class="icon" />
      Mínimo 8 caracteres
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, watch, defineEmits } from 'vue';
import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/x.svg';

const props = defineProps({
  password: String
});

const emit = defineEmits(['update:password']);

const hasLowerCase = computed(() => /[a-z]/.test(props.password));
const hasUpperCase = computed(() => /[A-Z]/.test(props.password));
const hasNumber = computed(() => /[0-9]/.test(props.password));
const hasSymbol = computed(() => /[!@#$%^&*()]/.test(props.password));
const hasMinLength = computed(() => props.password.length >= 8);

// Emitir evento com as informações de validação
watch(() => props.password, (newPassword) => {
  emit('update:password', {
    hasLowerCase: /[a-z]/.test(newPassword),
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    hasSymbol: /[!@#$%^&*()]/.test(newPassword),
    hasMinLength: newPassword.length >= 8
  });
});
</script>

<style scoped>
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
</style>
