<template>
  <transition name="fade">
    <div class="introduction-page" v-if="showPage">
      <div class="logo">
        <img :src="logo" alt="Logo" />
        <div class="logo-text">
          <span class="bold-text">Rota</span>Financeira
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
      router.push('/signup');
    }, 2000);
  }, 3000);
});
</script>

<style scoped>
.introduction-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 343px;
  bottom: 386px;
  left: 65px;
}

.logo img {
  width: 30.259px;
  height: 27px;
  flex-shrink: 0;
}

.logo-text {
  color: var(--Cores-Primria-800, #245017);
  font-size: 28.131px;
  font-style: italic;
  font-weight: 400;
  line-height: 21.098px;
  letter-spacing: -0.309px;
  width: 196.795px;
  height: 20.338px;
  flex-shrink: 0;
}

.bold-text {
  font-weight: bold;
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
