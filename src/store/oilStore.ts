import { defineStore } from 'pinia';

interface OilState {
  date: string;
  mileage: string;
  oilType: string;
  liters: string;
  oilBrand: string;
  carId: number | null;
  isLoading: boolean;
}

export const useOilStore = defineStore('oil', {
  state: (): OilState => ({
    date: '',
    mileage: '',
    oilType: '',
    liters: '',
    oilBrand: '',
    carId: null,
    isLoading: false,
  }),
  actions: {
    setDate(date: string) {
      this.date = date;
    },
    setMileage(mileage: string) {
      this.mileage = mileage;
    },
    setOilType(oilType: string) {
      this.oilType = oilType;
    },
    setLiters(liters: string) {
      this.liters = liters;
    },
    setOilBrand(oilBrand: string) {
      this.oilBrand = oilBrand;
    },
    setCarId(carId: number | null) {
      this.carId = carId;
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    resetStore() {
      this.$reset();
    },
  },
});
