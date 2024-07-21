<template>
  <q-page padding>
    <div class="container">
      <!-- Logo no topo -->
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>

      <!-- Stepper -->
      <q-stepper
        v-model="currentStep"
        ref="stepper"
        alternative-labels
        color="primary"
        animated
        flat
        bordered="false"
        header-class="custom-header"
      >
        <q-step
          :name="1"
          title="Step 1"
          icon="settings"
          :done="currentStep > 1"
        >
          <!-- Conteúdo do Step 1 -->
          <SignUpStep1 />
        </q-step>

        <q-step
          :name="2"
          title="Step 2"
          icon="create_new_folder"
          :done="currentStep > 2"
        >
          <!-- Conteúdo do Step 2 -->
          <SignUpStep2 />
        </q-step>

        <q-step
          :name="3"
          title="Step 3"
          icon="add_comment"
        >
          <!-- Conteúdo do Step 3 -->
          <SignUpStep3 />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.previous()"
              v-if="currentStep > 1"
              flat
              color="primary"
              label="Back"
            />
            <q-btn
              @click="handleNext"
              v-if="currentStep < 3"
              color="primary"
              :label="currentStep === 3 ? 'Finish' : 'Next'"
            />
          </q-stepper-navigation>
        </template>
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

const handleNext = () => {
  if (currentStep.value === 3) {
    // Finaliza o registro se no último passo
    router.push({ path: '/finalize-registration' });
  } else {
    // Avança para o próximo passo
    currentStep.value++;
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
  margin-bottom: 20px; /* Espaço entre a logo e o stepper */
}

.logo {
  width: 150px; /* Ajuste o tamanho da logo conforme necessário */
}

.stepper {
  width: 100%;
  max-width: 600px; /* Ajuste o tamanho máximo do stepper conforme necessário */
}

.custom-header {
  border-bottom: none; /* Remove a linha de separação no cabeçalho do stepper */
}
</style>
