<template>
  <div class="perfil-page">
    <nav class="tabs">
      <button
        :class="{ active: activeTab === 'perfil' }"
        @click="activeTab = 'perfil'"
        class="perfil-button"
      >
        Meu Perfil
      </button>
      <button
        :class="{ active: activeTab === 'veiculo' }"
        @click="activeTab = 'veiculo'"
        class="veiculo-button"
      >
        Meu Veículo
      </button>
    </nav>

    <MyProfile
      v-if="activeTab === 'perfil'"
      :user="user"
      :emailNotificationsEnabled="emailNotificationsEnabled"
      :phoneNotificationsEnabled="phoneNotificationsEnabled"
      @toggleEmailNotifications="toggleEmailNotifications"
      @togglePhoneNotifications="togglePhoneNotifications"
      @editarPerfil="editarPerfil"
    />
    <MyVehicle v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyProfile from '@/pages/Profile/MyProfile/MyProfile.vue';
import MyVehicle from '@/pages/Profile/MyVehicle/MyVehicle.vue';

const activeTab = ref<'perfil' | 'veiculo'>('perfil');
const user = ref({
  name: 'Bruna Martins Albuquerque',
  email: 'brmartins1984@gmail.com',
  phone: '+55 (11) 9999-9999',
  age: 36,
  photo:
    'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=532',
});
const emailNotificationsEnabled = ref(false);
const phoneNotificationsEnabled = ref(true);

function editarPerfil() {
  console.log('Editar Perfil');
}

function toggleEmailNotifications(value: boolean) {
  emailNotificationsEnabled.value = value;
}

function togglePhoneNotifications(value: boolean) {
  phoneNotificationsEnabled.value = value;
}
</script>

<style scoped>
.perfil-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 1.5rem;
}

.header {
  padding: 1rem;
  background-color: #ffffff;
  text-align: center;
  font-weight: bold;
}

.perfil-title {
  flex: 1 0 0;
  color: var(--Cores-Primria-700, #2b5e16);
  text-align: center;

  font-size: var(--Tipo-Tamanho-2xl, 24px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.48px;
}

.tabs {
  display: flex;
  width: calc(100% - 40px);
  padding: 6px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Secundria-0, #fcf7fc);
  margin-inline: auto;
}

.tabs button {
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: var(--Cores-Primria-700, #2b5e16);

  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  line-height: 120%; /* 16.8px */
}

.tabs button.active {
  background: var(--Cores-Primria-700, #2b5e16);
  color: #fff;
}

.perfil-button.active {
  background: var(--Cores-Primria-700, #2b5e16);
  color: #fff;
}

.veiculo-button.active {
  background: var(--Cores-Primria-700, #2b5e16);
  color: #fff;
}

.perfil-button {
  display: flex;
  padding: 8px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
}

.veiculo-button {
  display: flex;
  padding: 8px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
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
