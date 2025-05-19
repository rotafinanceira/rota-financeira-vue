<template>
  <div class="header">
    <AppHeader />
  </div>
  <EditField
    title="Alterar data de nascimento"
    description="Digite a data de nascimento correta em Data de Nascimento Atual e clique em salvar alterações."
    :updateValue="updateBirthdate"
  >
    <label class="edit__label disabled">
      Data de nascimento anterior
      <input
        class="edit__input disabled"
        type="date"
        value="1996-08-24"
        disabled
      />
    </label>
    <label class="edit__label">
      Data de nascimento atual
      <div class="input-wrapper">
        <input class="edit__input" type="date" v-model="birthdate" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '../../components/EditField.vue';
import AppHeader from '@/components/AppHeader.vue';

const birthdate = ref('');

function updateBirthdate() {
  console.log('Update birthdate');
}
</script>

<style scoped>
.header {
  padding: 1rem;
  background-color: #ffffff;
  text-align: center;
  font-weight: bold;
}
</style>
