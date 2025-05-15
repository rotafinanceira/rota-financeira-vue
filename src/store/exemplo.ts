import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

const exempleApi = import.meta.env.VITE_CREDIT_STATICDATA_API;

export const useExemploStore = defineStore('ex', () => {
  async function kkk() {
    try {
      const { data } = await api().get(`${ppp}/exemplo/all`);
      return data;
    } catch (e) {
      return [];
    }
  }


  return {
    kkk,
  };
});
