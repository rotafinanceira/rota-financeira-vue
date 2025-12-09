/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/boot/axios';
import { Car } from '@/shared/types/car';
const baseApi = import.meta.env.VITE_ROTA_API;

export type CarRegisterPayload = {
  userId?: string;
  chassis: string;
  brand?: string;
  model: string;
  license_plate: string;
  year: number;
  color: string;
  fuelType: string;
  current_mileage: number;
};

export type CarUpdatePayload = {
  userId?: string;
  chassis?: string;
  brand?: string;
  model?: string;
  license_plate?: string;
  year?: number;
  color?: string;
  fuel_type?: string;
  current_mileage?: number;
};

export const useCarStore = defineStore('car', () => {
  const cars = ref<Car[]>([]);
  const car = ref<Car | null>(null);
  const error = ref<any | null>(null);
  const isLoading = ref(false);
  const firstLicensePlate = ref<string | null>(null);

  async function registerCar(payload: CarRegisterPayload) {
    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api().post(`${baseApi}/v1/cars`, payload);

      if (data && Object.keys(data).length > 0) {
        car.value = data;
        cars.value.push(data);
      }

      return data;
    } catch (e: any) {
      const errData = e.response?.data || e;
      error.value = errData;

      if (e.response?.status === 409) {
        throw new Error('Um carro com essa placa já está registrado.');
      }
      if (e.response?.status === 400) {
        throw new Error('Dados inválidos. Verifique os campos.');
      }

      throw errData;
    } finally {
      isLoading.value = false;
    }
  }

  async function getCars() {
    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api().get<Car[]>(`${baseApi}/v1/cars`);

      cars.value = data;

      firstLicensePlate.value = data[0]?.license_plate ?? null;

      return data;
    } catch (e: any) {
      error.value = e.response?.data || e;
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
