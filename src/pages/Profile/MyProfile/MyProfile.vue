<template>
  <section class="perfil-content">
    <div v-if="!isEditing">
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
          <q-toggle
            v-model="localEmailNotificationsEnabled"
            @update:model-value="updateEmailNotifications"
          />
        </label>
        <label class="switch-label">
          <span>Receber notificações no celular</span>
          <q-toggle
            v-model="localPhoneNotificationsEnabled"
            @update:model-value="updatePhoneNotifications"
          />
        </label>
      </div>

      <button class="btn-editar" @click="isEditing = true">
        Editar perfil
      </button>
    </div>

    <div v-else>
      <h3>Editar Perfil</h3>
      <div class="edit-card">
        <div class="foto-perfil">
          <img :src="user.photo" alt="Foto de Perfil" class="foto" />
        </div>
        <button @click="mudarFoto">Mudar Foto</button>
        <div class="edit-info">
          <h4>Informações Pessoais</h4>
          <router-link to="/profile/edit-name">
            <button>Nome completo</button>
          </router-link>
          <router-link to="/profile/edit-birthdate">
            <button>Data de nascimento</button>
          </router-link>
        </div>
        <div class="edit-account">
          <h4>Conta</h4>
          <router-link to="/profile/edit-email">
            <button>E-mail</button>
          </router-link>
          <router-link to="/profile/edit-password">
            <button>Senha</button>
          </router-link>
          <button @click="excluirConta">Excluir Conta</button>
        </div>
        <button class="btn-cancelar" @click="isEditing = false">
          Cancelar
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

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

const emit = defineEmits([
  'update:emailNotificationsEnabled',
  'update:phoneNotificationsEnabled',
  'editarPerfil',
]);

const isEditing = ref(false);
const localEmailNotificationsEnabled = ref(props.emailNotificationsEnabled);
const localPhoneNotificationsEnabled = ref(props.phoneNotificationsEnabled);

watch(
  () => props.emailNotificationsEnabled,
  (newVal) => {
    localEmailNotificationsEnabled.value = newVal;
  }
);

watch(
  () => props.phoneNotificationsEnabled,
  (newVal) => {
    localPhoneNotificationsEnabled.value = newVal;
  }
);

function updateEmailNotifications(value: boolean) {
  emit('update:emailNotificationsEnabled', value);
}

function updatePhoneNotifications(value: boolean) {
  emit('update:phoneNotificationsEnabled', value);
}

function mudarFoto() {
  console.log('Mudar Foto');
}

function excluirConta() {
  console.log('Excluir Conta');
}
</script>

<style scoped>
.perfil-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.card,
.edit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.foto-perfil {
  margin-bottom: 1rem;
}

.foto {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.dados-perfil,
.edit-info,
.edit-account {
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

.btn-editar,
.btn-cancelar {
  margin: 1rem;
  padding: 0.75rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.btn-cancelar {
  background-color: #f44336;
}
</style>
