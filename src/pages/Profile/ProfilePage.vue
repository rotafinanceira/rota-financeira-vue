<template>
  <div class="perfil-page">
    <header class="header">
      <h1>Perfil</h1>
    </header>

    <nav class="tabs">
      <button
        :class="{ active: activeTab === 'perfil' }"
        @click="activeTab = 'perfil'"
      >
        Meu Perfil
      </button>
      <button
        :class="{ active: activeTab === 'veiculo' }"
        @click="activeTab = 'veiculo'"
      >
        Meu Veículo
      </button>
    </nav>

    <section v-if="activeTab === 'perfil'" class="perfil-content">
      <div class="info-pessoais">
        <div class="foto-perfil">
          <img
            :src="user.photo"
            alt="Foto de Perfil"
            class="foto"
          />
        </div>
        <div class="dados-perfil">
          <div class="idade">{{ user.age }} anos</div>
          <h2 class="nome">{{ user.name }}</h2>
          <p>{{ user.email }}</p>
          <p>{{ user.phone }}</p>
        </div>
      </div>

      <div class="notificacoes">
        <label class="switch-label">
          <span>Receber notificações por e-mail</span>
          <input type="checkbox" v-model="emailNotificationsEnabled" />
        </label>
        <label class="switch-label">
          <span>Receber notificações no celular</span>
          <input type="checkbox" v-model="phoneNotificationsEnabled" />
        </label>
      </div>

      <button class="btn-editar" @click="editarPerfil">
        Editar perfil
      </button>
    </section>

    <section v-else class="veiculo-content">
      <p>Aqui vão as informações do veículo...</p>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppFooter from '@/components/AppFooter.vue';

interface User {
  name: string;
  email: string;
  phone: string;
  age: number;
  photo: string;
}

const activeTab = ref<'perfil' | 'veiculo'>('perfil');
const user = ref<User>({
  name: 'Bruno Martins Albuquerque',
  email: 'brmartins1984@gmail.com',
  phone: '+55 (11) 9999-9999',
  age: 36,
  photo: 'https://via.placeholder.com/120x120.png?text=Foto'
});
const emailNotificationsEnabled = ref(false);
const phoneNotificationsEnabled = ref(true);

function editarPerfil() {
  console.log('Editar Perfil');
}
</script>

<style scoped>
.perfil-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: 1rem;
  background-color: #f2f2f2;
  text-align: center;
  font-weight: bold;
}

.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #ececec;
  padding: 0.5rem 0;
}

.tabs button {
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
}

.tabs button.active {
  border-bottom: 2px solid #4caf50;
}

.info-pessoais {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
}

.foto-perfil {
  margin-right: 1rem;
}

.foto {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.dados-perfil {
  display: flex;
  flex-direction: column;
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

.veiculo-content {
  padding: 1rem;
}
</style>
