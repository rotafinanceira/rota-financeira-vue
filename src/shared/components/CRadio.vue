<script setup lang="ts">
const activeRadio = defineModel<string>();

defineProps<{
  id: string;
  group: string;
  label: string;
  value: string;
}>();
</script>

<template>
  <label class="label__wrapper">
    <input class="radio" type="radio" :name="group" :id="id" :value="value" v-model="activeRadio" />
    <span class="label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.label__wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.label {
  color: #485159;
  line-height: 1;
  font-size: 1rem;
}

.radio {
  --size: 18px;
  --transition-duration: 250ms;
  --transition-type: ease;

  appearance: none;

  position: relative;
  width: var(--size);
  height: var(--size);
  border: 2px solid #485159;
  border-radius: 99px;
  transition: border-color var(--transition-duration) var(--transition-type);

  &::after {
    --dot-size: 10px;
    --dot-scale: 1;
    content: '';
    position: absolute;
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: 99px;
    background-color: #307714;
    transition: transform var(--transition-duration) var(--transition-type);

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
  }

  &:checked {
    border-color: #307714;

    &::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
}
</style>
