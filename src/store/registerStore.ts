// src/store/registerStore.ts

import { defineStore } from 'pinia';

interface RegisterStoreState {
  currentStep: number;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  personalInfo: { /* Defina aqui os tipos para personalInfo */ };
}

export const useRegisterStore = defineStore('register', {
  state: (): RegisterStoreState => ({
    currentStep: 1,
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    personalInfo: { /* Inicialize conforme necessário */ },
  }),

  actions: {
    setCurrentStep(step: number) {
      this.currentStep = step;
    },
    // Outras ações necessárias
  },
});
