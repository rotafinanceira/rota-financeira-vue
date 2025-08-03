<template>
  <span :class="['custom-tag', variantClass]" type="button">
    <span>{{ props.title }}</span>

    <img v-if="icon" :src="props.icon" />

    <img v-if="props.removable" :src="XCircleIcon" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { XCircleIcon } from '../assets/icons';

type Variant = 'default' | 'outlined' | 'error' | 'alert';

interface BaseProps {
  variant?: Variant;
  title: string;
}

interface IconCTagProps extends BaseProps {
  icon?: string;
  removable?: boolean;
}

interface RemovableOnlyCTagProps extends BaseProps {
  removable: true;
  icon?: undefined;
}

type CTagProps = IconCTagProps | RemovableOnlyCTagProps;

const props = withDefaults(defineProps<CTagProps>(), {
  variant: 'default',
});

const variantClass = computed(() => `tag--${props.variant}`);
</script>

<style scoped>
.custom-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  border-radius: 100px;
  white-space: nowrap;
  padding: 4px 8px;
  gap: 8px;
  font-size: 0.75rem;
  color: #0c0d0f;
}

/* Variantes */
.tag--default {
  background-color: #e0e5e7;
}

.tag--outline {
  background-color: transparent; /*ou white*/
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
