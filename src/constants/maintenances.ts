// src/shared/constants/maintenance.ts
import type { MaintenanceIcons } from '@/shared/types/maintenance';

export type MaintenanceTypeKey =
  | 'Oil Change'
  | 'Fuel Filter Change'
  | 'Wheel Alignment'
  | 'Battery Change'
  | 'Air Filter Change';

export const MAINTENANCE_CONFIG: Record<
  MaintenanceTypeKey,
  {
    label: string;
    icon: keyof MaintenanceIcons;
    route: string;
    category: string;
    duration: { years: number; months: number };
  }
> = {
  'Oil Change': {
    label: 'Troca de óleo',
    icon: 'oil',
    route: 'maintenance-oil',
    category: 'oil',
    duration: { years: 0, months: 6 },
  },
  'Fuel Filter Change': {
    label: 'Troca do filtro de combustível',
    icon: 'fuelFilter',
    route: 'maintenance-fuel-filter',
    category: 'fuel-filter',
    duration: { years: 0, months: 10 },
  },
  'Wheel Alignment': {
    label: 'Alinhamento e balanceamento',
    icon: 'alignment',
    route: 'maintenance-alignment-balancing',
    category: 'alignment',
    duration: { years: 1, months: 0 },
  },
  'Battery Change': {
    label: 'Troca de bateria',
    icon: 'battery',
    route: 'maintenance-battery',
    category: 'battery',
    duration: { years: 2, months: 6 },
  },
  'Air Filter Change': {
    label: 'Troca do filtro de ar',
    icon: 'airFilter',
    route: 'maintenance-air-filter',
    category: 'air',
    duration: { years: 1, months: 0 },
  },
};
