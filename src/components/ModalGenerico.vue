<template>
  <q-dialog v-model="isOpen" persistent>
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-image">
          <q-img :src="errorIcon" />
        </div>
        <div class="modal-text">{{ content }}</div>
        <q-btn class="modal-button" @click="closeModal">
          <span class="modal-button-text">Fechar</span>
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import errorIcon from '../assets/Frame 2608660.png';

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
.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: 300px;
  border-radius: 10px;
}

.modal-container {
  align-self: center;
  justify-content: space-between;
  z-index: 10;
  border-radius: 10px;
  background: white;
  width: 320px;
  height: 300px;
  align-items: center;
  border: 1px solid #9ba7ad;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
}

.modal-image {
  margin-top: 32px;
  padding: 10px;
}

.modal-text {
  color: #5b6871;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  flex-wrap: wrap;
  align-self: stretch;
  text-align: center;
  margin: 0 32px;
}

.modal-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border-radius: 4px;
  background-color: #b00020;
  width: 256px;
  margin-bottom: 32px;
}

.modal-button-text {
  font-family: "Inter";
  font-size: 14px;
  font-weight: 700;
  line-height: 16.8px;
  letter-spacing: 0.28px;
  color: #fff;
}
</style>
