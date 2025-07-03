<template>
  <q-dialog
    v-model="internalShow"
    position="bottom"
    @hide="closeSheet"
    persistent
  >
    <div class="custom-bottom-sheet" @click.stop>
      <div class="close-button-container">
        <slot name="close-button" />
      </div>

      <div class="container">
        <slot />
        <slot name="confirm-button" />
      </div>
    </div>
  </q-dialog>
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
</script>

<style scoped>
.custom-bottom-sheet {
  width: 100vw;
  max-height: 90vh;
  border-radius: 16px 16px 0 0;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 24px;
}

.close-button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
