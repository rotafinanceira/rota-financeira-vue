<script setup lang="ts">

defineProps<{
  text?: string;
}>();
</script>

<template>
  <hr v-if="!text" />
  <div v-else class="divider with-text">
    <hr>
    <p class="divider__text">{{ text }}</p>
    <hr>
  </div>
</template>

<style scoped lang="scss">
// TODO: decidir e aplicar a cor do divisor
hr {
  width: 100%;
  border: none;
  border-top: 1px solid #e0e5e7;
  margin: 0;
}

.divider {

  &.with-text {
    display: flex;
    align-items: center;
    gap: .5rem;
    width: 100%;
    color: #485159;

    hr {
      border-color: #485159;
    }
  }

  &__text{
    color: #485159;
    white-space: nowrap;
  }
}
</style>
