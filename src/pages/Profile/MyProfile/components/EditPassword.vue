<template>
  <section class="edit-content">
    <h3>Editar Senha</h3>
    <div class="edit-card">
      <label>
        Senha
        <input type="password" v-model="password" />
      </label>
      <button class="btn-salvar" @click="salvarEdicao">Salvar</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const password = ref('');

function salvarEdicao() {
  console.log('Salvar Senha');
}
</script>

<style scoped>
.edit-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.edit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.btn-salvar {
  margin: 1rem;
  padding: 0.75rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
