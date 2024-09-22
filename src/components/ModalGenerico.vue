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

const isOpen = ref(props.open);

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const closeModal = () => {
  isOpen.value = false;
  emit('close');
};
</script>

<style scoped>
.modal-wrapper {
  width: 400px;
  max-width: 100%;
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
  width: 100%;
}

.modal-description ul li {
  margin-bottom: 24px;
}

.modal-description ul li:last-child {
  margin-bottom: 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: var(--Texto-Corpo, #5B6871);
  width: 320px;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
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
