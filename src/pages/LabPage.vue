<script setup lang="ts">
import CToggle from '@/shared/components/CToggle.vue';
import CTag from '@/shared/components/CTag.vue';
import { ref } from 'vue';
import {
  MoneyCircleIcon,
  WheelIcon,
  LocationIcon,
  CalendarIcon,
} from '@/shared/assets/icons';

const isChecked = ref(false);
</script>

<template>
  <div class="lab app-wrapper">
    <div class="container">
      <CTag :icon="CalendarIcon" variant="dark">Terça, 1 out. 2025</CTag>
      <CTag variant="light">150.076km</CTag>
      <CTag :icon="MoneyCircleIcon" variant="error">R$ 100,00</CTag>
      <CTag :icon="WheelIcon" variant="dark">Todas</CTag>
      <CTag :icon="LocationIcon" variant="alert">Seu Zé manutenções</CTag>
    </div>

    <CToggle v-model="isChecked" @click="isChecked = !isChecked" />
  </div>
</template>

<script></script>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.lab {
  display: grid;
  justify-content: center;
  align-content: center;
  gap: 1rem;
  min-height: $screen;
}

.container {
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>
