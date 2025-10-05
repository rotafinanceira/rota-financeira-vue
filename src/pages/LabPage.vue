<script setup lang="ts">
import CButton from '@/shared/components/CButton.vue';
import CInput from '@/shared/components/CInput.vue';
import { useForm } from 'vee-validate';
import { vMaska } from 'maska/vue';
import type { MaskInputOptions } from 'maska';
import * as yup from 'yup';

const options: MaskInputOptions = {
  mask: ['AAA-####', 'AAA#A##'],
  tokens: {
    A: {
      pattern: /[A-Z]/,
      transform: (char: string) => char.toUpperCase(),
    },
  },
};

const plateSchema = yup
  .string()
  .required('A placa é obrigatória')
  .test('plate-format', 'Placa inválida', (val) => {
    if (!val) return false;
    const cleaned = val.replace(/[^A-Z0-9]/gi, '');

    if (cleaned.length < 5) return false;

    const fifth = cleaned[4];
    if (/[A-Z]/.test(fifth)) {
      return cleaned.length === 8;
    } else if (/[0-9]/.test(fifth)) {
      return cleaned.length === 7;
    }

    return false;
  });

const { handleSubmit, meta } = useForm({
  validationSchema: yup.object({
    name: yup.string().min(5, 'O nome precisa ter 5 ou mais letras').required(),
    email: yup.string().email().required(),
    plate: plateSchema,
  }),
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <div class="lab app-wrapper">
    <form @submit="onSubmit" class="form">
      <CInput label="nome" name="name" variant="generic" />
      <CInput label="email" name="email" variant="generic" type="email" />
      <CInput
        label="Placa do carro"
        name="plate"
        variant="generic"
        type="text"
        v-maska="options"
      />
      <CButton type="submit" :disabled="!meta.valid">Clique aqui</CButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.lab {
  display: grid;
  align-content: center;
  gap: 1rem;
  align-content: center;
  gap: 1rem;
  min-height: $screen;
}

.form {
  display: grid;
  gap: 1rem;
}
</style>
