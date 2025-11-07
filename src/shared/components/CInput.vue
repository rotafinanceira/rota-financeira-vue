<script setup lang="ts">
import { computed, ref, watch, useAttrs } from 'vue';
import { useField } from 'vee-validate';
import { QInput, QField, QBtn } from 'quasar';

import type { Input } from '../types/Input';

import { EyeClosedIcon, EyeOpenedIcon, XCircleIcon } from '../assets/icons';

type InputValue = string | number | null;

const props = withDefaults(defineProps<Input>(), {
  showIcon: 'not-empty',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const attrs = useAttrs();
const seePassword = ref(false);

const onlyDigits = (v: string | number) => String(v ?? '').replace(/\D/g, '');

const formatMoney = (raw: string | number) => {
  const digits = onlyDigits(raw);
  if (!digits) return '';
  const cents = parseInt(digits, 10);
  const value = (cents / 100).toFixed(2);
  const parts = value.split('.');
  parts[0] = Number(parts[0]).toLocaleString('pt-BR');
  return `R$ ${parts[0]},${parts[1]}`;
};

const formatUnit = (raw: string | number) => {
  const digits = onlyDigits(raw);
  if (!digits) return '';
  const n = parseInt(digits, 10);
  return n.toLocaleString('pt-BR');
};

const parseMoneyToNumber = (formatted: string) => {
  if (!formatted) return NaN;
  const digits = onlyDigits(formatted);
  if (!digits) return NaN;
  return parseInt(digits, 10) / 100;
};

const parseUnitToNumber = (formatted: string) => {
  if (!formatted) return NaN;
  const digits = onlyDigits(formatted);
  if (!digits) return NaN;
  return parseInt(digits, 10);
};

const { value, errorMessage, validate } = useField<string | number>(
  props.name,
  (val: string | number) => {
    if (props.required && (!val || String(val).trim() === '')) {
      return 'Campo obrigatório';
    }

    if (props.variant === 'date' && String(val).trim() !== '') {
      const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = String(val).match(regex);
      if (!match) return 'Data inválida (use DD/MM/AAAA)';
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      if (day < 1 || day > 31) return 'Dia inválido';
      if (month < 1 || month > 12) return 'Mês inválido';
      if (year > 2100) return 'Ano inválido';
      const testDate = new Date(year, month - 1, day);
      if (
        testDate.getFullYear() !== year ||
        testDate.getMonth() + 1 !== month ||
        testDate.getDate() !== day
      ) {
        return 'Data inexistente';
      }
    }

    if (props.variant === 'money' && String(val).trim() !== '') {
      const n = parseMoneyToNumber(String(val));
      if (isNaN(n)) return 'Valor inválido';
      if (n <= 0) return 'Valor deve ser maior que zero';
    }

    if (props.variant === 'unit' && String(val).trim() !== '') {
      const n = parseUnitToNumber(String(val));
      if (isNaN(n)) return 'Valor inválido';
      if (n <= 0) return 'Valor deve ser maior que zero';
    }

    return true;
  },
  { validateOnValueUpdate: false }
);

const seePasswordIcon = computed(() =>
  seePassword.value ? EyeClosedIcon : EyeOpenedIcon
);

const togglePasswordVisibility = () => {
  seePassword.value = !seePassword.value;
};

const showClearIcon = computed(() => {
  if (!['generic', 'date', 'money', 'unit'].includes(props.variant || '')) {
    return false;
  }

  const hasValue =
    value.value !== undefined &&
    value.value !== null &&
    String(value.value).length > 0;

  return props.icon && (props.showIcon === 'always' || hasValue);
});

const clearInput = () => {
  value.value = '';
  emit('update:modelValue', '');
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal === value.value) return;
    if (props.variant === 'money') {
      if (typeof newVal === 'number') {
        value.value = formatMoney(String(Math.round(newVal * 100)));
      } else {
        value.value = formatMoney(String(newVal ?? ''));
      }
    } else if (props.variant === 'unit') {
      if (typeof newVal === 'number') {
        value.value = formatUnit(String(newVal));
      } else {
        value.value = formatUnit(String(newVal ?? ''));
      }
    } else {
      value.value = newVal as string | number;
    }
  },
  { immediate: true }
);

const onInput = (val: InputValue) => {
  const safeVal = val == null ? '' : String(val);

  if (props.variant === 'money') {
    const digits = onlyDigits(safeVal);
    if (!digits) {
      value.value = '';
      emit('update:modelValue', '');
      return;
    }
    const formatted = formatMoney(digits);
    value.value = formatted;
    emit('update:modelValue', formatted);
  } else if (props.variant === 'unit') {
    const digits = onlyDigits(safeVal);
    if (!digits) {
      value.value = '';
      emit('update:modelValue', '');
      return;
    }
    const formatted = formatUnit(digits);
    value.value = formatted;
    emit('update:modelValue', formatted);
  } else {
    value.value = safeVal;
    emit('update:modelValue', safeVal);
  }
};

const onBlurValidate = () => validate();
</script>

<template>
  <div :class="['custom-input-container', { 'is-disabled': disabled }]">
    <span v-if="label" class="custom-label"
      >{{ label }}
      <span v-if="props.required" class="required-asterisk">*</span></span
    >

    <QField
      :error="!!errorMessage"
      :error-message="errorMessage || supportingText"
      no-error-icon
      :disable="disabled"
      borderless
      hide-bottom-space
      class="custom-qfield"
    >
      <template v-slot:control>
        <div class="input__wrapper" :class="{ 'is-error': !!errorMessage }">
          <QInput
            :model-value="value"
            @update:model-value="onInput"
            :name="name"
            v-bind="attrs"
            :type="
              props.variant === 'password'
                ? seePassword
                  ? 'text'
                  : 'password'
                : 'text'
            "
            :mask="props.variant === 'date' ? '##/##/####' : undefined"
            :fill-mask="props.variant === 'date' ? '_' : undefined"
            :disable="disabled"
            @blur="onBlurValidate"
            :placeholder="props.placeholder as string"
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
            v-else-if="showClearIcon"
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
  padding-bottom: 4px;
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

.required-asterisk {
  color: #ed4647;
}
</style>
