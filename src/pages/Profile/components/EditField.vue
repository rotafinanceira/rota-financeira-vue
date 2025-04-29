<template>
  <form @submit.prevent="updateValue" class="edit__content">
    <h2 class="edit__title">{{ title }}</h2>
    <p class="edit__description">{{ description }}</p>
    <div class="edit__card">
      <slot class="edit__field"></slot>
    </div>
    <button class="edit__button" type="submit">Salvar</button>
    <AppFooter />
  </form>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';

const { title, description, updateValue } = defineProps<{
  title: string;
  description: string;
  updateValue: (payload: Event) => void;
}>();
</script>

<style scoped lang="scss">
.edit {
  --footer-bar-size: 72px;

  &__content {
    display: flex;
    flex-direction: column;
    min-height: calc(100svh - var(--footer-bar-size));
    padding: 1rem;
  }

  &__title {
    color: #0c0d0f;
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0;
    line-height: normal;
  }

  &__description {
    color: #485159;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  &__card {
    display: flex;
    flex-direction: column;
    margin: 1rem 0 0.875rem;
    padding: 1rem;
    border: 1px solid #e0e5e7;
    border-radius: 8px;
  }

  &__button {
    color: #2b5e16;
    background-color: #8ce95f;

    margin-top: auto;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }
}

:deep(.edit__label) {
  font-size: 1rem;
  font-weight: 500;

  &.disabled {
    color: #9ba7ad;
  }
}

:deep(.input-wrapper) {
  position: relative;

  &::after {
    content: '';
    border-radius: 4px;
    position: absolute;
    transform: scaleX(0.95) scaleY(0.85);
    inset: 0;
    opacity: 0;
    transition: opacity 150ms ease, transform 150ms ease;
    box-shadow: 0px 0px 0px 4px rgba(78, 78, 221, 0.24);
  }

  &:focus-within::after {
    transform: scale(1);
    opacity: 1;
  }
}

:deep(.edit__input) {
  color: #5b6871;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #c2c9cd;
  padding: 0.75rem;
  padding-left: 1rem;
  outline: none;
  font-size: 1rem;

  // Necessário para esconder a borda azul
  position: relative;
  z-index: 5;

  &:focus-within {
    border: 1px solid #1d6cdb;
  }

  &.disabled {
    color: #9ba7ad;
  }
}

:deep(.edit__label + .edit__label) {
  margin-top: 1.25rem;
}
</style>
