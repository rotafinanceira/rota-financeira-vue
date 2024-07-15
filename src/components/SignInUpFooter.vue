<template>
  <div class="view">
    <span>{{ message }}</span>
    <q-btn flat @click="handleButtonClick" class="button">
      {{ buttonText }}
    </q-btn>
  </div>
</template>

<script setup>
const { message, buttonText } = defineProps({
  message: String,
  buttonText: String,
});

const emits = defineEmits(['click']);

const handleButtonClick = () => {
  emits('click');
};
</script>

<style scoped>
.view {
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: #737578;
  justify-content: center;
  margin-top: 8px;
}

.button {
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #4140c2;
  font-weight: 700;
  padding-left: 4px;
}
</style>
