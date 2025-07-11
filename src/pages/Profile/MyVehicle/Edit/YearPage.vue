<template>
  <EditField
    title="Ano"
    description="Digite o ano completo correto em Ano Atual e clique em salvar alterações."
    :updateValue="updateYear"
  >
    <label class="edit__label disabled">
      Ano anterior
      <input class="edit__input disabled" type="text" value="2020" disabled />
    </label>
    <label class="edit__label">
      Ano atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="year" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '@/pages/Profile/components/EditField.vue';

const year = ref('');

function updateYear() {
  console.log('Update year');
}
</script>
