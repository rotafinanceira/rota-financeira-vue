<script setup lang="ts">
import maintenance from '@/assets/maintenance';
import { Notification } from '@/pages/Notifications/types';

defineProps<Notification>();
</script>

<template>
  <div :class="['notification', {
    'is-seen': seen,
    'is-danger': status === 'danger',
    'is-warning': status === 'warning'
  }]">
    <div class="notification__icon">
      <img :src="maintenance.battery" alt="" />
    </div>
    <p class="notification__message">{{ message }}</p>
  </div>
</template>

<style scoped lang="scss">
  .notification {
    display: flex;
    align-items: center;
    gap: .5rem;
    background-color: #FFFFFF;
    padding: .625rem;
    border-radius: 0 0 8px 8px;
    position: relative;
    overflow: hidden;
    border-top: 4px solid #3E9C14;

    &__icon {
      display: grid;
      place-items: center;
      background-color: #EFF3F5;
      padding: .3125rem;
      border-radius: .5rem;

      img {
        --size: 28px;

        width: 28px;
        height: 28px;
      }
    }

    &__message {
      font-size: .875rem;
      font-family: "Inter";
      color: #2B5E16;
    }

    // mensagens lidas
    &.is-seen::after {
      content: "";
      position: absolute;
      inset: 0;
      background-color: oklch(.1 .2 210 / .1);
    }

    &.is-danger {
      border-color: #DB3D46;
    }

    &.is-warning {
      border-color: #ffc13a;
    }
  }
</style>
