<template>
  <section class="edit-content">
    <h3>Alterar Senha</h3>
    <p>
      Digite a sua senha atual. Depois crie uma nova senha contendo todos os
      requisitos de senha solicitados e em seguida repita a nova senha abaixo.
      Para finalizar clique em salvar alterações.
    </p>
    <div class="container-content">
      <div class="form" @submit.prevent="validatePassword">
        <div class="inputs-wrapper">
          <SignUpPasswordInput v-model="currentPassword" label="Senha Atual" />
          <SignUpPasswordInput v-model="newPassword" label="Nova Senha" />
          <SignUpPasswordInput
            v-model="confirmNewPassword"
            label="Confirmar Nova Senha"
          />
        </div>
        <PasswordChecker
          :password="newPassword"
          :confirmPassword="confirmNewPassword"
        />
        <ButtonComponent
          label="Salvar alterações"
          :isLoading="isLoading"
          @click="handleSubmit"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SignUpPasswordInput from '@/components/SignUpPasswordInput.vue';
import PasswordChecker from '@/components/PasswordChecker.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const isLoading = ref(false);
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

<style scoped>
.edit-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.container-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-top: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.inputs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.btn-salvar {
  margin-top: 20px;
  padding: 0.75rem 1rem;
  background-color: var(--Cores-Primria-800, #245017);
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  text-align: center;
  border-radius: 4px;
}

.btn-salvar:hover {
  background-color: var(--Cores-Primria-600, #1e4014);
}
</style>
