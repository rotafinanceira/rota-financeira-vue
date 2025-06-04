<template>
    <HeaderBar
      title="Perfil"
      :path="'/profile'"
    />
  <EditField
    title="Modelo"
    description="Digite o modelo completo correto em Modelo Atual e clique em salvar alterações."
    :updateValue="updateModel"
  >
    <label class="edit__label disabled">
      Modelo anterior
      <input
        class="edit__input disabled"
        type="text"
        value="Corolla"
        disabled
      />
    </label>
    <label class="edit__label">
      Modelo atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="model" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '@/pages/Profile/components/EditField.vue';
import HeaderBar from '@/components/HeaderBar.vue';

const model = ref('');

function updateModel() {
  console.log('Update model');
}
</script>
