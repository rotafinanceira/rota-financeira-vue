<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { BellIcon, ProfileIcon } from '../assets/icons';
import { LogoOneLine } from '../assets/logos';
import { watch } from 'vue';

const route = useRoute();

watch(route, () => {
  console.log('name: ', route.name);
  console.log('title: ', route.meta.title);
});
</script>

<template>
  <header class="appbar">
    <RouterLink :to="{ name: 'user-profile' }">
      <img :src="ProfileIcon" alt="" />
    </RouterLink>
    <img :src="LogoOneLine" alt="" />
    <RouterLink :to="{ name: 'notifications' }">
      <img :src="BellIcon" alt="" class="appbar__icon" />
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
.appbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1.25rem;

  min-height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #e0e5e7;
}
</style>
