<template>
  <q-dialog
    v-model="internalShow"
    position="bottom"
    @hide="closeSheet"
    persistent
  >
    <div class="bottomSheet" @click.stop>
      <div class="container--close">
        <slot name="close--button" />
      </div>

      <div class="container--confirm">
        <slot />
        <slot name="confirm--button" />
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

<style scoped lang="scss">
.bottomSheet {
  width: 100vw;
  max-height: 90vh;
  border-radius: 16px 16px 0 0;
  background-color: white;
  padding: 20px;
  overflow-y: auto;

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
</style>
