import { MaintenanceIcons } from '@/shared/types/maintenance';

export type MaintenanceCardProps = {
  title: string;
  icon: keyof MaintenanceIcons;
  maintenanceData?: MaintenanceData;
  routeName: string;
};

export type MaintenanceTypes =
  | 'engine'
  | 'battery'
  | 'oil'
  | 'air filter'
  | 'wheel'
  | 'alignment and balancing'
  | 'fuel levels'
  | 'fluid levels';

export type MaintenanceStatus =
  | 'Unregistered'
  | 'PENDING'
  | 'EXPIRED'
  | 'COMPLETED';

export type MaintenanceData = {
  date?: Date | null;
  status?: MaintenanceStatus;
  pendingSteps?: number;
};
