<template>
  <q-dialog v-model="isOpen" persistent>
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
              {{ title }}
            </div>
            <q-btn
              class="modal-close-button"
              flat
              icon="close"
              @click="closeModal"
            />
          </div>
          <div class="modal-description" v-html="description"></div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: String,
  open: Boolean,
  description: String,
});

const emit = defineEmits(['close']);

// Reatividade dos estados internos do modal
const isOpen = ref(props.open);
const title = ref(props.title);
const description = ref(props.description);

// Observar a prop `open` e sincronizar com `isOpen`
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

// Observar a prop `title` e sincronizar
watch(
  () => props.title,
  (newVal) => {
    title.value = newVal;
  }
);

// Observar a prop `description` e sincronizar
watch(
  () => props.description,
  (newVal) => {
    description.value = newVal;
  }
);

// Fechar o modal e emitir evento `close`
const closeModal = () => {
  isOpen.value = false;
  emit('close');
};
</script>

<style scoped>
.modal-wrapper {
  width: 400px; /* Aumentar o tamanho do modal */
  max-width: 100%; /* Garantir que ele não ultrapasse a tela */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 32px;
  overflow: hidden;
}


.modal-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%; /* Ajusta para ocupar toda a largura disponível */

}
.modal-description ul li {
  margin-bottom: 24px; /* Espaçamento entre cada <li> */
}

.modal-description ul li:last-child {
  margin-bottom: 0; /* Remove o espaçamento do último <li> */
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-weight: 600;
  font-size: 18px;
  color: var(--Texto-Texto-Primrio, #0C0D0F);
  font-family: var(--Tipo-Familia-Button, Inter);
  line-height: 120%;
  white-space: nowrap; /* Impede que o título seja quebrado em várias linhas */
  overflow: hidden;    /* Evita que o conteúdo ultrapasse a largura */
  text-overflow: ellipsis; /* Adiciona "..." se o texto for muito longo */
}


.modal-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: var(--Texto-Corpo, #5B6871);
  width: 320px;
  text-align: left;
  height: auto;
  width: 100%; /* Ajusta para ocupar toda a largura disponível */
  box-sizing: border-box; /* Garantir que padding seja incluído no cálculo de largura */


}
.modal-description ul + ul {
  margin-top: 24px; /* Espaçamento entre <ul> consecutivos */
}

.modal-description ul {
  margin: 0;
  padding: 0;
  list-style: none; /* Remover padding/margens padrões para garantir o espaçamento personalizado */
}

.modal-close-button {
  display: flex;
  width: 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 4px;

}


</style>
