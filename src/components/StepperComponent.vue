<template>
  <div class="stepper-wrapper">
    <div>
      <q-img v-if="step === 1" :src="stepActived" class="stepActived" />
      <q-img v-if="step === 2" :src="stepCompleted" class="stepCompleted" />
      <q-img v-if="step === 3" :src="stepCompleted" class="stepCompleted" />
    </div>
    <div>
      <q-img v-if="step === 1" :src="dotedLine" class="dotedLine" />
      <q-img v-if="step === 2" :src="continuosLine" class="continuosLine" />
      <q-img v-if="step === 3" :src="continuosLine" class="continuosLine" />
    </div>
    <div>
      <q-img v-if="step === 1" :src="stepDisabled" class="stepDisabled" />
      <q-img v-if="step === 2" :src="stepActived" class="stepActived" />
      <q-img v-if="step === 3" :src="stepCompleted" class="stepCompleted" />
    </div>
    <div>
      <q-img
        v-if="step === 1"
        :src="continuosLineDisabled"
        class="continuosLineDisabled"
      />
      <q-img v-if="step === 2" :src="dotedLine" class="dotedLine" />
      <q-img v-if="step === 3" :src="continuosLine" class="continuosLine" />
    </div>
    <div>
      <q-img v-if="step === 1" :src="stepDisabled" class="stepDisabled" />
      <q-img v-if="step === 2" :src="stepDisabled" class="stepDisabled" />
      <q-img v-if="step === 3" :src="stepActived" class="stepActived" />
    </div>
  </div>
</template>

<script setup>
import continuosLine from '../assets/CompleteSeparator.svg';
import dotedLine from '../assets/ActivedSeparator.svg';
import continuosLineDisabled from '../assets/ContinuosLineDisabled.svg';
import stepActived from '../assets/Status=Actived.svg';
import stepCompleted from '../assets/Status=Completed.svg';
import stepDisabled from '../assets/Status=Disabled.svg';

defineProps({
  step: Number,
});
</script>

<style scoped>
.stepper-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: auto;
}

.stepActived,
.stepDisabled,
.stepCompleted {
  width: 32px;
}

.dotedLine,
.continuosLine,
.continuosLineDisabled {
  width: 60px;
}
</style>
