<script setup lang="ts">
import { computed, ref, watch, useAttrs } from 'vue';
import { useField } from 'vee-validate';
import { QInput, QField, QBtn } from 'quasar';

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

const showClearIcon = computed(() => {
  if (props.variant !== 'generic' && props.variant !== 'date') return false;

  const hasValue =
    value.value !== undefined &&
    value.value !== null &&
    String(value.value).length > 0;

  return props.icon && (props.showIcon === 'always' || hasValue);
});

const clearInput = () => {
  value.value = '';
};

watch(value, (val) => {
  if (props.variant === 'date' && typeof val === 'string') {
    const [day, month, year] = val.split('/');
    if (day && month && year && year.length === 4) {
      emit('update:modelValue', `${year}-${month}-${day}`);
    } else {
      emit('update:modelValue', val);
    }
  } else {
    emit('update:modelValue', val);
  }
});
</script>

<template>
  <div :class="['custom-input-container', { 'is-disabled': disabled }]">
    <span v-if="label" class="custom-label">{{ label }}</span>

    <QField
      :error="!!errorMessage"
      :error-message="errorMessage || supportingText"
      :disable="disabled"
      borderless
      hide-bottom-space
      class="custom-qfield"
    >
      <template v-slot:control>
        <div class="input__wrapper" :class="{ 'is-error': !!errorMessage }">
          <QInput
            v-model="value"
            :name="name"
            v-bind="attrs"
            :type="'text'"
            :mask="props.variant === 'date' ? '##/##/####' : undefined"
            :fill-mask="props.variant === 'date' ? '_' : undefined"
            :disable="disabled"
            @blur="validate()"
            :placeholder="attrs.placeholder as string"
            borderless
            dense
            class="custom-input full-width"
            tabindex="0"
          />

          <QBtn
            v-if="props.variant === 'password'"
            type="button"
            @click="togglePasswordVisibility"
            :disable="disabled"
            flat
            round
            dense
            tabindex="-1"
          >
            <img
              :src="seePasswordIcon"
              alt="Toggle Password Visibility"
              class="q-icon"
            />
          </QBtn>

          <QBtn
            v-else-if="props.variant === 'date'"
            type="button"
            :disable="disabled"
          >
          </QBtn>

          <QBtn
            v-else-if="props.variant === 'generic' && showClearIcon"
            type="button"
            @click="clearInput"
            :disable="disabled"
            flat
            round
            dense
            tabindex="-1"
          >
            <img
              :src="props.icon || XCircleIcon"
              alt="Clear Input"
              class="q-icon"
            />
          </QBtn>
        </div>
      </template>
    </QField>
  </div>
</template>

<style scoped lang="scss">
:deep(.q-field__messages) {
  font-size: 0.75rem;
  color: #485159;
  font-weight: 500;
  line-height: 0 !important;
  margin-top: 0.25rem;
}

:deep(.q-field--error .q-field__messages) {
  color: #ed4647;
}

.custom-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &.is-disabled {
    color: #485159;
  }
}

.custom-label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 0 !important;
  color: #0c0d0f;
}

.custom-qfield {
  :deep(.q-field__control) {
    display: flex;
    gap: 0.75rem;
    align-items: center;

    color: inherit;
    padding: 0;
    border: none;
    line-height: 20px;

    height: auto;
    min-height: auto;
    box-shadow: none;
  }
}

.input__wrapper {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
  line-height: 0 !important;
  height: 48px !important;

  color: #0c0d0f;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid hsla(197, 13%, 89%, 1);
  transition: border-color 150ms ease;

  &:focus-within {
    border-color: hsla(103, 71%, 27%, 1);
  }

  &.is-error {
    color: #ed4647;
    border-color: #ed4647;
  }

  :deep(.custom-input) {
    padding: 0;

    .q-field__native {
      padding: 0 !important;
      line-height: 20px !important;
      height: 20px !important;
      min-height: 20px !important;
    }

    .q-field__control {
      padding: 0;
      min-height: auto;
      background: none;
    }

    input {
      line-height: 0 !important;
      height: 20px !important;
      border: none;
      outline: none;
      width: 100%;
      font-weight: 400;
      padding: 0;
    }
  }

  :deep(.q-btn--disabled) {
    color: #485159;
  }

  .custom-input-container.is-disabled & {
    color: #485159;
  }
}
</style>
