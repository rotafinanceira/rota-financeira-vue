<script setup lang="ts">
import CToggle from '@/shared/components/CToggle.vue';
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
        <CToggle v-model="emailNotifications" @click="emailNotifications = !emailNotifications" />
      </label>
      <label class="switch-label">
        <span>Receber notificações no celular</span>
        <CToggle v-model="phoneNotifications" @click="phoneNotifications = !phoneNotifications" />
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
