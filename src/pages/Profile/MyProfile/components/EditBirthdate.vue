<template>
  <EditField
    title="Alterar data de nascimento"
    description="Digite a data de nascimento correta em Data de Nascimento Atual e clique em salvar alterações."
    :updateValue="updateBirthdate"
  >
    <label class="edit-label disabled">
      Data de nascimento anterior
        <input
          class="edit-input disabled"
          type="date"
          value="1996-08-24"
          disabled
        />
    </label>
    <label class="edit-label">
      Data de nascimento atual
      <div class="input-wrapper">
        <input class="edit-input" type="date" v-model="birthdate" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from './EditField.vue';

const birthdate = ref('');

function updateBirthdate() {
  console.log('Update birthdate');
}
</script>
