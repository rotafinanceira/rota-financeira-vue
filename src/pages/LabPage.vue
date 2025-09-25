<script setup lang="ts">
import CButton from '@/shared/components/CButton.vue';
import { ref, watch } from 'vue';
import CInput from '@/shared/components/CInput.vue';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const allInput = ref('');

const schema = z.object({
  name: z.string().min(5, 'O nome precisa ter ao menos 5 caracteres'),
  email: z.string().email()
});

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(schema)
});

const onSubmit = handleSubmit(values => {
  console.log(values);
});

watch(errors, () => {
  console.log(meta.value.valid);
})

</script>

<template>
  <div class="lab app-wrapper">
    <form @submit="onSubmit" class="form">
      <CInput
        label="nome"
        name="name"
        v-model="allInput"
        variant="text"
      />
      <CInput
        label="email"
        name="email"
        v-model="allInput"
        variant="text"
        type="email"
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
