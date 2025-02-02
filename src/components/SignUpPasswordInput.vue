<template>
  <div class="input-wrapper">
    <label class="input-label" for="input-password">{{ props.label }}</label>
    <q-input
      :model-value="props.modelValue"
      @update:model-value="emitValue"
      id="input-password"
      placeholder="**********"
      :type="showPassword ? 'text' : 'password'"
      outlined
      class="styled-input"
      no-border
      hide-bottom-space
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility' : 'visibility_off'"
          @click="togglePasswordVisibility"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
});

const emit = defineEmits(['update:modelValue']);
const showPassword = ref(false);

const emitValue = (value) => {
  emit('update:modelValue', value);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
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
