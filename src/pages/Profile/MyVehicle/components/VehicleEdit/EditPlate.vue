<template>
  <AppHeader />
  <EditField
    class="margin-header"
    title="Placa"
    description="Digite a placa correta em Placa Atual e clique em salvar alterações."
    :updateValue="updatePlate"
  >
    <label class="edit__label disabled">
      Placa anterior
      <input
        class="edit__input disabled"
        type="text"
        value="ABC-1234"
        disabled
      />
    </label>
    <label class="edit__label">
      Placa atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="plate" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '@/pages/Profile/components/EditField.vue';
import AppHeader from '@/components/AppHeader.vue';

const plate = ref('');

function updatePlate() {
  console.log('Update plate');
}
</script>

<style scoped lang="scss">
.margin-header {
  margin-top: 1.5rem;
}
</style>
