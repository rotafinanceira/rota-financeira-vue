<template>
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/x.svg';
const password = ref('');

const hasLowerCase = computed(() => /[a-z]/.test(password.value));
const hasUpperCase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));
const hasSymbol = computed(() => /[!@#$%^&*()]/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 8);

watch(password, () => {
  // Força a atualização do componente quando a senha muda
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
