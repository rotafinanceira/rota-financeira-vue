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
      :error-message="errors.email"
      outlined
      class="styled-input"
      no-border
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  errors: Object,
  label: String,
});

const emits = defineEmits(['update:modelValue']);
const internalEmail = ref(props.modelValue);

watch(internalEmail, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
  color: #76828b;
}

.input-label {
  font-size: 16px;
  font-weight: 600;
  color: #76828b;
}

.input-label-error {
  color: red;
}

.styled-input {
  margin-top: 8px;
}
</style>
