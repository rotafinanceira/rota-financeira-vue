<template>
  <q-page class="flex flex-center">
    <q-spinner size="3em" color="primary" />
    <div class="q-ml-sm">Autenticando com Google...</div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import { useRegisterStore } from '@/stores/registerStore';

const route = useRoute();
const router = useRouter();
//const registerStore = useRegisterStore();

onMounted(() => {
  let token = route.query.token as string | undefined;

  if (!token) {
    const hash = window.location.hash;
    const qs = hash.includes('?') ? hash.split('?')[1] : '';
    token = new URLSearchParams(qs).get('token') || undefined;
  }

  console.log('TOKEN:', token);

  if (token) {
    localStorage.setItem('jwt', token);
    router.replace({ name: 'home' });
  } else {
    router.replace({ name: 'signin' });
  }
});
</script>
