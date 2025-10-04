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
  selectedMaintenance: OilMaintenance | null;
}

export interface MappedMaintenance {
  id: string;
  date: string;
  km: string;
  price: string;
  service: string;
  oilType: string;
  oilBrand: string | null;
}
