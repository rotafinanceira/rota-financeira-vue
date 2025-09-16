<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { Input } from '../types/Input';
import { EyeClosedIcon, EyeOpenedIcon } from '../assets/icons';
import { useField } from 'vee-validate';

withDefaults(defineProps<Omit<Input, 'icon' | 'action'>>(), {
  showIcon: 'not-empty',
});

const attrs = useAttrs();
const seePassword = ref(false);

const text = defineModel<string>({ default: '' });
const { value, errorMessage } = useField(text);

const seePasswordIcon = computed(() => seePassword.value ? EyeClosedIcon : EyeOpenedIcon);

const togglePasswordVisibility = () => {
  seePassword.value = !seePassword.value;
}

</script>

<template>
  <label :class="[{ 'is-disabled': disabled }]">
    <span v-if="label">{{ label }}</span>
    <div class="input__wrapper">
      <input v-model="value" name="email" v-bind="attrs" :type="seePassword ? 'text': 'password'" :disabled="disabled" />
      <button
        type="button"
        @click="togglePasswordVisibility"
      >
        <img :src="seePasswordIcon" alt="" />
      </button>
    </div>
    <span class="supporting-text">{{ supportingText }}</span>
  </label>
</template>

<style scoped lang="scss">
@use "/src/css/input.scss";
</style>
