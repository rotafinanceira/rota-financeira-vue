<template>
  <div class="container">
    <div class="subtitle">{{ subtitle }}</div>
    <div class="wrapperTitle">
      <div @click="handleButtonClick" class="returnButton">
        <q-img :src="backArrow" />
      </div>
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import backArrow from '../assets/backarrow.svg';

const router = useRouter();
const { title, subtitle, path } = defineProps({
  title: String,
  subtitle: String,
  path: String,
});

const handleButtonClick = () => {
  router.push(path);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
}

.subtitle {
  padding: 6px 10px;
  text-align: center;
  color: #5b6871;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.wrapperTitle {
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  padding: 10px;
}

.returnButton {
  width: 24px;
  height: 24px;
  margin-top: 2px;
}

.title {
  text-align: center;
  line-height: 29px;
  font-size: 24px;
  color: #314b39;
  font-weight: 700;
}
</style>
