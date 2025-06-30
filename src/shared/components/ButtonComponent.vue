<template>
  <q-btn
    :label="label"
    :loading="isLoading"
    :disable="isLoading"
    @click="handleButtonClick"
    class="styled-button"
    unelevated
  />
</template>

<script setup>
const { label, isLoading } = defineProps({
  label: String,
  isLoading: Boolean,
});

const emits = defineEmits(['click']);

const handleButtonClick = () => {
  emits('click');
};
</script>

<style scoped>
.styled-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: #8ce95f;
  color: #314b39;
  font-weight: 700;
  text-transform: capitalize;
  font-size: 18px;
}
</style>
