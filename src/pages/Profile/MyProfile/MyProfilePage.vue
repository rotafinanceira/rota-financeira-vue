<script setup lang="ts">
import ToggleButton from '@/shared/components/ToggleButton.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

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

function toggleEmailNotifications() {
  emailNotificationsEnabled.value = !emailNotificationsEnabled.value;
}

function togglePhoneNotifications() {
  phoneNotificationsEnabled.value = !phoneNotificationsEnabled.value;
}
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
      <label class="switch-label" @click="toggleEmailNotifications">
        <span>Receber notificações por e-mail</span>
        <ToggleButton :modelValue="emailNotificationsEnabled" />
      </label>
      <label class="switch-label" @click="togglePhoneNotifications">
        <span>Receber notificações no celular</span>
        <ToggleButton :modelValue="phoneNotificationsEnabled" />
      </label>
    </div>

    <RouterLink class="btn-editar" :to="{ name: 'user-profile-edit' }">Editar perfil</RouterLink>
  </div>
</template>

<style scoped>
@import './_profile.scss';
</style>
