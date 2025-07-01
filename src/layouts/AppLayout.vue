<script setup lang="ts">
import AppBar from '@/shared/components/AppBar.vue';
import NavBar from '@/shared/components/NavBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <AppBar />
  <router-view />
  <NavBar />
</template>

<style scoped lang="scss"></style>
