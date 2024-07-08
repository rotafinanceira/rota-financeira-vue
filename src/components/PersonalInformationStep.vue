<template>
  <div>
    <!-- Component content for personal information step -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRegisterStore } from '../store/registerStore';

export default defineComponent({
  name: 'PersonalInformationStep',
  setup() {
    const store = useRegisterStore();
    const personalInfo = ref(store.personalInfo);

    const validateStep = () => {
      // Lógica de validação para PersonalInformationStep
      store.setCurrentStep(store.currentStep + 1);
    };

    return {
      personalInfo,
      validateStep,
    };
  },
});
</script>

<style scoped>
</style>
