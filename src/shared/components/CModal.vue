<template>
  <q-dialog v-model="showDialog">
    <div class="dialog-container">
      <button
        class="close-button"
        v-if="props.showClose"
        @click="showDialog = false"
      >
        <img :src="XCircleIcon" alt="Fechar" />
      </button>

      <div class="dialog-content">
        <div class="main-icon">
          <img :src="selectedIcon" :alt="props.iconName || 'ícone'" />
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
  check: ModalCheckIcon,
  error: ModalErrorIcon,
} as const;

type IconName = keyof typeof iconMap;

const props = defineProps<{
  showClose?: boolean;
  iconName?: IconName;
}>();

const selectedIcon = computed(() =>
  props.iconName ? iconMap[props.iconName] : iconMap.check
);

const showDialog = defineModel<boolean>({ default: false });
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
}

.dialog-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 32px;
}
.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
  border: none;
}

:deep(h2) {
  font-weight: 600;
  font-size: 1.125rem;
}

:deep(p) {
  font-size: 1rem;
  color: #485159;
}

:deep(.group) {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.main-icon {
  display: flex;
  justify-content: center;

  img {
    padding: 2px;
    width: 44px;
    height: 44px;
  }
}
</style>
