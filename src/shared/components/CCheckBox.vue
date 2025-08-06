<script setup lang="ts">
const isChecked = defineModel({ default: false });
</script>

<template>
  <input class="check-box" type="checkbox" v-model="isChecked" />
</template>

<style scoped lang="scss">
.check-box {
  appearance: none;
  border: 2px solid #485159;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s, border-color 0.2s;

  &:checked {
    background-color: #307714;
    border-color: #307714;
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    border-radius: 1px;
  }
}
</style>
