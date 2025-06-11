<template>
  <div class="password-checker">
    <span class="title-text">A senha deve ter:</span>
    <div
      v-for="(rule, index) in passwordRules"
      :key="index"
      class="rules-wrapper"
    >
      <img :src="rule.valid ? checkIcon : errorIcon" class="icon" />
      <span class="rule-text">{{ rule.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import checkIcon from '@/assets/check-valid.svg';
import errorIcon from '@/assets/check-invalid.svg';

const props = defineProps({
  password: String,
  confirmPassword: String,
});

const passwordRules = computed(() => [
  { text: 'Mínimo de 8 caracteres', valid: props.password.length >= 8 },
  { text: 'Letra maiúscula', valid: /[A-Z]/.test(props.password) },
  { text: 'Letra minúscula', valid: /[a-z]/.test(props.password) },
  { text: 'Número', valid: /[0-9]/.test(props.password) },
  {
    text: 'Caractere especial (ex: @!%#)',
    valid: /[!@#$%^&*()]/.test(props.password),
  },
]);
</script>

<style scoped>
.password-checker {
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.title-text {
  color: #485159;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.rules-wrapper {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  align-items: center;
}

.rules-wrapper:last-child {
  margin-bottom: 0;
}

.icon {
  --size: 20px;
  width: var(--size);
  height: var(--size);
}

.rule-text {
  font-weight: 400;
  font-size: 12px;
  color: #485159;
}
</style>
