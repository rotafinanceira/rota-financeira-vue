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
import checkIcon from '@/assets/check.svg';
import errorIcon from '@/assets/x.svg';

const props = defineProps({
  password: String,
  confirmPassword: String,
});

const passwordRules = computed(() => [
  { text: 'Mínimo de 1 letra maiúscula', valid: /[A-Z]/.test(props.password) },
  { text: 'Mínimo de 1 letra minúscula', valid: /[a-z]/.test(props.password) },
  {
    text: 'Mínimo de 1 caractere especial',
    valid: /[!@#$%^&*()]/.test(props.password),
  },
  { text: 'Mínimo de 1 número', valid: /[0-9]/.test(props.password) },
  { text: 'Mínimo de 8 dígitos', valid: props.password.length >= 8 },
]);
</script>

<style scoped>
.password-checker {
  display: flex;
  flex-direction: column;
  padding: 12px;
  font-family: 'Inter', sans-serif;
}

.title-text {
  color: #485159;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: .5rem;
}

.rules-wrapper {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.rules-wrapper:last-child {
  margin-bottom: 0;
}

.icon {
  --size: 16px;
  width: var(--size);
  height: var(--size);
}

.rule-text {
  font-weight: 400;
  font-size: 12px;
  color: #485159;
}
</style>
