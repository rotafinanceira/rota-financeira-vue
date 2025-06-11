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
import backArrow from '@/assets/backarrow.svg';

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
  color: var(--Cores-Primria-700, #2b5e16);

  font-size: var(--Tipo-Tamanho-Xl, 20px);
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
  letter-spacing: -0.4px;
  text-align: center;
  padding: 6px 10px;
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
</style>
