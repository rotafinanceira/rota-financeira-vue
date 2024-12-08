<template>
  <q-footer elevated>
    <q-tabs
      v-model="footerTab"
      align="justify"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab
        name="home"
        label="Início"
        icon="home"
        @click="navigateTo('/')"
      />
      <q-tab
        name="maintenance"
        label="Manutenções"
        icon="build"
        @click="navigateTo('/oil-maintenance')"
      />
      <q-tab
        name="history"
        label="Histórico"
        icon="history"
        @click="navigateTo('/history')"
      />
      <q-tab
        name="profile"
        label="Perfis"
        icon="person"
        @click="navigateTo('/profile')"
      />
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const footerTab = ref('home');
const router = useRouter();

function navigateTo(path) {
  router.push(path);
}
</script>

<style scoped>
.q-footer {
  background-color: #ffffff;
  color: #000000;
}
</style>
