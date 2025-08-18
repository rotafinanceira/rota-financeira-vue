<template>
  <button
    :class="['tag', variantClass]"
    :disabled="!removable"
    @click="onRemove"
  >
    <span class="tag__title">{{ title }}</span>

    <img v-if="currentIcon" :src="currentIcon" class="tag__icon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { XCircleIcon } from '../assets/icons';
import type { TagProps } from '../types/tag';

const props = withDefaults(
  defineProps<TagProps>(),
  {
    variant: 'default',
    removable: false,
  }
);

const variantClass = computed(() => `tag--${props.variant}`);

const emit = defineEmits<{
  (e: 'remove', id: number): void;
}>();

const onRemove = () => {
  emit('remove', props.id);
};

const currentIcon = computed(() =>
  props.removable ? XCircleIcon : props.icon
);
</script>

<style scoped lang="scss">
.tag {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  height: 22px;
  cursor: pointer;
  border-radius: 100px;
  white-space: nowrap;
  padding: 4px 8px;
  gap: 8px;
  font-size: 0.75rem;
  color: #0c0d0f;

  &__remove,
  &__icon {
    width: 12px;
    height: 12px;
  }
}

.tag--default {
  background-color: #e0e5e7;
}

.tag--outline {
  background-color: transparent;
  border: 2px solid #e0e5e7;
}

.tag--error {
  background-color: #ed4647;
  color: white;
}

.tag--alert {
  background-color: #f4ae35;
}
</style>
