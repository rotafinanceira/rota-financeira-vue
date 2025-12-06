export interface FuelFilterMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  valor: number;
  status: string;
  oficina?: string | null;
  nextMaintenanceMileage: number;
}

export interface FuelFilterState {
  date: string;
  mileage: string;
  oficina: string | null;
  carId: number | null;
  isLoading: boolean;
  maintenances: FuelFilterMaintenance[];
  isOverdue: boolean;
  nextMaintenanceKm: number | null;
  selectedMaintenance: FuelFilterMaintenance | null;
}

export interface MappedMaintenance {
  id: string;
  date: string;
  km: string;
  price: string;
  oficina: string;
}

export interface FuelFilterPayload {
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  valor: number;
  oficina: string | null;
}
