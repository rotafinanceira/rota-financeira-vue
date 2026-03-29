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
        :value="(registerStore.userProfile?.name || '') + ' ' + (registerStore.userProfile?.lastName || '')"
        disabled
      />
    </label>
    <label class="edit__label">
      Nome completo atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="fullName" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import EditField from '../../components/EditField.vue';
import { useRegisterStore } from '@/stores/registerStore';

const fullName = ref('');
const registerStore = useRegisterStore();
const router = useRouter();

async function updateName() {
  try {
    const parts = fullName.value.trim().split(' ');
    const name = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';
    
    await registerStore.updateUser({ name, lastName });
    router.back();
  } catch (e) {
    alert('Erro ao atualizar nome.');
  }
}
</script>
