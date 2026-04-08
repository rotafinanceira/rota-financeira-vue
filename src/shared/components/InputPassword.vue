<template>
  <div class="input-wrapper">
    <div class="password-labels-wrapper">
      <label
        :class="['input-label', { 'input-label-error': !!errors.password }]"
        for="password"
      >
        Senha
      </label>
    </div>
    <q-input
      v-model="internalPassword"
      id="password"
      placeholder="**************"
      :type="showPassword ? 'text' : 'password'"
      :error="!!errors.password"
      :error-message="errors.password"
      class="styled-input"
      outlined
      no-border
      no-error-icon
      hide-bottom-space
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility' : 'visibility_off'"
          :class="['toggle-visibility', 'cursor-pointer', { 'icon-error': !!errors.password }]"
          @click="togglePasswordVisibility"
        />
      </template>
    </q-input>
    <div 
      :class="['forgot-password-container', { 'forgot-password-error': !!errors.password }]"
    >
      <span class="forgot-password">Esqueceu a senha?</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  errors: Object,
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
  color: #76828b;
}

.password-labels-wrapper {
  display: flex;
  justify-content: space-between;
}

.input-label {
  font-size: 16px;
  font-weight: 500;
  color: #33373c;
}

.input-label-error {
  color: #b00020;
}

.forgot-password-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 4px;
}

.forgot-password {
  color: #4140c2;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-decoration: underline;
  cursor: pointer;
}

.forgot-password-error .forgot-password {
  color: #ea6b70;
}

.styled-input {
  margin: 0;
  padding: 0 0 4px 0;
}

.styled-input :deep(.q-field__native) {
  padding-left: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.toggle-visibility {
  cursor: pointer;
}

.icon-error {
  color: #b00020 !important;
}
</style>
