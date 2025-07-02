<template>
  <div v-if="internalShow" class="overlay" @click.self="closeSheet">
    <div class="custom-bottom-sheet" @click.stop>
      <div class="close-button-container">
        <slot name="close-button" />
      </div>

      <div class="container">
        <slot />
        <slot name="confirm-button" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm', selected: string[]): void;
}>();

const internalShow = ref(props.modelValue);
//const selectedOptions = ref<string[]>([]);

watch(
  () => props.modelValue,
  (val) => {
    internalShow.value = val;
  }
);

watch(internalShow, (val) => {
  emit('update:modelValue', val);
});

function closeSheet() {
  internalShow.value = false;
}

/* sfunction confirm() {
  emit('confirm', selectedOptions.value);
  closeSheet();
} */
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  display: flex;
  align-items: flex-end;
}

.close-button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.close-button {
  padding-left: 10px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 24px;
}

.styled-button {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  border: 2px solid #314b39;
  background-color: white;
  color: #314b39;
  font-weight: 600;
  font-size: 18px;
}

.image {
  width: 100%;
  height: auto;
}

.custom-bottom-sheet {
  width: 100%;
  max-height: 90vh;
  border-radius: 16px 16px 0 0;
  overflow-y: auto;
  background-color: white;
  padding: 20px;
}
</style>
