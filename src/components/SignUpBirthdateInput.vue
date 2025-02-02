<template>
  <div class="input-wrapper">
    <label class="input-label" for="input-birthdate">{{ props.label }}</label>
    <q-input
      :model-value="props.modelValue"
      @update:model-value="handleInput"
      id="input-birthdate"
      placeholder="dd/mm/aaaa"
      outlined
      class="styled-input"
      no-border
      hide-bottom-space
      mask="##/##/####"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (value) => {
  const formattedValue = value.replace(/[^0-9/]/g, '');

  emit('update:modelValue', formattedValue);
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
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
  color: #33373c;
}
</style>
