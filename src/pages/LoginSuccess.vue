<template>
  <q-page padding>
    <div class="success-container">
      <h1>Login Bem-sucedido!</h1>
      <p>Bem-vindo(a) ao sistema.</p>
      <q-btn label="Logout" @click="handleLogout" class="logout-button" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  router.push({ path: '/' });
};
</script>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.logout-button {
  margin-top: 20px;
  background-color: #e74c3c;
  color: white;
}
</style>
