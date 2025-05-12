<template>
  <EditField
    title="Alterar nome"
    description="Digite o nome completo correto em Nome Atual e clique em salvar alterações."
    :updateValue="updateName"
  >
    <label class="edit__label disabled">
      Nome completo anterior
      <input
        class="edit__input disabled"
        type="text"
        value="Ana Maria"
        disabled
      />
    </label>
    <label class="edit__label">
      Nome completo atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="name" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '../../components/EditField.vue';

const name = ref('');

function updateName() {
  console.log('Update name');
}
</script>
