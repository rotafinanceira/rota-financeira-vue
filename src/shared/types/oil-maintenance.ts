export enum OilType {
  MINERAL = 'MINERAL',
  SEMI_SYNTHETIC = 'SEMI_SYNTHETIC',
  SYNTHETIC = 'SYNTHETIC',
}

export enum OilServiceType {
  OIL_CHANGE = 'oil_change',
  BOTH = 'both',
}

export interface OilMaintenance {
  id: string;
  lastMaintenanceDate: string;
  lastMaintenanceKm: number;
  oilType: OilType;
  oilQuantityLt: number;
  serviceType: OilServiceType;
  valor: number;
  status: string;
  oficina?: string;
  nextMaintenanceMileage: number;
}

export interface OilState {
  date: string;
  mileage: string;
  oilType: OilType | '';
  oficina: string;
  serviceType: OilServiceType | '';
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
}
