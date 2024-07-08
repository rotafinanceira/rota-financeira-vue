<template>
  <div class="input-wrapper">
    <div class="password-labels-wrapper">
      <label class="input-label" for="password">Senha</label>
      <span class="forgot-password">Esqueceu a senha?</span>
    </div>
    <q-input
      v-model="password"
      id="password"
      placeholder="********"
      :type="showPassword ? 'text' : 'password'"
      :error="!!errors.password"
      :error-message="errors.password"
      class="styled-input"
      outlined
      no-border
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility' : 'visibility_off'"
          class="toggle-visibility cursor-pointer"
          @click="togglePasswordVisibility"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
const showPassword = ref(false);
const errors = ref({});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
  color: #76828B;
}

.password-labels-wrapper {
  display: flex;
  justify-content: space-between;
}

.input-label {
  font-size: 16px;
  font-weight: 600;
  color: #76828B;
}

.forgot-password {
  color: #9BA7AD;
}

.styled-input {
  margin-top: 8px;
}

.toggle-visibility {
  cursor: pointer;
}
</style>
