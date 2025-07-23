<template>
  <q-dialog v-model="internalShow" position="bottom" no-backdrop-dismiss>
    <div
      class="bottom-sheet"
      :class="`variant--${props.variant || 'default'}`"
      @click.stop
    >
      <button
        v-if="props.variant === 'default'"
        variant="primary"
        class="close-button"
        @click="internalShow = false"
      >
        <img :src="XCircleIcon" alt="Fechar" />
      </button>

      <!-- <div class="container--close">
        <slot name="close--button" />
      </div> -->

      <div class="container--confirm">
        <slot />
        <!-- <slot name="confirm--button" /> -->
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import XCircleIcon from '../assets/icons/x-circle.svg';

const props = defineProps<{
  modelValue: boolean;
  variant?: 'default' | 'options' | 'filter';
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
</script>

<style scoped lang="scss">
.bottom-sheet {
  max-height: 90vh;
  border-radius: 16px 16px 0 0;
  background-color: white;
  padding: 20px;

  .container--close {
    display: flex;
    justify-content: flex-end;
  }

  .container--confirm {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 24px;
  }
}

.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
  border: none;
}

:deep(h2) {
  font-weight: 600;
  font-size: 1.125rem;
}

:deep(p) {
  color: #485159;
}

:deep(.group) {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

:deep(.image-wrapper) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
