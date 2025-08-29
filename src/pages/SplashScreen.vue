<template>
  <transition name="fade">
    <div class="introduction-page" v-if="showPage">
      <img :src="LogoTwoLines" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { LogoTwoLines } from '@/shared/assets/logos';

const router = useRouter();
const showPage = ref(true);

onMounted(() => {
  setTimeout(() => {
    showPage.value = false;
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }, 3000);
});
</script>

<style scoped lang="scss">
@use '../css/variables.scss' as *;

.introduction-page {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100svh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
