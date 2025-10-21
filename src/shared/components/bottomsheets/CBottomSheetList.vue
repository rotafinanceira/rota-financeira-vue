<script setup lang="ts">
import { BottomSheetProps, ListOption } from '@/shared/types/bottom-sheet';
import BaseBottomSheet from './BaseBottomSheet.vue';
import CCheckbox from '../CCheckbox.vue';
import CDivider from '../CDivider.vue';
import CButton from '../CButton.vue';

const props = defineProps<
  BottomSheetProps & {
    type: 'filter' | 'action';
    options: ListOption[];
  }
>();

const emit = defineEmits<{
  (e: 'filter', selectedLabels: string[]): void;
  (e: 'action', label: string): void;
}>();

const clearFilters = () => {
  props.options.forEach((option) => (option.selected = false));
};

const applyFilters = () => {
  const selectedLabels = props.options
    .filter((opt) => opt.selected)
    .map((opt) => opt.label);
  emit('filter', selectedLabels);
};

const handleAction = (optionLabel: string) => {
  emit('action', optionLabel);
};
</script>

<template>
  <BaseBottomSheet v-bind="{ ...props }" class="bottom-sheet" show-close>
    <div v-if="props.type === 'filter'" class="filter">
      <ul class="options-list">
        <li
          v-for="option in options"
          :key="option.label"
          class="filter__option"
        >
          <CCheckbox
            :label="option.label"
            name="maintenance-filters"
            v-model="option.selected"
          />
          <CDivider class="filter__divider" />
        </li>
      </ul>
      <div class="filter__buttons">
        <CButton @click="applyFilters">Filtrar</CButton>
        <CButton variant="secondary" @click="clearFilters"
          >Limpar filtros</CButton
        >
      </div>
    </div>

    <ul v-else class="menu-list">
      <li v-for="option in options" :key="option.label" class="menu-list__item">
        <button
          class="menu-list__button"
          :class="{ danger: option.danger }"
          @click="handleAction(option.label)"
        >
          <img
            v-if="option.icon"
            :src="option.icon"
            class="menu-list__icon"
            :class="{ danger: option.danger }"
          />
          <span>{{ option.label }}</span>
        </button>
      </li>
    </ul>
  </BaseBottomSheet>
</template>

<style scoped lang="scss">
.options-list {
  list-style: none;
  padding: 0;
}

.filter {
  &__divider {
    margin-block: 1rem;
  }

  &__buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: -0.5rem;
  }
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    margin-block: 0.75rem;
  }

  &__button {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    border: none;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }
}

.danger {
  color: #e53935;
  filter: invert(31%) sepia(98%) saturate(5882%) hue-rotate(358deg)
    brightness(94%) contrast(107%);
}
</style>
