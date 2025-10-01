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

const clearFilters = () => {
 props.options.forEach(option => option.selected = false)
}
</script>

<template>
  <BaseBottomSheet v-bind="{ ...props }" class="bottom-sheet" show-close>
    <div class="filter">
      <ul class="options-list">
        <li v-for="option in options" :key="option.label" class="filter__option">
          <CCheckbox :label="option.label" name="maintenance-filters" v-model="option.selected" />
          <CDivider class="filter__divider" />
        </li>
      </ul>
      <div class="filter__buttons">
        <CButton>Filtrar</CButton>
        <CButton variant="secondary" @click="clearFilters">Limpar filtros</CButton>
      </div>
    </div>
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
    margin-top: -.5rem;
  }
}
</style>
