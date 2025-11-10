<script setup lang="ts">
import CDivider from '@/shared/components/CDivider.vue';
type HistoryCardProps = {
  variant: 'expired' | 'pending';
  value: number;
  maintenances: {
    icon: keyof MaintenanceIcons;
    title: string;
    description: string;
  }[];
};
import MaintenanceItem from '@/shared/components/MaintenanceItem.vue';
import { MaintenanceIcons } from '@/shared/types/maintenance';

const props = defineProps<HistoryCardProps>();
</script>

<template>
  <div class="card">
    <h3 class="card__title">
      {{
        props.variant === 'expired'
          ? 'Manuntenções vencidas'
          : 'Próximas manuntenções'
      }}
    </h3>
    <div class="card__info">
      <div class="card__info-header">
        <p class="card__desc">
          {{ props.value }}

          {{
            props.variant === 'expired'
              ? 'manutenções vencidas'
              : 'manutenções estão próximas'
          }}
        </p>
        <router-link
          :to="{ name: 'maintenances' }"
          :class="['see-all', props.variant === 'expired' ? 'red' : 'green']"
        >
          Ver todas
        </router-link>
      </div>
      <CDivider class="divider" />
    </div>

    <div class="card__maintenances">
      <MaintenanceItem
        v-for="m in props.maintenances"
        :key="m.icon"
        v-bind="m"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background: #fff;
  padding: 1rem;
  border: 1px solid #e0e5e7;
  border-radius: 8px;
  color: #485159;

  &__title {
    font-weight: 600;
  }

  &__info {
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      justify-content: space-between;
    }
  }

  &__desc {
    font-size: 0.75rem;
    color: #485159;
    font-weight: 500;
  }

  &__maintenances {
    display: grid;
    gap: 1rem;
  }
}

.divider {
  margin-top: 0.5rem;
}

.see-all {
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.red {
  color: #d63c3c;
}

.green {
  color: #2b9d3f;
}
</style>
