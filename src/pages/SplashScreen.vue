<template>
  <transition name="fade">
    <div class="introduction-page app-wrapper" v-if="showPage">
      <div class="logo">
        <img :src="logo" alt="Logo" />
        <div class="logo-text">
          <span class="bold-text">Rota</span>
          <br />
          <span>Financeira</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/shared/assets/logos/logo.svg';

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
  height: $screen;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
}

.logo img {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.logo-text {
  color: var(--Cores-Primria-800, #245017);
  font-size: 1.57rem;
  font-style: italic;
  font-weight: 500;
  line-height: 100%;
  flex-shrink: 0;
}

.bold-text {
  font-weight: 700;
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
