<template>
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
        :value="registerStore.userProfile?.birthday ? new Date(registerStore.userProfile.birthday).toISOString().split('T')[0] : ''"
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
import { useRouter } from 'vue-router';
import EditField from '../../components/EditField.vue';
import { useRegisterStore } from '@/stores/registerStore';

const birthdate = ref('');
const registerStore = useRegisterStore();
const router = useRouter();

async function updateBirthdate() {
  if (!birthdate.value) return;
  try {
    await registerStore.updateUser({ birthday: new Date(birthdate.value).toISOString() });
    router.back();
  } catch (e) {
    alert('Erro ao atualizar data de nascimento.');
  }
}
</script>
