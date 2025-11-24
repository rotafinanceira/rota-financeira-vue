export interface AirFilterMaintenance {
  id: string;
  lastChangedDate: string;
  lastCleandDate: string;
  lastMaintenanceKm: number;
  valor: number;
  status: string;
  oficina?: string | null;
  nextMaintenanceMileage: number;
}

export interface AirFilterState {
  date: string;
  mileage: string;
  oficina: string | null;
  carId: number | null;
  isLoading: boolean;
  maintenances: AirFilterMaintenance[];
  isOverdue: boolean;
  nextMaintenanceKm: number | null;
  selectedMaintenance: AirFilterMaintenance | null;
}

export interface MappedMaintenance {
  id: string;
  date: string;
  km: string;
  price: string;
  oficina: string;
}

export interface AirFilterPayload {
  lastCleanedDate: string;
  lastChangedDate: string;
  lastMaintenanceKm: number;
  valor: number;
  oficina: string | null;
}
