import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    name: '',
    surname: '',
    day: '',
    month: '',
    year: '',
    currentStep: 0,
    hasInteracted: false,
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  }),
  actions: {
    setName(name: string) {
      this.name = name;
    },
    setSurname(surname: string) {
      this.surname = surname;
    },
    setDay(day: string) {
      this.day = day;
    },
    setMonth(month: string) {
      this.month = month;
    },
    setYear(year: string) {
      this.year = year;
    },
    setCurrentStep(step: number) {
      this.currentStep = step;
    },
    setHasInteracted(interacted: boolean) {
      this.hasInteracted = interacted;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setConfirmEmail(confirmEmail: string) {
      this.confirmEmail = confirmEmail;
    },
    setPassword(password: string) {
      this.password = password;
    },
    setConfirmPassword(confirmPassword: string) {
      this.confirmPassword = confirmPassword;
    },
  },
});
