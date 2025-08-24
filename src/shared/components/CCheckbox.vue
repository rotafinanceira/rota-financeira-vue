<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label: string;
  disabled?: boolean;
  name?: string;
  value?: string | number;
}>();

const isChecked = defineModel({
  type: Boolean,
  default: false,
});
</script>

<template>
  <label class="label__wrapper">
    <input
      class="check-box"
      type="checkbox"
      v-model="isChecked"
      :disabled="props.disabled"
      :name="props.name"
      :value="props.value"
    />
    <span class="label">{{ label }}</span>
  </label>
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
    left: 50%;
    top: calc(50% - 1px);
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 1px;
  }
}

.label__wrapper {
  display: flex;
  align-items: center;
  line-height: 1;
  gap: 1rem;
}

.label {
  font-size: .875rem;
  font-weight: 500;
}
</style>
