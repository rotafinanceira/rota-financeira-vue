<template>
  <EditField
    title="Alterar e-mail"
    description="Digite um novo e-mail em E-mail atual e clique em salvar alterações."
    :updateValue="updateEmail"
  >
    <label class="edit__label disabled">
      E-mail anterior
      <input
        class="edit__input disabled"
        type="email"
        value="ana.maria@gmail.com"
        disabled
      />
    </label>
    <label class="edit__label">
      E-mail atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="email" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '../../components/EditField.vue';

const email = ref('');

function updateEmail() {
  console.log('Update E-mail');
}
</script>
