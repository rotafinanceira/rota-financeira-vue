<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card>
      <q-card-section class="modal-content">
        <q-img src="@/assets/errorIcon.png" class="error-icon" />
        <div class="modal-text">{{ content }}</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" label="Fechar" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
// import { useModalStore } from '@/store/modalStore';

const isOpen = ref(false);
const { setIsOpen } = useModalStore();

const content = ref('');

const closeModal = () => {
  setIsOpen(false);
};

// Watch for changes in modal state
watchEffect(() => {
  isOpen.value = !!useModalStore().isOpen;
  content.value = useModalStore().content;
});
</script>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-icon {
  width: 80px;
  height: auto;
  margin-bottom: 20px;
}

.modal-text {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
