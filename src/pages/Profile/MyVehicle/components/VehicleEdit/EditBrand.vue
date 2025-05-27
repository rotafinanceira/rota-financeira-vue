<template>
  <AppHeader />
  <EditField
    class="margin-header"
    title="Marca"
    description="Digite a marca completa correta em Marca Atual e clique em salvar alterações."
    :updateValue="updateBrand"
  >
    <label class="edit__label disabled">
      Marca anterior
      <input class="edit__input disabled" type="text" value="Toyota" disabled />
    </label>
    <label class="edit__label">
      Marca atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="brand" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '@/pages/Profile/components/EditField.vue';
import AppHeader from '@/components/AppHeader.vue';

const brand = ref('');

function updateBrand() {
  console.log('Update brand');
}
</script>

<style scoped lang="scss">
.margin-header {
  margin-top: 1.5rem;
}
</style>
