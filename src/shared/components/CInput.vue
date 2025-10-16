<script setup lang="ts">
import { computed, ref, watch, useAttrs } from 'vue';
import { useField } from 'vee-validate';
import type { Input } from '../types/Input';
import { EyeClosedIcon, EyeOpenedIcon, XCircleIcon } from '../assets/icons';

const props = withDefaults(defineProps<Input>(), {
  showIcon: 'not-empty',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const attrs = useAttrs();
const seePassword = ref(false);

const { value, errorMessage, validate } = useField<string | number>(
  props.name,
  undefined,
  { validateOnValueUpdate: false }
);

const seePasswordIcon = computed(() =>
  seePassword.value ? EyeClosedIcon : EyeOpenedIcon
);
const togglePasswordVisibility = () => {
  seePassword.value = !seePassword.value;
};

watch(value, (val) => {
  emit('update:modelValue', val);
});
</script>

<template>
  <label :class="[{ 'is-disabled': disabled }]">
    <span v-if="label">{{ label }}</span>
    <div
      class="input__wrapper"
      v-if="variant === 'generic'"
      :class="[{ 'is-error': errorMessage }]"
    >
      <input
        v-model="value"
        :name="name"
        v-bind="attrs"
        :disabled="disabled"
        @blur="validate()"
      />
      <button
        type="button"
        v-if="icon"
        @click="value = ''"
        :disabled="disabled"
      >
        <img
          v-if="showIcon === 'always' ? true : value"
          :src="icon ? icon : XCircleIcon"
          alt=""
        />
      </button>
    </div>
    <div
      class="input__wrapper"
      v-if="variant === 'password'"
      :class="[{ 'is-error': errorMessage }]"
    >
      <input
        v-model="value"
        :name="name"
        v-bind="attrs"
        :type="seePassword ? 'text' : 'password'"
        :disabled="disabled"
      />
      <button
        type="button"
        @click="togglePasswordVisibility"
        :disabled="disabled"
      >
        <img :src="seePasswordIcon" alt="" />
      </button>
    </div>
    <span
      :class="[
        'supporting-text',
        {
          'is-error': errorMessage,
        },
      ]"
      >{{ errorMessage || supportingText }}</span
    >
  </label>
</template>

<style scoped lang="scss">
@use '/src/css/input.scss';
</style>
