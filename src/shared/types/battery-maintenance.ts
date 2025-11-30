export interface BatteryMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  voltage?: string | null;
  amperage?: string | null;
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
  voltage: string | null;
  amperage: string | null;
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
  voltage: string | null;
  amperage: string | null;
  oficina: string | null;
}

export interface BatteryPayload {
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  voltage?: string | null;
  amperage?: string | null;
  valor: number;
  batteryBrand: string | null;
  oficina: string | null;
}
