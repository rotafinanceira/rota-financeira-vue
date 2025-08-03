<script setup lang="ts">
import CToggle from '@/shared/components/CToggle.vue';
import CTag from '@/shared/components/CTag.vue';
import { ref } from 'vue';
import { WheelIcon, LocationIcon, CalendarIcon } from '@/shared/assets/icons';

const isChecked = ref(false);

const tags = ref([
  {
    id: 1,
    title: 'Sexta, 4 out. 2025',
    removable: true,
  },
  {
    id: 2,
    title: 'Tecfil',
    removable: true,
  },
]);

const handleRemove = (id: number) => {
  tags.value = tags.value.filter((tag) => tag.id !== id);
};
</script>

<template>
  <div class="lab app-wrapper">
    <div class="container">
      <CTag :icon="CalendarIcon" title="Terça, 1 out. 2025" variant="default" />
      <CTag :icon="WheelIcon" title="R$ 100,00" variant="outline" />
      <CTag :icon="LocationIcon" title="Terça, 1 out. 2025" variant="error" />
    </div>
    <div class="container">
      <CTag
        v-for="tag in tags"
        :key="tag.id"
        :title="tag.title"
        :removable="tag.removable"
        @remove="handleRemove(tag.id)"
      />
    </div>

    <CToggle v-model="isChecked" @click="isChecked = !isChecked" />
  </div>
</template>

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
