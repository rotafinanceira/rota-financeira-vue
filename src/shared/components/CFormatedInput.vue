<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue';
import { formatCurrency } from '../helper/inputFormatHelper';
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
  }>(),
  {
    showIcon: 'not-empty',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const attrs = useAttrs();
const value = ref<string>(
  formatCurrency(String(props.modelValue ?? 'R$ 0,00'))
);

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const formatted = formatCurrency(input.value);
  input.value = formatted;
  value.value = formatted;
  emit('update:modelValue', formatted);
};

watch(
  () => props.modelValue,
  (newVal) => {
    const formatted = formatCurrency(String(newVal ?? 'R$ 0,00'));
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
        :placeholder="placeholder || 'R$ 0,00'"
        :disabled="disabled"
        :value="value"
        @input="onInput"
      />
      <button
        v-if="icon"
        type="button"
        @click="
          value = 'R$ 0,00';
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
