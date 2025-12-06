/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { api } from '@/boot/axios';

const baseApi = import.meta.env.VITE_ROTA_API;

export const useRegisterStore = defineStore('register', {
  state: () => ({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: '',
    day: '',
    month: '',
    year: '',
    phone: '',
  }),
  actions: {
    async verifyEmail(email: string) {
      try {
        const { data } = await api().post(`${baseApi}/v1/user/verify`, {
          email,
        });
        return data;
      } catch (e: any) {
        throw e.response?.data || e;
      }
    },

    async registerUser(payload: {
      name: string;
      lastName: string;
      birthday: string;
      email: string;
      phone: string;
      password: string;
    }) {
      try {
        const { data } = await api().post(`${baseApi}/v1/user`, payload);
        return data;
      } catch (e: any) {
        throw e.response?.data || e;
      }
    },

    async login(payload: { email: string; password: string }) {
      try {
        const { data } = await api().post(`${baseApi}/v1/login`, payload);
        // Salva o token JWT no localStorage para uso automático pelo Axios
        if (data?.token) {
          localStorage.setItem('jwt', data.token);
          console.log('[Auth] JWT salvo no localStorage:', data.token);
        }
        return data;
      } catch (e: any) {
        throw e.response?.data || e;
      }
    },

    googleLogin() {
      // Usar a URL completa da API definida nas variáveis de ambiente
      // Isso funciona tanto em dev (direto no backend) quanto em prod

      const url = `${baseApi}/v1/user/google`;
      window.location.href = url;
    },

    setSession(token: string) {
      localStorage.setItem('jwt', token);
    },

    async updateUser(payload: {
      name?: string;
      lastName?: string;
      birthday?: string;
      email?: string;
      phone?: string;
      currentPassword?: string;
      newPassword?: string;
    }) {
      try {
        const { data } = await api().patch(
          `${baseApi}/v1/user/update`,
          payload
        );
        return data;
      } catch (e: any) {
        throw e.response?.data || e;
      }
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
    setName(name: string) {
      this.name = name;
    },
    setLastName(lastName: string) {
      this.lastName = lastName;
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
    setPhone(phone: string) {
      this.phone = phone;
    },
    resetStore() {
      this.email = '';
      this.confirmEmail = '';
      this.password = '';
      this.confirmPassword = '';
      this.name = '';
      this.lastName = '';
      this.day = '';
      this.month = '';
      this.year = '';
      this.phone = '';
    },
  },
});
