<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowIcon } from '../assets/icons';

export type Option = {
  label: string;
  value: string | number;
};

export type Select = {
  label?: string;
  name: string;
  placeholder?: string;
  options?: Option[];
  disabled?: boolean;
  required?: boolean;
};

const props = withDefaults(defineProps<Select>(), {
  options: () => [],
  required: false,
});

const modelValue = defineModel<string | number | ''>('modelValue', {
  default: '',
});

const isOpen = ref(false);

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const selectOption = (val: string | number) => {
  modelValue.value = val;
  isOpen.value = false;
};

const selectedLabel = computed(() => {
  return (
    props.options.find((o) => o.value === modelValue.value)?.label ??
    props.placeholder ??
    'Selecione...'
  );
});

const borderClass = computed(() => {
  if (!props.required) return '';
  return modelValue.value ? 'is-valid' : 'is-error';
});
</script>

<template>
  <div class="select">
    <label v-if="props.label" class="select__label" :for="props.name">
      {{ props.label }}
    </label>

    <div
      class="select__wrapper"
      :class="[borderClass, { disabled: props.disabled, open: isOpen }]"
      @click="toggleDropdown"
    >
      <span>{{ selectedLabel }}</span>
      <img class="select__icon" :src="ArrowIcon" alt="" />
    </div>

    <ul v-if="isOpen" class="select__list" :class="borderClass">
      <li
        v-for="opt in props.options"
        :key="opt.value"
        @click="selectOption(opt.value)"
        class="select__option"
      >
        <div class="option-content">
          <span>{{ opt.label }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.select {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  font-size: 1rem;
  color: #485159;

  &__label {
    color: #0c0d0f;
    font-weight: 500;
    font-size: 0.875rem;
    margin-bottom: 4px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border: 1px solid #e0e5e7;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &.is-error {
      border-color: #e53935 !important;
    }

    &.is-valid {
      border-color: #43a047 !important;
    }

    &.disabled {
      background: #f4f5f6;
      color: #a0a0a0;
      cursor: not-allowed;
    }

    &.open .select__icon {
      transform: rotate(180deg);
    }
  }

  &__icon {
    transition: transform 0.2s ease;
    width: 16px;
    height: 16px;
  }

  &__list {
    margin: 0;
    padding: 12px;
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    list-style: none;
    border: 1px solid #e0e5e7;
    border-radius: 4px;
    background: white;
    z-index: 10;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    &.is-error {
      border-color: #e53935;
    }

    &.is-valid {
      border-color: #43a047;
    }
  }

  &__option {
    width: 100%;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background 0.15s ease;
    display: flex;
    align-items: center;

    &:hover {
      background: #eff3f5;
    }

    .option-content {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
  }
}
</style>
