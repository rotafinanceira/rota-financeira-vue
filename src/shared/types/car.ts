export interface LastMileageUpdate {
  mileage: number;
  date: string;
  source: string;
}

export interface Car {
  id: string;
  userId: string;
  year: number;
  model: string;
  license_plate: string;
  current_mileage: number;
  averageDailyMileage: number;
  chassis: string;
  brand: string;
  manufactureYear: number | null;
  color: string;
  fuelType: string;
  registrationDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastMileageUpdate: LastMileageUpdate | null;
}
