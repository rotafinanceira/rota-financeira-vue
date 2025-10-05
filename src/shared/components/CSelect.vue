<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowIcon } from '../assets/icons';
import type { InputHTMLAttributes } from 'vue';

export type Option = {
  label: string;
  value: string | number;
};

export type Input = {
  label?: string;
  name: string;
  placeholder?: string;
  options?: Option[];
  disabled?: boolean;
  required?: boolean;
} & /* @vue-ignore */ InputHTMLAttributes;

const props = withDefaults(defineProps<Input>(), {
  options: () => [],
  required: false,
});

const isOpen = ref(false);
const modelValue = defineModel<string | number>();

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const selectOption = (val: string | number) => {
  modelValue.value = val;
  isOpen.value = false;
};

const borderClass = computed(() => {
  if (!props.required) return '';
  return modelValue.value ? 'is-valid' : 'is-error';
});

const selectedLabel = computed(() => {
  return modelValue.value
    ? props.options.find((o) => o.value === modelValue.value)?.label
    : props.placeholder;
});
</script>

<template>
  <div class="select">
    <span class="select__label" v-if="props.label">{{ props.label }}</span>
    <div
      class="select__wrapper"
      :class="[borderClass, { open: isOpen }]"
      @click="toggleDropdown"
    >
      <span>{{ selectedLabel }}</span>
      <img class="select__icon" :src="ArrowIcon" alt="" />
    </div>

    <ul v-if="isOpen" class="select__list">
      <li
        v-for="opt in props.options"
        :key="opt.value"
        @click="selectOption(opt.value)"
        class="select__option"
      >
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.select {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__label {
    font-weight: 500;
    font-size: 0.875rem;
    margin-bottom: 4px;
    line-height: 120%;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e5e7;
    border-radius: 4px;
    background: white;
    color: #0c0d0f;
    transition: border-color 0.2s;

    .is-error {
      border-color: red;
    }

    .is-valid {
      border-color: green;
    }
  }

  &__wrapper &__wrapper &__icon {
    transition: transform 0.2s ease;
    transform: rotate(180deg);
  }

  .open .select__icon {
    transform: rotate(0deg);
  }

  &__list {
    margin-top: 0.5rem;
    padding: 0.5rem;
    list-style: none;
    border: 1px solid #e0e5e7;
    border-radius: 4px;
    background: white;
  }

  &__option {
    padding: 0.5rem;
    transition: background 0.15s ease;

    &:hover {
      background: #eff3f5;
    }
  }
}
</style>
