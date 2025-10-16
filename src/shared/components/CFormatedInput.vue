<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue';
import { formatInput } from '../helper/inputFormatHelper';
import { XCircleIcon } from '../assets/icons';

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    label?: string;
    name: string;
    placeholder?: string;
    icon?: string;
    showIcon?: 'always' | 'not-empty';
    disabled?: boolean;
    supportingText?: string;
    variant?: 'money' | 'unit';
  }>(),
  {
    showIcon: 'not-empty',
    type: 'money',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const attrs = useAttrs();
const value = ref<string>(formatInput(props.modelValue, props.variant));

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const formatted = formatInput(input.value, props.variant);
  input.value = formatted;
  value.value = formatted;
  emit('update:modelValue', formatted);
};

watch(
  () => props.modelValue,
  (newVal) => {
    const formatted = formatInput(String(newVal ?? ''), props.variant);
    if (formatted !== value.value) {
      value.value = formatted;
    }
  }
);
</script>

<template>
  <label :class="[{ 'is-disabled': disabled }]">
    <span v-if="label">{{ label }}</span>

    <div class="input__wrapper">
      <input
        :name="name"
        v-bind="attrs"
        :placeholder="
          placeholder || (variant === 'money' ? 'R$ 0,00' : '1.000')
        "
        :disabled="disabled"
        :value="value"
        @input="onInput"
      />
      <button
        v-if="icon"
        type="button"
        @click="
          value = variant === 'money' ? 'R$ 0,00' : '0';
          emit('update:modelValue', value);
        "
        :disabled="disabled"
      >
        <img
          v-if="showIcon === 'always' ? true : value"
          :src="icon || XCircleIcon"
          alt="Limpar"
        />
      </button>
    </div>

    <span class="supporting-text">
      {{ supportingText }}
    </span>
  </label>
</template>

<style scoped lang="scss">
@use '/src/css/input.scss';
</style>
