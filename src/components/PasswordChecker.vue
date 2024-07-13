<template>
  <div class="password-checker">
    <p>A senha deve ter:</p>
    <div v-if="hasLowerCase">
      <span>✓</span>
      Mínimo de 1 letra minúscula
    </div>
    <div v-else>
      <span>✕</span>
      Mínimo de 1 letra minúscula
    </div>
    <div v-if="hasUpperCase">
      <span>✓</span>
      Mínimo de 1 letra maiúscula
    </div>
    <div v-else>
      <span>✕</span>
      Mínimo de 1 letra maiúscula
    </div>
    <div v-if="hasSymbol">
      <span>✓</span>
      Mínimo de 1 caractere especial
    </div>
    <div v-else>
      <span>✕</span>
      Mínimo de 1 caractere especial
    </div>
    <div v-if="hasNumber">
      <span>✓</span>
      Mínimo de 1 número
    </div>
    <div v-else>
      <span>✕</span>
      Mínimo de 1 número
    </div>
    <div v-if="hasMinLength">
      <span>✓</span>
      Mínimo 8 caracteres
    </div>
    <div v-else>
      <span>✕</span>
      Mínimo 8 caracteres
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const password = ref('');

const hasLowerCase = computed(() => /[a-z]/.test(password.value));
const hasUpperCase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));
const hasSymbol = computed(() => /[!@#$%^&*()]/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 8);

watch(password, () => {
  // Força a atualização do componente quando a senha muda
  // Útil para alternar entre ícones de verificação e erro
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

.password-checker span {
  margin-right: 8px;
}
</style>
