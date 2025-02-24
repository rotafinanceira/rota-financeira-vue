<template>
  <section class="perfil-content">
    <div class="info-pessoais">
      <div class="card">
        <div class="foto-perfil">
          <img :src="user.photo" alt="Foto de Perfil" class="foto" />
        </div>
        <div class="dados-perfil">
          <div class="idade">{{ user.age }} anos</div>
          <h2 class="nome">{{ user.name }}</h2>
          <p>{{ user.email }}</p>
          <p>{{ user.phone }}</p>
        </div>
      </div>
    </div>

    <div class="notificacoes">
      <label class="switch-label">
        <span>Receber notificações por e-mail</span>
        <input
          type="checkbox"
          :checked="emailNotificationsEnabled"
          @change="updateEmailNotifications"
        />
      </label>
      <label class="switch-label">
        <span>Receber notificações no celular</span>
        <input
          type="checkbox"
          :checked="phoneNotificationsEnabled"
          @change="updatePhoneNotifications"
        />
      </label>
    </div>

    <button class="btn-editar" @click="$emit('editarPerfil')">
      Editar perfil
    </button>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface User {
  name: string;
  email: string;
  phone: string;
  age: number;
  photo: string;
}

const props = defineProps<{
  user: User;
  emailNotificationsEnabled: boolean;
  phoneNotificationsEnabled: boolean;
}>();

const { user, emailNotificationsEnabled, phoneNotificationsEnabled } = props;

const emit = defineEmits([
  'update:emailNotificationsEnabled',
  'update:phoneNotificationsEnabled',
  'editarPerfil',
]);

function updateEmailNotifications(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:emailNotificationsEnabled', target.checked);
  }
}

function updatePhoneNotifications(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:phoneNotificationsEnabled', target.checked);
  }
}
</script>

<style scoped>
.perfil-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.foto-perfil {
  margin-bottom: 1rem;
}

.foto {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.dados-perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.idade {
  background-color: #4caf50;
  color: white;
  border-radius: 12px;
  padding: 0.2rem 0.5rem;
  width: fit-content;
  margin-bottom: 0.5rem;
}

.nome {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.notificacoes {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-editar {
  margin: 1rem;
  padding: 0.75rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
