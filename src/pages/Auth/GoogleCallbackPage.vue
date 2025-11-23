<template>
  <q-page class="flex flex-center">
    <q-spinner size="3em" color="primary" />
    <div class="q-ml-sm">Autenticando com Google...</div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRegisterStore } from '@/stores/registerStore';

const route = useRoute();
const router = useRouter();
const registerStore = useRegisterStore();

onMounted(() => {
  const token = route.query.token as string;
  
  if (token) {
    console.log('Token recebido via Google Callback:', token);
    registerStore.setSession(token);
    
    // Redireciona para a home ou página de sucesso
    router.push({ name: 'home' }); 
  } else {
    console.error('Nenhum token recebido no callback do Google.');
    // Redireciona de volta para o login em caso de erro
    router.push({ name: 'login' });
  }
});
</script>
