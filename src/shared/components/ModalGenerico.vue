<template>
  <q-dialog v-model="isOpen">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">{{ title }}</div>
            <q-btn class="modal-close-button" flat @click="closeModal">
              <img :src="closeIcon" alt="Close Icon" class="closeIcon" />
            </q-btn>
          </div>
          <div class="modal-description">
            <ul>
              <li v-for="(item, index) in description" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import closeIcon from '@/shared/assets/check-invalid.svg';

const props = defineProps({
  title: String,
  open: Boolean,
  description: {
    type: [Array, String],
    required: true,
  },
});

const emit = defineEmits(['close']);

const isOpen = ref(props.open);

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

watch(isOpen, (newVal) => {
  if (!newVal) {
    emit('close');
  }
});

const closeModal = () => {
  isOpen.value = false;
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
  padding: 20px;
  overflow: hidden;
}

.modal-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.modal-description ul li {
  margin-bottom: 6px;
}

.modal-description ul li:last-child {
  margin-bottom: 0;
}

.modal-description ul {
  margin: 0;
  padding-right: 25px;
  padding-left: 25px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  color: var(--Texto-Texto-Primrio, #0c0d0f);

  line-height: 120%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: var(--Texto-Corpo, #5b6871);
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
  margin-right: 10px;
  padding: 0;
  min-width: 0;
  width: 25px;
}

.closeIcon {
  width: 25px;
  height: 25px;
}
</style>
