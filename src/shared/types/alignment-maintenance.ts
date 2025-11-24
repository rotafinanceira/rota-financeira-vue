export interface AlignmentMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  valor: number;
  status: string;
  oficina?: string | null;
  nextMaintenanceMileage: number;
}

export interface AlignmentState {
  date: string;
  mileage: string;
  oficina: string | null;
  carId: number | null;
  isLoading: boolean;
  maintenances: AlignmentMaintenance[];
  isOverdue: boolean;
  nextMaintenanceKm: number | null;
  selectedMaintenance: AlignmentMaintenance | null;
}

export interface MappedMaintenance {
  id: string;
  date: string;
  km: string;
  price: string;
  oficina: string;
}

export interface AlignmentPayload {
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  valor: number;
  oficina: string | null;
}
