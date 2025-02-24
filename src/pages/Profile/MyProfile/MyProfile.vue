<template>
  <section class="perfil-content">
    <div v-if="!isEditing">
      <h3>Informações Pessoais</h3>
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

      <h3>Notificações</h3>
      <div class="notificacoes-card">
        <div class="notificacoes">
          <label class="switch-label">
            <span>Receber notificações por e-mail</span>
            <q-toggle
              :model-value="emailNotificationsEnabled"
              @update:model-value="$emit('toggleEmailNotifications', $event)"
            />
          </label>
          <label class="switch-label">
            <span>Receber notificações no celular</span>
            <q-toggle
              :model-value="phoneNotificationsEnabled"
              @update:model-value="$emit('togglePhoneNotifications', $event)"
            />
          </label>
        </div>
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
          <button @click="editarNome">Nome completo</button>
          <button @click="editarDataNascimento">Data de nascimento</button>
        </div>
        <div class="edit-account">
          <h4>Conta</h4>
          <button @click="editarEmail">E-mail</button>
          <button @click="editarSenha">Senha</button>
          <button @click="excluirConta">Excluir Conta</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

interface User {
  name: string;
  email: string;
  phone: string;
  age: number;
  photo: string;
  birthdate?: string;
  password?: string;
}

const props = defineProps<{
  user: User;
  emailNotificationsEnabled: boolean;
  phoneNotificationsEnabled: boolean;
}>();

const emit = defineEmits([
  'toggleEmailNotifications',
  'togglePhoneNotifications',
  'editarPerfil',
]);

const isEditing = ref(false);

function mudarFoto() {
  console.log('Mudar Foto');
}

function editarNome() {
  console.log('Editar Nome');
}

function editarDataNascimento() {
  console.log('Editar Data de Nascimento');
}

function editarEmail() {
  console.log('Editar Email');
}

function editarSenha() {
  console.log('Editar Senha');
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
.notificacoes-card,
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
