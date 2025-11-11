export interface BatteryMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  remainingCapacity: string;
  BatteryQuantityLt: number;
  valor: number;
  status: string;
  batteryBrand?: string;
  nextMaintenanceMileage: number;
  oficina: string;
}

export interface BatteryState {
  date: string;
  mileage: string;
  capacity: string;
  brand: string;
  carId: number | null;
  isLoading: boolean;
  maintenances: BatteryMaintenance[];
  isOverdue: boolean;
  nextMaintenanceKm: number | null;
  selectedMaintenance: BatteryMaintenance | null;
  oficina: string;
}

export interface MappedMaintenance {
  id: string;
  date: string;
  km: string;
  price: string;
  capacity: string;
  oficina: string;
}
