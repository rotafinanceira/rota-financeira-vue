<script setup lang="ts">
import { ArrowIcon } from '@/shared/assets/icons';
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

function mudarFoto() {
  console.log('Mudar Foto');
}

function excluirConta() {
  console.log('Excluir Conta');
}
</script>

<template>
  <div class="edit-card app-wrapper">
    <div class="foto-perfil">
      <div
        class="foto"
        :style="{ backgroundImage: `url(${user.photo})` }"
      ></div>
    </div>
    <button @click="mudarFoto" class="mudar-foto">Mudar Foto</button>
    <div class="edit-info">
      <h4>Informações Pessoais</h4>
      <div class="personal-info-buttons">
        <div class="horizontal-layout">
          <RouterLink
            :to="{ name: 'user-profile-edit-name' }"
            class="full-width-button"
          >
            <span>Nome completo</span>
            <img :src="ArrowIcon" alt="Arrow Right" class="icon" />
          </RouterLink>
        </div>
        <div class="horizontal-layout">
          <RouterLink
            :to="{ name: 'user-profile-edit-birthdate' }"
            class="full-width-button"
          >
            <span>Data de nascimento</span>
            <img :src="ArrowIcon" alt="Arrow Right" class="icon" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="edit-account">
      <h4>Conta</h4>
      <div class="account-info-buttons">
        <div class="horizontal-layout">
          <RouterLink
            :to="{ name: 'user-profile-edit-email' }"
            class="full-width-button"
          >
            <span>E-mail</span>
            <img :src="ArrowIcon" alt="Arrow Right" class="icon" />
          </RouterLink>
        </div>
        <div class="horizontal-layout">
          <RouterLink
            :to="{ name: 'user-profile-edit-password' }"
            class="full-width-button"
          >
            <span>Senha</span>
            <img :src="ArrowIcon" alt="Arrow Right" class="icon" />
          </RouterLink>
        </div>
        <div class="horizontal-layout">
          <RouterLink
            :to="{ name: 'terms-and-privacy' }"
            class="full-width-button"
          >
            <span>Termos de uso e privacidade</span>
            <img :src="ArrowIcon" alt="Arrow Right" class="icon" />
          </RouterLink>
        </div>
        <div class="horizontal-layout">
          <button @click="excluirConta" class="full-width-button excluir-conta">
            <span>Excluir Conta</span>
            <img :src="ArrowIcon" alt="Arrow Right" class="icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './_profile.scss';
</style>
