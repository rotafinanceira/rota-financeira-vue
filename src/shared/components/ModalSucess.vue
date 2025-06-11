<template>
  <q-dialog v-model="isOpen" persistent>
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-image">
          <q-img :src="sucessIcon" />
        </div>
        <div class="modal-content">
          <div class="modal-title">
            {{ title }}
          </div>
          <div class="modal-description">{{ description }}</div>
        </div>
        <q-btn class="modal-button" @click="closeModal">
          <span>{{ textButton }}</span>
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import sucessIcon from '@/shared/assets/check-valid.svg';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  title: String,
  open: Boolean,
  description: String,
  textButton: String,
});

const isOpen = ref(props.open);
const title = ref(props.title);
const description = ref(props.description);
const textButton = ref(props.textButton);

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

watch(
  () => props.title,
  (newVal) => {
    title.value = newVal;
  }
);

watch(
  () => props.description,
  (newVal) => {
    description.value = newVal;
  }
);

watch(
  () => props.textButton,
  (newVal) => {
    textButton.value = newVal;
  }
);

const closeModal = () => {
  isOpen.value = false;
  router.push('/');
};
</script>

<style scoped>
.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 32px;
}

.modal-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.modal-image {
  display: flex;
  justify-content: center;
  margin: auto;
  width: 44px;
  height: 44px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.modal-title {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #0c0d0f;
}

.modal-description {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #485159;
}

.modal-button {
  border-radius: 4px;
  background-color: #0c0d0f;
  color: white;
  padding: 13px 0;
  min-width: 256px;
  text-transform: none;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}
</style>
