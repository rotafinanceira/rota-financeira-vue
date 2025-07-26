<template>
  <q-dialog v-model="showDialog">
    <div :class="['dialog-container', variantClass]">
      <button
        class="close-button"
        v-if="props.showClose"
        @click="showDialog = false"
      >
        <img :src="XCircleIcon" alt="Fechar" />
      </button>

      <div class="dialog-content">
        <div v-if="selectedIcon" class="dialog__icon-wrapper">
          <img :src="selectedIcon" alt="" />
        </div>
        <slot />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { XCircleIcon } from '../assets/icons';
import { computed } from 'vue';
import {
  ModalAlertIcon,
  ModalCheckIcon,
  ModalErrorIcon,
} from '../assets/icons';

const iconMap = {
  alert: ModalAlertIcon,
  success: ModalCheckIcon,
  error: ModalErrorIcon,
} as const;

type IconName = keyof typeof iconMap;
type Variant = 'default' | 'info';

const props = withDefaults(
  defineProps<{
    showClose?: boolean;
    icon?: IconName;
    variant?: Variant;
  }>(),
  {
    showClose: true,
    variant: 'default',
  }
);

const selectedIcon = computed(
  () => (props.icon && iconMap[props.icon]) || undefined
);

const showDialog = defineModel<boolean>({ default: false });

const variantClass = computed(() => `dialog-${props.variant}`);
</script>

<style scoped>
.dialog-container {
  width: 320px;
  background: white;
  border-radius: 8px;
  padding: 24px;
  position: relative;
  border: 1px solid #e0e5e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #485159;

  :deep(h2) {
    font-weight: 600;
    font-size: 1.125rem;
  }

  :deep(.group) {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
}

.dialog-content {
  display: flex;
  flex-direction: column;
}
.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
  border: none;
}

.dialog-default {
  .dialog-content {
    gap: 32px;
    text-align: center;
  }

  .dialog__icon-wrapper {
    display: flex;
    justify-content: center;

    img {
      width: 44px;
      height: 44px;
    }
  }
}

.dialog-info {
  :deep(h2) {
    text-align: left;
    font-size: 1rem;
  }

  .dialog-content {
    gap: 24px;
  }

  :deep(ul) {
    margin: 0;
    padding: 0 24px;
  }

  :deep(li) {
    font-weight: 400;
    font-size: 0.875rem;
  }
}
</style>
