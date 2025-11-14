import { MaintenanceIcons } from '@/shared/types/maintenance';

export type MaintenanceCardProps = {
  title: string;
  icon: keyof MaintenanceIcons;
  maintenanceData?: MaintenanceStatus;
  routeName: string;
  tags?: MaintenanceTag[];
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

export type MaintenanceState =
  | 'Unregistered'
  | 'PENDING'
  | 'EXPIRED'
  | 'COMPLETED';

export type MaintenanceTag = 'EXPIRED' | 'PENDING' | 'UNREGISTERED' | 'TO_FILL';

export interface MaintenanceData {
  status: MaintenanceState;
  pendingSteps: number;
  nextDueDate?: string;
  completedAt?: string | null;
  date?: string;
  tagInfo?: {
    key: MaintenanceTag;
    text: string;
    variant?: 'alert' | 'error' | 'default';
  } | null;
}

export interface MaintenanceStatus {
  type: string;
  data: MaintenanceData;
  tag: MaintenanceTag;
  tags?: MaintenanceTag[];
  licensePlate?: string;
  id?: number;
  updatedAt?: string;
  pendingRegistration?: number;
  tagInfo?: {
    key: MaintenanceTag;
    text: string;
    variant?: 'alert' | 'error' | 'default';
  }[];
}
