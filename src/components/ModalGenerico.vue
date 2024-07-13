<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card>
      <q-card-section class="modal-content">
        <div class="modal-text">{{ content }}</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" label="Fechar" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  content: String,
  open: Boolean,
});

const isOpen = ref(props.open);
const content = ref(props.content);

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

watch(
  () => props.content,
  (newVal) => {
    content.value = newVal;
  }
);

const closeModal = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-text {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
