<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ArrowIcon, BellIcon, ProfileIcon } from '../assets/icons';
import { LogoOneLine } from '../assets/logos';

defineProps<{ showLogo?: boolean }>();

const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <header class="appbar">
    <!-- Appbar de superfície -->
    <template v-if="!route.meta.title && !showLogo">
      <RouterLink :to="{ name: 'user-profile' }">
        <img :src="ProfileIcon" alt="" />
      </RouterLink>
      <img :src="LogoOneLine" alt="" />
      <RouterLink :to="{ name: 'notifications' }">
        <img :src="BellIcon" alt="" />
      </RouterLink>
    </template>

    <!-- Appbar de rotas profundas -->
    <template v-else>
      <button @click="goBack" class="appbar__return">
        <img :src="ArrowIcon" alt="" />
      </button>
      <img v-if="showLogo" :src="LogoOneLine" alt="" />
      <span class="appbar__title" v-else-if="route.meta.title">
        {{ route.meta.title }}
      </span>
      <RouterLink :to="{ name: 'notifications' }" class="appbar__notification">
        <img :src="BellIcon" alt="" />
      </RouterLink>
    </template>
  </header>
</template>

<style scoped lang="scss">
.appbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1.25rem;
  margin-bottom: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;

  min-height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #e0e5e7;

  &__title {
    color: #307714;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.4px;
    line-height: 120%;
  }

  &__notification {
    visibility: hidden;
  }

  &__return {
    transform: rotate(-90deg);
    cursor: pointer;
  }
}
</style>
