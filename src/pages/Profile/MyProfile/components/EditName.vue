<template>
  <EditField
    title="Alterar nome"
    description="Digite o nome completo correto em Nome Atual e clique em salvar alterações."
    :updateValue="updateName"
  >
    <label class="edit-label disabled">
      Nome completo anterior
        <input
          class="edit-input disabled"
          type="text"
          value="Ana Maria"
          disabled
        />
    </label>
    <label class="edit-label">
      Nome completo atual
      <div class="input-wrapper">
        <input class="edit-input" type="text" v-model="name" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from './EditField.vue';

const name = ref('');

function updateName() {
  console.log('Update name');
}
</script>
