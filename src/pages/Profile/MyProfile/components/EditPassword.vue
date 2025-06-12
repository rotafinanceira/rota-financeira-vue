<template>
  <HeaderBar title="Perfil" :path="'/profile'" />
  <EditField
    title="Alterar senha"
    description="Digite a sua senha atual. Depois crie uma nova senha contendo todos os requisitos de senha solicitados e em seguida repita a nova senha abaixo. Para finalizar clique em salvar alterações."
    :updateValue="handleSubmit"
  >
    <label class="edit__label">
      Senha atual
      <a href="#" class="edit__password-forgotten">Esqueceu a senha?</a>
      <div class="input-wrapper">
        <input
          class="edit__input"
          type="password"
          v-model="currentPassword"
          placeholder="Digite a sua senha atual"
        />
      </div>
    </label>
    <label class="edit__label">
      Nova senha

      <div class="input-wrapper">
        <input
          class="edit__input"
          type="password"
          v-model="newPassword"
          placeholder="*******"
        />
      </div>
    </label>
    <label class="edit__label">
      Repita a nova senha

      <div class="input-wrapper">
        <input
          class="edit__input"
          type="password"
          v-model="confirmNewPassword"
          placeholder="*******"
        />
      </div>
    </label>
    <div class="edit__password-requirements">
      <PasswordChecker
        :password="newPassword"
        :confirmPassword="confirmNewPassword"
      />
    </div>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from '../../components/EditField.vue';
import PasswordChecker from '@/shared/components/PasswordChecker.vue';

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const validatePassword = () => {
  if (newPassword.value !== confirmNewPassword.value) {
    alert('As senhas não correspondem!');
    return false;
  }

  if (
    !/[a-z]/.test(newPassword.value) ||
    !/[A-Z]/.test(newPassword.value) ||
    !/[0-9]/.test(newPassword.value) ||
    !/[!@#$%^&*()]/.test(newPassword.value) ||
    newPassword.value.length < 8
  ) {
    alert('A senha não atende a todos os critérios.');
    return false;
  }

  return true;
};

const handleSubmit = () => {
  if (validatePassword()) {
    console.log('Senha alterada com sucesso!');
    // Add logic to handle password update
  }
};
</script>

<style scoped lang="scss">
.edit__label {
  position: relative;
}

.edit__password {
  &-forgotten {
    color: #307714;
    margin-left: auto;
    font-size: 0.875rem;
    position: absolute;
    right: 0;

    text-decoration: none;
    font-weight: 500;
  }

  &-requirements {
    margin-top: 1rem;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 0.5rem;

    color: #485159;
    font-size: 0.75rem;
  }
}
</style>
