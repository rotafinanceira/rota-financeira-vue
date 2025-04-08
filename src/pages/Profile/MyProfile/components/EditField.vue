<template>
  <section class="edit-content">
    <h2 class="edit-title">{{ title }}</h2>
    <p class="edit-description">{{ description }}</p>
    <div class="edit-card">
      <slot class="edit-field"></slot>
    </div>
    <button class="btn-salvar" @click="updateValue">Salvar</button>
    <AppFooter />
  </section>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';

const { title, description, updateValue } = defineProps<{
  title: string;
  description: string;
  updateValue: (event: MouseEvent) => void;
}>();
</script>

<style scoped lang="scss">

.edit {
  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
  }

  &-title {
    color: #0C0D0F;
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0;
    line-height: normal;
  }

  &-description {
    color: #485159;
    font-size: 0.75rem;
    margin-top: .25rem;
  }

  &-card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #E0E5E7;
    border-radius: 8px;
  }
}

:deep(.edit-label) {
  font-size: 1rem;
  font-weight: 500;

  &.disabled {
    color: #9BA7AD;
  }
}

:deep(.input-wrapper) {
  position: relative;

  &::after {
    content: "";
    border-radius: 4px;
    position: absolute;
    transform: scaleX(0.95) scaleY(0.85);
    inset: 0;
    opacity: 0;
    transition:
      opacity 150ms ease,
      transform 150ms ease;
    box-shadow: 0px 0px 0px 4px rgba(78, 78, 221, 0.24);
  }

  &:focus-within::after {
    transform: scale(1);
    opacity: 1;
  }
}

:deep(.edit-input) {
  color: #5B6871;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #C2C9CD;
  padding: 0.75rem;
  padding-left: 1rem;
  outline: none;
  font-size: 1rem;

  // Necessário para esconder a borda azul
  position: relative;
  z-index: 5;

  &:focus-within {
    border: 1px solid #1D6CDB;
  }

  &.disabled {
    color: #9BA7AD;
  }
}

:deep(.edit-label + .edit-label) {
  margin-top: 1.25rem;
}

.btn-salvar {
  color: #2B5E16;
  background-color: #8CE95F;

  margin-top: 5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
