<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { BellIcon, ProfileIcon } from '../assets/icons';
import { LogoOneLine } from '../assets/logos';


</script>

<template>
  <header class="appbar">
    <RouterLink to="/profile">
      <img :src="ProfileIcon" alt="">
    </RouterLink>
    <img :src="LogoOneLine" alt="">
    <RouterLink to="/notifications">
      <img :src="BellIcon" alt="" class="appbar__icon">
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
  border-bottom: 1px solid #E0E5E7;
}
</style>
