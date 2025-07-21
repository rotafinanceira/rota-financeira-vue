<script setup lang="ts">

const isChecked = defineModel({ default: false });
</script>

<template>
  <input class="toggle" type="checkbox" :checked="isChecked">
</template>



<style scoped lang="scss">
.toggle {
  --toggle-disabled: #485159;
  --toggle-enabled: #307714;
  --transition-type: ease-out;
  --transition-time: 200ms;
  appearance: none;
  border: 2px solid var(--toggle-disabled);
  border-radius: 99px;
  width: 24px;
  height: 16px;
  position: relative;
  transition: border-color var(--transition-time) var(--transition-type);

  &::after {
    --size: 8px;
    content: '';

    width: var(--size);
    height: var(--size);
    position: absolute;
    left: 2px;
    top: 2px;

    border-radius: 99px;
    background-color: var(--toggle-disabled);
    transition:
      background-color var(--transition-time) var(--transition-type),
      transform var(--transition-time) var(--transition-type);
  }

  &:checked {
    border-color: var(--toggle-enabled);
    &::after {
      background-color: var(--toggle-enabled);

      transform: translateX(100%);
    }
  }
}
</style>
