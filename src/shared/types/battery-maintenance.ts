export interface BatteryMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  voltage: string;
  amperage: string;
  BatteryQuantityLt: number;
  valor: number;
  status: string;
  batteryBrand?: string | null;
  nextMaintenanceMileage: number;
  oficina: string | null;
}

export interface BatteryState {
  date: string;
  mileage: string | null;
  voltage: string;
  amperage: string;
  brand: string;
  carId: number | null;
  isLoading: boolean;
  maintenances: BatteryMaintenance[];
  isOverdue: boolean;
  nextMaintenanceKm: number | null;
  selectedMaintenance: BatteryMaintenance | null;
  oficina: string | null;
}

export interface MappedMaintenance {
  id: string;
  date: string;
  km: string;
  price: string;
  voltage: string;
  amperage: string;
  oficina: string;
}

export interface BatteryPayload {
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  voltage: string;
  amperage: string;
  valor: number;
  batteryBrand: string | null;
  oficina: string | null;
}
