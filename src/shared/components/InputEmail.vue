<template>
  <div class="input-wrapper">
    <label
      :class="['input-label', { 'input-label-error': !!errors.email }]"
      for="email"
    >
      {{ label }}
    </label>
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
    // Implementação futura...
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

.styled-input :deep(.q-field__native::placeholder) {
  color: #9ba7ad;
  font-weight: 400;
}

.styled-input :deep(.q-field__native) {
  padding-left: 10px;
  font-weight: 500;
  font-size: 16px;

  color: #33373c;
}
</style>
