<template>
  <EditField
    title="Alterar e-mail"
    description="Digite um novo e-mail em E-mail atual e clique em salvar alterações."
    :updateValue="updateEmail"
  >
    <label class="edit-label disabled">
      E-mail anterior
      <input
        class="edit-input disabled"
        type="email"
        value="ana.maria@gmail.com"
        disabled
      />
    </label>
    <label class="edit-label">
      E-mail atual
      <div class="input-wrapper">
        <input class="edit-input" type="text" v-model="email" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from './EditField.vue';

const email = ref('');

function updateEmail() {
  console.log('Update E-mail');
}
</script>
