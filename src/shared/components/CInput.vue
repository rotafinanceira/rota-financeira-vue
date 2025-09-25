<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { Input } from '../types/Input';
import { useField } from 'vee-validate';
import { EyeClosedIcon, EyeOpenedIcon, XCircleIcon } from '../assets/icons';

const props = withDefaults(defineProps<Input>(), {
  showIcon: 'not-empty',
});

const attrs = useAttrs();
const seePassword = ref(false);

const { value, errorMessage, validate } = useField(props.name, undefined, {
  validateOnValueUpdate: false,
});

const seePasswordIcon = computed(() =>
  seePassword.value ? EyeClosedIcon : EyeOpenedIcon
);

const togglePasswordVisibility = () => {
  seePassword.value = !seePassword.value;
};

console.log(errorMessage);
</script>

<template>
  <label :class="[{ 'is-disabled': disabled }]">
    <span v-if="label">{{ label }}</span>
    <div
      class="input__wrapper"
      v-if="variant === 'text'"
      :class="[{ 'is-error': errorMessage }]"
    >
      <input v-model="value" :name="name" v-bind="attrs" :disabled="disabled"
        @blur="validate()" />
      <button
        type="button"
        v-if="icon"
        @click="value = ''"
        :disabled="disabled"
      >
        <img v-if="showIcon === 'always' ? true : value" :src="icon ? icon : XCircleIcon" alt="" />
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
