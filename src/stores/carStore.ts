/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/boot/axios';
const baseApi = import.meta.env.VITE_ROTA_API;

export type CarRegisterPayload = {
  year: number;
  model: string;
  license_plate: string;
  current_mileage: number;
};

export type CarUpdatePayload = {
  userId?: string;
  year?: number;
  model?: string;
  license_plate?: string;
};

export const useCarStore = defineStore('car', () => {
  const cars = ref<any[]>([]);
  const car = ref<any | null>(null);
  const error = ref<any | null>(null);
  const isLoading = ref(false);
  const firstLicensePlate = ref<string | null>(null);

  async function registerCar(payload: CarRegisterPayload) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api().post(`${baseApi}/v1/cars`, payload);
      return data;
    } catch (e: unknown) {
      const err = e as any;
      error.value = err.response?.data || err;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  async function getCars() {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api().get(`${baseApi}/v1/cars`);
      cars.value = data;
      if (Array.isArray(data) && data.length > 0) {
        firstLicensePlate.value = data[0].license_plate || null;
      } else {
        firstLicensePlate.value = null;
      }
      return data;
    } catch (e: unknown) {
      const err = e as any;
      error.value = err.response?.data || err;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  async function getCarByPlate(license_plate: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api().get(`${baseApi}/v1/cars/${license_plate}`);
      car.value = data;
      return data;
    } catch (e: unknown) {
      const err = e as any;
      error.value = err.response?.data || err;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateCar(license_plate: string, payload: CarUpdatePayload) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api().patch(
        `${baseApi}/v1/cars/${license_plate}`,
        payload
      );
      car.value = data;
      return data;
    } catch (e: unknown) {
      const err = e as any;
      error.value = err.response?.data || err;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateCarMileage(
    license_plate: string,
    current_mileage: number
  ) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api().patch(
        `${baseApi}/v1/cars/${license_plate}/mileage`,
        { current_mileage }
      );
      car.value = data;
      return data;
    } catch (e: unknown) {
      const err = e as any;
      error.value = err.response?.data || err;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    cars,
    car,
    error,
    isLoading,
    firstLicensePlate,
    registerCar,
    getCars,
    getCarByPlate,
    updateCar,
    updateCarMileage,
  };
});
