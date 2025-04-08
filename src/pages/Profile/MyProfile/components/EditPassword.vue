<template>
  <EditField
    title="Alterar senha"
    description="Digite a sua senha atual. Depois crie uma nova senha contendo todos os requisitos de senha solicitados e em seguida repita a nova senha abaixo. Para finalizar clique em salvar alterações."
    :updateValue="updatePassword"
  >
    <label class="edit-label">
      Senha atual
      <a href="#" class="edit-password-forgotten">Esqueceu a senha?</a>
      <div class="input-wrapper">
        <input
          class="edit-input"
          type="password"
          v-model="currentPassword"
        />
      </div>
    </label>
    <label class="edit-label">
      Nova senha

      <div class="input-wrapper">
        <input
          class="edit-input"
          type="password"
          v-model="newPassword"
        />
      </div>
    </label>
    <label class="edit-label">
      Repita a nova senha

      <div class="input-wrapper">
        <input
          class="edit-input"
          type="password"
          v-model="confirmedPassword"
        />
      </div>
    </label>
    <div class="edit-password-requirements">
      <span class="edit-password-musthave">A senha deve ter:</span>
      <ul class="edit-password-list">
        <!-- TODO: criar lógica de renderização dos ícones V/X (possivelmente requerirá regex) -->
        <li class="edit-password-list-item">Mínimo de 1 letra maiúscula</li>
        <li class="edit-password-list-item">Mínimo de 1 letra minúscula</li>
        <li class="edit-password-list-item">Mínimo de 1 caractere especial</li>
        <li class="edit-password-list-item">Mínimo de 1 número</li>
        <li class="edit-password-list-item">Mínimo de 8 dígitos</li>
      </ul>
    </div>
  </EditField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditField from './EditField.vue';

const currentPassword = ref('');
const newPassword = ref('');
const confirmedPassword = ref('');

function updatePassword() {
  console.log('Update password');
}
</script>

<style scoped lang="scss">
.edit-label {
  position: relative;
}

.edit-password {
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

  &-musthave {
    color: #485159;
    font-size: 0.875rem;
    font-weight: 600;
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
