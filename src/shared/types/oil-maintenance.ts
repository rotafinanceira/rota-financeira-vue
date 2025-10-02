export interface OilMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  oilType: string;
  oilQuantityLt: number;
  oilBrand?: string;
  filterChanged?: boolean;
  valor: number;
  oficina?: string;
}

export interface OilState {
  date: string;
  mileage: string;
  oilType: string;
  liters: string;
  oilBrand: string;
  carId: number | null;
  isLoading: boolean;
  maintenances: OilMaintenance[];
}
