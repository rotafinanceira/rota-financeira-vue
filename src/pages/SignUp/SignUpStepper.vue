<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>

      <q-stepper
        v-model="currentStep"
        ref="stepper"
        alternative-labels
        done-color="green"
        active-color="green"
        inactive-color="invisible"
        animated
        flat
        :bordered="false"
        header-class="custom-header"
      >
        <q-step
          :name="1"
          title="Step 1"
          icon="settings"
          :done="currentStep > 1"
        >
          <SignUpStep1 @next-step="handleNextStep"/>
        </q-step>

        <q-step
          :name="2"
          title="Step 2"
          icon="create_new_folder"
          :done="currentStep > 2"
        >
          <SignUpStep2 @next-step="handleNextStep" @previous-step="handlePreviousStep"/>
        </q-step>

        <q-step
          :name="3"
          title="Step 3"
          icon="add_comment"
          :done="currentStep >= 3"
        >
          <SignUpStep3 @next-step="handleNextStep" @previous-step="handlePreviousStep"/>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SignUpStep1 from './SignUpStep1.vue';
import SignUpStep2 from './SignUpStep2.vue';
import SignUpStep3 from './SignUpStep3.vue';
import logo from '../../assets/logolight.svg';

const router = useRouter();
const currentStep = ref(1);

const handleNextStep = () => {
  if (currentStep.value === 3) {
    router.push('/home'); // Certifique-se de que a rota está correta
  } else {
    currentStep.value++;
  }
};

const handlePreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 150px;
}

.stepper {
  width: 100%;
  max-width: 600px;
}

.custom-header {
  border-bottom: none;
}
</style>
