<script setup lang="ts">
import CToggle from '@/shared/components/CToggle.vue';
import { onMounted, computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useRegisterStore } from '@/stores/registerStore';

const registerStore = useRegisterStore();

onMounted(async () => {
  if (!registerStore.userProfile) {
    await registerStore.fetchProfile();
  }
});

const calculateAge = (birthday?: string) => {
  if (!birthday) return 0;
  const diff = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const user = computed(() => {
  const profile = registerStore.userProfile || {};
  return {
    name: `${profile.name || ''} ${profile.lastName || ''}`.trim() || 'Usuário',
    email: profile.email || '',
    phone: profile.phone || '',
    age: calculateAge(profile.birthday),
    photo:
      profile.profileImageUrl ||
      'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png',
  };
});

const emailNotifications = ref(false);
const phoneNotifications = ref(true);

const router = useRouter();

function logout() {
  localStorage.removeItem('jwt');
  sessionStorage.removeItem('jwt');
  registerStore.resetStore();
  registerStore.userProfile = null;
  router.replace({ path: '/welcome' });
}
</script>

<template>
  <div class="app-wrapper">
    <div class="info-pessoais">
      <div class="foto-perfil">
        <div
          class="foto"
          :style="{ backgroundImage: `url(${user.photo})` }"
        ></div>
      </div>
      <div class="dados-perfil">
        <div class="idade">{{ user.age }} anos</div>
        <h2 class="nome">{{ user.name }}</h2>
        <p class="contact-info">{{ user.email }}</p>
        <p class="contact-info">{{ user.phone }}</p>
      </div>
    </div>

    <RouterLink class="btn-editar" :to="{ name: 'user-profile-edit' }"
      >Editar perfil</RouterLink
    >

    <div class="notificacoes">
      <div class="notificacoes-title">
        <span>Notificações</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-help">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <label class="switch-label">
        <span>Receber notificações por email</span>
        <CToggle
          v-model="emailNotifications"
          @click="emailNotifications = !emailNotifications"
        />
      </label>
      <label class="switch-label">
        <span>Receber notificações no celular</span>
        <CToggle
          v-model="phoneNotifications"
          @click="phoneNotifications = !phoneNotifications"
        />
      </label>
    </div>

    <div class="logout-section">
      <button class="btn-logout" @click="logout">
        <span>Sair</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import './_profile.scss';
</style>
