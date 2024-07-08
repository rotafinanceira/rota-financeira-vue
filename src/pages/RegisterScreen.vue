<template>
  <q-page class="register-screen">
    <q-scroll-area style="height: 100vh">
      <div class="container">
        <div class="logo-container">
          <Logo />
        </div>
        <q-stepper v-model="currentStep" class="step-indicator">
          <q-step
            v-for="step in steps"
            :key="step.step"
            :name="step.step"
            :title="step.title"
          >
            <component :is="getStepComponent(step.step)" />
          </q-step>
        </q-stepper>
        <q-btn @click="handleLogin" label="Login" class="login-btn" />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRegisterStore } from '../store/registerStore';
// import Logo from '@/assets/logolight.svg';
import EmailStep from '@/components/EmailStep.vue';
import PersonalInformationStep from '@/components/PersonalInformationStep.vue';
import PasswordStep from '@/components/PasswordStep.vue';

export default defineComponent({
  name: 'RegisterScreen',
  components: {
    // Logo,
    EmailStep,
    PersonalInformationStep,
    PasswordStep,
  },
  setup() {
    const currentStep = ref(useRegisterStore().currentStep);
    const steps = ref([
      { step: 1, title: 'Email' },
      { step: 2, title: 'Personal Information' },
      { step: 3, title: 'Password' },
    ]);

    const getStepComponent = (step: number) => {
      switch (step) {
        case 1:
          return EmailStep;
        case 2:
          return PersonalInformationStep;
        case 3:
          return PasswordStep;
        default:
          return null;
      }
    };

    const handleLogin = () => {
      // Lógica para navegação ao login
    };

    return {
      currentStep,
      steps,
      getStepComponent,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.register-screen {
  padding: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 25px;
  margin-bottom: 40px;
  gap: 30px;
}

.logo-container {
  margin-top: 30px;
  display: flex;
  align-items: center;
}

.step-indicator {
  margin: 10px 0;
}

.login-btn {
  margin-top: 20px;
}
</style>
