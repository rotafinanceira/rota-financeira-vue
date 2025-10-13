export interface OilMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  oilType: string;
  oilQuantityLt: number;
  oilBrand?: string;
  serviceType: string;
  valor: number;
  status: string;
  oficina?: string;
  nextMaintenanceMileage: number;
}

export interface OilState {
  date: string;
  mileage: string;
  oilType: string;
  oilBrand: string;
  oficina: string;
  serviceType: string;
  carId: number | null;
  isLoading: boolean;
  maintenances: OilMaintenance[];
  isOverdue: boolean;
  nextMaintenanceKm: number | null;
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
