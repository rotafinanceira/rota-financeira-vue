<template>
  <EditField
    title="Alterar e-mail"
    description="Digite um novo e-mail em E-mail atual e clique em salvar alterações."
    :updateValue="updateEmail"
  >
    <label class="edit__label disabled">
      E-mail anterior
      <input
        class="edit__input disabled"
        type="email"
        :value="registerStore.userProfile?.email || '---'"
        disabled
      />
    </label>
    <label class="edit__label">
      E-mail atual
      <div class="input-wrapper">
        <input class="edit__input" type="text" v-model="email" />
      </div>
    </label>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import EditField from '../../components/EditField.vue';
import { useRegisterStore } from '@/stores/registerStore';

const email = ref('');
const registerStore = useRegisterStore();
const router = useRouter();

async function updateEmail() {
  if (!email.value || !email.value.includes('@')) return;
  try {
    await registerStore.updateUser({ email: email.value });
    router.back();
  } catch (e) {
    alert('Erro ao atualizar email.');
  }
}
</script>
