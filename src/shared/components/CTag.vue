<template>
  <span :class="['tag', variantClass]" @click="removable && onRemove()">
    <span class="tag__title">{{ title }}</span>

    <img v-if="icon" :src="icon" class="tag__icon" />

    <button v-if="removable">
      <img :src="XCircleIcon" className="tag__remove" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { XCircleIcon } from '../assets/icons';

type Variant = 'default' | 'outline' | 'error' | 'alert';

const props = withDefaults(
  defineProps<{
    id: number;
    variant?: Variant;
    icon?: string;
    title: string;
    removable?: boolean;
  }>(),
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
    height: 12ox;
  }
}

/* Variantes */
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
