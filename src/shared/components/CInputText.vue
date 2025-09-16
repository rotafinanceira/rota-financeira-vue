<script setup lang="ts">
import { useAttrs } from 'vue';
import { Input } from '../types/Input';

withDefaults(defineProps<Input>(), {
  showIcon: 'not-empty',
});

const attrs = useAttrs();

const text = defineModel<string>({ default: '' });
console.log(attrs);
</script>

<template>
  <label :class="[{ 'is-disabled': disabled }]">
    <span v-if="label">{{ label }}</span>
    <div class="input__wrapper">
      <input
        v-model="text"
        name="password"
        v-bind="attrs"
        :disabled="disabled"
      />
      <button
        type="button"
        v-if="icon"
        @click="action"
        :disabled="disabled || action === undefined"
      >
        <img v-if="showIcon === 'always' ? true : text" :src="icon" alt="" />
      </button>
    </div>
    <span class="supporting-text">{{ supportingText }}</span>
  </label>
</template>

<style scoped lang="scss">
@use "/src/css/input.scss";
</style>
