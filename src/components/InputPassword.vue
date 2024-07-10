<template>
  <div class="input-wrapper">
    <div class="password-labels-wrapper">
      <label :class="['input-label', { 'input-label-error': !!errors.password }]" for="password">Senha</label>
      <span class="forgot-password">Esqueceu a senha?</span>
    </div>
    <q-input
      v-model="internalPassword"
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
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  errors: Object
});

const emits = defineEmits(['update:modelValue']);
const internalPassword = ref(props.modelValue);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

watch(internalPassword, (newValue) => {
  emits('update:modelValue', newValue);
});
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

.input-label-error {
  color: red;
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
