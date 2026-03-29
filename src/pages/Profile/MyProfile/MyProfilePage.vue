<script setup lang="ts">
import CToggle from '@/shared/components/CToggle.vue';
import { onMounted, computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
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
</script>

<template>
  <div class="app-wrapper">
    <div class="notificacoes-header">Informações Pessoais</div>

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

    <div class="notificacoes-header">Notificações</div>

    <div class="notificacoes">
      <label class="switch-label">
        <span>Receber notificações por e-mail</span>
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

    <RouterLink class="btn-editar" :to="{ name: 'user-profile-edit' }"
      >Editar perfil</RouterLink
    >
  </div>
</template>

<style scoped>
@import './_profile.scss';
</style>
