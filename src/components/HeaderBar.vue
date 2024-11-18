<template>
  <div class="container">
    <div class="subtitle">{{ subtitle }}</div>
    <div class="wrapperTitle">
      <div @click="handleButtonClick" class="returnButton">
        <q-img :src="backArrow" />
      </div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="info-car">
      <div class="car-image-wrapper">
        <img src="src/assets/Ellipse53.png" alt="Brand Icon" class="car-image" />
      </div>
      <div class="car-details">
        <div class="car-label">Meu carro</div>
        <div class="car-name">Jeep Compass</div>
      </div>
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

.info-car {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-top: 1px solid #e0e0e0;
}

.car-image-wrapper {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.car-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

  .car-label {
    font-size: 14px;
    color: #5b6871;
  }

.car-name {
  font-size: 18px;
  font-weight: 700;
  color: #314b39;
}

</style>
