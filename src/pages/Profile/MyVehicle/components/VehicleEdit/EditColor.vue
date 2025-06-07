<template>
  <HeaderBar class="header" title="Perfil" :path="'/profile'" />
  <EditField
    title="Cor"
    description="Digite a cor correta em Cor Atual e clique em salvar alterações."
    :updateValue="updateColor"
  >
    <label class="edit__label disabled">
      Cor anterior
      <input class="edit__input disabled" type="text" value="Cinza" disabled />
    </label>
    <label class="edit__label">
      Cor atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="color" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '@/pages/Profile/components/EditField.vue';

const color = ref('');

function updateColor() {
  console.log('Update color');
}
</script>
